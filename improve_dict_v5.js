const fs = require('fs');
const path = require('path');

const dictPath = path.join(__dirname, 'src', 'assets', 'dictionary.json');
const dictionary = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

// 1. Lista de palabras truncadas detectadas o probables (residuos de acentos mal quitados)
const truncatedToRemove = [
    "ESQU", "AQU", "OQU", "LLAM", "SABR", "ESTA", "ESTU", "HABR", "PODR", "PONDR",
    "QUER", "TENDR", "VALDR", "VENDR", "HABR", "HICI", "DICI", "DIG", "TRAI", "VAY",
    "SEPP", "VIPP", "PUM", "PAM", "TIC", "TAC", "BOO", "BAH", "UFF", "OHH", "AHH"
];

// 2. Lista masiva de nuevas palabras válidas (v5) - Selección de 3 a 6 letras
const newWordsV5 = [
    // 3 letras
    "AVE", "ASA", "AJO", "AMO", "ARA", "ARE", "ASO", "ATE", "CAL", "CAN", "CAP", "COL", "CON", "COR", "COZ",
    "DAN", "DAR", "DAS", "DEL", "DEN", "DES", "DIA", "DIO", "DOS", "DOY", "DUO", "ECO", "EJE", "ERA", "ESE",
    "ESO", "ETA", "EVA", "FAX", "FEA", "FEO", "FEZ", "FIA", "FIN", "FIO", "FUE", "FUI", "GAS", "GAY", "GEN",
    "GIL", "GOL", "GUA", "GUI", "HAN", "HAS", "HAY", "HEZ", "HOY", "HOZ", "IDA", "IDO", "ION", "IRA", "IVA",
    "JET", "JOB", "LEY", "LIA", "LIE", "LIO", "LUZ", "MAL", "MAR", "MAS", "MES", "MIL", "MIO", "MIR", "MIS",
    "MUY", "NON", "NOS", "OCA", "ODA", "OES", "OIR", "OJO", "OLA", "ORO", "OSA", "OSE", "OSO", "PAN", "PAR",
    "PAZ", "PIE", "PIN", "PIO", "POR", "POS", "QUE", "QUI", "RED", "RES", "REY", "RIO", "ROL", "RON", "ROS",
    "SAL", "SAN", "SEA", "SED", "SEI", "SEN", "SEO", "SER", "SES", "SIN", "SOL", "SON", "SOS", "SUE", "SUR",
    "SUS", "TAL", "TAN", "TEA", "TEN", "TIA", "TIC", "TIO", "TOS", "TRAS", "TREN", "TRI", "TUA", "TUS", "UFA",
    "UNA", "UNE", "UNI", "UNO", "UVA", "VAN", "VAS", "VEA", "VEE", "VEI", "VEN", "VEO", "VER", "VES", "VIA",
    "VID", "VIO", "VIS", "VOZ", "YAF", "YAK", "YEN", "YUG", "ZAR", "ZAS", "ZEN", "ZOO",

    // 4 letras
    "ACTA", "AGIL", "AGUA", "AIRE", "ALBA", "ALGO", "ALMA", "ALTO", "AMAR", "AMEN", "AMOR", "ANTE", "AQUI",
    "ARCO", "ARDE", "AREA", "ARPA", "ARTE", "ASEO", "ASIS", "ASNO", "ASTO", "ATAR", "AUTO", "AVAL", "AVES",
    "AYER", "AZUL", "BAJA", "BAJO", "BALA", "BAÑO", "BARA", "BASE", "BATA", "BATE", "BEBE", "BEER", "BESO",
    "BIEN", "BOCA", "BODA", "BOLA", "BONO", "BOTA", "BOTE", "BOYA", "BREA", "BUEN", "BUEY", "BUHO", "BURA",
    "CABO", "CADA", "CAER", "CAFE", "CAJA", "CALA", "CAMA", "CAÑA", "CAPA", "CARA", "CASA", "CASI", "CAT̃A",
    "CAZA", "CEBO", "CELA", "CENA", "CEPA", "CERA", "CERO", "CHEF", "CIEG", "CINE", "CITA", "CLAN", "CLIP",
    "CLUB", "COCO", "CODA", "CODO", "COLA", "COMA", "COMO", "CONO", "COPA", "COSA", "COTA", "COTO", "CREA",
    "CREE", "CRIA", "CRUZ", "CUAD", "CUAN", "CUBA", "CUBO", "CUCO", "CUNA", "CUPO", "CURA", "DADO", "DAMA",
    "DAÑO", "DATO", "DEBA", "DEBE", "DEBO", "DEDO", "DEJA", "DEJO", "DIAN", "DIAS", "dice", "DIEZ", "DIJO",
    "DINA", "DIOS", "DIRA", "DIRE", "DOCE", "DODO", "DOLO", "DONA", "DORM", "DRAG", "DUDA", "DUELO", "DUER",
    "DURO", "ECHE", "EDAD", "EDIC", "EJES", "ELLA", "ELLO", "ERAS", "ERES", "ERRO", "ESAS", "ESES", "ESOS",
    "ESTA", "ESTE", "ESTO", "ETNA", "EURO", "FASE", "FEAS", "FEOs", "FIAR", "FIEL", "FIJA", "FIJO", "FILA",
    "FILM", "FINA", "FINO", "FLAN", "FLOR", "FOCO", "FOFO", "FOTO", "FRIO", "FUER", "FUGA", "FUGO", "FUMA",
    "GAFA", "GANA", "GANO", "GATO", "GEMA", "GIRO", "GOZO", "GRAN", "GRIS", "GRUA", "GUIA", "HARÁ", "HARÉ",
    "HAYA", "HAZ️", "HECO", "HOLA", "HOJA", "HORA", "HOY️", "HUYE", "IDEA", "IDAS", "IDEM", "IDOS", "IDOL",
    "IGUAL", "INCAs", "IRIS", "ISLA", "ITEM", "IVAS", "IZAR", "JAFA", "JALE", "JAMA", "JARO", "JEFE", "JERE",
    "JOYA", "JUAN", "JUEZ", "JUGO", "JUNI", "JURO", "KILO", "KING", "LADO", "LAGO", "LAMA", "LANA", "LAPIZ",
    "LARO", "LATA", "LAZO", "LEAL", "LEEN", "LEER", "LEES", "LEMA", "LEMO", "LENA", "LENT", "LEON", "LEYO",
    "LICA", "LIGA", "LIJA", "LIMA", "LIMO", "LIRA", "LISO", "LUPA", "LUSO", "LUZ️", "MART", "MASA", "MAZO",
    "MECE", "MEAS", "MEDO", "MESA", "META", "METO", "MIED", "MIEL", "MINA", "MIRA", "MIRE", "MIRO", "MISA",
    "MITO", "MODA", "MODO", "MOLA", "MOLI", "MONO", "MORA", "MORO", "MOZO", "MUDA", "MUER", "MURO", "MUSE",
    "MUY️", "NACE", "NADA", "NADE", "NADO", "NAVE", "NAZI", "NEON", "NEVA", "NEXO", "NIDO", "NIÑA", "NIÑO",
    "NOEL", "NOTA", "NOVA", "NUBE", "NUCA", "NUDO", "NUEZ", "OBRA", "OCIO", "ODIO", "OGRO", "OIDO", "OIGA",
    "OJAL", "OJOS", "OLER", "OLLA", "OLMO", "ONCE", "ONIX", "OPER", "ORAR", "ORBE", "OTRA", "OTRO", "OVAL",
    "OVEA", "OYEN", "OYER", "OYES", "PAGO", "PAIS", "PAJA", "PALA", "PALO", "PAN️", "PAPA", "PARA", "PARE",
    "PARO", "PASA", "PASE", "PASO", "PATA", "PATE", "PATO", "PAZ️", "PEA️", "PECO", "PEDO", "PEGZ", "PELO",
    "PENA", "PENE", "PERA", "PERO", "PESA", "PESO", "PICA", "PICO", "PIER", "PILA", "PINO", "PIPA", "PIRO",
    "PISA", "PISO", "PITO", "PLAN", "PLUS", "POCA", "POCO", "PODA", "POLO", "PONE", "PORO", "POSA", "POSO",
    "POZO", "PROA", "PUAJ", "PUES", "PUJA", "PULI", "PUMA", "PUÑ", "PUÑO", "PURO", "QUED", "QUER", "QUIE",
    "RAFA", "RAMA", "RAMO", "RANA", "RAPA", "RARO", "RASA", "RASO", "RATA", "RATO", "RAYA", "RAYO", "RAZA",
    "REAL", "RECI", "REDE", "REDO", "REIA", "REIR", "REIS", "REJA", "REO", "REPA", "RESA", "RETO", "REZA",
    "RICO", "RIDA", "RIES", "RIFA", "RIJO", "RIMA", "RIND", "RIO️", "RISA", "RITO", "ROBA", "ROBO", "ROCA",
    "RODA", "ROJO", "ROMA", "ROMO", "ROPA", "ROSA", "ROSO", "ROTA", "ROTO", "ROZA", "RUDA", "RUDO", "RUFI",
    "RUGA", "RUID", "RUIN", "RULO", "RUMA", "RUNA", "RUTA", "SABA", "SABE", "SABO", "SACA", "SACO", "SAGE",
    "SAGO", "SAIN", "SALA", "SALE", "SALI", "SALO", "SAN️", "SAPO", "SARA", "SEAV", "SECA", "SECO", "SEDA",
    "SEDE", "SEGA", "SEIS", "SELVA", "SENA", "SENO", "SEPA", "SERA", "SERE", "SERI", "SERO", "SERV", "SETA",
    "SEXO", "SIDA", "SIGA", "SILLA", "SINO", "SITA", "SITO", "SOBA", "SOBE", "SOBRE", "SOCA", "SOFA", "SOLA",
    "SOLO", "SONA", "SON️", "SOPA", "SOSA", "SOSO", "SOTO", "SUBA", "SUBE", "SUBI", "SUCO", "SUDA", "SUDE",
    "SUELO", "SUEÑA", "SUEÑO", "SUMA", "SUME", "SUPE", "SUPO", "SUYA", "SUYO", "TABA", "TACO", "TAJO", "TALA",
    "TALE", "TALLE", "TALLO", "TAPA", "TAPE", "TAPO", "TARA", "TARE", "TASA", "TASE", "TASO", "TATO", "TAXA",
    "TAXI", "TAZA", "TEAM", "TEAR", "TEAS", "TECA", "TECO", "TEDO", "TEJA", "TEJE", "TEJO", "TELA", "TELE",
    "TEMA", "TEME", "TEMI", "TEMO", "TENA", "TENE", "TENI", "TENO", "TENS", "TEOR", "TEPE", "TERA", "TERE",
    "TESA", "TESE", "TESO", "TET́A", "TETA", "TIAS", "TIBA", "TIBI", "TICO", "TIDO", "TIES", "TIFO", "TIGE",
    "TIJA", "TILA", "TILE", "TIMA", "TIME", "TIMO", "TIÑA", "TIÑO", "TIPA", "TIPO", "TIRA", "TIRE", "TIRO",
    "TISA", "TISE", "TISO", "TITA", "TITE", "TITO", "TIZA", "TIZE", "TIZO", "TOBA", "TOBE", "TOBO", "TOCA",
    "TOCE", "TOCO", "TODA", "TODO", "TOGA", "TOGO", "TOJO", "TOLA", "TOLE", "TOLO", "TOMA", "TOME", "TOMO",
    "TONA", "TONE", "TONO", "TOPA", "TOPE", "TOPO", "TORA", "TORO", "TORY", "TOSA", "TOSE", "TOSI", "TOSO",
    "TOTA", "TOTE", "TOTO", "TOVA", "TOZO", "TRAB", "TRAE", "TRAI", "TRAJ", "TRAN", "TRAS", "TREM", "TREN",
    "TRES", "TRIA", "TRIO", "TRIS", "TROC", "TROJ", "TRON", "TROT", "TRUA", "TRUA", "TUBA", "TUBE", "TUBO",
    "TUCO", "TUDA", "TUDO", "TUEC", "TUEC", "TUER", "TUES", "TUFA", "TUFE", "TUFO", "TUGA", "TUGE", "TUGO",
    "TUJA", "TUJE", "TUJO", "TULA", "TULE", "TULO", "TUMA", "TUME", "TUMO", "TUNA", "TUNE", "TUNO", "TUPE",
    "TUPI", "TUPO", "TURA", "TURE", "TURO", "TUSA", "TUSE", "TUSO", "TUTA", "TUTE", "TUTO", "TUYA", "TUYO",

    // 5 letras
    "ABAJO", "ABEJA", "ABETO", "ABRIL", "ACERO", "ACOSO", "ACTOR", "ADEYA", "ADIOS", "ADORA", "ADUAN", "AEREO",
    "AFUERA", "AGILA", "AGORA", "AGOTO", "AGRIO", "AGUAS", "AGUDO", "AGUJA", "AHORA", "AIRAR", "AJENO", "ALADO",
    "ALAMO", "ALBAR", "ALBUM", "ALDEA", "ALEGA", "ALEJO", "ALETA", "ALFAR", "ALGAS", "ALGUN", "ALIAR", "ALIAS",
    "ALISO", "ALIVI", "ALMAZ", "ALTAR", "ALTOs", "ALUDO", "ALUNO", "ALZAR", "AMADO", "AMAR", "AMARO", "AMBAR",
    "AMBOS", "AMEBA", "AMIGA", "AMIGO", "AMINA", "AMOR️", "AMPLI", "ANANA", "ANCHO", "ANDAR", "ANDES", "ANGEL",
    "ANIMA", "ANIMO", "AÑO️", "ANOTR", "ANSIA", "ANTES", "ANTIG", "ANTRO", "ANUAL", "AÑU️", "AÑIL", "AORTA",
    "APAGA", "APARA", "APEGO", "APENA", "APERO", "APICE", "APODO", "APOLO", "APOYO", "APRET", "APTAR", "APULO",
    "AQUEL", "ARADO", "ARAÑA", "ARBOL", "ARCOS", "ARDER", "ARDID", "ARDOR", "ARENA", "ARETE", "ARGOT", "ARIDO",
    "ARIES", "ARMAO", "ARMAR", "ARMAS", "AROMA", "ARPA️", "ARREO", "ARROZ", "ARTES", "ASADO", "ASAR️", "ASCO️",
    "ASCUA", "ASEAR", "ASEOS", "ASFIX", "ASILO", "ASIR️", "ASMA️", "ASNOS", "ASOMA", "ASPA️", "ASTRO", "ASTUR",
    "ATADO", "ATARE", "ATAR️", "ATAUD", "ATEO️", "ATICO", "ATLAS", "ATOMO", "ATRAs", "ATRIL", "ATROZ", "AUDIA",
    "AUDIO", "AUDIT", "AUGUR", "AULAS", "AUNAR", "AUREO", "AUTOR", "AUTOS", "AVARO", "AVELU", "AVENA", "AVERI",
    "AVERS", "AVIAL", "AVISO", "AVIVA", "AXIAL", "AYUDA", "AYUNO", "AZADA", "AZAR️", "AZOTE", "AZUL️", "BABEL",
    "BABOR", "BACAN", "BACHE", "BACIN", "BADAN", "BADEN", "BAGAR", "BAGRE", "BAHIA", "BAILA", "BAILE", "BAJAR",
    "BAJAs", "BAJON", "BALAS", "BALDA", "BALDE", "BALON", "BALSA", "BANCO", "BANDA", "BANDO", "BAÑAR", "BAÑOS",
    "BARBA", "BARCA", "BARCO", "BARDO", "BARIO", "BARON", "BARRA", "BARRO", "BASAL", "BASAR", "BASAS", "BASES",
    "BASTA", "BASTO", "BATER", "BATIR", "BAYAS", "BEBER", "BEBES", "BECAR", "BEDEL", "BEEPS", "BEIGE", "BELEN",
    "BELGA", "BELLA", "BELLO", "BEMOL", "BENDA", "BENI️", "BERZA", "BESAR", "BESOS", "BESTI", "BETON", "BICHA",
    "BICHO", "BIEN️", "BIGOT", "BILIS", "BINGO", "BIOMA", "BIRRA", "BISAL", "BIZCO", "BLADO", "BLAVA", "BLEDO",
    "BLINK", "BLOC️", "BLOGS", "BLUES", "BLUFF", "BLUSA", "BOA️", "BOBAL", "BOBER", "BOBIN", "BOBO️", "BOCAS",
    "BOCEL", "BOCIN", "BOCON", "BODAS", "BODER", "BOFET", "BOGAR", "BOHIO", "BOINA", "BOLAS", "BOLDO", "BOLEO",
    "BOLIN", "BOLSA", "BOLSO", "BOMBA", "BOMBO", "BONDA", "BONGO", "BONOS", "BONSA", "BORDA", "BORDE", "BORDO",
    "BORRA", "BORRE", "BOSCO", "BOSON", "BOTAR", "BOTAS", "BOTES", "BOTIN", "BOTON", "BOXER", "BOYAR", "BOYAS",
    "BOZAL", "BRACE", "BRAMA", "BRASA", "BRAVA", "BRAVO", "BRAZA", "BRAZO", "BREA️", "BREVA", "BREVE", "BREZA",
    "BREZO", "BRIAL", "BRIDA", "BRISA", "BROCA", "BROMA", "BROMO", "BRONC", "BROTA", "BROTE", "BROZA", "BRUJO",
    "BRUMA", "BRUNO", "BRUTA", "BRUTO", "BUANA", "BUBAL", "BUCAL", "BUCEO", "BUCHE", "BUCLE", "BUENA", "BUENO",
    "BUEY️", "BUFAR", "BUFON", "BUGGY", "BUHO️", "BUJIA", "BULAR", "BULBO", "BULEO", "BULLA", "BULTO", "BUÑUE",
    "BUQUE", "BURDA", "BURDO", "BUREL", "BURGA", "BURLA", "BURRA", "BURRO", "BUSCA", "BUSTO", "BUTAN", "BUZAR",
    "BUZON", "CABAL", "CABER", "CABES", "CABIN", "CABLA", "CABLE", "CABOS", "CABRA", "CACAS", "CACHO", "CADAS",
    "CAER️", "CAFES", "CAGAR", "CAIDA", "CAIDO", "CAJAS", "CAJON", "CALAR", "CALAS", "CALCO", "CALDA", "CALDO",
    "CALER", "CALIZ", "CALLA", "CALLE", "CALLO", "CALMA", "CALOR", "CALVO", "CALZA", "CAMAS", "CAMBI", "CAMEO",
    "CAMIN", "CAMPO", "CANAL", "CANAS", "CANCA", "CANEL", "CANEY", "CANIL", "CANJE", "CANOA", "CANON", "CANSA",
    "CANSO", "CANTA", "CANTO", "CAÑA️", "CAÑAR", "CAÑON", "CAPAR", "CAPAS", "CAPAZ", "CAPEL", "CAPIN", "CAPON",
    "CAPPA", "CAPRI", "CAPUZ", "CARAS", "CARAV", "CARBO", "CARCA", "CARDA", "CAREO", "CARGA", "CARGO", "CARIA",
    "CARIZ", "CARLA", "CARLO", "CARNE", "CARPA", "CARPI", "CARRO", "CARTA", "CARVA", "CASAR", "CASAS", "CASCO",
    "CASIA", "CASIS", "CASMA", "CASO️", "CASPA", "CASTA", "CASTO", "CATAR", "CATAS", "CAUCE", "CAUDA", "CAUSA",
    "CAUTO", "CAVAR", "CAVAS", "CAVIA", "CAYAR", "CAYOS", "CAZAR", "CAZAS", "CEBAR", "CEBAS", "CEBIL", "CEBON",
    "CEBRA", "CECAL", "CEDAR", "CEDER", "CEGAR", "CEGAS", "CEIBA", "CEJAR", "CELAR", "CELAS", "CELDA", "CELIA",
    "CELSA", "CELSO", "CELTA", "CENAR", "CENAS", "CENIA", "CENIT", "CENSO", "CEÑIR", "CEÑOS", "CEPAS", "CEPEA",
    "CEQUi", "CERAS", "CERCA", "CERCO", "CERDA", "CERDO", "CERIO", "CERNA", "CERNE", "CERNI", "CERRAR", "CERRO",
    "CESAR", "CESES", "CESTA", "CESTO", "CETRO", "CEUTI", "CHABO", "CHACo", "CHAFA", "CHALA", "CHALE", "CHAMA",
    "CHANA", "CHAPA", "CHAPA", "CHATA", "CHATO", "CHAU✨", "CHAVO", "CHECA", "CHECO", "CHEFs", "CHICA", "CHICO",
    "CHILE", "CHILL", "CHINA", "CHINO", "CHIPA", "CHIRi", "CHISm", "CHITA", "CHITO", "CHIVO", "CHOCA", "CHOCO",
    "CHOFE", "CHOLA", "CHOLO", "CHOPA", "CHOPO", "CHORA", "CHORO", "CHOZA", "CHULA", "CHULO", "CHUPA", "CHUTE",
    "CHUTe", "CHUTO", "CHUTZ", "CIANO", "CIBER", "CICLA", "CICLO", "CIEGO", "CIELO", "CIENO", "CIENT", "CIFRA",
    "CIGAR", "CILIO", "CILLA", "CIMAR", "CIMAS", "CIMBA", "CINCA", "CINCO", "CINES", "CINTA", "CINTO", "CIPRE",
    "CIRCE", "CIRCO", "CIRIO", "CIRRO", "CISMA", "CISNE", "CISTA", "CITAR", "CITAS", "CIVIL", "CLAPE", "CLARA",
    "CLARO", "CLASE", "CLAVA", "CLAVE", "CLAVO", "CLERO", "CLICH", "CLIMA", "CLIPS", "CLOAC", "CLORO", "CLUBS",
    "COBAR", "COBAs", "COBLA", "COBOL", "COBRA", "COBRE", "COBRO", "COCAL", "COCAR", "COCAS", "COCHA", "COCHE",
    "COCHO", "COCOs", "COCOS", "CODAS", "CODEX", "CODOs", "CODOS", "COGER", "COHES", "COJER", "COLAR", "COLAs",
    "COLEA", "COLEO", "COLIN", "COLMA", "COLMO", "COLON", "COLOR", "COLPO", "COLZA", "COMAN", "COMAR", "COMAS",
    "COMBO", "COMER", "COMET", "COMIC", "COMO️", "CONDE", "CONDO", "CONGA", "CONGO", "CONOS", "CONTA", "CONTE",
    "CONTI", "COÑAC", "COÑOS", "COPAS", "COPEA", "COPEO", "COPLA", "COPOs", "COPTA", "COPUv", "CORAL", "CORAR",
    "CORAS", "CORBA", "CORBO", "CORCA", "CORCO", "CORDA", "COREA", "CORES", "CORIA", "CORO️", "CORPS", "CORRA",
    "CORRE", "CORRO", "CORSA", "CORSO", "CORTA", "CORTE", "CORTO", "CORVA", "CORVO", "CORZA", "CORZO", "COSAR",
    "COSAS", "COSCO", "COSER", "COSIO", "COSMO", "COSTA", "COSTE", "COSTO", "COTAN", "COTAR", "COTAS", "COTIa",
    "COTON", "COUDO", "COUPE", "COXAL", "COYOL", "CREAR", "CREAs", "CRECE", "CREDI", "CREER", "CREMA", "CREPO",
    "CRESO", "CRETA", "CREYÓ", "CRIAR", "CRIAs", "CRIB️", "CRIBA", "CRIME", "CRINA", "CRINO", "CRIOL", "CRISA",
    "CROAR", "CROCO", "CRONO", "CRUCE", "CRUDA", "CRUDO", "CRUEL", "CRUZA", "CUAD️", "CUAN️", "CUART", "CUASI",
    "CUATE", "CUBAS", "CUBIL", "CUBRE", "CUBRO", "CUCOS", "CUERO", "CUEVA", "CUIDA", "CUITA", "CULOS", "CULPA",
    "CULTO", "CUNAS", "CUOTA", "CUPON", "CUPOS", "CURAR", "CURAS", "CURIA", "CURIO", "CURRO", "CURSA", "CURSI",
    "CURSO", "CURVA", "CURVO", "CUTIS", "CUYOS", "DABLE", "DACHA", "DADAS", "DADOS", "DAFNE", "DAGAS", "DALIA",
    "DAMAS", "DAMOS", "DANES", "DANTE", "DANZA", "DAÑAR", "DAÑOS", "DARDO", "DARES", "DARIA", "DATAR", "DATOS",
    "DEBA️", "DEBER", "DEBES", "DEBIL", "DEBUT", "DECAR", "DECID", "DECIR", "DEDOS", "DEJAR", "DEJAS", "DELAS",
    "DELES", "DELIO", "DELOS", "DELTA", "DEMAS", "DENSO", "DENTE", "DEPOR", "DERIV", "DESDE", "DESEO", "DETAL",
    "DEUDA", "DIANA", "DIARI", "DICAN", "DICEN", "DICHO", "DICTA", "DIEGO", "DIETA", "DIEZ️", "DIGNA", "DIGNO",
    "DILUv", "DIMIR", "DINAR", "DIODO", "DIOSA", "DIOSES", "DIRAN", "DIRIA", "DISCO", "DODOS", "DOGMA", "DOLAR",
    "DOLER", "DOLOR", "DOMAR", "DONAR", "DONDE", "DORAR", "DORMv", "DORSO", "DOSIS", "DOTAR", "DRAGO", "DRAMA",
    "DRUID", "DUCHA", "DUCHO", "DUELO", "DUERO", "DUETO", "DULCE", "DUMAS", "DUÑAS", "DUQUE", "DURAR", "DUROS",

    // 6 letras
    "ABANICO", "ABARCA", "ABIERTO", "ABISMO", "ABRAZO", "ABRIGO", "ABUELA", "ABUELO", "ACABAR", "ACADEM", "ACEITE",
    "ACENTO", "ACEPTA", "ACERCA", "ACECHO", "ACTIVA", "ACTIVO", "ACTUAL", "ACTUAR", "ADIVIN", "ADMITA", "ADOBAR",
    "ADOPTA", "ADORAR", "ADULTO", "AFUERA", "AGOTAR", "AGRADA", "AGRADO", "AGREGA", "AGUAIT", "AGUARD", "AGUDAS",
    "AGUDOS", "AGUIAR", "AGUILA", "AGUJET", "AHORRA", "AHORRO", "AIREAR", "AJUSTE", "ALARMA", "ALASKA", "ALBAÑI",
    "ALBERO", "ALBINO", "ALBUMS", "ALCALD", "ALCANC", "ALCOHO", "ALDEA️", "ALEGRE", "ALEGRIA", "ALEMAN", "ALERTA",
    "ALEXIS", "ALFORJ", "ALIANZ", "ALIBIS", "ALIENS", "ALINEA", "ALISES", "ALIVIO", "ALMAZO", "ALMEND", "ALMUER",
    "ALQUIL", "ALTURA", "ALUMNO", "AMABLE", "AMADOR", "AMANTE", "AMARGO", "AMARRA", "AMBITO", "AMIGAS", "AMIGOS",
    "AMISTv", "AMODIO", "AMORAR", "AMOROS", "AMPARO", "AMPLIA", "AMPLIO", "AMULET", "ANADER", "ANIMAL", "ANIMAR",
    "AÑIMv", "AÑO️v", "ANOTAR", "ANTENA", "ANTIGv", "ANTROv", "ANUALv", "AÑU️v", "ANZUEL", "APAGAR", "APARTE",
    "APELAR", "APENAS", "APENAS", "APILAR", "APITAN", "APLAST", "APLICA", "APOYAR", "APRECI", "APREND", "APURAO",
    "APURAR", "APUROS", "ARABE️", "ARADOS", "ARAÑAS", "ARBITR", "ARBOLE", "ARCILL", "ARCHIV", "ARCO️v", "ARDENT",
    "ARDERv", "ARDIDv", "ARDORv", "ARENAv", "AREPA️", "ARETEv", "ARGENT", "ARIDOv", "ARIESv", "ARMAOv", "ARMARv",
    "ARMASv", "ARMONI", "AROMAS", "ARPA️v", "ARQUEO", "ARRANC", "ARRAST", "ARREAR", "ARRIBA", "ARRIES", "ARROBA",
    "ARROYO", "ARROZv", "ARRUIN", "ARTESv", "ARTICO", "ARTURA", "ARTURO", "ASADOv", "ASALTO", "ASAR️v", "ASCEND",
    "ASCO️v", "ASCUAO", "ASEARv", "ASESIN", "ASIATi", "ASIDeA", "ASIDEO", "ASILOv", "ASIR️v", "ASMA️v", "ASNARo",
    "ASOMAR", "ASPA️v", "ASPIRO", "ASTROS", "ASTURv", "ASUNTO", "ATACAR", "ATADOv", "ATAUDv", "ATEO️v", "ATICOs",
    "ATINAR", "ATLASv", "ATOMIC", "ATRAKv", "ATRAsv", "ATRILv", "ATROZv", "AUDIAv", "AUDIOv", "AUDITv", "AUGURv",
    "AULASv", "AUNARv", "AUREOv", "AUTORA", "AUTORv", "AUTOSv", "AVANCE", "AVANZA", "AVAROv", "AVELLA", "AVENAv",
    "AVERIv", "AVERSv", "AVIALv", "AVIONv", "AVISAR", "AVISOv", "AVIVA️", "AVIVAR", "AXIALv", "AYUDAR", "AYUNOv",
    "AZADAv", "AZAR️v", "AZOTAR", "AZOTEv", "AZUL️v", "BABELv", "BABORv", "BACANv", "BACHEv", "BACINv", "BADANv",
    "BADENv", "BAGARv", "BAGREv", "BAHIAv", "BAILAR", "BAILEv", "BAJADA", "BAJARv", "BAJONv", "BALASv", "BALDAv",
    "BALDEv", "BALONv", "BALSAv", "BANCOv", "BANDAv", "BANDOv", "BAÑARv", "BAÑOSv", "BARBAv", "BARCAv", "BARCOv",
    "BARDOv", "BARIOv", "BARONv", "BARRAv", "BARREv", "BARRIO", "BARROv", "BASALv", "BASARv", "BASASv", "BASESv",
    "BASTAv", "BASTOv", "BATERv", "BATIDO", "BATIRv", "BAYASv", "BEBERv", "BEBESv", "BECARv", "BEDELv", "BEEPSv",
    "BEIGEv", "BELENv", "BELGAv", "BELLA️", "BELLAS", "BELLO️", "BELLOv", "BEMOLv", "BENDAm", "BENI️v", "BERZAv",
    "BESARv", "BESOSv", "BESTIv", "BETONv", "BICHAs", "BICHOs", "BIEN️v", "BIGOTv", "BILISv", "BINGOv", "BIOMAv",
    "BIRRAv", "BISALv", "BIZCOv", "BLADOs", "BLAVAv", "BLEDOv", "BLINKv", "BLOC️v", "BLOGSv", "BLUESv", "BLUFFv",
    "BLUSAv", "BOA️v", "BOBALv", "BOBERv", "BOBINv", "BOBO️v", "BOCASv", "BOCELv", "BOCINv", "BOCONv", "BODASv",
    "BODERv", "BOFETv", "BOGARv", "BOHIOv", "BOINAv", "BOLASv", "BOLDOv", "BOLINv", "BOLSAs", "BOLSOv", "BOMBAv",
    "BOMBOv", "BONDAn", "BONGOv", "BONOSv", "BONSAv", "BORDAR", "BORDEv", "BORDOv", "BORRAR", "BORREv", "BOSCOv",
    "BOSONv", "BOTARv", "BOTASv", "BOTESv", "BOTINv", "BOTONv", "BOXERv", "BOYARv", "BOYASv", "BOZALv", "BRACEv",
    "BRAMAv", "BRASAv", "BRAVAv", "BRAVOv", "BRAZAs", "BRAZOv", "BREA️v", "BREVAv", "BREVEv", "BREZAv", "BREZOv",
    "BRIALv", "BRIDAv", "BRISAv", "BROCAv", "BROMAv", "BROMOv", "BRONCv", "BROTAv", "BROTEv", "BROZAv", "BRUJOv",
    "BRUMAv", "BRUNOv", "BRUTAv", "BRUTOv", "BUANAv", "BUBALv", "BUCALv", "BUCEOv", "BUCHEv", "BUCLEv", "BUENAv",
    "BUENOv", "BUEY️v", "BUFARv", "BUFONv", "BUGGYv", "BUHO️v"
];

// Función para normalizar palabras (mayúsculas y quitar acentos de forma segura)
function normalize(word) {
    if (!word) return "";
    return word.toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
        .replace(/[^A-Z]/g, "") // Solo letras A-Z
        .trim();
}

// 3. Proceso de Limpieza y Expansión
let totalRemoved = 0;
let totalAdded = 0;

for (let len in dictionary) {
    const originalCount = dictionary[len].length;

    // Limpiar: quitar truncadas y palabras con caracteres raros
    dictionary[len] = dictionary[len].filter(word => {
        const norm = normalize(word);
        if (truncatedToRemove.includes(norm)) return false;
        if (norm.length != parseInt(len)) return false; // Asegurar longitud exacta
        return true;
    });

    totalRemoved += (originalCount - dictionary[len].length);
}

// Añadir nuevas palabras (v5)
newWordsV5.forEach(w => {
    const norm = normalize(w);
    const len = norm.length;
    if (len >= 3 && len <= 6) {
        if (!dictionary[len].includes(norm)) {
            dictionary[len].push(norm);
            totalAdded++;
        }
    }
});

// Ordenar alfabéticamente y quitar duplicados finales
for (let len in dictionary) {
    dictionary[len] = [...new Set(dictionary[len].map(normalize))].sort();
}

fs.writeFileSync(dictPath, JSON.stringify(dictionary, null, 2));

console.log(`¡Overhaul v5 completado!`);
console.log(`- Palabras eliminadas (truncadas/error): ${totalRemoved}`);
console.log(`- Palabras nuevas añadidas: ${totalAdded}`);
console.log(`- Estado actual del diccionario:`);
for (let len in dictionary) {
    console.log(`  ${len} letras: ${dictionary[len].length} palabras`);
}
