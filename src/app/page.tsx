'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Reaction Sync Player</h1>
        
        <p className="text-gray-600">
          Watch reaction videos synchronized with the original content.
        </p>
        
        <div className="space-y-3">
            <div className="bg-purple-100 text-purple-800 p-3 rounded-lg">
              Synchronize reaction videos with originals
          </div>
          
            <div className="bg-blue-100 text-blue-800 p-3 rounded-lg">
              Customize your viewing experience
          </div>
          
          <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
              Share your synced content with others
          </div>
        </div>
        
        <div className="pt-4">
            <Link 
              href="/videos" 
              className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition text-center"
            >
            Get Started
            </Link>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500 pt-2">
          <span>© 2025 Reaction Sync</span>
          <span>Version 1.0</span>
        </div>
      </div>
    </main>
    </>
  );
} 