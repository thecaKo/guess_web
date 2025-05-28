// app/minigame/page.tsx
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guess the Flag - Mini-Game',
  description: 'Se divirta enquanto aprende um pouco sobre os paises do mundo!',
};

export default function MiniGameHome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4">
      <h1 className="text-5xl font-extrabold mb-8 text-center">Guess the Country!</h1>
      <p className="text-xl mb-12 text-center max-w-xl">
        Quantos paises consegue digitar em 60 segundos?
      </p>
      <Link href="/minigame/play" passHref>
        <button className="bg-purple-600 cursor-pointer hover:bg-purple-800 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          Começar o Jogo
        </button>
      </Link>
    </div>
  );
}