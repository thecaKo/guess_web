"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Lock } from 'lucide-react';
import Link from "next/link";
import Cookies from "js-cookie"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    setError("");
    if (!email.includes("@") || !email.includes(".")) {
      setError("Por favor, insira um e-mail válido.");
      return false;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    return true;
  };

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("https://guessapi-production.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json()
        const refreshToken = data.token;

        Cookies.set('refreshToken', refreshToken, { expires: 7, secure: process.env.NODE_ENV === 'production' });

        setSuccess("Login bem-sucedido!");

        router.push('/');
        router.refresh();

      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao entrar.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor. Verifique sua conexão ou tente novamente.");
      return err
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl p-8 w-full max-w-md border border-purple-700">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="Logo da Empresa"
            width={150}
            height={150}
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-white text-center mb-8">Login</h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm font-semibold mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@example.com"
                className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors"
                required
                value={email}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 text-sm font-semibold mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo de 6 caracteres"
                className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors"
                required
                value={password}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-100 p-3 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-900 border border-green-700 text-green-100 p-3 rounded-md text-sm text-center">
              {success}
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 rounded-md font-bold text-lg transition-all duration-300
              ${isLoading
                ? "bg-purple-800 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              }`}
            disabled={isLoading}
          >
            {isLoading ? "Logando..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Ainda não tem conta?{" "}
          <Link href="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}