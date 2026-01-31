const fs = require('fs');
const path = require('path');

const dictPath = path.join(__dirname, 'src', 'assets', 'dictionary.json');
const dictionary = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

const newWords = [
    // 4 letras
    "ALMA", "ALTO", "ANTE", "ARCO", "ARTE", "ASCO", "ASIR", "ASTO", "AULA", "AYER",
    "BATE", "BESO", "BIEN", "BOCA", "BOLA", "BOTA", "BOYA", "BUEN", "CABO", "CAER",
    "CAJA", "CAMA", "CAÑA", "CAPA", "CARA", "CASA", "CASO", "CENA", "CERO", "CITA",
    "COCO", "COLA", "COMA", "COMO", "COPA", "CORA", "COSA", "COTA", "CREA", "CUBA",
    "CUNA", "DADO", "DAMA", "DATO", "DEBA", "DEDO", "DICE", "DIEZ", "DIOS", "DOTE",
    "DUDA", "DURO", "ECHE", "EDAD", "ELLA", "ELLO", "ERES", "ESTA", "ESTE", "FASE",
    "FECO", "FOTO", "FRIO", "GAFA", "GANA", "GATO", "GIRA", "GOZO", "GUIA", "HACE",
    "HADO", "HAYA", "HIGO", "HIJO", "HILO", "HITO", "HOJA", "HORA", "HOYI", "HUIR",
    "HUMO", "IDAS", "IDEA", "IRSE", "ISLA", "ITEM", "IZAR", "JARA", "JEFE", "JOYA",
    "JUAN", "JUEZ", "JUGO", "LADO", "LAGO", "LAMA", "LAZO", "LEER", "LEMA", "LIGA",
    "LIMA", "LIRA", "LOCO", "LONA", "LORO", "LOTE", "LOZA", "LUJO", "LUNA", "MAIZ",
    "MALO", "MANO", "MAPA", "MARE", "MASA", "MAYA", "MAYO", "MAZO", "MESA", "META",
    "MIEL", "MINA", "MIRA", "MISA", "MODO", "MOFA", "MOLE", "MONO", "MORA", "MURO",
    "NACE", "NADA", "NATO", "NAVE", "NENE", "NETO", "NIDO", "NIÑA", "NIÑO", "NODO",
    "NOTA", "NOVE", "NUBE", "NUCA", "NUDE", "NUEZ", "OBRA", "OCIO", "ODIO", "OIDO",
    "OIGA", "OIRE", "OJER", "OJOS", "OLER", "OLLA", "ONDA", "ONZA", "ORAR", "ORBE",
    "ORCO", "OROR", "OTRO", "OVAL", "OVNI", "PAGO", "PAIS", "PALO", "PAPA", "PARA",
    "PARO", "PASA", "PASE", "PASO", "PATA", "PAVO", "PEÑA", "PELO", "PENA", "PERO",
    "PESA", "PESO", "PICA", "PICO", "PIER", "PILA", "PINA", "PINO", "PIÑA", "PIPA",
    "PISO", "PITO", "PLAN", "PLUS", "POCA", "POCO", "PODA", "POLO", "POMA", "POMO",
    "PONE", "POSA", "POSE", "POZO", "PULS", "PUÑO", "PURO", "QUER", "RABO", "RACE",
    "RAFA", "RAIZ", "RAMA", "RAMO", "RANA", "RARO", "RATA", "RAYA", "RAYO", "RAZA",
    "REAL", "REFE", "REIR", "RELO", "REMO", "RENO", "RETO", "RICO", "RIFA", "RIMA",
    "RISA", "RITO", "ROBA", "ROBO", "ROCA", "ROCE", "ROCO", "ROJO", "ROLO", "ROMA",
    "ROPA", "ROSA", "ROTO", "RUDA", "RUDO", "RUEA", "RUIN", "RULA", "RULO", "RUTA",
    "SABE", "SACO", "SALA", "SALO", "SAPO", "SASE", "SECA", "SECO", "SEDA", "SEDE",
    "SELLO", "SENO", "SERA", "SERI", "SETA", "SIDA", "SIGA", "SILLA", "SIMA", "SINO",
    "SISA", "SITO", "SOBA", "SOFE", "SOLO", "SOPA", "SUDA", "SUYO", "TABA", "TACO",
    "TAJO", "TALA", "TALO", "TAPA", "TASA", "TAZA", "TELA", "TEMA", "TENE", "TIPO",
    "TIRA", "TITO", "TOCA", "TODO", "TOMA", "TONO", "TOPE", "TORO", "TORT", "TREN",
    "TRIO", "TUBO", "TUYO", "VACA", "VAGO", "VALE", "VALO", "VANA", "VANO", "VARA",
    "VASO", "VATE", "VAYA", "VEER", "VELA", "VELO", "VENA", "VERA", "VICE", "VIDA",
    "VILA", "VINO", "VISA", "VIVO", "VOLA", "VOTO", "YATE", "YESO", "YODO", "YUGO",
    "ZONA", "ZUMO",

    // 5 letras
    "ABAJO", "ABEJA", "ABETO", "ABRIL", "ACERO", "ACOSO", "ACTOR", "ADEYA", "ADIOS", "ADOBE",
    "ADULTO", "AEREO", "AFECT", "AFRON", "AGATA", "AGIL", "AGORA", "AGOTO", "AGUAS", "AGUDO",
    "AGUILA", "AHORA", "AIREO", "AJENO", "ALAMO", "ALBAR", "ALBUM", "ALDEA", "ALEJO", "ALETA",
    "ALGAS", "ALGO", "ALIAS", "ALMAS", "ALTAR", "ALTO", "AMADO", "AMARU", "AMBAR", "AMBIT",
    "AMENO", "AMIGA", "AMIGO", "ANCHO", "ANDAR", "ANEJO", "ANGEL", "ANIMO", "ANCHO", "ANUAL",
    "APODO", "APOYO", "APTOS", "ARABE", "ARBOL", "ARCO", "ARENA", "ARIDO", "ARMAR", "AROMA",
    "ARPA", "ARROZ", "ASADO", "ASCO", "ASEO", "ASILO", "ASNO", "ASTRO", "ATADO", "ATICO",
    "ATLAS", "ATRAZ", "ATROZ", "AUDIO", "AULAS", "AUTOR", "AVARO", "AVENA", "AVION", "AVISO",
    "AYUDA", "AYUDA", "AZUL", "BAHIA", "BAILE", "BAJAR", "BALA", "BALDE", "BALSA", "BANCO",
    "BANDA", "BAÑO", "BARBA", "BARCO", "BARRA", "BARRO", "BASE", "BASTA", "BATIR", "BEBER",
    "BELLO", "BESO", "BICHO", "BIEN", "BINGO", "BLOC", "BOBA", "BOBO", "BOCA", "BODA",
    "BOLSA", "BOMBA", "BONO", "BORDA", "BORDE", "BOTAR", "BOTIN", "BRAVO", "BRAZO", "BREVE",
    "BRISA", "BROMA", "BRUTO", "BUENO", "BUEY", "BUQUE", "BURLA", "BURRO", "BUSCA", "CABAL",
    "CABER", "CABRA", "CACAO", "CACHO", "CADER", "CADIZ", "CAER", "CAIDA", "CAJON", "CALDO",
    "CALLE", "CALMA", "CALOR", "CALVO", "CAMA", "CAMPO", "CANAL", "CANOA", "CANTO", "CAÑA",
    "CAPA", "CAPAZ", "CARA", "CARGA", "CARGO", "CARNE", "CARPA", "CARTA", "CASAR", "CASCO",
    "CASI", "CASO", "CASTA", "CAUCE", "CAUSA", "CAVAR", "CAZAR", "CEBRA", "CEDRO", "CEGAR",
    "CELDA", "CELEB", "CELO", "CENA", "CENIT", "CENSO", "CERCA", "CERDO", "CERRO", "CESAR",
    "CESTA", "CHICO", "CHILE", "CHINA", "CHINO", "CHIS", "CHOCO", "CHOZA", "CIDRA", "CIEGO",
    "CIELO", "CIENO", "CIERTO", "CIFRA", "CIMA", "CINCO", "CINTA", "CIRCO", "CISNE", "CITA",
    "CITAR", "CIVIL", "CLAN", "CLARA", "CLARO", "CLASE", "CLAVA", "CLAVE", "CLAVO", "CLIMA",
    "COBRA", "COBRE", "COCHE", "COCO", "CODO", "COFIA", "COGER", "COJO", "COLA", "COLAR",
    "COLECT", "COLMO", "COLOR", "COMA", "COMER", "COMIC", "COMOD", "COMUN", "CONDE", "CONGA",
    "CONO", "COOR", "COPA", "COPIA", "CORAL", "CORDA", "CORO", "CORRE", "CORSO", "CORTE",
    "CORTO", "COSA", "COSER", "COSTA", "COSTE", "COTA", "COY", "CREAR", "CREDO", "CREMA",
    "CRIA", "CRIB", "CRIM", "CRIN", "CRIS", "CRUZ", "CUADR", "CUAN", "CUAR", "CUATE",
    "CUBA", "CUBO", "CUECA", "CUELL", "CUEN", "CUER", "CUES", "CUEV", "CUID", "CUJO",
    "CULPA", "CULTE", "CUNA", "CUÑA", "CUOTA", "CURA", "CURIO", "CURS", "CURV", "CUYO",
    "DADO", "DAGA", "DALIA", "DAMA", "DANZA", "DAÑAR", "DARDO", "DATO", "DEBER", "DEBIL",
    "DEDO", "DEJAR", "DELFO", "DELTA", "DEMAS", "DENSO", "DENTE", "DEPOR", "DERRA", "DESDE",
    "DESEO", "DEUDA", "DICHA", "DICHO", "DIEGO", "DIETA", "DIEZ", "DIGNO", "DILU", "DINAR",
    "DIOS", "DISCO", "DODE", "DOGMA", "DOLOR", "DONAR", "DONDE", "DORAL", "DORMI", "DORSO",
    "DOSIS", "DOTE", "DRAGA", "DRAMA", "DROGA", "DUCHA", "DUDA", "DUELO", "DUEÑO", "DULCE",
    "DUNNA", "DUO", "DUQUE", "DURAR", "DURO", "EBANO", "ECHAR", "EDAD", "EDICT", "EDIPO",
    "EFECT", "EGEO", "EJE", "EJERC", "ELITE", "ELLA", "ELLO", "ELMO", "ELOY", "EMAN",
    "EMIR", "ENANO", "ENCUE", "ENERO", "ENOJO", "ENTRE", "ENVIO", "EPICA", "EPOCA", "EQUIP",
    "ERIZO", "ERROR", "ESCRI", "ESCU", "ESMU", "ESPA", "ESPE", "ESPU", "ESQU", "ESTA",
    "ESTE", "ESTI", "ESTO", "ESTRA", "ETAPA", "ETICA", "ETNIA", "ETRA", "EURO", "EVADE",
    "EVAN", "EVITA", "EVOCA", "EXACT", "EXAME", "EXCEL", "EXITO", "EXPED", "EXPO", "EXTRA",
    "FABIO", "FACHA", "FACIL", "FAENA", "FAJA", "FALDA", "FALLA", "FALSO", "FALTA", "FAMA",
    "FANG", "FARO", "FARS", "FASE", "FATAL", "FAUNA", "FAVOR", "FECHA", "FELIZ", "FEMUR",
    "FENIX", "FERIA", "FEROZ", "FEUDO", "FIBRA", "FICHA", "FIEL", "FIERA", "FIEST", "FIGU",
    "FIJAR", "FILA", "FILIAL", "FILM", "FILO", "FINAL", "FINCA", "FINO", "FIRMA", "FISCO",
    "FISIC", "FLACO", "FLAMA", "FLAN", "FLECH", "FLETE", "FLOJO", "FLOR", "FLOTA", "FLUID",
    "FLUIR", "FLUJO", "FLUOR", "FOBIA", "FOCO", "FOLIO", "FONDO", "FORMA", "FORRO", "FORTE",
    "FOSIL", "FOSO", "FOTO", "FRANC", "FRASE", "FRECU", "FRENA", "FRENO", "FRESA", "FRIO",
    "FRITO", "FROND", "FRONT", "FRUTA", "FRUTO", "FUEGO", "FUERA", "FUERTE", "FUGA", "FUGAZ",
    "FUMAR", "FUNDA", "FUNDO", "FURIA", "FUSIL", "FUSTE", "FUTUR", "GABAN", "GAFA", "GAITA",
    "GALA", "GALAN", "GALEA", "GALER", "GALES", "GALLO", "GANA", "GANAR", "GANGA", "GANSO",
    "GARAY", "GARRA", "GARZA", "GAS", "GASTO", "GATA", "GATILL", "GATO", "GEMA", "GEN",
    "GENTE", "GESTA", "GIGANT", "GIMNA", "GIRA", "GIRAR", "GLOBO", "GLORIA", "GLOSA", "GODO",
    "GOLE", "GOLFA", "GOLFO", "GOLPE", "GOMA", "GORRA", "GORRO", "GOZAR", "GRABA", "GRACIA",
    "GRADO", "GRAFO", "GRAMA", "GRAN", "GRANA", "GRANDE", "GRANO", "GRAPA", "GRASA", "GRATIS",
    "GRATO", "GRAVE", "GRECO", "GREDA", "GRIEGO", "GRIFO", "GRILL", "GRIS", "GRITA", "GRITO",
    "GROSO", "GRUPO", "GRUTA", "GUAPA", "GUAPO", "GUAR", "GUATE", "GUERRA", "GUIA", "GUIAR",
    "GUIÑO", "GUION", "GUIS", "GUITAR", "GUSTA", "GUSTO", "HABER", "HABIL", "HABLA", "HACE",
    "HACER", "HACHA", "HACIA", "HADA", "HADR", "HALA", "HALLA", "HAMAC", "HAMBR", "HARIN",
    "HARPA", "HARTA", "HARTO", "HASTA", "HAYA", "HAZA", "HAZAÑA", "HEBRA", "HECHO", "HEDO",
    "HELAR", "HELIO", "HEMBI", "HEMBR", "HENAR", "HENO", "HERAL", "HERBI", "HERIDA", "HERID",
    "HERIR", "HERMA", "HEROE", "HERRA", "HERRO", "HERVI", "HICE", "HIELO", "HIERB", "HIERRO",
    "HIGA", "HIGAR", "HIGER", "HIGO", "HIJA", "HIJO", "HILAR", "HILDA", "HILO", "HIMNO",
    "HINCH", "HINDI", "HINDU", "HIPER", "HIPOD", "HIPOT", "HIRAR", "HISPA", "HITO", "HIZO",
    "HOGAR", "HOJA", "HOJEA", "HOLA", "HOLGA", "HOLLA", "HOLLIN", "HOMBR", "HOMER", "HONDA",
    "HONDO", "HONOR", "HONRA", "HORA", "HORCA", "HORDA", "HORMA", "HORNO", "HORRI", "HOSCO",
    "HOTEL", "HOY", "HOYA", "HOYO", "HUACH", "HUANO", "HUCHA", "HUECO", "HUELA", "HUELO",
    "HUERA", "HUERO", "HUESA", "HUESO", "HUEVO", "HUEYA", "HUHU", "HUIDA", "HUIR", "HUMAN",
    "HUMED", "HUMER", "HUMOR", "HUMUS", "HUNDE", "HUNDI", "HURA", "HURAC", "HURAN", "HURGO",
    "HURRA", "HURT", "HUSO", "HUY", "HUYA", "IBER", "ICONA", "IDAS", "IDEA", "IDEAL",
    "IDERO", "IGLE", "IGNOR", "IGUAL", "II", "ILESO", "IMAGEN", "IMAN", "IMITA", "IMPER",
    "IMPIO", "IMPUE", "INCA", "INCID", "INCUL", "INDIA", "INDIO", "INDUL", "INFAN", "INFER",
    "INGLE", "INHIB", "INMOV", "INNAD", "INNAR", "INNAT", "INNOV", "INSTA", "INSUL", "INTEN",
    "INTER", "INTIM", "INTRO", "INVAD", "INVEN", "INVER", "INVIT", "INVOL", "IRANI", "IRAK",
    "IRIA", "IRID", "IRIS", "IRLAND", "IRMA", "IRONI", "IRRAD", "IRSE", "ISAAC", "ISABEL",
    "ISLA", "ISLAY", "ISLEÑ", "ISOT", "ISRAEL", "ITAL", "ITEM", "ITURB", "IVAN", "IVONE",
    "IZAR", "IZQUI", "JABAL", "JABON", "JACAL", "JACTA", "JADE", "JADEA", "JAEN", "JAULA",
    "JAUR", "JAZMI", "JEFE", "JEREZ", "JERGA", "JERUS", "JESUS", "JIRA", "JIUST", "JOB",
    "JOCK", "JONAS", "JOP", "JORDA", "JORGE", "JORNA", "JOSE", "JOVEN", "JOYA", "JUAN",
    "JUANA", "JUAR", "JUBIL", "JUDAS", "JUDIA", "JUDIO", "JUEZ", "JUGA", "JUGAR", "JUGO",
    "JUGOS", "JUGUE", "JUICIO", "JULIA", "JULIO", "JUNIO", "JUNTA", "JUNTO", "JUPI", "JURAD",
    "JURAR", "JUSTA", "JUSTO", "JUVEN", "JUZGA", "KAISER", "KILO", "KILOS", "LADO", "LADRA",
    "LADRO", "LADY", "LAGO", "LAGRA", "LAGU", "LAICO", "LAIN", "LAMA", "LAMB", "LAME",
    "LAMER", "LAMIA", "LAMIN", "LAMP", "LANAR", "LANCE", "LANCHA", "LANGO", "LANTA", "LANZA",
    "LAPIS", "LAPIZ", "LAPSO", "LARA", "LARGA", "LARGO", "LARVA", "LASER", "LATIN", "LATIR",
    "LAVAR", "LAZO", "LEAL", "LECHE", "LECHO", "LEER", "LEGAL", "LEGIO", "LEJOS", "LEMA",
    "LENTO", "LEON", "LEONA", "LEPRA", "LERDO", "LETAL", "LETRA", "LEVAR", "LEVE", "LIA",
    "LIANA", "LIBRE", "LIBRO", "LICE", "LICEO", "LICIA", "LICUR", "LIDIA", "LIEBR", "LIENZ",
    "LIGA", "LIGAR", "LIJAR", "LILA", "LIMA", "LIMAR", "LIMBO", "LIMPI", "LIMPIO", "LINAR",
    "LINCE", "LINDA", "LINDO", "LINEA", "LINO", "LIO", "LIRA", "LIRIO", "LISO", "LISTA",
    "LISTO", "LITIO", "LITRE", "LIVID", "LLAMA", "LLANO", "LLAVE", "LLEGA", "LLENA", "LLENO",
    "LLEVA", "LLORO", "LOBBY", "LOCO", "LODO", "LOGIA", "LOGRA", "LOGRO", "LOMBO", "LOMO",
    "LONA", "LONGE", "LONJA", "LORO", "LOTE", "LOZA", "LUCAS", "LUCHA", "LUCID", "LUCIO",
    "LUDIR", "LUEGO", "LUGAR", "LUIS", "LUISA", "LUJO", "LULO", "LUMBR", "LUMIN", "LUNA",
    "LUNAR", "LUNES", "LUZ", "MACIA", "MACIZ", "MACHO", "MACRE", "MACRO", "MADRE", "MAEST",
    "MAGIA", "MAGNO", "MAGO", "MAHOMA", "MAIZ", "MAJO", "MAL", "MALVA", "MALLA", "MALO",
    "MALVA", "MAMAR", "MAMBO", "MANA", "MANAR", "MANCO", "MANDA", "MANE", "MANGA", "MANGO",
    "MANIA", "MANO", "MANSO", "MANTA", "MANTO", "MANZANA", "MAPA", "MAQUI", "MAR", "MARCA",
    "MARCO", "MAREA", "MAREO", "MARGA", "MARIA", "MARID", "MARIN", "MARIO", "MART", "MARTE",
    "MARZO", "MASA", "MASER", "MASTIC", "MASTRO", "MATAR", "MATE", "MATER", "MATIZ", "MATON",
    "MATRI", "MAURO", "MAYA", "MAYOR", "MAYO", "MAZO", "MEDIA", "MEDIO", "MEDIR", "MEJOR",
    "MELON", "MENTE", "MERCA", "MES", "MESA", "META", "METAL", "METRO", "MEZCL", "MIEDO",
    "MIEL", "MILA", "MILLON", "MINA", "MINAR", "MINIM", "MIO", "MIRA", "MIRAR", "MISA",
    "MISIL", "MISMA", "MISMO", "MITAD", "MITO", "MIX", "MODA", "MODO", "MOFA", "MOJAR",
    "MOLDE", "MOLE", "MOLER", "MONO", "MONTA", "MORAL", "MORAR", "MORD", "MORIR", "MORO",
    "MOSCA", "MOTEL", "MOTIN", "MOTOR", "MOVER", "MOVIL", "MOZO", "MUCH", "MUCHO", "MUDA",
    "MUDAR", "MUEBL", "MUELA", "MUER", "MUERD", "MUESTR", "MUJER", "MULTA", "MUNDO", "MUÑEC",
    "MURO", "MUSEO", "MUSGO", "MUSIC", "MUTUO", "NACER", "NACHO", "NACION", "NADA", "NADAR",
    "NADIE", "NAIPE", "NALGA", "NANA", "NAPOL", "NARAN", "NARIZ", "NATAL", "NATUR", "NAUFR",
    "NAVAL", "NAVE", "NAZAR", "NEBAR", "NEGRI", "NEGRO", "NELSON", "NENA", "NENE", "NERON",
    "NETO", "NEVAD", "NEVAR", "NEXO", "NICHO", "NIDO", "NIEVE", "NILO", "NIÑA", "NIÑO",
    "NIVEL", "NODO", "NOEL", "NOMA", "NORMA", "NORTE", "NOTA", "NOTAR", "NOTI", "NOVA",
    "NOVEL", "NOVIA", "NOVIO", "NUBE", "NUBLA", "NUCA", "NUDO", "NUEZ", "NUEVA", "NUEVO",
    "NULA", "NULO", "NUMER", "NUNCA", "ÑANDU", "ÑU", "OBRA", "OBRAR", "OBVIA", "OBVIO",
    "OCASO", "OCHO", "OCIO", "ODIO", "ODIAR", "OESTE", "OFICIO", "OIR", "OJAL", "OJER",
    "OJO", "OLA", "OLER", "OLIVA", "OLMED", "OLMO", "OLOR", "OLLA", "OMAR", "OMISO",
    "OMITIR", "ONCE", "ONDA", "ONZA", "OPACO", "OPERA", "OPINA", "OPIO", "OPTAR", "ORAR",
    "ORBE", "ORBIT", "ORDEN", "OREJA", "ORFEU", "ORGAN", "ORGIA", "ORILLA", "ORO", "OROR",
    "ORTEG", "OSADO", "OSCAR", "OSO", "OSTRA", "OTRO", "OVAL", "OVALO", "OVEJA", "OVNI",
    "OXID", "OXIDE", "OXIG", "PABLO", "PACER", "PACHO", "PACTO", "PADRE", "PAGAR", "PAGIN",
    "PAGO", "PAIS", "PAISA", "PAJA", "PAJAR", "PALCO", "PALID", "PALMA", "PALO", "PALPA",
    "PAN", "PAÑAL", "PANDA", "PANEL", "PAPA", "PAPEL", "PAR", "PARAR", "PARCO", "PARDE",
    "PARDO", "PARE", "PAREA", "PARED", "PAREJ", "PARIR", "PARO", "PARRA", "PARTE", "PARTO",
    "PASAR", "PASE", "PASEO", "PASO", "PASTA", "PASTO", "PATA", "PATIN", "PATIO", "PAUSA",
    "PAUTA", "PAVO", "PAVOR", "PAZ", "PEAJE", "PEBRE", "PECADO", "PECHO", "PEDAL", "PEDAZ",
    "PEDIR", "PEDRO", "PEGAR", "PEINE", "PELAR", "PELEA", "PELO", "PELOT", "PENA", "PENAL",
    "PENSA", "PEÑA", "PEON", "PERA", "PERLA", "PERO", "PERRA", "PERRO", "PESA", "PESAR",
    "PESCA", "PESO", "PESTE", "PETRA", "PEZ", "PIANO", "PICAR", "PICO", "PIE", "PIEDR",
    "PIEL", "PIERNA", "PIEZA", "PILAR", "PILLO", "PILOT", "PINA", "PINO", "PINTA", "PIÑA",
    "PIPA", "PIQUE", "PIRAT", "PISAR", "PISO", "PISTA", "PITO", "PIZCA", "PIZZA", "PLACA",
    "PLAGA", "PLAN", "PLANA", "PLANO", "PLATA", "PLATO", "PLAYA", "PLAZA", "PLAZO", "PLEBI",
    "PLENO", "PLIEG", "PLUMA", "PLURA", "POBRE", "POCA", "POCO", "PODAR", "PODER", "PODIO",
    "POEMA", "POETA", "POKER", "POLAR", "POLE", "POLO", "POLVO", "POMO", "PONER", "PONGA",
    "POP", "PORCO", "PORNO", "PORRA", "PORTA", "PORTE", "POSA", "POSAR", "POSE", "POSTE",
    "POTRO", "POZO", "PRADO", "PRECI", "PRECO", "PREM", "PREND", "PRENS", "PRESA", "PRESO",
    "PRIMA", "PRIMO", "PRISA", "PROBA", "PROBI", "PROCE", "PROI", "PROL", "PROME", "PRONT",
    "PROPI", "PROSA", "PROX", "PUB", "PUDOR", "PUEBL", "PUGIN", "PUJA", "PUJAR", "PULGA",
    "PULIR", "PULO", "PULPA", "PULSO", "PUMA", "PUNCH", "PUÑO", "PUNTA", "PUNTO", "PUNZ",
    "PURAN", "PURGA", "PURO", "QUED", "QUEMA", "QUER", "QUESO", "QUIEN", "QUIER", "QUIM",
    "QUIN", "QUINCE", "QUINT", "QUIRI", "QUISA", "QUITO", "QUIZA", "RABIA", "RABO", "RACE",
    "RACHA", "RADAR", "RADIO", "RAFA", "RAIZ", "RAMA", "RAMIO", "RAMO", "RAMPA", "RANA",
    "RANGO", "RARO", "RASCO", "RASGO", "RASO", "RATA", "RATIO", "RATON", "RAYA", "RAYAR",
    "RAYO", "RAZA", "RAZON", "REAL", "REALE", "REBA", "RECA", "RECI", "RECL", "RECO",
    "RECU", "REDA", "REDER", "REDI", "REDO", "REDU", "REFA", "REFE", "REFR", "REGA",
    "REGE", "REGL", "REGN", "REGO", "REGR", "REHE", "REI", "REIN", "REIR", "REJA",
    "RELA", "RELE", "RELIC", "RELO", "RELOJ", "REMA", "REMAN", "REMAR", "REME", "REMI",
    "REMO", "REMON", "REMOV", "REN", "RENA", "REND", "RENE", "RENI", "RENO", "RENTA",
    "REÑI", "REPA", "REPE", "REPI", "REPL", "REPO", "REPR", "REPT", "REPU", "REQUI",
    "RESA", "RESC", "RESE", "RESI", "RESL", "RESO", "RESP", "REST", "RESTR", "RESU",
    "RETA", "RETE", "RETI", "RETO", "RETOÑO", "RETR", "REU", "REVA", "REVE", "REVI",
    "REVO", "REXA", "REYES", "REZA", "REZAR", "REZO", "RIA", "RIBA", "RICA", "RICO",
    "RIEL", "RIFA", "RIFAR", "RIGOR", "RIJA", "RIMA", "RIMAR", "RINCO", "RINDE", "RIÑA",
    "RIO", "RISA", "RITO", "RIVAL", "RIZA", "ROBA", "ROBAR", "ROBO", "ROCA", "ROCE",
    "ROCKE", "ROCO", "RODA", "RODE", "RODI", "RODO", "ROER", "ROGA", "ROJA", "ROJO",
    "ROLO", "ROMA", "ROMAN", "ROMER", "ROMP", "RON", "RONCO", "RONDA", "RONDO", "ROPA",
    "ROSA", "ROSA", "ROSAR", "ROSCA"
];

// Limpiar y añadir palabras nuevas (mayúsculas y sin acentos)
function normalize(word) {
    return word.toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Z]/g, "")
        .trim();
}

const uniqueWords = new Set();
newWords.forEach(w => {
    const norm = normalize(w);
    if (norm.length >= 3 && norm.length <= 6) {
        uniqueWords.add(norm);
    }
});

let addedCount = 0;
uniqueWords.forEach(word => {
    const len = word.length;
    if (!dictionary[len].includes(word)) {
        dictionary[len].push(word);
        addedCount++;
    }
});

// Ordenar alfabéticamente cada categoría
for (let len in dictionary) {
    dictionary[len].sort();
}

fs.writeFileSync(dictPath, JSON.stringify(dictionary, null, 2));

console.log(`¡Expansión v4 completada! Se añadieron ${addedCount} palabras nuevas.`);
console.log(`Total de palabras ahora:`);
for (let len in dictionary) {
    console.log(`${len} letras: ${dictionary[len].length}`);
}
