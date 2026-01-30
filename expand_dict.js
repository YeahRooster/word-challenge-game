const fs = require('fs');
const path = require('path');

const dictPath = path.join(__dirname, 'src', 'assets', 'dictionary.json');
const dictionary = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

const extra3 = ["ACA", "ALI", "ALL", "APO", "ARA", "ASI", "ATA", "AVE", "CAI", "CAN", "CEA", "CHE", "COI", "CON", "COR", "COZ", "DAD", "DAN", "DAR", "DAS", "DEL", "DEN", "DES", "DEY", "DIA", "DIE", "DIO", "DOY", "DUX", "EFE", "EGO", "EJE", "ELI", "ENE", "ERA", "ERE", "ERO", "ESA", "ESE", "ESO", "ETA", "EVA", "FAX", "FEA", "FEO", "FER", "FEZ", "FIN", "FIO", "FIA", "FLO", "FON", "FUE", "FUI", "GAF", "GAI", "GAL", "GAS", "GAY", "GEA", "GES", "GIL", "GIN", "GOL", "GRA", "GUA", "GUI", "HAN", "HAS", "HAY", "HEZ", "HIA", "HIE", "HIO", "HOZ", "IDA", "IDO", "ION", "IRI", "ISA", "IVA", "IVO", "JAI", "JET", "JIA", "JIO", "JUA", "JUI", "KAN", "KAT", "KOP", "LAC", "LAR", "LAS", "LEA", "LEE", "LEI", "LEO", "LEY", "LIA", "LIE", "LIO", "LON", "LOS", "LUA", "LUE", "LUI", "MAL", "MAR", "MAS", "MEA", "MEE", "MEI", "MEO", "MES", "MIA", "MIE", "MIL", "MIR", "MIS", "MUY", "NIA", "NIE", "NIO", "NOA", "NON", "NOS", "OBI", "OCA", "OCI", "ODA", "OES", "OIA", "OID", "OIE", "OIS", "ORE", "ORI", "OSA", "OSE", "OVA", "OVE", "OVO", "OYA", "OYS", "PAN", "PAR", "PAZ", "PEA", "PEE", "PEI", "PEO", "PER", "PEZ", "PIA", "PIE", "PIN", "PIO", "PIS", "PLU", "POR", "POS", "PRE", "PRO", "PUF", "PUI", "PUO", "QUE", "QUI", "REA", "REE", "REI", "REO", "RES", "REY", "RIA", "RIE", "RIO", "ROA", "ROE", "ROI", "ROL", "ROM", "RON", "ROS", "RUA", "RUE", "RUI", "RUS", "SAL", "SAN", "SEA", "SED", "SEE", "SEI", "SEN", "SEO", "SER", "SES", "SET", "SIC", "SIN", "SIO", "SIR", "SIS", "SIT", "SOB", "SOI", "SON", "SOR", "SOS", "SOY", "SUA", "SUE", "SUI", "SUN", "SUR", "SUS", "TAI", "TAL", "TAN", "TAS", "TEA", "TEN", "TEO", "TER", "TES", "TIC", "TIE", "TIN", "TIO", "TOC", "TOL", "TON", "TOP", "TOR", "TOS", "TOY", "TRI", "TUA", "TUE", "TUI", "TUN", "TUO", "TUS", "UBE", "UCA", "UCI", "UFA", "UJA", "UJE", "UJO", "ULA", "ULE", "ULI", "ULO", "UMA", "UME", "UMI", "UMO", "UNA", "UNE", "UNI", "UNO", "UÑE", "UÑI", "UÑO", "URA", "URE", "URI", "URO", "USA", "USE", "USO", "UTA", "UTE", "UTI", "UTO", "UVE", "UVI", "UVO", "UYA", "UYE", "UYO", "VAL", "VAN", "VAS", "VEA", "VEE", "VEI", "VEN", "VEO", "VER", "VES", "VEZ", "VIA", "VID", "VIE", "VIO", "VIS", "VOS", "VOZ", "YAE", "YAI", "YAN", "YAP", "YAS", "YAY", "YAZ", "YEA", "YEE", "YEI", "YEN", "YEO", "YES", "YET", "YIN", "YIP", "YIS", "YIT", "YOD", "YOG", "YON", "YOR", "YOS", "YOY", "YUA", "YUB", "YUC", "YUD", "YUE", "YUF", "YUG", "YUI", "YUL", "YUM", "YUN", "YUP", "YUR", "YUS", "YUT", "ZAR", "ZEN", "ZIG", "ZIN", "ZIS", "ZOA", "ZOC", "ZOE", "ZOI", "ZOL", "ZON", "ZOO", "ZOR", "ZOS", "ZOY", "ZUA", "ZUB", "ZUC", "ZUD", "ZUE", "ZUF", "ZUG", "ZUI", "ZUL", "ZUM", "ZUN", "ZUP", "ZUR", "ZUS", "ZUT"];

const addWords = (list, target) => {
    list.forEach(w => {
        const up = w.toUpperCase();
        if (!target.includes(up)) target.push(up)
    });
};

addWords(extra3, dictionary["3"]);

fs.writeFileSync(dictPath, JSON.stringify(dictionary, null, 2));
console.log('Diccionario expandido.');
console.log('Nuevos conteos:');
Object.keys(dictionary).forEach(k => console.log(`${k}: ${dictionary[k].length}`));
