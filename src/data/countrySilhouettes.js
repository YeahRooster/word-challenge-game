// Siluetas vectoriales precisas (SVG paths) de países para el minijuego "Guess the border!"
// Normalizadas en viewBox="0 0 300 300" con color oscuro grafito característico de Playfish

export const COUNTRY_SILHOUETTES = {
    // ESPAÑA (Península Ibérica + Islas Baleares) - Como en la captura del usuario
    es: {
        id: "es",
        viewBox: "0 0 300 300",
        paths: [
            // Península Ibérica
            "M 68 82 C 95 80, 150 83, 178 88 C 210 93, 238 98, 245 106 C 248 115, 235 125, 232 138 C 228 152, 238 165, 234 178 C 228 192, 205 210, 192 222 C 175 235, 148 240, 125 240 C 112 240, 95 235, 88 226 C 75 212, 70 190, 72 170 C 72 152, 60 140, 58 122 C 55 108, 60 92, 68 82 Z",
            // Islas Baleares (Mallorca, Menorca, Ibiza)
            "M 260 162 C 265 158, 272 160, 275 166 C 274 172, 267 175, 262 173 Z",
            "M 278 150 C 283 148, 287 151, 286 155 C 284 158, 279 157, 278 150 Z",
            "M 248 175 C 252 173, 255 176, 254 180 C 251 182, 247 180, 248 175 Z"
        ]
    },

    // ITALIA (La clásica bota itálica + Sicilia y Cerdeña)
    it: {
        id: "it",
        viewBox: "0 0 300 300",
        paths: [
            // Bota continental
            "M 75 60 C 110 50, 170 52, 200 65 C 190 80, 165 92, 160 108 C 158 125, 172 140, 185 160 C 198 180, 218 195, 238 205 C 245 210, 242 220, 232 225 C 220 230, 208 220, 202 215 C 195 210, 185 215, 178 228 C 172 238, 160 245, 148 245 C 138 245, 142 235, 148 228 C 155 220, 155 208, 145 198 C 135 188, 130 170, 125 155 C 118 138, 108 120, 95 105 C 80 88, 68 75, 75 60 Z",
            // Sicilia
            "M 125 248 C 145 242, 165 252, 160 265 C 150 272, 130 270, 118 260 C 115 252, 120 248, 125 248 Z",
            // Cerdeña
            "M 75 145 C 88 142, 92 165, 90 188 C 88 202, 75 205, 72 192 C 68 175, 68 152, 75 145 Z"
        ]
    },

    // FRANCIA (El hexágono + Córcega)
    fr: {
        id: "fr",
        viewBox: "0 0 300 300",
        paths: [
            // Territorio continental
            "M 115 50 C 145 45, 180 52, 210 68 C 225 90, 240 120, 235 148 C 230 175, 240 200, 222 225 C 205 245, 175 250, 150 255 C 120 252, 95 240, 80 215 C 70 190, 85 160, 72 135 C 60 115, 68 85, 90 68 C 98 60, 108 52, 115 50 Z",
            // Córcega
            "M 262 230 C 268 225, 275 235, 272 250 C 268 260, 260 258, 258 245 C 258 238, 260 232, 262 230 Z"
        ]
    },

    // ARGENTINA (Forma triangular alargada del cono sur + Tierra del Fuego)
    ar: {
        id: "ar",
        viewBox: "0 0 300 300",
        paths: [
            // Territorio continental
            "M 130 35 C 160 38, 195 48, 205 68 C 200 90, 180 110, 188 135 C 195 152, 175 175, 168 198 C 158 225, 142 250, 128 275 C 120 278, 115 268, 118 255 C 122 232, 125 210, 120 185 C 115 160, 125 135, 122 110 C 120 85, 112 60, 122 42 C 125 38, 128 35, 130 35 Z",
            // Tierra del Fuego
            "M 135 285 C 145 282, 155 288, 150 295 C 140 298, 130 292, 135 285 Z"
        ]
    },

    // BRASIL (El gigante sudamericano)
    br: {
        id: "br",
        viewBox: "0 0 300 300",
        paths: [
            "M 75 70 C 110 50, 165 45, 210 65 C 255 85, 275 118, 270 150 C 260 185, 230 220, 205 245 C 180 268, 155 260, 140 235 C 130 210, 115 185, 95 160 C 72 135, 55 110, 60 90 C 62 80, 68 75, 75 70 Z"
        ]
    },

    // ESTADOS UNIDOS (Territorio continental + península de Florida)
    us: {
        id: "us",
        viewBox: "0 0 300 300",
        paths: [
            "M 45 90 C 100 85, 190 82, 255 90 C 260 110, 245 135, 250 155 C 252 170, 240 185, 238 215 C 235 230, 225 235, 222 220 C 218 200, 198 195, 175 200 C 145 205, 120 190, 85 192 C 55 190, 48 155, 45 130 C 42 110, 40 98, 45 90 Z"
        ]
    },

    // MÉXICO (Con la península de Baja California y Yucatán)
    mx: {
        id: "mx",
        viewBox: "0 0 300 300",
        paths: [
            // Territorio principal y Yucatán
            "M 80 80 C 125 75, 185 85, 200 115 C 185 140, 160 165, 185 185 C 210 190, 248 185, 255 170 C 258 190, 235 205, 210 205 C 175 205, 150 215, 125 210 C 105 190, 95 160, 85 130 C 78 110, 75 92, 80 80 Z",
            // Península de Baja California
            "M 45 75 C 52 70, 60 85, 58 110 C 55 135, 68 160, 65 170 C 60 170, 52 150, 48 125 C 45 105, 42 85, 45 75 Z"
        ]
    },

    // INDIA (Subcontinente triangular)
    in: {
        id: "in",
        viewBox: "0 0 300 300",
        paths: [
            "M 130 45 C 150 40, 175 52, 170 75 C 185 85, 215 90, 230 110 C 220 135, 190 145, 180 170 C 170 200, 155 240, 145 265 C 140 268, 135 260, 130 235 C 120 200, 110 165, 95 145 C 80 125, 92 95, 105 75 C 115 62, 122 50, 130 45 Z"
        ]
    },

    // REINO UNIDO (Gran Bretaña e Irlanda del Norte)
    gb: {
        id: "gb",
        viewBox: "0 0 300 300",
        paths: [
            // Gran Bretaña (Escocia, Inglaterra, Gales)
            "M 135 45 C 155 42, 168 60, 160 85 C 155 105, 175 130, 180 155 C 185 180, 195 205, 175 228 C 150 240, 120 238, 110 220 C 118 200, 130 185, 115 165 C 105 145, 120 120, 115 95 C 112 75, 122 52, 135 45 Z",
            // Irlanda del Norte
            "M 75 110 C 90 108, 98 120, 92 135 C 82 138, 72 130, 75 110 Z"
        ]
    },

    // JAPÓN (Cadena de islas: Honshu, Hokkaido, Kyushu, Shikoku)
    jp: {
        id: "jp",
        viewBox: "0 0 300 300",
        paths: [
            // Hokkaido (Norte)
            "M 215 50 C 240 45, 255 65, 245 80 C 230 90, 210 82, 205 68 C 205 58, 210 52, 215 50 Z",
            // Honshu (Isla principal curvada)
            "M 195 95 C 220 120, 210 150, 175 180 C 145 205, 115 220, 95 235 C 90 232, 105 210, 135 185 C 160 160, 180 130, 185 105 C 188 98, 192 95, 195 95 Z",
            // Kyushu y Shikoku
            "M 75 240 C 90 235, 95 255, 82 265 C 72 260, 70 248, 75 240 Z",
            "M 115 225 C 130 220, 135 235, 125 242 C 115 240, 112 230, 115 225 Z"
        ]
    },

    // AUSTRALIA (+ Tasmania)
    au: {
        id: "au",
        viewBox: "0 0 300 300",
        paths: [
            // Continente australiano
            "M 75 90 C 115 70, 160 100, 190 75 C 215 85, 240 120, 245 155 C 250 190, 235 215, 210 225 C 175 230, 130 235, 105 210 C 80 185, 55 160, 60 130 C 62 110, 68 98, 75 90 Z",
            // Tasmania
            "M 205 255 C 218 252, 222 265, 215 272 C 205 272, 202 262, 205 255 Z"
        ]
    },

    // GRECIA (Península balcánica + Peloponeso + Creta e islas)
    gr: {
        id: "gr",
        viewBox: "0 0 300 300",
        paths: [
            // Grecia continental
            "M 110 70 C 145 65, 170 75, 175 98 C 165 125, 150 145, 158 170 C 145 178, 130 160, 125 140 C 120 120, 105 100, 102 85 C 102 78, 106 72, 110 70 Z",
            // Peloponeso
            "M 132 178 C 150 175, 158 198, 142 215 C 128 212, 122 195, 132 178 Z",
            // Creta
            "M 155 245 C 190 240, 210 245, 198 255 C 175 258, 150 252, 155 245 Z"
        ]
    },

    // NORUEGA (Costa escandinava alargada con fiordos)
    no: {
        id: "no",
        viewBox: "0 0 300 300",
        paths: [
            "M 225 35 C 250 45, 240 65, 210 75 C 185 85, 160 115, 142 145 C 125 175, 110 210, 115 245 C 100 248, 88 235, 95 210 C 105 175, 120 140, 145 105 C 170 70, 200 45, 225 35 Z"
        ]
    },

    // ARABIA SAUDITA (Gran península arábiga)
    sa: {
        id: "sa",
        viewBox: "0 0 300 300",
        paths: [
            "M 80 80 C 125 65, 185 70, 205 95 C 220 120, 245 145, 235 180 C 220 215, 185 240, 140 245 C 105 235, 100 200, 105 175 C 110 145, 88 120, 75 95 C 72 88, 75 82, 80 80 Z"
        ]
    },

    // CHILE (Franja angosta y larga)
    cl: {
        id: "cl",
        viewBox: "0 0 300 300",
        paths: [
            "M 175 40 C 185 45, 175 80, 165 120 C 155 160, 145 200, 135 245 C 125 275, 115 285, 110 270 C 120 235, 135 180, 145 130 C 155 85, 165 50, 175 40 Z"
        ]
    },

    // EGIPTO (Cuadrante noreste de África con el Sinaí y el Mar Rojo)
    eg: {
        id: "eg",
        viewBox: "0 0 300 300",
        paths: [
            "M 65 75 C 125 72, 195 70, 215 78 C 225 90, 238 105, 228 120 C 220 135, 240 170, 245 200 C 225 215, 200 230, 175 235 C 125 235, 80 230, 68 230 C 65 180, 62 125, 65 75 Z"
        ]
    }
};

// Obtener silueta o fallback geométrico estilizado
export const getSilhouette = (countryId) => {
    return COUNTRY_SILHOUETTES[countryId.toLowerCase()] || null;
};
