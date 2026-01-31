import React, { useState, useEffect, useCallback } from 'react';
import { generateGameLetters, findPossibleWords, shuffleArray, getTimeBonus } from '../logic/GameEngine';
import { soundManager } from '../logic/SoundManager';
import { saveScore, getTopScores, getCurrentUser, setCurrentUser } from '../services/ScoreService';
import dictionary from '../assets/dictionary.json';
import Leaderboard from './Leaderboard';
import './GameBoard.css';

const INITIAL_TIME = 90; // 1:30

function GameBoard() {
    const [letters, setLetters] = useState([]);
    const [shuffledLetters, setShuffledLetters] = useState([]);
    const [possibleWords, setPossibleWords] = useState({ 3: [], 4: [], 5: [], 6: [] });
    const [foundWords, setFoundWords] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [score, setScore] = useState(0);
    const [gameStatus, setGameStatus] = useState('login'); // 'login', 'playing', 'finished'
    const [username, setUsername] = useState("");
    const [topScores, setTopScores] = useState([]);
    const [message, setMessage] = useState("");
    const [hintsUsed, setHintsUsed] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [fullCompleteBonus, setFullCompleteBonus] = useState(false);
    const [lastFoundTime, setLastFoundTime] = useState(0);
    const [comboCount, setComboCount] = useState(0);
    const [lastWordFound, setLastWordFound] = useState("");
    const [isShuffling, setIsShuffling] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    // Cargar usuario y ranking inicial
    useEffect(() => {
        const savedUser = getCurrentUser();
        if (savedUser) setUsername(savedUser);
        setTopScores(getTopScores());
    }, []);

    const handleStartGame = (e) => {
        e.preventDefault();
        if (username.trim()) {
            setCurrentUser(username);
            setGameStatus('playing');
            initGame();
        }
    };

    const initGame = () => {
        const newLetters = generateGameLetters(dictionary);
        setLetters(newLetters);
        setShuffledLetters(newLetters);
        setPossibleWords(findPossibleWords(newLetters, dictionary));
        setTimeLeft(INITIAL_TIME);
        setFoundWords([]);
        setScore(0);
        setMessage("");
        setHintsUsed(0);
        setIsPaused(false);
        setFullCompleteBonus(false);
        setComboCount(0);
        setLastWordFound("");
        setIsShuffling(false);
        setShowConfetti(false);
    };

    // Timer
    useEffect(() => {
        if (gameStatus === 'playing' && timeLeft > 0 && !isPaused) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && gameStatus === 'playing') {
            setGameStatus('finished');

            // Usar el username actual o recuperarlo de localStorage como respaldo
            const finalUsername = username.trim() || getCurrentUser() || "Jugador";
            const updatedScores = saveScore(finalUsername, score);
            setTopScores(updatedScores);
        }
    }, [timeLeft, gameStatus, username, score, isPaused]);

    const handleShuffle = () => {
        setIsShuffling(true);
        setTimeout(() => {
            setShuffledLetters(prev => shuffleArray([...prev]));
            setIsShuffling(false);
        }, 300);
    };

    const handleCharInput = (char) => {
        if (currentGuess.length < 6) {
            setCurrentGuess(prev => prev + char);
        }
    };

    const handleDelete = () => {
        setCurrentGuess(prev => prev.slice(0, -1));
    };

    const handleHint = () => {
        if (gameStatus !== 'playing') return;

        // Buscar una palabra que no haya sido encontrada aún
        const allPossible = [
            ...possibleWords[3],
            ...possibleWords[4],
            ...possibleWords[5],
            ...possibleWords[6]
        ].filter(w => !foundWords.includes(w));

        if (allPossible.length > 0) {
            // Priorizar palabras más largas para la pista
            const sortedByLen = allPossible.sort((a, b) => b.length - a.length);
            const targetWord = sortedByLen[0];

            setMessage(`PISTA: Una palabra de ${targetWord.length} letras empieza con "${targetWord[0]}"`);
            setHintsUsed(prev => prev + 1);
            setTimeLeft(prev => Math.max(prev - 5, 0));
            setTimeout(() => setMessage(""), 4000);
        }
    };

    const handleSubmit = useCallback(() => {
        if (isPaused) return;
        const guess = currentGuess.toUpperCase();

        // Verificar si ya fue encontrada
        if (foundWords.includes(guess)) {
            setMessage("¡Ya la encontraste!");
            setTimeout(() => setMessage(""), 2000);
            setCurrentGuess("");
            return;
        }

        // Verificar si es válida
        const allPossible = [
            ...possibleWords[3],
            ...possibleWords[4],
            ...possibleWords[5],
            ...possibleWords[6]
        ];

        if (allPossible.includes(guess)) {
            const newFoundWords = [...foundWords, guess];
            setFoundWords(newFoundWords);
            const bonus = getTimeBonus(guess.length);
            setTimeLeft(prev => Math.min(prev + bonus, 120));
            setScore(prev => prev + (guess.length * 10));
            // Sistema de Combos
            const now = Date.now();
            if (now - lastFoundTime < 3000) { // Menos de 3 segundos
                const newCombo = comboCount + 1;
                setComboCount(newCombo);
                const comboBonus = newCombo * 5;
                setScore(prev => prev + comboBonus);
                setMessage(`¡COMBO X${newCombo}! +${comboBonus}`);
            } else {
                setComboCount(0);
                setMessage("¡Muy bien!");
            }
            setLastFoundTime(now);
            setLastWordFound(guess);

            soundManager.playSuccess();
            setTimeout(() => {
                setMessage("");
                setLastWordFound("");
            }, 1500);

            // Verificar si completó todas
            if (newFoundWords.length === allPossible.length && !fullCompleteBonus) {
                setScore(prev => prev + 100);
                setFullCompleteBonus(true);
                setShowConfetti(true);
                setMessage("🌟 ¡BONO MAESTRO! +100 🌟");
                setTimeout(() => {
                    setMessage("");
                    setShowConfetti(false);
                }, 4000);
            }
        } else {
            setMessage("Intenta otra...");
            soundManager.playError();
            setTimeout(() => setMessage(""), 1500);
        }

        setCurrentGuess("");
    }, [currentGuess, foundWords, possibleWords, fullCompleteBonus, isPaused]);

    // Manejo de teclado
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameStatus !== 'playing' || isPaused) return;

            if (e.key === 'Backspace') handleDelete();
            if (e.key === 'Enter') handleSubmit();
            if (e.key === ' ') handleShuffle();

            const char = e.key.toUpperCase();
            if (char.length === 1 && char >= 'A' && char <= 'Z') {
                // Solo si la letra está disponible y no se ha usado más de lo permitido
                const charCountInGuess = currentGuess.split('').filter(c => c === char).length;
                const charCountInLetters = letters.filter(c => c === char).length;

                if (charCountInGuess < charCountInLetters) {
                    handleCharInput(char);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameStatus, currentGuess, letters, handleSubmit, isPaused]);

    const handlePause = () => {
        if (gameStatus === 'playing') {
            setIsPaused(!isPaused);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="pf-main-layout">
            <Leaderboard scores={topScores} />

            <div className="game-container">
                {gameStatus === 'login' && (
                    <div className="pf-overlay">
                        <h2 style={{ marginBottom: '20px' }}>WORD CHALLENGE</h2>
                        <form onSubmit={handleStartGame} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <input
                                type="text"
                                placeholder="Tu Nombre"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="pf-input"
                                required
                            />
                            <button type="submit" className="pf-restart-btn">¡JUGAR!</button>
                        </form>
                    </div>
                )}

                {message && <div key={Date.now()} className="pf-feedback-msg">{message}</div>}
                {showConfetti && <div className="pf-confetti-overlay"></div>}

                <div className="pf-header">
                    <div className="pf-header-controls">
                        <div className={`pf-timer-container ${timeLeft <= 10 ? 'urgent' : ''}`}>
                            ⏱️ {formatTime(timeLeft)}
                        </div>
                        <button className={`pf-pause-btn ${isPaused ? 'paused' : ''}`} onClick={handlePause}>
                            {isPaused ? "▶️ CONTINUAR" : "⏸️ PAUSA"}
                        </button>
                    </div>
                    <div className="pf-score-container">
                        {score}
                    </div>
                </div>

                <div className={`pf-discovery-area ${isPaused ? 'paused-blur' : ''}`}>
                    {[3, 4, 5, 6].map(len => (
                        <div key={len} className="pf-word-row-container">
                            <h4 className="pf-len-label">{len} Letras</h4>
                            <div className="pf-word-row">
                                {possibleWords[len].map((word, idx) => (
                                    <div
                                        key={idx}
                                        className={`pf-word-box ${foundWords.includes(word) ? 'found' : ''} ${lastWordFound === word ? 'just-found' : ''}`}
                                    >
                                        {foundWords.includes(word)
                                            ? word
                                            : word.split('').map((_, i) => <span key={i} className="pf-letter-slot"></span>)
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`pf-guess-display ${isPaused ? 'hidden-content' : ''}`}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="pf-guess-slot">
                            {isPaused ? "?" : (currentGuess[i] || "")}
                        </div>
                    ))}
                </div>

                <div className={`pf-letters-controls ${isPaused ? 'hidden-content' : ''}`}>
                    <button className="pf-side-btn shuffle" onClick={handleShuffle} title="Barajar (Espacio)">
                        🔄
                    </button>
                    <button className="pf-side-btn hint" onClick={handleHint} title="Pista (-5 seg)">
                        💡
                    </button>

                    <div className="pf-letters-wrap">
                        {shuffledLetters.map((char, idx) => {
                            const usedCount = currentGuess.split('').filter(c => c === char).length;
                            const availableCount = letters.filter(c => c === char).length;
                            const isDisabled = usedCount >= availableCount;

                            return (
                                <button
                                    key={idx}
                                    className={`pf-letter-tile ${isShuffling ? 'shuffling' : ''}`}
                                    onClick={() => handleCharInput(char)}
                                    disabled={isDisabled || isShuffling}
                                    style={{ animationDelay: `${idx * 0.05}s` }}
                                >
                                    {char}
                                </button>
                            );
                        })}
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="pf-side-btn backspace" onClick={handleDelete} title="Borrar (Backspace)">
                            ⬅️
                        </button>
                        <button className="pf-side-btn enter" onClick={handleSubmit} title="Enviar (Enter)">
                            ✔️
                        </button>
                    </div>
                </div>

                {gameStatus === 'finished' && (
                    <div className="pf-overlay">
                        <h2>¡TIEMPO!</h2>
                        <div className="pf-results-summary">
                            <p>Puntuación Final: <strong>{score}</strong></p>
                            <div className="pf-missed-words">
                                <h3>Palabras que te faltaron:</h3>
                                <div className="pf-missed-list">
                                    {[3, 4, 5, 6].map(len => {
                                        const missed = possibleWords[len].filter(w => !foundWords.includes(w));
                                        if (missed.length === 0) return null;
                                        return (
                                            <div key={len} className="pf-missed-row">
                                                <strong>{len} letras:</strong> {missed.join(' - ')}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <button className="pf-restart-btn" onClick={() => setGameStatus('login')}>
                            ¡OTRA VEZ!
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GameBoard;
