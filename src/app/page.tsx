export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Reaction Sync Player</h1>
        
        <p className="text-gray-600">
          Watch reaction videos synchronized with the original content.
        </p>
        
        <div className="space-y-3">
          <div className="bg-primary-100 text-primary-800 p-3 rounded-lg">
            Primary color example
          </div>
          
          <div className="bg-secondary-100 text-secondary-800 p-3 rounded-lg">
            Secondary color example
          </div>
          
          <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
            Gray color example
          </div>
        </div>
        
        <div className="pt-4">
          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition">
            Get Started
          </button>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500 pt-2">
          <span>© 2025 Reaction Sync</span>
          <span>Version 1.0</span>
        </div>
      </div>
    </main>
  );
} 