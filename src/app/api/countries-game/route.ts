import { NextResponse } from 'next/server';
import { Country } from '../../../app/@types/country';

const manualTranslations: { [key: string]: string } = {
    "afeganistão": "Afghanistan",
    "albânia": "Albania",
    "argélia": "Algeria",
    "samoa americana": "American Samoa",
    "andorra": "Andorra",
    "angola": "Angola",
    "anguila": "Anguilla",
    "antártica": "Antarctica",
    "antígua e barbuda": "Antigua and Barbuda",
    "egito": "Arab Republic of Egypt",
    "argentina": "Argentine Republic",
    "armênia": "Armenia",
    "aruba": "Aruba",
    "austrália": "Commonwealth of Australia",
    "guernsey": "Bailiwick of Guernsey",
    "jersey": "Bailiwick of Jersey",
    "bahrein": "Kingdom of Bahrain",
    "bangladesh": "People's Republic of Bangladesh",
    "barbados": "Barbados",
    "bielorrússia": "Belarus",
    "bélgica": "Kingdom of Belgium",
    "belize": "Belize",
    "benim": "Benin",
    "bermudas": "Bermuda",
    "butão": "Kingdom of Bhutan",
    "bolívia": "Plurinational State of Bolivia",
    "venezuela": "Bolivarian Republic of Venezuela",
    "países baixos caribenhos": "Caribbean Netherlands",
    "bósnia e herzegovina": "Bosnia and Herzegovina",
    "botsuana": "Botswana",
    "ilha bouvet": "Bouvet Island",
    "brasil": "Federative Republic of Brazil",
    "território britânico do oceano índico": "British Indian Ocean Territory",
    "brunei": "Nation of Brunei, Abode of Peace",
    "bulgária": "Republic of Bulgaria",
    "burkina faso": "Burkina Faso",
    "burundi": "Republic of Burundi",
    "camboja": "Kingdom of Cambodia",
    "camarões": "Republic of Cameroon",
    "canadá": "Canada",
    "ilhas cayman": "Cayman Islands",
    "república centro-africana": "Central African Republic",
    "chade": "Republic of Chad",
    "chile": "Republic of Chile",
    "china": "People's Republic of China",
    "ilha christmas": "Christmas Island",
    "colômbia": "Republic of Colombia",
    "são bartolomeu": "Collectivity of Saint Barthélemy",
    "dominica": "Commonwealth of Dominica",
    "bahamas": "Commonwealth of the Bahamas",
    "ilhas marianas do norte": "Northern Mariana Islands",
    "porto rico": "Commonwealth of Puerto Rico",
    "comores": "Union of the Comoros",
    "congo": "Republic of the Congo",
    "ilhas cook": "Cook Islands",
    "costa rica": "Republic of Costa Rica",
    "curaçao": "Country of Curaçao",
    "croácia": "Republic of Croatia",
    "cuba": "Republic of Cuba",
    "chipre": "Republic of Cyprus",
    "república tcheca": "Czechia",
    "coreia do norte": "Democratic People's Republic of Korea",
    "são tomé e príncipe": "Democratic Republic of São Tomé and Príncipe",
    "timor leste": "Timor-Leste",
    "sri lanka": "Democratic Socialist Republic of Sri Lanka",
    "dinamarca": "Kingdom of Denmark",
    "mayotte": "Department of Mayotte",
    "djibouti": "Djibouti",
    "república dominicana": "Dominican Republic",
    "equador": "Republic of Ecuador",
    "el salvador": "Republic of El Salvador",
    "guiné equatorial": "Republic of Equatorial Guinea",
    "eritréia": "Eritrea",
    "estônia": "Estonia",
    "essuatíni": "Eswatini",
    "etiópia": "Federal Democratic Republic of Ethiopia",
    "ilhas malvinas": "Falkland Islands",
    "ilhas faroe": "Faroe Islands",
    "micronésia": "Federated States of Micronesia",
    "são cristóvão e neves": "Saint Kitts and Nevis",
    "nepal": "Federal Democratic Republic of Nepal",
    "alemanha": "Federal Republic of Germany",
    "nigéria": "Federal Republic of Nigeria",
    "fiji": "Republic of Fiji",
    "finlândia": "Republic of Finland",
    "frança": "French Republic",
    "polinésia francesa": "French Polynesia",
    "gabão": "Gabonese Republic",
    "gâmbia": "Republic of the Gambia",
    "geórgia": "Georgia",
    "gana": "Republic of Ghana",
    "gibraltar": "Gibraltar",
    "luxemburgo": "Grand Duchy of Luxembourg",
    "grécia": "Hellenic Republic",
    "groenlândia": "Greenland",
    "granada": "Grenada",
    "guadalupe": "Guadeloupe",
    "guam": "Guam",
    "guatemala": "Republic of Guatemala",
    "guiné": "Republic of Guinea",
    "guiné-bissau": "Republic of Guinea-Bissau",
    "guiana": "Co-operative Republic of Guyana",
    "haiti": "Republic of Haiti",
    "jordânia": "Hashemite Kingdom of Jordan",
    "ilhas heard e mcdonald": "Heard Island and McDonald Islands",
    "honduras": "Republic of Honduras",
    "hong kong": "Hong Kong Special Administrative Region of the People's Republic of China",
    "hungria": "Hungary",
    "islândia": "Iceland",
    "kiribati": "Independent and Sovereign Republic of Kiribati",
    "papua-nova guiné": "Papua New Guinea",
    "samoa": "Independent State of Samoa",
    "índia": "Republic of India",
    "indonésia": "Republic of Indonesia",
    "irã": "Iran",
    "iraque": "Republic of Iraq",
    "irlanda": "Republic of Ireland",
    "ilha de man": "Isle of Man",
    "mauritânia": "Islamic Republic of Mauritania",
    "paquistão": "Islamic Republic of Pakistan",
    "israel": "State of Israel",
    "itália": "Italian Republic",
    "jamaica": "Jamaica",
    "japão": "Japan",
    "cazaquistão": "Republic of Kazakhstan",
    "quênia": "Kenya",
    "coreia do sul": "Republic of Korea",
    "kosovo": "Republic of Kosovo",
    "kuwait": "State of Kuwait",
    "quirguistão": "Kyrgyz Republic",
    "laos": "Lao People's Democratic Republic",
    "letônia": "Latvia",
    "líbano": "Lebanese Republic",
    "lesoto": "Kingdom of Lesotho",
    "libéria": "Republic of Liberia",
    "líbia": "State of Libya",
    "liechtenstein": "Principality of Liechtenstein",
    "lituânia": "Republic of Lithuania",
    "macau": "Macao Special Administrative Region of the People's Republic of China",
    "madagascar": "Republic of Madagascar",
    "malawi": "Republic of Malawi",
    "malásia": "Malaysia",
    "maldivas": "Republic of the Maldives",
    "mali": "Republic of Mali",
    "malta": "Republic of Malta",
    "ilhas marshall": "Republic of the Marshall Islands",
    "martinica": "Martinique",
    "maurício": "Republic of Mauritius",
    "méxico": "United Mexican States",
    "moldávia": "Republic of Moldova",
    "mônaco": "Monaco",
    "mongólia": "Mongolia",
    "montenegro": "Montenegro",
    "montserrat": "Montserrat",
    "marrocos": "Kingdom of Morocco",
    "moçambique": "Republic of Mozambique",
    "mianmar": "Myanmar",
    "namíbia": "Republic of Namibia",
    "nauru": "Republic of Nauru",
    "países baixos": "Netherlands",
    "nova caledônia": "New Caledonia",
    "nova zelândia": "New Zealand",
    "nicarágua": "Republic of Nicaragua",
    "níger": "Republic of Niger",
    "niue": "Niue",
    "ilha norfolk": "Territory of Norfolk Island",
    "macedônia do norte": "North Macedonia",
    "noruega": "Kingdom of Norway",
    "omã": "Sultanate of Oman",
    "uruguai": "Oriental Republic of Uruguay",
    "palau": "Republic of Palau",
    "palestina": "State of Palestine",
    "panamá": "Republic of Panama",
    "paraguai": "Republic of Paraguay",
    "peru": "Republic of Peru",
    "filipinas": "Republic of the Philippines",
    "ilhas pitcairn": "Pitcairn Group of Islands",
    "polônia": "Poland",
    "portugal": "Portuguese Republic",
    "catar": "State of Qatar",
    "reunião": "Réunion Island",
    "ruanda": "Republic of Rwanda",
    "san marino": "Republic of San Marino",
    "arábia saudita": "Kingdom of Saudi Arabia",
    "senegal": "Republic of Senegal",
    "sérvia": "Republic of Serbia",
    "seicheles": "Republic of Seychelles",
    "serra leoa": "Republic of Sierra Leone",
    "singapura": "Republic of Singapore",
    "eslováquia": "Slovak Republic",
    "eslovênia": "Slovenia",
    "ilhas salomão": "Solomon Islands",
    "somália": "Federal Republic of Somalia",
    "áfrica do sul": "Republic of South Africa",
    "geórgia do sul": "South Georgia",
    "sudão do sul": "Republic of South Sudan",
    "espanha": "Kingdom of Spain",
    "sudão": "Republic of the Sudan",
    "suriname": "Republic of Suriname",
    "svalbard e jan mayen": "Svalbard and Jan Mayen",
    "suécia": "Kingdom of Sweden",
    "suíça": "Swiss Confederation",
    "síria": "Syrian Arab Republic",
    "taiwan": "Republic of China (Taiwan)",
    "tajiquistão": "Republic of Tajikistan",
    "tanzânia": "United Republic of Tanzania",
    "ilhas cocos": "Cocos (Keeling) Islands",
    "territórios franceses do sul e antárticos": "French Southern and Antarctic Lands",
    "wallis e futuna": "Territory of the Wallis and Futuna Islands",
    "tailândia": "Kingdom of Thailand",
    "togo": "Togolese Republic",
    "toquelau": "Tokelau",
    "tonga": "Kingdom of Tonga",
    "trinidad e tobago": "Trinidad and Tobago",
    "tunísia": "Tunisian Republic",
    "turquia": "Republic of Turkey",
    "turcomenistão": "Turkmenistan",
    "ilhas turcas e caicos": "Turks and Caicos Islands",
    "tuvalu": "Tuvalu",
    "uganda": "Republic of Uganda",
    "ucrânia": "Ukraine",
    "emirados árabes unidos": "United Arab Emirates",
    "reino unido": "United Kingdom of Great Britain and Northern Ireland",
    "estados unidos": "United States of America",
    "ilhas menores distantes dos eua": "United States Minor Outlying Islands",
    "uzbequistão": "Republic of Uzbekistan",
    "vanuatu": "Republic of Vanuatu",
    "cidade do vaticano": "Vatican City State",
    "vietnã": "Vietnam",
    "ilhas virgens (britânicas)": "United States Virgin Islands",
    "iêmen": "Yemen",
    "zâmbia": "Zambia",
    "zimbábue": "Zimbabwe",
    "ilhas aland": "Åland Islands",
    "saara ocidental": "Sahrawi Arab Democratic Republic",
    "são martinho": "Sint Maarten"
};

export async function GET() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca2,altSpellings,cioc,translations');

        if (!response.ok) {
            console.error(`API Error: ${response.status} ${response.statusText}`);
            throw new Error(`Failed to fetch countries: ${response.statusText}`);
        }

        const countries = (await response.json()) as Country[];

        const processedCountries = countries.filter(country =>
            country.flags?.svg && country.name?.common
        ).map(country => {
            const allNames = [
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
    } catch (error: any) {
        console.error('Error in API route:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}