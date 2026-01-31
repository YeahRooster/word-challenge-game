const fs = require('fs');
const path = require('path');

const dictPath = path.join(__dirname, 'src', 'assets', 'dictionary.json');
const dictionary = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

// Lista de palabras a eliminar (truncadas o inválidas detectadas)
const wordsToRemove = [
    // Truncadas de 5 o 6
    "HEMBR", "HOMBR", "HOMER", "HEMBI", "HERAL", "HERBI", "HERID", "HERMA", "HERRA",
    "HERRO", "HERVI", "HIERB", "HORRI", "HUACH", "HUNDE", "HUNDI", "HURAC", "HURAN",
    "ICONA", "IDERO", "IGNOR", "IMPER", "IMPIO", "IMPUE", "INCID", "INCUL", "INDUL",
    "INFAN", "INFER", "INHIB", "INMOV", "INNAD", "INNAR", "INNAT", "INNOV", "INSTA",
    "INSUL", "INTEN", "INTER", "INTIM", "INTRO", "INVAD", "INVEN", "INVER", "INVIT",
    "INVOL", "IRANI", "IRID", "IRLAND", "IRONI", "IRRAD", "ISOT", "ISRAEL", "ITAL",
    "ITURB", "IZQUI", "JABAL", "JACTA", "JAUR", "JAZMI", "JEREZ", "JERGA", "JERUS",
    "JIUST", "JOCK", "JORDA", "JORGE", "JORNA", "JUBIL", "JUGOS", "JUGUE", "JUICIO",
    "JUPI", "JURAD", "JUVEN", "JUZGA", "KAISER", "LAGRA", "LAGU", "LAMB", "LAME",
    "LAMIN", "LAMP", "LANGO", "LANTA", "LAPIS", "LAPIZ", "LARGA", "LASER", "LATIN",
    "LEGAL", "LEGIO", "LENTO", "LEPRA", "LERDO", "LETAL", "LETRA", "LIBRE", "LIBRO",
    "LICE", "LICEO", "LICIA", "LICUR", "LIDIA", "LIEBR", "LIENZ", "LIMPI", "LIMPIO",
    "LINAR", "LINCE", "LINDA", "LINDO", "LINEA", "LISTA", "LISTO", "LITIO", "LITRE",
    "LIVID", "LLAMA", "LLANO", "LLAVE", "LLEGA", "LLENA", "LLENO", "LLEVA", "LLORO",
    "LOBBY", "LOGIA", "LOGRA", "LOGRO", "LOMBO", "LONGE", "LONJA", "LUCAS", "LUCHA",
    "LUCID", "LUCIO", "LUDO", "LUEGO", "LUGAR", "LUISA", "LUMBR", "LUMIN", "LUNAR",
    "LUNES", "MACIA", "MACIZ", "MACHO", "MACRE", "MACRO", "MADRE", "MAEST", "MAGIA",
    "MAGNO", "MAHOMA", "MAIZ", "MALVA", "MALLA", "MAMAR", "MAMBO", "MANAR", "MANCO",
    "MANDA", "MANGA", "MANGO", "MANIA", "MANSO", "MANTA", "MANTO", "MANZANA", "MAQUI",
    "MARCA", "MARCO", "MAREA", "MAREO", "MARGA", "MARIA", "MARID", "MARIN", "MARIO",
    "MARTE", "MARTI", "MASER", "MASTIC", "MASTRO", "MATAR", "MATER", "MATIZ", "MATON",
    "MATRI", "MAURO", "MAYOR", "MEDIA", "MEDIO", "MEDIR", "MEJOR", "MELON", "MENTE",
    "MERCA", "METAL", "METRO", "MEZCL", "MIEDO", "MILLON", "MINAR", "MINIM", "MIRAR",
    "MISIL", "MISMA", "MISMO", "MITAD", "MOJAR", "MOLDE", "MOLER", "MONTA", "MORAL",
    "MORAR", "MORD", "MORIR", "MOSCA", "MOTEL", "MOTIN", "MOTOR", "MOVER", "MOVIL",
    "MUCHO", "MUDAR", "MUEBL", "MUELA", "MUESTR", "MUJER", "MULTA", "MUNDO", "MUÑEC",
    "MUSEO", "MUSGO", "MUSIC", "MUTUO", "NACER", "NACHO", "NACION", "NADAR", "NADIE",
    "NAIPE", "NALGA", "NAPOL", "NARAN", "NARIZ", "NATAL", "NATUR", "NAUFR", "NAVAL",
    "NAZAR", "NEBAR", "NEGRI", "NEGRO", "NELSON", "NEVAD", "NEVAR", "NICHO", "NIEVE",
    "NIVEL", "NORMA", "NORTE", "NOTAR", "NOVEL", "NOVIA", "NOVIO", "NUBLA", "NUEVA",
    "NUEVO", "NUMER", "NUNCA", "ÑANDU", "OBRAR", "OBVIA", "OBVIO", "OCASO", "ODIO", "ODIAR",
    "OESTE", "OFICIO", "OJAL", "OLIVA", "OLMED", "OMISO", "OMITIR", "OPACO", "OPERA",
    "OPINA", "OPTAR", "ORBIT", "ORDEN", "OREJA", "ORFEU", "ORGAN", "ORGIA", "ORILLA",
    "ORTEG", "OSADO", "OSCAR", "OSTRA", "OVALO", "OVEJA", "OXID", "OXIDE", "OXIG",
    "PABLO", "PACER", "PACHO", "PACTO", "PADRE", "PAGAR", "PAGIN", "PAISA", "PAJAR",
    "PALCO", "PALID", "PALMA", "PALPA", "PAÑAL", "PANDA", "PANEL", "PAPEL", "PARAR",
    "PARCO", "PARDE", "PARDO", "PAREA", "PARED", "PAREJ", "PARIR", "PARRA", "PARTE",
    "PARTO", "PASAR", "PASEO", "PASTA", "PASTO", "PATIN", "PATIO", "PAUSA", "PAUTA",
    "PAVOR", "PEAJE", "PEBRE", "PECADO", "PECHO", "PEDAL", "PEDAZ", "PEDIR", "PEDRO",
    "PEGAR", "PEINE", "PELAR", "PELEA", "PELOT", "PENAL", "PENSA", "PERLA", "PERRA",
    "PERRO", "PESAR", "PESCA", "PESTE", "PETRA", "PIANO", "PICAR", "PIEDR", "PIERNA",
    "PIEZA", "PILAR", "PILLO", "PILOT", "PINTA", "PIQUE", "PIRAT", "PISAR", "PISTA",
    "PIZCA", "PIZZA", "PLACA", "PLAGA", "PLANA", "PLANO", "PLATA", "PLATO", "PLAYA",
    "PLAZA", "PLAZO", "PLEBI", "PLENO", "PLIEG", "PLUMA", "PLURA", "POBRE", "PODAR",
    "PODER", "PODIO", "POEMA", "POETA", "POKER", "POLAR", "POLVO", "PONER", "PONGA",
    "PORCO", "PORNO", "PORRA", "PORTA", "PORTE", "POSAR", "POSTE", "POTRO", "PRADO",
    "PRECI", "PRECO", "PREM", "PREND", "PRENS", "PRESA", "PRESO", "PRIMA", "PRIMO",
    "PRISA", "PROBA", "PROBI", "PROCE", "PROI", "PROL", "PROME", "PRONT", "PROPI",
    "PROSA", "PROX", "PUDOR", "PUEBL", "PUGIN", "PUJAR", "PULGA", "PULIR", "PULPA",
    "PULSO", "PUNCH", "PUNTA", "PUNTO", "PUNZ", "PURAN", "PURGA", "QUEMA", "QUESO",
    "QUIEN", "QUIER", "QUINCE", "QUINT", "QUIRI", "QUISA", "QUITO", "QUIZA", "RABIA",
    "RACHA", "RADAR", "RADIO", "RAMIO", "RAMPA", "RANGO", "RASCO", "RASGO", "RATIO",
    "RATON", "RAYAR", "RAZON", "REALE", "REBA", "RECA", "RECI", "RECL", "RECO", "RECU",
    "REDA", "REDER", "REDI", "REDO", "REDU", "REFA", "REFE", "REFR", "REGA", "REGE",
    "REGL", "REGN", "REGO", "REGR", "REHE", "REIN", "RELA", "RELE", "RELIC", "REMAN",
    "REMAR", "REMI", "REMON", "REMOV", "REND", "RENE", "RENI", "RENTA", "REPA", "REPE",
    "REPI", "REPL", "REPO", "REPR", "REPT", "REPU", "REQUI", "RESA", "RESC", "RESE",
    "RESI", "RESL", "RESO", "RESP", "REST", "RESTR", "RESU", "RETA", "RETE", "RETI",
    "RETO", "RETR", "REVA", "REVE", "REVI", "REVO", "REXA", "REYES", "REZAR", "RIBA",
    "RIFAR", "RIGOR", "RIMAR", "RINCO", "RINDE", "RIVAL", "RIZA", "ROBAR", "ROCKE",
    "RODA", "RODE", "RODI", "RODO", "ROGA", "ROMAN", "ROMER", "ROMP", "RONCO", "RONDA",
    "RONDO", "ROSAR"
];

let removedCount = 0;
for (let len in dictionary) {
    const originalCount = dictionary[len].length;
    dictionary[len] = dictionary[len].filter(word => !wordsToRemove.includes(word));
    removedCount += (originalCount - dictionary[len].length);
}

fs.writeFileSync(dictPath, JSON.stringify(dictionary, null, 2));

console.log(`¡Saneamiento completado! Se eliminaron ${removedCount} palabras inválidas/truncadas.`);
