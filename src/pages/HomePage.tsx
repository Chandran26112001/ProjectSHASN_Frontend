import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getRandomCard } from '../api/api';
import type { DeckType } from '../types/index.js';

export default function HomePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<DeckType | null>(null);

    const handleDrawCard = async (deck: DeckType) => {
        setLoading(deck);
        try {
            const card = await getRandomCard(deck);
            navigate('/card', { state: { card, deck } });
        } catch (error) {
            console.error('Error fetching card:', error);
            alert('Failed to fetch card. Make sure the backend is running.');
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16 pt-20">
            {/* Decorative background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#CD7F32]/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/3 rounded-full blur-3xl" />
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 text-center w-full max-w-md flex flex-col items-center"
            >
                {/* Logo/Title */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h1 className="shasn-title text-5xl md:text-7xl font-bold text-[#D4AF37] mb-4">
                        SHASN
                    </h1>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-4" />
                    <p className="text-[#B0B0B0] text-lg md:text-xl tracking-wide">
                        Political Strategy Board Game
                    </p>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-8 text-[#666] text-sm md:text-base max-w-md mx-auto leading-relaxed"
                >
                    Draw ideology cards and make strategic decisions that shape your political journey
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-12 flex flex-col gap-4 w-full px-4"
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDrawCard('gemini')}
                        disabled={loading !== null}
                        className="btn-primary w-full text-base relative overflow-hidden group disabled:opacity-50"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {loading === 'gemini' ? (
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                            )}
                            Draw from Gemini Deck
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F9A825] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDrawCard('gpt')}
                        disabled={loading !== null}
                        className="btn-secondary w-full text-base disabled:opacity-50"
                    >
                        <span className="flex items-center justify-center gap-2">
                            {loading === 'gpt' ? (
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            )}
                            Draw from GPT Deck
                        </span>
                    </motion.button>
                </motion.div>

                {/* Footer hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-16 text-[#555] text-xs"
                >
                    Tap the menu icon for more options
                </motion.p>
            </motion.div>
        </div>
    );
}
