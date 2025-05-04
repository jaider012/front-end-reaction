'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';
import { useAuthStore } from '@/store/auth';

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { checkAuth } = useAuthStore();
  const pathname = usePathname();
  
  // Verificar autenticación al montar el componente
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isLoginPage = pathname === '/auth/login';
  
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full mx-auto">
          {/* Logo y nombre de la app */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-purple-600">
                    <polygon points="23 7 16 12 23 17 23 7"/>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                </div>
                <span className="ml-3 text-2xl font-bold text-white">Reaction Sync</span>
              </div>
            </Link>
            <h2 className="mt-3 text-xl text-white font-medium">
              {isLoginPage ? 'Inicia sesión en tu cuenta' : 'Crea una nueva cuenta'}
            </h2>
          </div>
          
          {/* Tarjeta de contenido */}
          <div className="bg-white backdrop-blur-sm bg-opacity-90 rounded-2xl shadow-xl p-6 sm:p-8">
            {children}
          </div>
          
          {/* Enlaces de ayuda */}
          <div className="mt-6 text-center">
            <p className="text-white text-sm">
              {isLoginPage ? '¿Nuevo en Reaction Sync?' : '¿Ya tienes una cuenta?'}{' '}
              <Link
                href={isLoginPage ? '/auth/register' : '/auth/login'}
                className="font-medium hover:text-purple-200 underline transition"
              >
                {isLoginPage ? 'Crear cuenta' : 'Iniciar sesión'}
              </Link>
            </p>
            <p className="mt-3 text-white/70 text-xs">
              Al continuar, aceptas nuestros{' '}
              <Link href="/terms" className="underline hover:text-white">
                Términos de Servicio
              </Link>{' '}
              y{' '}
              <Link href="/privacy" className="underline hover:text-white">
                Política de Privacidad
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
} 