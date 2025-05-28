import './globals.css';
import Sidebar from '@/app/components/SideBar';
import { cookies } from 'next/headers';

interface UserData {
  profile: {
    username: string;
    email: string;
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let userData: UserData | null = null;
  const refreshToken = (await cookies()).get('refreshToken')?.value;

  if (refreshToken) {
    try {
      const response = await fetch('http://localhost:3333/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        },
        cache: 'no-store',
      });

      if (response.ok) {
        userData = await response.json();
      } else {
        console.error('Falha ao buscar informações do usuário:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Erro ao conectar com a API de informações do usuário:', error);
    }
  }

  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased text-gray-900">
        <div className="flex h-screen overflow-hidden">
          <Sidebar userName={userData?.profile.username} />
          <main className="flex-grow h-screen overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
