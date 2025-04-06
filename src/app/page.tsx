import { Suspense } from 'react';
import { SyncSessionManager } from '@/components/SyncSessionManager';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
          border: '1px solid #444',
        },
      }} />
      
      {/* Header */}
      <header className="bg-black/30 border-b border-gray-800 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <span className="bg-blue-600 text-white p-1 rounded mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Reaction Sync Player
          </h1>
          <div className="flex items-center space-x-4">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
                Perfectly Synchronized <span className="text-blue-500">Reaction Videos</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Watch reaction videos aligned perfectly with the original content. 
                Control both videos simultaneously with precise timing and customizable layouts.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors">
                  Create New Session
                </button>
                <button className="bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-900/30 px-6 py-3 rounded-lg text-lg font-medium transition-colors">
                  Browse Examples
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-2 rounded-lg border border-gray-800">
              <div className="aspect-video rounded-lg overflow-hidden bg-black border border-gray-700">
                <Suspense
                  fallback={
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                      <p className="text-blue-400">Loading player...</p>
                    </div>
                  }
                >
                  <SyncSessionManager />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to create the perfect synchronized viewing experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/80 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="bg-blue-600/20 p-3 rounded-lg inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Synchronized Playback
              </h3>
              <p className="text-gray-300">
                Watch reaction videos perfectly synchronized with the original content.
                Control both videos simultaneously with precise timing adjustments.
              </p>
            </div>

            <div className="bg-gray-800/80 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="bg-purple-600/20 p-3 rounded-lg inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Flexible Layouts
              </h3>
              <p className="text-gray-300">
                Choose from multiple viewing layouts including side-by-side, stacked,
                and grid views to suit your preferences and screen size.
              </p>
            </div>

            <div className="bg-gray-800/80 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="bg-green-600/20 p-3 rounded-lg inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Easy Sharing
              </h3>
              <p className="text-gray-300">
                Generate shareable links to your synchronized sessions and share them
                with friends or your community in just one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Getting started is easy and takes just a few seconds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-600 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-6">1</div>
              <h3 className="text-xl font-bold text-white mb-3">Add Video URLs</h3>
              <p className="text-gray-300">
                Paste the URLs of both the reaction video and the original content video
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-600 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-6">2</div>
              <h3 className="text-xl font-bold text-white mb-3">Sync the Videos</h3>
              <p className="text-gray-300">
                Use our sync tools to align both videos at the perfect timestamp
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-600 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-6">3</div>
              <h3 className="text-xl font-bold text-white mb-3">Watch & Share</h3>
              <p className="text-gray-300">
                Enjoy the synchronized experience and share it with others
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors">
              Create Your First Sync Session
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h2 className="text-xl font-bold text-white flex items-center">
                <span className="bg-blue-600 text-white p-1 rounded mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                Reaction Sync Player
              </h2>
              <p className="text-gray-400 mt-2">The best way to watch reaction videos</p>
            </div>
            
            <div className="flex space-x-8">
              <div>
                <h3 className="text-gray-300 font-semibold mb-3">Links</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                  <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How it Works</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Examples</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-gray-300 font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 Reaction Sync Player. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
} 