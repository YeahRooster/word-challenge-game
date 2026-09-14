import React from 'react';
import { getFlagUrl } from '../../data/countries';

function FlagGame({ question, onSelect, disabled }) {
    if (!question || !question.target) return null;

    const { target, options } = question;

    return (
        <div className="geo-gameplay-area flag-game-layout">
            {/* Pastilla central con el nombre del país a adivinar */}
            <div className="geo-prompt-container">
                <div className="geo-country-pill">
                    {target.name}
                </div>
            </div>

            {/* Cuadrícula de 6 banderas (2 filas x 3 columnas) */}
            <div className="geo-flags-grid">
                {options.map((country) => (
                    <button
                        key={country.id}
                        className="geo-flag-btn"
                        onClick={() => onSelect(country)}
                        disabled={disabled}
                        title={country.name}
                    >
                        <div className="geo-flag-inner">
                            <img
                                src={getFlagUrl(country.code)}
                                alt={`Bandera de ${country.name}`}
                                className="geo-flag-img"
                                loading="eager"
                            />
                        </div>
                    </button>
                ))}
            </div>

            {/* Etiqueta angular inferior izquierda característica de Geo Challenge */}
            <div className="geo-corner-badge orange-badge">
                <span className="badge-line-1">Guess</span>
                <span className="badge-line-2">the flag!</span>
            </div>
        </div>
    );
}

export default FlagGame;
