import React, { useState, useEffect, useRef, useCallback } from 'react';
import GeoHUD from './GeoHUD';
import FlagGame from './FlagGame';
import BorderGame from './BorderGame';
import CapitalGame from './CapitalGame';
import GameOverModal from './GameOverModal';
import {
    generateFlagQuestion,
    generateBorderQuestion,
    generateCapitalQuestion,
    DEFAULT_FRIENDS_LEADERBOARD
} from '../../logic/GeoEngine';
import { soundManager } from '../../logic/SoundManager';
import './GeoChallenge.css';

const ROUND_TIME = 50;

function GeoChallenge({ onBackToHub }) {
    // Modo de juego: 'mode-select' | 'flags' | 'borders' | 'capitals' | 'world-tour'
    const [mode, setMode] = useState('mode-select');
    const [status, setStatus] = useState('idle'); // 'idle' | 'playing' | 'paused' | 'finished'

    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [comboPoints, setComboPoints] = useState(0);

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedback, setFeedback] = useState(null); // { type: 'correct' | 'wrong', x: number, y: number }
    const [isTransitioning, setIsTransitioning] = useState(false);

    const [stats, setStats] = useState({ correct: 0, wrong: 0, total: 0, maxCombo: 0 });
    const [history, setHistory] = useState([]);
    const [worldTourStage, setWorldTourStage] = useState(0); // 0: Banderas, 1: Siluetas, 2: Capitales

    // Sonidos personalizados para Geo Challenge usando Web Audio API
    const playGeoCorrect = useCallback(() => {
        try {
            soundManager.init();
            if (!soundManager.audioCtx) return;
            const ctx = soundManager.audioCtx;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
            osc.frequency.exponentialRampToValueAtTime(880.00, ctx.currentTime + 0.08); // A5
            osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.16); // D6

            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.35);
        } catch (e) {
            // fallback silencioso
        }
    }, []);

    const playGeoWrong = useCallback(() => {
        try {
            soundManager.init();
            if (!soundManager.audioCtx) return;
            const ctx = soundManager.audioCtx;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(160, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(90, ctx.currentTime + 0.25);

            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.25);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.25);
        } catch (e) {
            // fallback silencioso
        }
    }, []);

    // Generador de preguntas según el modo actual
    const nextQuestion = useCallback((activeMode, stage = 0) => {
        let q = null;
        if (activeMode === 'flags') {
            q = generateFlagQuestion();
        } else if (activeMode === 'borders') {
            q = generateBorderQuestion();
        } else if (activeMode === 'capitals') {
            q = generateCapitalQuestion();
        } else if (activeMode === 'world-tour') {
            // Alterna entre Banderas, Siluetas y Capitales
            const currentStageType = stage % 3;
            if (currentStageType === 0) q = generateFlagQuestion();
            else if (currentStageType === 1) q = generateBorderQuestion();
            else q = generateCapitalQuestion();
        }
        setCurrentQuestion(q);
        setIsTransitioning(false);
    }, []);

    // Iniciar una partida
    const startNewGame = (chosenMode) => {
        setMode(chosenMode);
        setScore(0);
        setTimeLeft(ROUND_TIME);
        setCombo(0);
        setMaxCombo(0);
        setComboPoints(0);
        setStats({ correct: 0, wrong: 0, total: 0, maxCombo: 0 });
        setHistory([]);
        setWorldTourStage(0);
        setStatus('playing');
        nextQuestion(chosenMode, 0);
    };

    // Temporizador principal
    useEffect(() => {
        if (status !== 'playing') return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setStatus('finished');
                    soundManager.playGameOver();
                    return 0;
                }
                if (prev <= 10) {
                    soundManager.playTick();
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [status]);

    // Manejar respuesta del jugador
    const handleAnswer = (selectedOption) => {
        if (status !== 'playing' || isTransitioning || !currentQuestion) return;

        setIsTransitioning(true);
        const { target, type } = currentQuestion;

        let isCorrect = false;
        if (type === 'flag' || type === 'border') {
            isCorrect = selectedOption.id === target.id;
        } else if (type === 'capital') {
            isCorrect = selectedOption.isCorrect === true || selectedOption.capital === target.capital;
        }

        if (isCorrect) {
            playGeoCorrect();
            const newCombo = combo + 1;
            const newMax = Math.max(maxCombo, newCombo);
            setCombo(newCombo);
            setMaxCombo(newMax);

            // Puntos base 100 + racha combo (20 pts extra por acierto en racha)
            const earned = 100 + (newCombo * 20);
            setScore(prev => prev + earned);
            setComboPoints(earned);

            setFeedback({ type: 'correct' });

            setStats(prev => ({
                ...prev,
                correct: prev.correct + 1,
                total: prev.total + 1,
                maxCombo: newMax
            }));

            setHistory(prev => [...prev, { country: target, correct: true }]);

            setTimeout(() => {
                setFeedback(null);
                setComboPoints(0);
                const nextStage = worldTourStage + 1;
                setWorldTourStage(nextStage);
                nextQuestion(mode, nextStage);
            }, 600);
        } else {
            playGeoWrong();
            setCombo(0);
            setFeedback({ type: 'wrong' });

            setStats(prev => ({
                ...prev,
                wrong: prev.wrong + 1,
                total: prev.total + 1
            }));

            setHistory(prev => [...prev, { country: target, correct: false }]);

            setTimeout(() => {
                setFeedback(null);
                const nextStage = worldTourStage + 1;
                setWorldTourStage(nextStage);
                nextQuestion(mode, nextStage);
            }, 650);
        }
    };

    const handlePauseToggle = () => {
        setStatus(prev => (prev === 'playing' ? 'paused' : 'playing'));
    };

    return (
        <div className="geo-challenge-viewport">
            {/* Fondo animado de nubes y cielo Playfish */}
            <div className="geo-sky-bg">
                <div className="geo-cloud cloud-1" />
                <div className="geo-cloud cloud-2" />
                <div className="geo-cloud cloud-3" />
            </div>

            {/* PANTALLA: SELECCIÓN DE MODO DE JUEGO */}
            {status === 'idle' && (
                <div className="geo-menu-screen">
                    <div className="geo-menu-card">
                        <div className="geo-logo-banner">
                            <span className="geo-globe-icon">🌍</span>
                            <h1>GEO CHALLENGE</h1>
                            <span className="geo-subtitle">Playfish Edition</span>
                        </div>

                        <p className="geo-welcome-msg">
                            ¡Aprende los países, banderas, siluetas y capitales del mundo jugando!
                        </p>

                        <div className="geo-modes-selection">
                            <button
                                className="geo-mode-btn mode-tour"
                                onClick={() => startNewGame('world-tour')}
                            >
                                <span className="mode-emoji">✈️</span>
                                <div className="mode-details">
                                    <strong>GIRA MUNDIAL (World Tour)</strong>
                                    <small>Combina Banderas, Siluetas y Capitales en una carrera</small>
                                </div>
                            </button>

                            <button
                                className="geo-mode-btn mode-flags"
                                onClick={() => startNewGame('flags')}
                            >
                                <span className="mode-emoji">🚩</span>
                                <div className="mode-details">
                                    <strong>Adivina la Bandera</strong>
                                    <small>Guess the flag! (6 banderas en cuadrícula)</small>
                                </div>
                            </button>

                            <button
                                className="geo-mode-btn mode-borders"
                                onClick={() => startNewGame('borders')}
                            >
                                <span className="mode-emoji">🗺️</span>
                                <div className="mode-details">
                                    <strong>Adivina la Silueta</strong>
                                    <small>Guess the border! (Forma del país + 4 opciones)</small>
                                </div>
                            </button>

                            <button
                                className="geo-mode-btn mode-capitals"
                                onClick={() => startNewGame('capitals')}
                            >
                                <span className="mode-emoji">🏛️</span>
                                <div className="mode-details">
                                    <strong>Adivina la Capital</strong>
                                    <small>Guess the capital! (Aprende las ciudades capitales)</small>
                                </div>
                            </button>
                        </div>

                        <button className="geo-back-hub-btn" onClick={onBackToHub}>
                            🏠 Volver al Menú Arcade
                        </button>
                    </div>
                </div>
            )}

            {/* PANTALLA: JUEGO EN VIVO */}
            {(status === 'playing' || status === 'paused') && (
                <div className="geo-stage-container">
                    {/* HUD superior, ranking lateral y botón de pausa */}
                    <GeoHUD
                        score={score}
                        comboPoints={comboPoints}
                        timeLeft={timeLeft}
                        initialTime={ROUND_TIME}
                        isPaused={status === 'paused'}
                        onPauseToggle={handlePauseToggle}
                        onBackToHub={onBackToHub}
                        friends={DEFAULT_FRIENDS_LEADERBOARD}
                    />

                    {/* Contenido del minijuego activo */}
                    <main className={`geo-active-minigame ${status === 'paused' ? 'blur-paused' : ''}`}>
                        {currentQuestion?.type === 'flag' && (
                            <FlagGame
                                question={currentQuestion}
                                onSelect={handleAnswer}
                                disabled={isTransitioning}
                            />
                        )}

                        {currentQuestion?.type === 'border' && (
                            <BorderGame
                                question={currentQuestion}
                                onSelect={handleAnswer}
                                disabled={isTransitioning}
                            />
                        )}

                        {currentQuestion?.type === 'capital' && (
                            <CapitalGame
                                question={currentQuestion}
                                onSelect={handleAnswer}
                                disabled={isTransitioning}
                            />
                        )}
                    </main>

                    {/* OVERLAY DE PAUSA */}
                    {status === 'paused' && (
                        <div className="geo-pause-overlay">
                            <div className="geo-pause-box">
                                <h2>⏸️ JUEGO EN PAUSA</h2>
                                <p>Tómate un respiro, ¡el tiempo está congelado!</p>
                                <button className="geo-action-btn primary-play-btn" onClick={handlePauseToggle}>
                                    ▶️ CONTINUAR
                                </button>
                                <button className="geo-action-btn neutral-hub-btn" onClick={onBackToHub}>
                                    🏠 MENÚ ARCADE
                                </button>
                            </div>
                        </div>
                    )}

                    {/* FEEDBACK VISUAL: TILDE VERDE GIGANTE O CRUZ ROJA */}
                    {feedback && (
                        <div className={`geo-feedback-splash ${feedback.type}`}>
                            {feedback.type === 'correct' ? (
                                <div className="geo-splash-checkmark-wrap">
                                    <div className="geo-splatter-circle circle-1" />
                                    <div className="geo-splatter-circle circle-2" />
                                    <div className="geo-splatter-circle circle-3" />
                                    <div className="geo-big-checkmark">✔</div>
                                </div>
                            ) : (
                                <div className="geo-splash-cross-wrap">
                                    <div className="geo-big-cross">✖</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* PANTALLA: GAME OVER & RESULTADOS */}
            {status === 'finished' && (
                <GameOverModal
                    score={score}
                    stats={stats}
                    history={history}
                    onRestart={() => startNewGame(mode)}
                    onSelectMode={() => setStatus('idle')}
                    onBackToHub={onBackToHub}
                />
            )}
        </div>
    );
}

export default GeoChallenge;
