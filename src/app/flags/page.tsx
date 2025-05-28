// app/page.tsx
import { Metadata } from 'next';
import { Country } from '../@types/country';
import CountryDisplay from '../components/CountryDisplay';

export const metadata: Metadata = {
  title: 'World Flags',
  description: 'Todos os paises do mundo!',
};

async function getCountries(): Promise<Country[]> {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca2', {
      next: { revalidate: 86400 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const countries = (await response.json()) as Country[];
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    return countries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}

export default async function Home() {
  const countries = await getCountries();

  if (!countries || countries.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-700">Erro na API.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-800">
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold text-white mb-12 text-center">
          Bandeiras dos Paises
        </h1>
        <CountryDisplay initialCountries={countries} />
      </main>
    </div>
  );
}