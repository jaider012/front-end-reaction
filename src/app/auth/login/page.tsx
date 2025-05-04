'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/';
  
  const { login, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Limpiar el error cuando el usuario comienza a escribir
  const handleInputChange = (setter: (value: string) => void, value: string) => {
    if (error) clearError();
    setter(value);
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      await login({ email, password });
      toast.success('¡Bienvenido de nuevo!');
      router.push(returnUrl);
    } catch {
      // El error ya se manejó en el store y se muestra con toast
    }
  };
  
  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => handleInputChange(setEmail, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
            placeholder="tu@email.com"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <Link 
              href="/auth/forgot-password" 
              className="text-xs text-purple-600 hover:text-purple-800"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => handleInputChange(setPassword, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              placeholder="········"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
            Mantener sesión iniciada
          </label>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-md hover:shadow-lg transition-all duration-200 flex justify-center"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </div>
      </form>
      
      {/* Divider with text */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500">O continúa con</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      
      {/* Social login buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          type="button" 
          className="py-2.5 px-4 flex justify-center items-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl transition-all duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.56V20.34H19.28C21.36 18.42 22.56 15.59 22.56 12.25Z" fill="#4285F4"/>
            <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.56C14.73 18.21 13.48 18.59 12 18.59C9.09 18.59 6.67 16.64 5.79 14H2.12V16.87C3.94 20.56 7.69 23 12 23Z" fill="#34A853"/>
            <path d="M5.79 14C5.57 13.34 5.45 12.63 5.45 11.9C5.45 11.17 5.57 10.46 5.79 9.8V6.93H2.12C1.41 8.44 1 10.15 1 11.9C1 13.65 1.41 15.36 2.12 16.87L5.79 14Z" fill="#FBBC05"/>
            <path d="M12 5.21C13.59 5.21 15.03 5.8 16.17 6.88L19.28 3.77C17.46 2.02 14.97 1 12 1C7.69 1 3.94 3.44 2.12 7.13L5.79 10C6.67 7.36 9.09 5.21 12 5.21Z" fill="#EA4335"/>
          </svg>
          <span className="text-sm font-medium">Google</span>
        </button>
        <button 
          type="button" 
          className="py-2.5 px-4 flex justify-center items-center gap-2 bg-[#24292F] hover:bg-[#333] text-white rounded-xl transition-all duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997" fill="white"/>
          </svg>
          <span className="text-sm font-medium">GitHub</span>
        </button>
      </div>
    </>
  );
} 