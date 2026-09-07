export type ExpansionRegion = 'south-america' | 'north-america' | 'middle-east' | 'asia' | 'europe';

export interface ExpansionCountry {
  name: string;
  code: string;
  region: ExpansionRegion;
  lat: number;
  lng: number;
}

// Sede do grupo — Goiânia, GO (ponto de origem dos arcos no globo)
export const HQ_LOCATION: [number, number] = [-16.6869, -49.2648];

// 39 países-alvo para expansão de moda de luxo (fonte: Planejamento Estratégico LÉZ.NK)
export const expansionCountries: ExpansionCountry[] = [
  // América do Sul
  { name: 'Brasil', code: 'BR', region: 'south-america', lat: -15.7939, lng: -47.8828 },
  { name: 'Chile', code: 'CL', region: 'south-america', lat: -33.4489, lng: -70.6693 },
  { name: 'Colômbia', code: 'CO', region: 'south-america', lat: 4.7110, lng: -74.0721 },

  // América Central e do Norte
  { name: 'Estados Unidos', code: 'US', region: 'north-america', lat: 40.7128, lng: -74.0060 },
  { name: 'Canadá', code: 'CA', region: 'north-america', lat: 43.6511, lng: -79.3832 },
  { name: 'México', code: 'MX', region: 'north-america', lat: 19.4326, lng: -99.1332 },
  { name: 'Panamá', code: 'PA', region: 'north-america', lat: 8.9824, lng: -79.5199 },

  // Oriente Médio
  { name: 'Emirados Árabes Unidos', code: 'AE', region: 'middle-east', lat: 25.2048, lng: 55.2708 },
  { name: 'Arábia Saudita', code: 'SA', region: 'middle-east', lat: 24.7136, lng: 46.6753 },
  { name: 'Catar', code: 'QA', region: 'middle-east', lat: 25.2854, lng: 51.5310 },
  { name: 'Kuwait', code: 'KW', region: 'middle-east', lat: 29.3759, lng: 47.9774 },
  { name: 'Bahrein', code: 'BH', region: 'middle-east', lat: 26.2285, lng: 50.5860 },

  // Ásia
  { name: 'Japão', code: 'JP', region: 'asia', lat: 35.6762, lng: 139.6503 },
  { name: 'China', code: 'CN', region: 'asia', lat: 39.9042, lng: 116.4074 },
  { name: 'Hong Kong', code: 'HK', region: 'asia', lat: 22.3193, lng: 114.1694 },
  { name: 'Cingapura', code: 'SG', region: 'asia', lat: 1.3521, lng: 103.8198 },
  { name: 'Turquia', code: 'TR', region: 'asia', lat: 41.0082, lng: 28.9784 },

  // Europa
  { name: 'Alemanha', code: 'DE', region: 'europe', lat: 52.5200, lng: 13.4050 },
  { name: 'França', code: 'FR', region: 'europe', lat: 48.8566, lng: 2.3522 },
  { name: 'Reino Unido', code: 'GB', region: 'europe', lat: 51.5072, lng: -0.1276 },
  { name: 'Itália', code: 'IT', region: 'europe', lat: 45.4642, lng: 9.1900 },
  { name: 'Espanha', code: 'ES', region: 'europe', lat: 40.4168, lng: -3.7038 },
  { name: 'Suíça', code: 'CH', region: 'europe', lat: 47.3769, lng: 8.5417 },
  { name: 'Luxemburgo', code: 'LU', region: 'europe', lat: 49.6116, lng: 6.1319 },
  { name: 'Irlanda', code: 'IE', region: 'europe', lat: 53.3498, lng: -6.2603 },
  { name: 'Noruega', code: 'NO', region: 'europe', lat: 59.9139, lng: 10.7522 },
  { name: 'Islândia', code: 'IS', region: 'europe', lat: 64.1466, lng: -21.9426 },
  { name: 'Países Baixos', code: 'NL', region: 'europe', lat: 52.3676, lng: 4.9041 },
  { name: 'Bélgica', code: 'BE', region: 'europe', lat: 50.8503, lng: 4.3517 },
  { name: 'Suécia', code: 'SE', region: 'europe', lat: 59.3293, lng: 18.0686 },
  { name: 'Dinamarca', code: 'DK', region: 'europe', lat: 55.6761, lng: 12.5683 },
  { name: 'Áustria', code: 'AT', region: 'europe', lat: 48.2082, lng: 16.3738 },
  { name: 'Finlândia', code: 'FI', region: 'europe', lat: 60.1699, lng: 24.9384 },
  { name: 'Portugal', code: 'PT', region: 'europe', lat: 38.7223, lng: -9.1393 },
  { name: 'Malta', code: 'MT', region: 'europe', lat: 35.8989, lng: 14.5146 },
  { name: 'Chéquia', code: 'CZ', region: 'europe', lat: 50.0755, lng: 14.4378 },
  { name: 'Eslováquia', code: 'SK', region: 'europe', lat: 48.1486, lng: 17.1077 },
  { name: 'Eslovênia', code: 'SI', region: 'europe', lat: 46.0569, lng: 14.5058 },
  { name: 'Chipre', code: 'CY', region: 'europe', lat: 35.1856, lng: 33.3823 },
];
