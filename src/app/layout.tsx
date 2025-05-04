import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

// Configuración de las fuentes
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Reaction Sync Player',
  description: 'Watch reaction videos synchronized with the original content',
  keywords: [
    'reaction videos',
    'video synchronization',
    'video player',
    'content creator',
    'streaming',
  ],
  authors: [{ name: 'Reaction Sync Player Team' }],
  openGraph: {
    title: 'Reaction Sync Player',
    description: 'Watch reaction videos synchronized with the original content',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Sync Player',
    description: 'Watch reaction videos synchronized with the original content',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#7C3AED" />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary-dark">
        {children}
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgb(var(--color-surface-1))',
              color: 'rgb(var(--color-foreground))',
              borderRadius: 'var(--radius-lg)',
              fontSize: '0.875rem',
              boxShadow: 'var(--shadow-lg)',
            },
            success: {
              iconTheme: {
                primary: 'rgb(var(--color-success))',
                secondary: 'white',
              },
            },
            error: {
              iconTheme: {
                primary: 'rgb(var(--color-error))',
                secondary: 'white',
              },
            },
          }}
        />
      </body>
    </html>
  );
} 