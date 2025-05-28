'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MessageSquare,
  User,
  Settings,
  HelpCircle,
  Users,
  LogIn,
  UserPlus,
  LogOut,
  Award, 
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface SidebarProps {
  userName?: string;
  userRole?: string;
  systemVersion?: string;
  apiVersion?: string;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  link: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  userName,
  userRole,
  systemVersion,
  apiVersion,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const isLoggedIn = !!userName;

  useEffect(() => {
    const currentPath = sidebarItems.find(item => pathname.startsWith(item.link));
    if (currentPath) {
      setActiveItem(currentPath.id);
    } else {
      setActiveItem(null);
    }
  }, [pathname]);

  const sidebarItems: SidebarItem[] = [
    { id: 'MiniGame', label: 'MiniGame', icon: Users, link: '/minigame' },
    { id: 'Ranking', label: 'Ranking', icon: Award, link: '/ranking' },
    { id: 'Ajustes', label: 'Ajustes', icon: Settings, link: '/ajustes' },
    { id: 'Documentacao', label: 'Documentação', icon: HelpCircle, link: '/documentacao' },
    { id: 'Bandeiras', label: 'Bandeiras', icon: MessageSquare, link: '/flags' },
  ];

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault(); 

    try {
      const response = await fetch('http://localhost:3333/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log("Logout bem-sucedido na API de backend.");
      } else {
      }
    } catch (error) {
      console.error("Erro ao conectar com o endpoint de logout:", error);
    } finally {
      Cookies.remove('refreshToken');
      console.log("Usuário deslogado localmente!");
      router.push('/');
      router.refresh(); 
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-gray-200 h-screen flex flex-col shadow-lg p-5">
      <div className="pb-5 mb-5 border-b border-gray-700">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Amplie Marketing Logo"
            width={200}
            height={200}
            priority
            className="cursor-pointer"
          />
        </Link>
      </div>

      <nav className="flex-grow">
        <ul>
          {sidebarItems.map((item) => {
            const isActive = activeItem === item.id;

            return (
              <li key={item.id} className="mb-1">
                <Link
                  href={item.link}
                  className={`flex items-center p-3 rounded-lg text-sm transition-colors duration-200
                    hover:bg-purple-800 hover:text-white
                    ${isActive
                      ? `text-white font-bold border-l-4 border-purple-500 bg-purple-900`
                      : ''
                    }`}
                >
                  <item.icon className="mr-4" size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="pt-5 border-t border-gray-700 mt-auto">
        {isLoggedIn ? (
          <>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex justify-center items-center mr-4">
                <User size={30} className="text-gray-400" />
              </div>
              <div>
                <span className="font-bold text-white block">{userName}</span>
                <span className="text-sm text-gray-400">{userRole}</span>
              </div>
            </div>
            <div className="flex gap-2 text-xs">
              {systemVersion && (
                <span className="bg-green-600 text-white px-2 py-1 rounded">
                  Sistema {systemVersion}
                </span>
              )}
              {apiVersion && (
                <span className="bg-blue-600 text-white px-2 py-1 rounded">
                  API {apiVersion}
                </span>
              )}
            </div>
            <Link
              href="/" 
              onClick={handleLogout}
              className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center mt-4 transition-colors duration-200"
            >
              <LogOut className="mr-2" size={20} />
              Logout
            </Link>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <Link
              href="/register"
              className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-center transition-colors duration-200"
            >
              <UserPlus className="mr-2" size={20} /> Registrar
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-center transition-colors duration-200"
            >
              <LogIn className="mr-2" size={20} /> Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;