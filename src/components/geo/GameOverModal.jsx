import React from 'react';

function GameOverModal({ score, stats, history = [], onRestart, onSelectMode, onBackToHub }) {
    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

    let medal = "🥉";
    let title = "¡Buen Intento!";
    if (score >= 5000) {
        medal = "🥇";
        title = "¡Maestro de la Geografía!";
    } else if (score >= 2500) {
        medal = "🥈";
        title = "¡Gran Trabajo Explorador!";
    }

    return (
        <div className="geo-modal-backdrop">
            <div className="geo-gameover-card">
                <div className="geo-modal-ribbon">
                    <span className="geo-modal-medal">{medal}</span>
                    <h2>¡TIEMPO!</h2>
                </div>

                <p className="geo-modal-subtitle">{title}</p>

                <div className="geo-modal-score-box">
                    <span className="geo-score-label">PUNTUACIÓN FINAL</span>
                    <span className="geo-score-number">{score.toLocaleString()}</span>
                </div>

                <div className="geo-modal-stats-grid">
                    <div className="geo-stat-item">
                        <span className="stat-label">Aciertos</span>
                        <span className="stat-val green-text">{stats.correct}</span>
                    </div>
                    <div className="geo-stat-item">
                        <span className="stat-label">Fallos</span>
                        <span className="stat-val red-text">{stats.wrong}</span>
                    </div>
                    <div className="geo-stat-item">
                        <span className="stat-label">Precisión</span>
                        <span className="stat-val yellow-text">{accuracy}%</span>
                    </div>
                    <div className="geo-stat-item">
                        <span className="stat-label">Mejor Combo</span>
                        <span className="stat-val blue-text">x{stats.maxCombo}</span>
                    </div>
                </div>

                {/* Lista educativa: países vistos en la partida */}
                {history.length > 0 && (
                    <div className="geo-recap-box">
                        <h4>Países explorados en esta ronda:</h4>
                        <div className="geo-recap-tags">
                            {history.slice(-8).map((h, i) => (
                                <span
                                    key={i}
                                    className={`geo-recap-tag ${h.correct ? 'tag-correct' : 'tag-wrong'}`}
                                >
                                    {h.correct ? "✔️ " : "❌ "}
                                    {h.country.name} ({h.country.capital})
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="geo-modal-actions">
                    <button className="geo-action-btn primary-play-btn" onClick={onRestart}>
                        🔄 ¡JUGAR OTRA VEZ!
                    </button>
                    <button className="geo-action-btn secondary-mode-btn" onClick={onSelectMode}>
                        🎮 ELEGIR MODO
                    </button>
                    <button className="geo-action-btn neutral-hub-btn" onClick={onBackToHub}>
                        🏠 MENÚ ARCADE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GameOverModal;
