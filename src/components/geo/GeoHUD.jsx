import React from 'react';

function GeoHUD({ score, comboPoints, timeLeft, initialTime = 50, isPaused, onPauseToggle, friends = [] }) {
    // Porcentaje de tiempo restante para la barra de combustible
    const timePercent = Math.max(0, Math.min(100, (timeLeft / initialTime) * 100));
    const isUrgent = timeLeft <= 10;

    // Ángulo de la aguja del velocímetro (-120deg a +120deg)
    const needleAngle = -120 + (timePercent / 100) * 240;

    return (
        <>
            {/* --- BARRA SUPERIOR (HUD) --- */}
            <header className="geo-hud-header">
                {/* Trofeo y Puntuación */}
                <div className="geo-trophy-card">
                    <span className="geo-trophy-icon">🏆</span>
                    <span className="geo-score-value">{score.toLocaleString()}</span>
                    {comboPoints > 0 && (
                        <span key={Date.now()} className="geo-combo-popup">
                            +{comboPoints}
                        </span>
                    )}
                </div>

                {/* Temporizador Estilo Velocímetro Playfish */}
                <div className={`geo-speedo-container ${isUrgent ? 'urgent' : ''}`}>
                    {/* Dial analógico con aguja */}
                    <div className="geo-speedo-dial">
                        <div
                            className="geo-speedo-needle"
                            style={{ transform: `rotate(${needleAngle}deg)` }}
                        />
                        <div className="geo-speedo-center-cap" />
                    </div>

                    {/* Barra de combustible verde a roja */}
                    <div className="geo-fuel-track">
                        <div
                            className={`geo-fuel-fill ${isUrgent ? 'fuel-red' : ''}`}
                            style={{ width: `${timePercent}%` }}
                        />
                    </div>

                    {/* Dígitos grandes del tiempo */}
                    <span className="geo-speedo-digits">{timeLeft}</span>
                </div>
            </header>

            {/* --- BARRA LATERAL IZQUIERDA: AMIGOS / RANKING --- */}
            <aside className="geo-friends-sidebar">
                <div className="geo-friends-header">Ranking</div>
                <div className="geo-friends-list">
                    {/* Jugador actual en el ranking */}
                    <div className="geo-friend-pill player-pill">
                        <div className="geo-friend-avatar player-avatar">⭐</div>
                        <div className="geo-friend-info">
                            <span className="geo-friend-name">Tú</span>
                            <span className="geo-friend-score">{score.toLocaleString()}</span>
                        </div>
                    </div>

                    {friends.map((friend, idx) => (
                        <div key={idx} className="geo-friend-pill">
                            <div className="geo-friend-avatar" style={{ backgroundColor: friend.color }}>
                                {friend.avatar}
                            </div>
                            <div className="geo-friend-info">
                                <span className="geo-friend-name">{friend.name}</span>
                                <span className="geo-friend-score">{friend.score.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* --- BOTÓN DE PAUSA (Engranaje) --- */}
            <button
                className="geo-pause-gear-btn"
                onClick={onPauseToggle}
                title={isPaused ? "Reanudar" : "Pausar"}
            >
                <span className="geo-gear-icon">⚙️</span>
                <span className="geo-gear-text">{isPaused ? "REANUDAR" : "PAUSE"}</span>
            </button>
        </>
    );
}

export default GeoHUD;
