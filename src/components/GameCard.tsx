import React, { useState, useCallback, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from './GameCard.module.css';
import type { Card, PersonaType, ResourceType } from '../types/index.js';

// --- SVG Icons Components ---

const AlertIconNone = () => null;

const AlertIconSingle = () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="17" y="0.707107" width="23" height="23" transform="rotate(45 17 0.707107)" fill="#D65A5A" stroke="white" strokeWidth="2" />
        <path d="M15.5 7H18.5V19H15.5V7ZM15.5 22H18.5V25H15.5V22Z" fill="white" />
    </svg>
);

const AlertIconDouble = () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="17" y="0.707107" width="23" height="23" transform="rotate(45 17 0.707107)" fill="#D65A5A" stroke="white" strokeWidth="2" />
        <path d="M14 7H17V17H14V7ZM14 21H17V24H14V21ZM19 7H22V17H19V7ZM19 21H22V24H19V21Z" fill="white" />
    </svg>
);

const AlertIcon = ({ cautionLevel }: { cautionLevel: string }) => {
    if (cautionLevel === 'double') return <AlertIconDouble />;
    if (cautionLevel === 'single') return <AlertIconSingle />;
    return <AlertIconNone />;
};

const VDividerIcon = () => (
    <svg width="30" height="18" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0L15 18L30 0H0Z" fill="#EDEEEF" />
        <path d="M2 1L15 16L28 1H2Z" stroke="#122C3E" strokeWidth="2" />
        <path d="M6 1L15 11L24 1H6Z" stroke="#122C3E" strokeWidth="2" />
    </svg>
);

// Refined SVG with corrected coordinates to prevent stroke overlap at acute angles
const SupremoBoxSvg = () => (
    <svg className={styles.supremoSvg} viewBox="0 0 260 70" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        {/* Outer border */}
        <path d="M35 1 H225 L259 35 L225 69 H35 L1 35 L35 1Z" fill="#EDEEEF" stroke="#122C3E" strokeWidth="2" />
        {/* Inner border - coordinates adjusted inwards to prevent miter join overlap */}
        <path d="M39 7 H221 L250 35 L221 63 H39 L11 35 L39 7Z" fill="none" stroke="#122C3E" strokeWidth="1.5" strokeOpacity="0.6" />
    </svg>
)


// --- Main Component ---

interface GameCardProps {
    card: Card | null;
    isFlipped: boolean;
    onFlip: () => void;
    onNextCard: () => void;
    isLoading: boolean;
    resources: ResourceType[];
}

// Persona bottom section colors
const personaBottomColors: Record<PersonaType, string> = {
    'THE IDEALIST': '#9a8e22ff',
    'THE CAPITALIST': '#2D5A3D',
    'THE SHOWSTOPPER': '#2B4A7F',
    'THE SUPREMO': '#8B3A3A',
};

function ResourceIcon({ type }: { type: ResourceType }) {
    const iconMap: Record<ResourceType, React.ReactNode> = {
        'TRUST': (
            <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="48" cy="54" r="45" fill="#DAA520" />
                <circle cx="50" cy="50" r="45" fill="#FBC02D" />
                <g transform="translate(50,50)" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round">
                    <path d="M0,-20 L6,-7 L20,-7 L9,2 L13,16 L0,8 L-13,16 L-9,2 L-20,-7 L-6,-7 Z" />
                    <path d="M0,-38 L11,-13 M38,-13 L17,4 M24,30 L0,15 M-24,30 L-17,4 M-38,-13 L-11,-13" opacity="0.8" />
                    <path d="M0,-38 L12,-14 L38,-14 L17,4 L25,30 L0,16 L-25,30 L-17,4 L-38,-14 L-12,-14 Z" />
                </g>
            </svg>
        ),
        'FUNDS': (
            <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="48" cy="54" r="45" fill="#33691E" />
                <circle cx="50" cy="50" r="45" fill="#7CB342" />
                <g transform="translate(50,50)" stroke="white" strokeWidth="1.5" fill="none">
                    <path d="M-15,-5 L-5,-15 L15,-5 L15,5 L-5,15 L-15,5 Z" />
                    <path d="M-30,-15 L-15,-30 L15,-30 L30,-15 L30,15 L15,30 L-15,30 L-30,15 Z" />
                    <line x1="-15" y1="-5" x2="-30" y2="-15" />
                    <line x1="-5" y1="-15" x2="-15" y2="-30" />
                    <line x1="-5" y1="-15" x2="15" y2="-30" />
                    <line x1="15" y1="-5" x2="30" y2="-15" />
                    <line x1="15" y1="5" x2="30" y2="15" />
                    <line x1="-5" y1="15" x2="15" y2="30" />
                    <line x1="-5" y1="15" x2="-15" y2="30" />
                    <line x1="-15" y1="5" x2="-30" y2="15" />
                </g>
            </svg>
        ),
        'MEDIA': (
            <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="48" cy="54" r="45" fill="#1A237E" />
                <circle cx="50" cy="50" r="45" fill="#3949AB" />
                <g stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M35,50 Q50,35 65,50 Q50,65 35,50 Z" />
                    <circle cx="50" cy="50" r="5" />
                    <line x1="35" y1="50" x2="10" y2="70" />
                    <line x1="35" y1="50" x2="20" y2="20" />
                    <line x1="50" y1="35" x2="50" y2="10" />
                    <line x1="50" y1="35" x2="80" y2="20" />
                    <line x1="65" y1="50" x2="90" y2="30" />
                    <line x1="65" y1="50" x2="80" y2="80" />
                    <line x1="50" y1="65" x2="50" y2="90" />
                    <line x1="50" y1="65" x2="20" y2="80" />
                </g>
            </svg>
        ),
        'CLOUT': (
            <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="48" cy="54" r="45" fill="#B71C1C" />
                <circle cx="50" cy="50" r="45" fill="#E53935" />
                <g stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round">
                    <line x1="50" y1="50" x2="50" y2="10" />
                    <line x1="50" y1="50" x2="80" y2="20" />
                    <line x1="50" y1="50" x2="90" y2="50" />
                    <line x1="50" y1="50" x2="80" y2="80" />
                    <line x1="50" y1="50" x2="50" y2="90" />
                    <line x1="50" y1="50" x2="20" y2="80" />
                    <line x1="50" y1="50" x2="10" y2="50" />
                    <line x1="50" y1="50" x2="20" y2="20" />
                    <path fill="#E53935" stroke="white" strokeWidth="2" strokeLinejoin="round"
                        d="M42,80 L44,60 L35,52 L38,40 L45,45 L48,35 L55,40 L58,32 L65,38 L68,48 L62,55 L65,65 L55,80 Z" />
                    <path d="M45,45 L52,50 M55,40 L59,46 M65,38 L62,55" />
                </g>
            </svg>
        ),
    };

    return (
        <div
            style={{
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.3))'
            }}
        >
            {iconMap[type]}
        </div>
    );
}

const GameCard: React.FC<GameCardProps> = ({ card, isFlipped, onFlip, onNextCard, isLoading, resources }) => {
    // Touch/swipe state for gesture handling
    const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
    const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

    // Animation controls for the flip effect
    const controls = useAnimation();
    const [isAnimating, setIsAnimating] = useState(false);

    // Minimum swipe distance to trigger flip (in pixels)
    const minSwipeDistance = 50;

    const triggerFlip = useCallback(async () => {
        if (isAnimating) return;
        setIsAnimating(true);

        // First half: Rotate to 90 degrees
        await controls.start({
            rotateY: 90,
            transition: { duration: 0.15, ease: "easeIn" }
        });

        onFlip();
        // The second half will be triggered by the useEffect when isFlipped prop changes
    }, [isAnimating, controls, onFlip]);

    // Handle the second half of the animation when props update
    useEffect(() => {
        const completeFlip = async () => {
            // If we just flipped and are waiting to complete
            if (isAnimating) {
                // Set initial state for valid return (flip from the other side)
                await controls.set({ rotateY: -90 });

                // Second half: Rotate back to 0
                await controls.start({
                    rotateY: 0,
                    transition: { duration: 0.25, ease: "easeOut" }
                });

                setIsAnimating(false);
            } else {
                // Ensure state is reset if props change without animation (e.g. new card)
                controls.set({ rotateY: 0 });
            }
        };
        completeFlip();
    }, [isFlipped, controls]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        setTouchEnd({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (!touchStart || !touchEnd) return;

        const distanceX = touchStart.x - touchEnd.x;
        const distanceY = touchStart.y - touchEnd.y;
        const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
        const isValidSwipe = Math.abs(distanceX) > minSwipeDistance;

        // Only trigger flip for horizontal swipes
        if (isHorizontalSwipe && isValidSwipe) {
            triggerFlip();
        }

        // Reset touch state
        setTouchStart(null);
        setTouchEnd(null);
    }, [touchStart, touchEnd, triggerFlip]);

    const handleCardClick = useCallback((e: React.MouseEvent) => {
        // Prevent flip when clicking on buttons
        const target = e.target as HTMLElement;
        if (target.closest('button')) return;

        triggerFlip();
    }, [triggerFlip]);

    if (!card) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ animation: 'spin 1s linear infinite', width: '32px', height: '32px', border: '2px solid #D4AF37', borderTopColor: 'transparent', borderRadius: '50%' }} />
            </div>
        );
    }

    const sideData = isFlipped ? card.no : card.yes;

    return (
        <div style={{
            minHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: '#1A1A1A'
        }}>
            <motion.div
                className={styles.cardContainer}
                onClick={handleCardClick}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                animate={controls}
                style={{ cursor: 'pointer', perspective: 1000 }}
            >
                {/* === Top Section (Dark Blue) === */}
                <div className={styles.topSection}>
                    <div className={styles.topPatternOverlay}></div>
                    <div className={styles.alertContainer}>
                        <AlertIcon cautionLevel={card.caution} />
                    </div>
                    <h1 className={styles.questionText}>
                        {card.question}
                    </h1>
                </div>

                {/* === Divider === */}
                <div className={styles.dividerContainer}>
                    <VDividerIcon />
                </div>

                {/* === Middle Section (White) === */}
                <div className={styles.middleSection}>
                    <p className={styles.answerText}>
                        {sideData.statement}
                    </p>
                    <div className={styles.iconsContainer}>
                        {resources.map((resource, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <ResourceIcon type={resource} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* === Bottom Section (Red + Overlay) === */}
                <div className={styles.bottomSectionWrapper}>
                    {/* Red Patterned Background */}
                    <div
                        className={styles.bottomRedBackground}
                        style={{ backgroundColor: personaBottomColors[sideData.persona] }}
                    >
                        <div className={styles.bottomPatternOverlay}></div>
                        <span className={styles.cardId}>{card._id}</span>
                    </div>

                    {/* The Supremo Overlay Box */}
                    <div className={styles.supremoOverlayContainer}>
                        <div className={styles.supremoBox}>
                            <SupremoBoxSvg />
                            <span className={styles.supremoText}>{sideData.persona}</span>
                        </div>
                    </div>
                </div>

            </motion.div>

            {/* === Action Buttons === */}
            <div style={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%',
                maxWidth: '400px',
                paddingLeft: '24px',
                paddingRight: '24px'
            }}>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={triggerFlip}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#D4AF37',
                        color: '#1a1a1a',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Flip Card
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onNextCard}
                    disabled={isLoading}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#555',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        opacity: isLoading ? 0.5 : 1
                    }}
                >
                    {isLoading ? (
                        <svg style={{ animation: 'spin 1s linear infinite', width: '20px', height: '20px' }} viewBox="0 0 24 24">
                            <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    ) : (
                        <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    )}
                    Draw Next Card
                </motion.button>
            </div>
        </div>
    );
};

export default GameCard;