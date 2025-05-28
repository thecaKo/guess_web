'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
import { Award } from 'lucide-react'; 

interface RankingEntry {
  id: string;
  username: string;
  bestScore: number;
}

export default function RankingPage() {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:3333/ranking'); 
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Falha ao buscar o ranking do servidor.');
        }

        const data: RankingEntry[] = await response.json(); 
        
        const mappedRanking = data.map(user => ({
          id: user.id,
          name: user.username,
          score: user.bestScore,
        }));

        setRanking(mappedRanking);
      } catch (err: any) {
        console.error("Erro no fetch do ranking:", err);
        setError(err.message || 'Erro ao carregar o ranking.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
        <p className="text-2xl">Carregando Ranking...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
        <p className="text-2xl text-red-600">Erro: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4">
      <h1 className="text-5xl font-extrabold mb-8 text-center">Ranking</h1>

      <div className="w-full max-w-5xl bg-gray-900 rounded-lg shadow-xl p-6 border border-purple-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-white flex items-center justify-center gap-3">
          <Award size={32} className="text-yellow-400" /> Top 10 <Award size={32} className="text-yellow-400" />
        </h2>
        
        {ranking.length === 0 ? (
          <p className="text-xl text-center text-gray-400">Nenhum dado de ranking disponível ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Posição
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Pontuação
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {ranking.map((entry, index) => (
                  <tr key={entry.id} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-gray-700`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {index + 1}º
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {entry.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-green-400">
                      {entry.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Link href="/minigame" passHref>
          <button className="bg-purple-600 cursor-pointer hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
            Voltar para o MiniGame
          </button>
        </Link>
      </div>
    </div>
  );
}