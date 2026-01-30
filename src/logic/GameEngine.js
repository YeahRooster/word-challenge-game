export const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const generateGameLetters = (dictionary) => {
    const words6 = dictionary["6"].filter(w => w.length === 6);
    
    // Intentar hasta 15 veces encontrar una palabra con muchas sub-opciones
    for (let tryIdx = 0; tryIdx < 15; tryIdx++) {
        const baseWord = words6[Math.floor(Math.random() * words6.length)];
        const letters = baseWord.split("").map(l => l.toUpperCase());
        const possible = findPossibleWords(letters, dictionary);
        
        const totalPossible = possible[3].length + possible[4].length + possible[5].length + possible[6].length;
        
        // Buscamos una partida con al menos 12 palabras posibles (era 6)
        if (totalPossible >= 12 || tryIdx === 14) {
            return shuffleArray(letters);
        }
    }
    
    // Fallback por si acaso
    return shuffleArray("PRUEBA".split("").map(l => l.toUpperCase()));
};

export const findPossibleWords = (letters, dictionary) => {
    const result = {
        3: [],
        4: [],
        5: [],
        6: []
    };

    const letterCount = {};
    letters.forEach(l => {
        letterCount[l] = (letterCount[l] || 0) + 1;
    });

    const isPossible = (word) => {
        const wordUpper = word.toUpperCase();
        const tempCount = { ...letterCount };
        for (const char of wordUpper) {
            if (!tempCount[char]) return false;
            tempCount[char]--;
        }
        return true;
    };

    Object.keys(dictionary).forEach(len => {
        const requiredLen = parseInt(len);
        dictionary[len].forEach(word => {
            if (word.length === requiredLen && isPossible(word)) {
                const upperWord = word.toUpperCase();
                // Evitar duplicados si el diccionario los tiene
                if (!result[len].includes(upperWord)) {
                    result[len].push(upperWord);
                }
            }
        });
    });

    return result;
};

export const getTimeBonus = (wordLength) => {
    if (wordLength === 3) return 2;
    if (wordLength === 4) return 3;
    if (wordLength === 5) return 6;
    if (wordLength >= 6) return 10;
    return 0;
};
