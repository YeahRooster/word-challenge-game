const fs = require('fs');
const path = require('path');

const dictPath = path.join(__dirname, 'src', 'assets', 'dictionary.json');
const dictionary = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

const wordsToAdd = ["REOS", "TERO", "TEROS", "REA", "ARE", "ARES"];

let addedCount = 0;
wordsToAdd.forEach(w => {
    const len = w.length;
    if (dictionary[len] && !dictionary[len].includes(w)) {
        dictionary[len].push(w);
        addedCount++;
    }
});

// Ordenar alfabéticamente cada categoría
for (let len in dictionary) {
    dictionary[len].sort();
}

fs.writeFileSync(dictPath, JSON.stringify(dictionary, null, 2));

console.log(`¡Actualización v6 completada! Se añadieron ${addedCount} palabras.`);
console.log(`Palabras solicitadas: ${wordsToAdd.join(", ")}`);
