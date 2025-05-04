'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { toast } from 'react-hot-toast';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  authMessage?: string;
}

/**
 * AuthGuard - Componente para proteger rutas que requieren autenticación
 * @param children - Contenido a renderizar si la autenticación es correcta
 * @param requireAuth - Si es true, la ruta requiere autenticación
 * @param redirectTo - Ruta a la que redirigir si la autenticación falla
 * @param authMessage - Mensaje a mostrar si la autenticación falla
 */
export default function AuthGuard({ 
  children, 
  requireAuth = true, 
  redirectTo = '/auth/login',
  authMessage = 'Necesitas iniciar sesión para acceder a esta página'
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, token, getProfile } = useAuthStore();
  
  useEffect(() => {
    // Si tenemos token pero no user, intentamos obtener el perfil
    if (token && !isAuthenticated && !isLoading) {
      getProfile().catch(() => {
        // Si falla, limpiamos el token corrupto
        useAuthStore.getState().logout();
      });
    }
    
    // Verificamos la autenticación cuando termina de cargar
    if (!isLoading) {
      const isAuthRoute = pathname.startsWith('/auth/');
      
      // Si requiere auth y no está autenticado
      if (requireAuth && !isAuthenticated) {
        toast.error(authMessage);
        router.push(`${redirectTo}?returnUrl=${encodeURIComponent(pathname)}`);
      }
      
      // Si está en una ruta de auth pero ya está autenticado
      if (isAuthRoute && isAuthenticated) {
        const params = new URLSearchParams(window.location.search);
        const returnUrl = params.get('returnUrl') || '/';
        router.push(returnUrl);
      }
    }
  }, [
    isAuthenticated, 
    isLoading, 
    requireAuth, 
    router, 
    pathname, 
    redirectTo,
    authMessage,
    token,
    getProfile
  ]);
  
  // Mostrar spinner mientras verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  
  // Verificamos la condición de renderizado
  const shouldRender = requireAuth ? isAuthenticated : true;
  
  return shouldRender ? <>{children}</> : null;
} 