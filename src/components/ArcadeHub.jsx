import React from 'react';
import './ArcadeHub.css';

function ArcadeHub({ onSelectGame }) {
    return (
        <div className="arcade-hub-viewport">
            {/* Fondo con nubes animadas y degradado celeste Playfish */}
            <div className="arcade-clouds-bg">
                <div className="arcade-cloud ac-1" />
                <div className="arcade-cloud ac-2" />
                <div className="arcade-cloud ac-3" />
            </div>

            <div className="arcade-hub-container">
                {/* Cabecera del Portal Arcade */}
                <header className="arcade-header">
                    <div className="arcade-badge">PLAYFISH ARCADE</div>
                    <h1 className="arcade-title">ZONA DE JUEGOS</h1>
                    <p className="arcade-subtitle">
                        Elige tu desafío favorito y pon a prueba tu rapidez mental
                    </p>
                </header>

                {/* Tarjetas de Selección de Juegos */}
                <div className="arcade-games-grid">
                    {/* Tarjeta 1: WORD CHALLENGE */}
                    <div className="arcade-card card-word" onClick={() => onSelectGame('word')}>
                        <div className="card-ribbon ribbon-yellow">¡CLÁSICO!</div>
                        <div className="card-icon-wrap">
                            <span className="card-giant-icon">🔤</span>
                        </div>
                        <h2 className="card-game-title">WORD CHALLENGE</h2>
                        <span className="card-game-tag">Desafío de Palabras</span>
                        <p className="card-game-desc">
                            Forma todas las palabras posibles con 6 letras antes de que el reloj llegue a cero. ¡Combos, pistas y más de 4,300 palabras de la RAE!
                        </p>
                        <div className="card-features">
                            <span>⏱️ 90 Segundos</span>
                            <span>📖 Diccionario RAE</span>
                            <span>🏆 Top 10 Ranking</span>
                        </div>
                        <button className="card-play-btn btn-play-word">
                            ¡JUGAR PALABRAS! 🚀
                        </button>
                    </div>

                    {/* Tarjeta 2: GEO CHALLENGE */}
                    <div className="arcade-card card-geo" onClick={() => onSelectGame('geo')}>
                        <div className="card-ribbon ribbon-green">¡NUEVO!</div>
                        <div className="card-icon-wrap">
                            <span className="card-giant-icon">🌍</span>
                        </div>
                        <h2 className="card-game-title">GEO CHALLENGE</h2>
                        <span className="card-game-tag">Desafío Geográfico</span>
                        <p className="card-game-desc">
                            Aprende países, banderas, siluetas y capitales del mundo. ¡Ideal para aprender geografía jugando con el clásico de Playfish!
                        </p>
                        <div className="card-features">
                            <span>🚩 Banderas HD</span>
                            <span>🗺️ Siluetas Vectoriales</span>
                            <span>🏛️ Capitales</span>
                        </div>
                        <button className="card-play-btn btn-play-geo">
                            ¡JUGAR GEOGRAFÍA! ✈️
                        </button>
                    </div>
                </div>

                <footer className="arcade-footer">
                    <span>🎮 Playfish Remake Collection • Para aprender jugando</span>
                </footer>
            </div>
        </div>
    );
}

export default ArcadeHub;
