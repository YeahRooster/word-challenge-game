// Base de datos de países para Geo Challenge (Playfish Remake)
// Nombres en español e inglés, capitales, continentes y códigos ISO para banderas vectoriales

export const COUNTRIES = [
    // --- AMÉRICA ---
    { id: "ar", code: "ar", name: "Argentina", nameEn: "Argentina", capital: "Buenos Aires", continent: "América" },
    { id: "br", code: "br", name: "Brasil", nameEn: "Brazil", capital: "Brasilia", continent: "América" },
    { id: "cl", code: "cl", name: "Chile", nameEn: "Chile", capital: "Santiago", continent: "América" },
    { id: "co", code: "co", name: "Colombia", nameEn: "Colombia", capital: "Bogotá", continent: "América" },
    { id: "mx", code: "mx", name: "México", nameEn: "Mexico", capital: "Ciudad de México", continent: "América" },
    { id: "pe", code: "pe", name: "Perú", nameEn: "Peru", capital: "Lima", continent: "América" },
    { id: "uy", code: "uy", name: "Uruguay", nameEn: "Uruguay", capital: "Montevideo", continent: "América" },
    { id: "us", code: "us", name: "Estados Unidos", nameEn: "United States", capital: "Washington D.C.", continent: "América" },
    { id: "ca", code: "ca", name: "Canadá", nameEn: "Canada", capital: "Ottawa", continent: "América" },
    { id: "ec", code: "ec", name: "Ecuador", nameEn: "Ecuador", capital: "Quito", continent: "América" },
    { id: "ve", code: "ve", name: "Venezuela", nameEn: "Venezuela", capital: "Caracas", continent: "América" },
    { id: "bo", code: "bo", name: "Bolivia", nameEn: "Bolivia", capital: "Sucre", continent: "América" },
    { id: "py", code: "py", name: "Paraguay", nameEn: "Paraguay", capital: "Asunción", continent: "América" },
    { id: "cu", code: "cu", name: "Cuba", nameEn: "Cuba", capital: "La Habana", continent: "América" },
    { id: "pa", code: "pa", name: "Panamá", nameEn: "Panama", capital: "Ciudad de Panamá", continent: "América" },
    { id: "cr", code: "cr", name: "Costa Rica", nameEn: "Costa Rica", capital: "San José", continent: "América" },

    // --- EUROPA ---
    { id: "es", code: "es", name: "España", nameEn: "Spain", capital: "Madrid", continent: "Europa" },
    { id: "fr", code: "fr", name: "Francia", nameEn: "France", capital: "París", continent: "Europa" },
    { id: "it", code: "it", name: "Italia", nameEn: "Italy", capital: "Roma", continent: "Europa" },
    { id: "de", code: "de", name: "Alemania", nameEn: "Germany", capital: "Berlín", continent: "Europa" },
    { id: "gb", code: "gb", name: "Reino Unido", nameEn: "United Kingdom", capital: "Londres", continent: "Europa" },
    { id: "gr", code: "gr", name: "Grecia", nameEn: "Greece", capital: "Atenas", continent: "Europa" },
    { id: "no", code: "no", name: "Noruega", nameEn: "Norway", capital: "Oslo", continent: "Europa" },
    { id: "pt", code: "pt", name: "Portugal", nameEn: "Lisboa", continent: "Europa" },
    { id: "nl", code: "nl", name: "Países Bajos", nameEn: "Netherlands", capital: "Ámsterdam", continent: "Europa" },
    { id: "se", code: "se", name: "Suecia", nameEn: "Sweden", capital: "Estocolmo", continent: "Europa" },
    { id: "ch", code: "ch", name: "Suiza", nameEn: "Switzerland", capital: "Berna", continent: "Europa" },
    { id: "ie", code: "ie", name: "Irlanda", nameEn: "Ireland", capital: "Dublín", continent: "Europa" },
    { id: "be", code: "be", name: "Bélgica", nameEn: "Belgium", capital: "Bruselas", continent: "Europa" },
    { id: "at", code: "at", name: "Austria", nameEn: "Austria", capital: "Viena", continent: "Europa" },
    { id: "pl", code: "pl", name: "Polonia", nameEn: "Poland", capital: "Varsovia", continent: "Europa" },
    { id: "dk", code: "dk", name: "Dinamarca", nameEn: "Denmark", capital: "Copenhague", continent: "Europa" },
    { id: "fi", code: "fi", name: "Finlandia", nameEn: "Finland", capital: "Helsinki", continent: "Europa" },
    { id: "ru", code: "ru", name: "Rusia", nameEn: "Russia", capital: "Moscú", continent: "Europa" },

    // --- ASIA ---
    { id: "in", code: "in", name: "India", nameEn: "India", capital: "Nueva Delhi", continent: "Asia" },
    { id: "jp", code: "jp", name: "Japón", nameEn: "Japan", capital: "Tokio", continent: "Asia" },
    { id: "cn", code: "cn", name: "China", nameEn: "China", capital: "Pekín", continent: "Asia" },
    { id: "kr", code: "kr", name: "Corea del Sur", nameEn: "South Korea", capital: "Seúl", continent: "Asia" },
    { id: "sa", code: "sa", name: "Arabia Saudita", nameEn: "Saudi Arabia", capital: "Riad", continent: "Asia" },
    { id: "lb", code: "lb", name: "Líbano", nameEn: "Lebanon", capital: "Beirut", continent: "Asia" },
    { id: "tr", code: "tr", name: "Turquía", nameEn: "Turkey", capital: "Ankara", continent: "Asia" },
    { id: "id", code: "id", name: "Indonesia", nameEn: "Indonesia", capital: "Yakarta", continent: "Asia" },
    { id: "th", code: "th", name: "Tailandia", nameEn: "Thailand", capital: "Bangkok", continent: "Asia" },
    { id: "il", code: "il", name: "Israel", nameEn: "Israel", capital: "Jerusalén", continent: "Asia" },
    { id: "vn", code: "vn", name: "Vietnam", nameEn: "Vietnam", capital: "Hanói", continent: "Asia" },
    { id: "ph", code: "ph", name: "Filipinas", nameEn: "Philippines", capital: "Manila", continent: "Asia" },

    // --- ÁFRICA ---
    { id: "eg", code: "eg", name: "Egipto", nameEn: "Egypt", capital: "El Cairo", continent: "África" },
    { id: "za", code: "za", name: "Sudáfrica", nameEn: "South Africa", capital: "Pretoria", continent: "África" },
    { id: "ma", code: "ma", name: "Marruecos", nameEn: "Morocco", capital: "Rabat", continent: "África" },
    { id: "ng", code: "ng", name: "Nigeria", nameEn: "Nigeria", capital: "Abuya", continent: "África" },
    { id: "ke", code: "ke", name: "Kenia", nameEn: "Kenya", capital: "Nairobi", continent: "África" },
    { id: "gh", code: "gh", name: "Ghana", nameEn: "Ghana", capital: "Acra", continent: "África" },
    { id: "mg", code: "mg", name: "Madagascar", nameEn: "Madagascar", capital: "Antananarivo", continent: "África" },

    // --- OCEANÍA ---
    { id: "au", code: "au", name: "Australia", nameEn: "Australia", capital: "Camberra", continent: "Oceanía" },
    { id: "nz", code: "nz", name: "Nueva Zelanda", nameEn: "New Zealand", capital: "Wellington", continent: "Oceanía" }
];

// Helper para obtener URL de bandera vectorial en alta resolución
export const getFlagUrl = (code) => {
    return `https://flagcdn.com/${code.toLowerCase()}.svg`;
};
