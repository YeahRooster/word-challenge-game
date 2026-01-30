import React from 'react';
import './Leaderboard.css';

function Leaderboard({ scores }) {
    return (
        <div className="pf-leaderboard">
            <h3>🏆 TOP 10 RÁNKING</h3>
            <div className="pf-scores-list">
                {scores.length === 0 ? (
                    <p className="no-scores">¡Sé el primero en jugar!</p>
                ) : (
                    scores.map((s, idx) => (
                        <div key={idx} className="pf-score-item">
                            <span className="pf-rank">{idx + 1}.</span>
                            <span className="pf-player">{s.username}</span>
                            <span className="pf-pts">{s.score} pts</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Leaderboard;
