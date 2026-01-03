import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import CardPage from './pages/CardPage';
import GenerationPage from './pages/GenerationPage';
import SideMenu from './components/SideMenu';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1A1A1A] relative">
      {/* Header with Menu Button */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-[#1A1A1A]/80 backdrop-blur-md border-b border-[#404040]/30">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => setMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#2D2D2D] hover:bg-[#404040] transition-colors"
          >
            <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-[#D4AF37] font-serif tracking-widest text-sm">SHASN</span>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Side Menu */}
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/card" element={<CardPage />} />
            <Route path="/generate" element={<GenerationPage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
