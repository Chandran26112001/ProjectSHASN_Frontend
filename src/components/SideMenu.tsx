import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Deck by Gemini', path: '/?deck=gemini' },
    { label: 'Deck by GPT', path: '/?deck=gpt' },
    { label: 'Generate Your Own Card', path: '/generate' },
];

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
    const location = useLocation();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed left-0 top-0 h-full w-72 bg-[#1E1E1E] border-r border-[#404040] z-50 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-[#404040]">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-serif tracking-widest text-[#D4AF37]">
                                    SHASN
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2D2D2D] hover:bg-[#404040] transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <nav className="p-6 space-y-2">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 + 0.1 }}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={onClose}
                                        className={`block w-full py-4 px-5 rounded-xl text-left transition-all duration-200 ${location.pathname + location.search === item.path
                                            ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                                            : 'hover:bg-[#2D2D2D] text-[#B0B0B0] hover:text-white'
                                            }`}
                                    >
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Footer */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#404040]">
                            <p className="text-xs text-[#666] text-center">
                                SHASN Card Deck Manager
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
