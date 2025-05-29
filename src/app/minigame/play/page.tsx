'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Country } from '../../../app/@types/country';

const GAME_DURATION = 60;
const POINTS_PER_CORRECT_ANSWER = 100;

interface ProcessedCountry extends Country {
  searchNames?: string[];
  englishName: string;
  officialName: string;
}

async function getCountriesForGame(): Promise<ProcessedCountry[]> {
  const response = await fetch('/api/countries-game');
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }
  const countries = await response.json();

  return countries.map((country: Country) => ({
    ...country,
    englishName: country.name.common,
    officialName: country.name.official,
  }));
}

export default function MiniGamePlay() {
  const [countries, setCountries] = useState<ProcessedCountry[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [guessedCountryCodes, setGuessedCountryCodes] = useState<Set<string>>(new Set());

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const fetchedCountries = await getCountriesForGame();
        fetchedCountries.sort((a, b) => a.englishName.localeCompare(b.englishName));
        setCountries(fetchedCountries);
        setIsLoading(false);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      } catch (error) {
        if (error instanceof Error) {
            console.error('Error in API route:', error.message);
            setError(error.message);
            setIsLoading(false);
      }
    };
    loadCountries();
  }
  }, []);

  useEffect(() => {
    if (isLoading || error || countries.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          router.push(`/minigame/result?score=${score}`);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading, error, countries, score, router]);

  const playCorrectSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Error playing sound:", e)); 
    }
  }, []);

  const handleGuess = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim() || timeLeft <= 0) return;

    const normalizedGuess = guess.trim().toLowerCase();
    setGuess('');
    setFeedback(null);

    const foundCountry = countries.find(country =>
      country.searchNames?.includes(normalizedGuess)
    );

    if (foundCountry) {
      if (guessedCountryCodes.has(foundCountry.cca2)) {
        setFeedback(`Você já acertou: ${foundCountry.englishName}!`);
      } else {
        setScore((prevScore) => prevScore + POINTS_PER_CORRECT_ANSWER);
        setGuessedCountryCodes((prev) => new Set(prev.add(foundCountry.cca2)));
        setFeedback(`Correto! +${POINTS_PER_CORRECT_ANSWER} pontos por ${foundCountry.englishName}!`);
        playCorrectSound();
      }
    } else {
      setFeedback('Errado! Tente outro nome.');
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [guess, timeLeft, countries, guessedCountryCodes, playCorrectSound]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-2xl text-white">Carregando países...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-2xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-2xl text-gray-700">Erro interno da API.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4 relative">
      <audio ref={audioRef} src="/sounds/correct.mp3" preload="auto" />

      <div className="absolute top-4 w-full flex justify-between px-8">
        <div className="text-2xl font-bold">
          Pontuação: {score}
        </div>
        <div className="text-2xl font-bold">
          Tempo Restante: {timeLeft}s
        </div>
      </div>

      <h2 className="text-4xl font-bold mb-8">Guess The Country!</h2>

      <div className="mb-8 w-full max-w-6xl bg-gray-900 rounded-lg shadow-xl p-6 flex flex-col items-center border border-purple-800">
        <form onSubmit={handleGuess} className="w-full flex flex-col items-center">
          <input
            ref={inputRef}
            type="text"
            className="w-full p-3 pl-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-lg mb-4 bg-gray-700"
            placeholder="Digite o nome de um país"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-800 cursor-pointer hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-md transition duration-300 ease-in-out"
          >
            Inserir
          </button>
        </form>
        {feedback && (
          <p className={`mt-4 text-xl font-semibold ${feedback.startsWith('Correto') ? 'text-green-700' : feedback.startsWith('Errado') ? 'text-red-700' : 'text-orange-500'}`}>
            {feedback}
          </p>
        )}
      </div>

      <div className="mt-8 w-full max-w-7xl h-[400px] overflow-y-auto bg-gray-900 p-6 rounded-lg shadow-md border border-purple-800">
        <h3 className="text-2xl font-bold mb-4 text-center text-white">Lista de Países</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 text-lg">
          {countries.map((country) => (
            <li key={country.cca2} className={`truncate ${guessedCountryCodes.has(country.cca2) ? 'text-green-500 font-semibold' : 'text-gray-400'}`}>
              {guessedCountryCodes.has(country.cca2) ? country.officialName : '???'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}