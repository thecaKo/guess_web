// types/country.ts
export interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  cca2: string;
}