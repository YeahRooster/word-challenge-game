// Simulación de persistencia de datos local (puedes cambiar esto a Supabase luego)
const STORAGE_KEY = 'word_challenge_scores';

export const saveScore = (username, score) => {
    const finalName = username || "Jugador";
    const scores = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    scores.push({ username: finalName, score, date: new Date().toISOString() });
    // Ordenar por puntaje (descendente) y guardar el top 10
    const topScores = scores
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topScores));
    return topScores;
};

export const getTopScores = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

export const getCurrentUser = () => {
    return localStorage.getItem('word_challenge_user');
};

export const setCurrentUser = (username) => {
    localStorage.setItem('word_challenge_user', username);
};
