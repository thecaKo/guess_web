// components/CountryDisplay.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { Country } from '../@types/country';
import CountryFlag from './CountryFlag';

interface CountryDisplayProps {
  initialCountries: Country[];
}

const CountryDisplay: React.FC<CountryDisplayProps> = ({ initialCountries }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = useMemo(() => {
    if (!searchTerm) {
      return initialCountries;
    }
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return initialCountries.filter(country => {
      const commonName = country.name.common.toLowerCase();
      return commonName.includes(lowercasedSearchTerm);
    });
  }, [initialCountries, searchTerm]);

  return (
    <>
      <div className="mb-8 w-full max-w-md">
        <input
          type="text"
          placeholder="Pesquisar país"
          className="w-full p-3 pl-4 text-white border border-purple-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div
        className="
          grid gap-5 max-w-6xl w-full
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
        "
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <CountryFlag key={country.cca2} country={country} />
          ))
        ) : (
          <p className="col-span-full text-center text-xl text-gray-600">Sem resultados para "{searchTerm}".</p>
        )}
      </div>
    </>
  );
};

export default CountryDisplay;