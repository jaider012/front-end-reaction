import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';

// Importar nuestro plugin de opacidad personalizado
import opacityVariantsPlugin from './src/plugins/opacity-variants.js';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
                    light: 'rgb(var(--color-primary-light) / <alpha-value>)',
                    dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                },
                secondary: {
                    DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
                    light: 'rgb(var(--color-secondary-light) / <alpha-value>)',
                    dark: 'rgb(var(--color-secondary-dark) / <alpha-value>)',
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                    700: '#6d28d9',
                    800: '#5b21b6',
                    900: '#4c1d95',
                    950: '#2e1065',
                },
                accent: {
                    1: 'rgb(var(--color-accent-1) / <alpha-value>)',
                    2: 'rgb(var(--color-accent-2) / <alpha-value>)',
                },
                success: 'rgb(var(--color-success) / <alpha-value>)',
                warning: 'rgb(var(--color-warning) / <alpha-value>)',
                error: 'rgb(var(--color-error) / <alpha-value>)',
                info: 'rgb(var(--color-info) / <alpha-value>)',
                background: 'rgb(var(--color-background) / <alpha-value>)',
                foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
                surface: {
                    1: 'rgb(var(--color-surface-1) / <alpha-value>)',
                    2: 'rgb(var(--color-surface-2) / <alpha-value>)',
                    3: 'rgb(var(--color-surface-3) / <alpha-value>)',
                },
                gray: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                    950: '#030712',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
            },
            spacing: {
                '18': '4.5rem',
                '112': '28rem',
                '128': '32rem',
                '144': '36rem',
            },
            fontFamily: {
                sans: ['Inter var', 'Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
            },
            fontSize: {
                '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
            },
            borderRadius: {
                'sm': 'var(--radius-sm)',
                'md': 'var(--radius-md)',
                'lg': 'var(--radius-lg)',
                'xl': 'var(--radius-xl)',
                '2xl': 'var(--radius-2xl)',
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'bounce-slow': 'bounce 3s infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
            },
            screens: {
                '3xl': '1920px',
            },
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
            },
            minHeight: {
                '11': '2.75rem',
                '112': '28rem',
                '128': '32rem',
                '144': '36rem',
            },
            opacity: {
                '15': '0.15',
                '35': '0.35',
                '65': '0.65',
                '85': '0.85',
            },
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },
            transitionDuration: {
                'fast': 'var(--animation-fast)',
                'normal': 'var(--animation-normal)',
                'slow': 'var(--animation-slow)',
            },
            transitionDelay: {
                '400': '400ms',
            },
            backdropBlur: {
                xs: '2px',
            },
            aspectRatio: {
                '4/3': '4 / 3',
                '3/2': '3 / 2',
                '2/3': '2 / 3',
                '9/16': '9 / 16',
            },
            // Añadir utilidades relacionadas con la opacidad
            backgroundColor: {
                'black-opacity-75': 'rgba(0, 0, 0, 0.75)',
                'black-opacity-80': 'rgba(0, 0, 0, 0.8)',
                'white-opacity-20': 'rgba(255, 255, 255, 0.2)',
                'white-opacity-30': 'rgba(255, 255, 255, 0.3)',
                'blue-opacity-20': 'rgba(59, 130, 246, 0.2)',
            },
            textColor: {
                'white-opacity-80': 'rgba(255, 255, 255, 0.8)',
            },
            borderColor: {
                'blue-opacity-50': 'rgba(59, 130, 246, 0.5)',
            },
            boxShadow: {
                'sm': 'var(--shadow-sm)',
                'md': 'var(--shadow-md)',
                'lg': 'var(--shadow-lg)',
                'xl': 'var(--shadow-xl)',
            },
        },
    },
    plugins: [
        forms,
        typography,
        aspectRatio,
        opacityVariantsPlugin,
    ],
    darkMode: 'class',
    future: {
        hoverOnlyWhenSupported: true,
    },
}; 