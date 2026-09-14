import React from 'react';

function BorderGame({ question, onSelect, disabled }) {
    if (!question || !question.target || !question.silhouette) return null;

    const { target, silhouette, options } = question;

    return (
        <div className="geo-gameplay-area border-game-layout">
            <div className="geo-border-content-row">
                {/* Tarjeta con la silueta del país */}
                <div className="geo-silhouette-card">
                    <svg
                        viewBox={silhouette.viewBox || "0 0 300 300"}
                        className="geo-silhouette-svg"
                    >
                        {silhouette.paths.map((d, index) => (
                            <path
                                key={index}
                                d={d}
                                className="geo-silhouette-path"
                            />
                        ))}
                    </svg>
                </div>

                {/* Columna con 4 botones de colores Playfish */}
                <div className="geo-options-column">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            className={`geo-color-btn btn-${option.color}`}
                            onClick={() => onSelect(option)}
                            disabled={disabled}
                        >
                            <span className="geo-btn-text">{option.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Etiqueta angular inferior izquierda característica: Guess the border! */}
            <div className="geo-corner-badge green-badge">
                <span className="badge-line-1">Guess</span>
                <span className="badge-line-2">the border!</span>
            </div>
        </div>
    );
}

export default BorderGame;
