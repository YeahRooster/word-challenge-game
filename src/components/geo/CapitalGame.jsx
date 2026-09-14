import React from 'react';
import { getFlagUrl } from '../../data/countries';

function CapitalGame({ question, onSelect, disabled }) {
    if (!question || !question.target) return null;

    const { target, options } = question;

    return (
        <div className="geo-gameplay-area capital-game-layout">
            {/* Pastilla central con la bandera y el país */}
            <div className="geo-prompt-container">
                <div className="geo-country-pill capital-prompt-pill">
                    <img
                        src={getFlagUrl(target.code)}
                        alt={target.name}
                        className="geo-pill-flag-thumb"
                    />
                    <span>¿Capital de <strong>{target.name}</strong>?</span>
                </div>
            </div>

            {/* Opciones de capitales en 4 botones de colores */}
            <div className="geo-capitals-grid">
                {options.map((option, idx) => (
                    <button
                        key={idx}
                        className={`geo-color-btn btn-${option.color} capital-btn`}
                        onClick={() => onSelect(option)}
                        disabled={disabled}
                    >
                        <span className="geo-btn-text">{option.capital}</span>
                    </button>
                ))}
            </div>

            {/* Etiqueta angular inferior izquierda */}
            <div className="geo-corner-badge purple-badge">
                <span className="badge-line-1">Guess</span>
                <span className="badge-line-2">the capital!</span>
            </div>
        </div>
    );
}

export default CapitalGame;
