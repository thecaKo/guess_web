// Exemplo de como sua interface Country DEVE ser (ou incluir essas partes)
// app/@types/country.d.ts

export interface TranslationDetails {
  official: string;
  common: string;
}

export interface CountryName {
  common: string;
  official: string;
  nativeName?: {
    [key: string]: { // Pode ter múltiplos idiomas nativos
      official: string;
      common: string;
    };
  };
  // 'translations' não fica aqui dentro de 'name'
}

export interface Country {
  name: CountryName;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  cca2: string; // Código ISO 3166-1 alpha-2
  altSpellings?: string[];
  cioc?: string; // Código do Comitê Olímpico Internacional

  translations?: {
    [key: string]: TranslationDetails; // 'por' seria uma das chaves aqui
  };

  // Adicionadas pelo seu código:
  searchNames?: string[];
  englishName?: string;
}