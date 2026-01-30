const fs = require('fs');
const path = require('path');

const dictPath = path.join(__dirname, 'src', 'assets', 'dictionary.json');
const dictionary = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

const cleanDict = {
    "3": [],
    "4": [],
    "5": [],
    "6": []
};

// Re-categorizar todo correctamente
Object.keys(dictionary).forEach(key => {
    dictionary[key].forEach(word => {
        const trimmed = word.trim().toUpperCase();
        const len = trimmed.length;
        if (len >= 3 && len <= 6) {
            if (!cleanDict[len].includes(trimmed)) {
                cleanDict[len].push(trimmed);
            }
        }
    });
});

fs.writeFileSync(dictPath, JSON.stringify(cleanDict, null, 2));
console.log('Diccionario saneado correctamente.');
console.log('Conteos finales:');
Object.keys(cleanDict).forEach(k => console.log(`${k}: ${cleanDict[k].length}`));
