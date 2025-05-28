// src/app/layout.tsx
import './globals.css';

import Sidebar from '@/app/components/SideBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased text-gray-900">
        {/*
          Este div é o contêiner flex principal.
          - flex: Ativa o flexbox
          - h-screen: Garante que ele ocupe 100% da altura da viewport
          - overflow-hidden: Garante que ele não crie rolagem se houver conteúdo transbordando
        */}
        <div className="flex h-screen overflow-hidden">
          {/*
            Sidebar:
            - w-64: Largura fixa (256px)
            - h-screen: Altura total da viewport
          */}
          <Sidebar/>

          {/*
            Conteúdo principal:
            - flex-grow: Permite que este elemento ocupe todo o espaço restante horizontalmente
            - h-screen: Garante que ele ocupe 100% da altura da viewport
            - overflow-y-auto: Permite rolagem vertical SOMENTE dentro desta área, se o conteúdo exceder a altura
            - p-4: Padding para não colar o conteúdo nas bordas
          */}
          <main className="flex-grow h-screen overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}