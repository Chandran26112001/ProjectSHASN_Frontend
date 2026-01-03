import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GenerationPage() {
    const navigate = useNavigate();
    const [keywords, setKeywords] = useState('');
    const [brutality, setBrutality] = useState(5);

    const handleGenerate = () => {
        // Placeholder - will be implemented later
        alert('Generation feature coming soon! This will generate custom ideology cards based on your input.');
    };

    return (
        <div className="min-h-screen flex flex-col p-6 pt-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-2xl md:text-3xl font-serif text-[#D4AF37] tracking-wide mb-2">
                    Generate Your Own Card
                </h1>
                <p className="text-[#666] text-sm max-w-md mx-auto">
                    Create custom ideology cards based on your topics and preferred intensity
                </p>
            </motion.div>

            {/* Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 max-w-md mx-auto w-full"
            >
                {/* Keywords Input */}
                <div className="mb-8">
                    <label className="block text-[#B0B0B0] text-sm font-medium mb-3">
                        Keywords / Subject Areas
                    </label>
                    <div className="relative">
                        <textarea
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="Enter topics like: technology, healthcare, education, environment..."
                            className="w-full bg-[#252525] border-2 border-[#404040] rounded-xl px-4 py-4 text-white placeholder-[#555] focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                            rows={4}
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-[#555]">
                            {keywords.length} / 200
                        </div>
                    </div>
                </div>

                {/* Brutality Slider */}
                <div className="mb-10">
                    <label className="block text-[#B0B0B0] text-sm font-medium mb-3">
                        Questions Brutality Level
                    </label>
                    <div className="bg-[#252525] border-2 border-[#404040] rounded-xl p-5">
                        <div className="flex justify-between text-xs text-[#666] mb-3">
                            <span>Mild</span>
                            <span className="text-[#D4AF37] font-bold text-lg">{brutality}</span>
                            <span>Brutal</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={brutality}
                            onChange={(e) => setBrutality(Number(e.target.value))}
                            className="w-full h-2 bg-[#404040] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                            style={{
                                background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${(brutality - 1) * 11.1}%, #404040 ${(brutality - 1) * 11.1}%, #404040 100%)`
                            }}
                        />
                        <div className="flex justify-between mt-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                <div
                                    key={n}
                                    className={`w-1 h-1 rounded-full ${n <= brutality ? 'bg-[#D4AF37]' : 'bg-[#404040]'}`}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="text-[#555] text-xs mt-3 text-center">
                        {brutality <= 3 ? 'Questions will be relatively tame and family-friendly' :
                            brutality <= 6 ? 'Questions will challenge but remain respectful' :
                                brutality <= 8 ? 'Questions will be provocative and thought-provoking' :
                                    'Questions will be intense and potentially controversial'}
                    </p>
                </div>

                {/* Generate Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerate}
                    disabled={keywords.trim().length === 0}
                    className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Generate Card
                    </span>
                </motion.button>

                <button
                    onClick={() => navigate('/')}
                    className="w-full text-[#666] hover:text-[#B0B0B0] text-sm transition-colors py-3"
                >
                    ← Back to Home
                </button>
            </motion.div>

            {/* Decorative elements */}
            <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </div>
    );
}
