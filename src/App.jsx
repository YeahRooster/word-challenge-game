import React, { useState } from 'react';
import ArcadeHub from './components/ArcadeHub';
import GameBoard from './components/GameBoard';
import GeoChallenge from './components/geo/GeoChallenge';

function App() {
    // Estado de la vista activa: 'hub' (menú principal) | 'word' | 'geo'
    const [currentView, setCurrentView] = useState('hub');

    return (
        <div className="app-container">
            {currentView === 'hub' && (
                <ArcadeHub onSelectGame={(gameKey) => setCurrentView(gameKey)} />
            )}

            {currentView === 'word' && (
                <GameBoard onBackToHub={() => setCurrentView('hub')} />
            )}

            {currentView === 'geo' && (
                <GeoChallenge onBackToHub={() => setCurrentView('hub')} />
            )}
        </div>
    );
}

export default App;
