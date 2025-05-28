'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MiniGameResult() {
  const searchParams = useSearchParams();
  const [score, setScore] = useState(0);

  useEffect(() => {
    const finalScore = searchParams.get('score');
    if (finalScore) {
      setScore(parseInt(finalScore, 10));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4">
      <h1 className="text-5xl font-extrabold mb-8 text-center">Acabou o tempo!</h1>
      <p className="text-3xl font-semibold mb-12">Pontuação: <span className="text-blue-600">{score}</span></p>
      <Link href="/minigame" passHref>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          Repetir
        </button>
      </Link>
      <Link href="/" passHref>
        <button className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg text-xl shadow-md transition duration-300 ease-in-out">
          Voltar
        </button>
      </Link>
    </div>
  );
}