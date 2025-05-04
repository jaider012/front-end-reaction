import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-white text-gray-900 dark:bg-gray-900 dark:text-white`}>{children}</body>
    </html>
  );
} 