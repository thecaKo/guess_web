'use client'; 

import Link from 'next/link';
import React, { useState, useEffect } from 'react'; 

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return undefined;
}

export default function MiniGameHome() {
  const [hasRefreshToken, setHasRefreshToken] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getCookie('refreshToken'); 
    setHasRefreshToken(!!token);
  }, []);


  if (hasRefreshToken === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-2xl text-white">Verificando login...</p>
      </div>
    );
  }

  if (hasRefreshToken === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4">
        <h1 className="text-5xl font-extrabold mb-8 text-center">Acesso Restrito</h1>
        <p className="text-xl mb-6 text-center max-w-xl">
          Você precisa fazer login para acessar o minigame.
        </p>
        <Link href="/login" passHref>
          <button className="bg-purple-800 cursor-pointer hover:bg-purple-900 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Fazer Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4">
      <h1 className="text-5xl font-extrabold mb-8 text-center">Guess the Country!</h1>
      <p className="text-xl mb-12 text-center max-w-xl">
        Quantos países consegue digitar em 60 segundos?
      </p>
      <Link href="/minigame/play" passHref>
        <button className="bg-purple-600 cursor-pointer hover:bg-purple-800 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          Começar o Jogo
        </button>
      </Link>
    </div>
  );
}