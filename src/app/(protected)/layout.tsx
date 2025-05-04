'use client';

import { ReactNode, useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/store/auth';

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { checkAuth } = useAuthStore();

  // Verificar autenticación al montar el componente
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthGuard requireAuth={true} redirectTo="/auth/login">
      <Navbar />
      <main className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        {children}
      </main>
    </AuthGuard>
  );
} 