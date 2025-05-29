import { NextResponse } from 'next/server';

export interface Country {
    name: {
        common: string;
        official: string;
        nativeName?: {
            [key: string]: {
                common: string;
                official: string;
            };
        };
    };
    flags?: {
        png?: string;
        svg?: string;
        alt?: string;
    };
    cca2: string;
    altSpellings?: string[];
    cioc?: string;
    translations?: {
        [key: string]: {
            official: string;
            common: string;
        };
    };
}

export interface ProcessedCountry extends Country {
    searchNames: string[];
    englishName: string;
}

const manualTranslations: { [key: string]: string } = {
    "Alemanha": "Germany",
    "França": "France",
};

export async function GET() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca2,altSpellings,cioc,translations');

        if (!response.ok) {
            console.error(`API Error: ${response.status} ${response.statusText}`);
            throw new Error(`Failed to fetch countries: ${response.statusText || 'Unknown error'}`);
        }

        const countries = (await response.json()) as Country[];

        const processedCountries: ProcessedCountry[] = countries.filter(country =>
            country.flags?.svg && country.name?.common && country.name?.official
        ).map(country => {
            const allNames: string[] = [
                country.name.common.toLowerCase(),
                country.name.official.toLowerCase(),
                ...(country.altSpellings || []).map(name => name.toLowerCase()),
                ...(country.cioc ? [country.cioc.toLowerCase()] : [])
            ];

            if (country.name.nativeName?.por?.common) {
                allNames.push(country.name.nativeName.por.common.toLowerCase());
            }
            if (country.name.nativeName?.por?.official) {
                allNames.push(country.name.nativeName.por.official.toLowerCase());
            }

            if (country.translations?.por?.common) {
                allNames.push(country.translations.por.common.toLowerCase());
            }
            if (country.translations?.por?.official) {
                allNames.push(country.translations.por.official.toLowerCase());
            }

            return {
                ...country,
                searchNames: Array.from(new Set(allNames)),
                englishName: country.name.common
            };
        });

        processedCountries.forEach(country => {
            const englishCommonNameLower = country.name.common.toLowerCase();

            const portugueseNameFromManual = Object.keys(manualTranslations).find(
                ptKey => manualTranslations[ptKey].toLowerCase() === englishCommonNameLower
            );

            if (portugueseNameFromManual && country.searchNames) {
                country.searchNames.push(portugueseNameFromManual.toLowerCase());
            }
            country.searchNames = Array.from(new Set(country.searchNames));
        });

        return NextResponse.json(processedCountries);

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error in API route:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error('An unexpected error occurred:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }
}
