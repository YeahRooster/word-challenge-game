// Motor de juego para Geo Challenge
import { COUNTRIES } from '../data/countries';
import { COUNTRY_SILHOUETTES } from '../data/countrySilhouettes';

// Mezclar array aleatoriamente (Fisher-Yates)
export const shuffle = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

// Generar una ronda para "Guess the flag!" (6 banderas)
export const generateFlagQuestion = (excludeId = null) => {
    const available = COUNTRIES.filter(c => c.id !== excludeId);
    const target = available[Math.floor(Math.random() * available.length)];

    // Buscar distractores (preferiblemente del mismo continente si hay suficientes)
    const sameContinent = available.filter(c => c.id !== target.id && c.continent === target.continent);
    const otherContinents = available.filter(c => c.id !== target.id && c.continent !== target.continent);

    let distractors = shuffle(sameContinent).slice(0, 3);
    const needed = 5 - distractors.length;
    if (needed > 0) {
        distractors = [...distractors, ...shuffle(otherContinents).slice(0, needed)];
    }

    const options = shuffle([target, ...distractors]);

    return {
        type: 'flag',
        target,
        options // 6 países
    };
};

// Generar una ronda para "Guess the border!" (Silueta SVG + 4 botones de colores)
export const generateBorderQuestion = (excludeId = null) => {
    const availableIds = Object.keys(COUNTRY_SILHOUETTES).filter(id => id !== excludeId);
    const targetId = availableIds[Math.floor(Math.random() * availableIds.length)];
    const target = COUNTRIES.find(c => c.id === targetId);
    const silhouette = COUNTRY_SILHOUETTES[targetId];

    // 3 distractores de la lista general de países
    const availableDistractors = COUNTRIES.filter(c => c.id !== targetId);
    const sameContinent = availableDistractors.filter(c => c.continent === target.continent);
    const other = availableDistractors.filter(c => c.continent !== target.continent);

    let distractors = shuffle(sameContinent).slice(0, 2);
    if (distractors.length < 3) {
        distractors = [...distractors, ...shuffle(other).slice(0, 3 - distractors.length)];
    }

    const buttonColors = ['blue', 'green', 'red', 'orange'];
    const optionsRaw = shuffle([target, ...distractors]);

    const options = optionsRaw.map((country, idx) => ({
        ...country,
        color: buttonColors[idx]
    }));

    return {
        type: 'border',
        target,
        silhouette,
        options // 4 países con color
    };
};

// Generar una ronda para "Guess the capital!" (País + 4 capitales)
export const generateCapitalQuestion = (excludeId = null) => {
    const available = COUNTRIES.filter(c => c.id !== excludeId);
    const target = available[Math.floor(Math.random() * available.length)];

    const distractors = shuffle(available.filter(c => c.id !== target.id)).slice(0, 3);
    const buttonColors = ['blue', 'green', 'red', 'orange'];

    const optionsRaw = shuffle([
        { capital: target.capital, isCorrect: true, countryName: target.name },
        ...distractors.map(d => ({ capital: d.capital, isCorrect: false, countryName: d.name }))
    ]);

    const options = optionsRaw.map((opt, idx) => ({
        ...opt,
        color: buttonColors[idx]
    }));

    return {
        type: 'capital',
        target,
        options
    };
};

// Amigos simulados para el ranking lateral estilo Playfish
export const DEFAULT_FRIENDS_LEADERBOARD = [
    { name: "Milena", score: 7610, avatar: "👩‍👦", color: "#f39c12" },
    { name: "Mihajlo", score: 6200, avatar: "👴", color: "#27ae60" },
    { name: "Nemanja", score: 4850, avatar: "🧑", color: "#2980b9" },
    { name: "Stefan", score: 3200, avatar: "👦", color: "#8e44ad" },
    { name: "Elena", score: 1800, avatar: "👧", color: "#e74c3c" }
];
