import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Card, DeckType, PersonaType, ResourceType } from '../types/index.js';
import { getNextCard } from '../api/api';
import GameCard from '../components/GameCard';

// Persona to primary resource mapping
const personaResources: Record<PersonaType, ResourceType> = {
    'THE IDEALIST': 'TRUST',
    'THE CAPITALIST': 'FUNDS',
    'THE SHOWSTOPPER': 'MEDIA',
    'THE SUPREMO': 'CLOUT',
};

// Generate resources for a persona (2 same + 1 random)
function getResources(persona: PersonaType): ResourceType[] {
    const primary = personaResources[persona];
    const allResources: ResourceType[] = ['TRUST', 'FUNDS', 'MEDIA', 'CLOUT'];
    const others = allResources.filter(r => r !== primary);
    const random = others[Math.floor(Math.random() * others.length)];
    return [primary, primary, random];
}

export default function CardPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentCard, setCurrentCard] = useState<Card | null>(null);
    const [deck, setDeck] = useState<DeckType>('gemini');
    const [loading, setLoading] = useState(false);
    const [yesResources, setYesResources] = useState<ResourceType[]>([]);
    const [noResources, setNoResources] = useState<ResourceType[]>([]);

    useEffect(() => {
        if (location.state?.card) {
            const card = location.state.card as Card;
            setCurrentCard(card);
            setDeck(location.state.deck || 'gemini');
            setYesResources(getResources(card.yes.persona));
            setNoResources(getResources(card.no.persona));
        } else {
            navigate('/');
        }
    }, [location.state, navigate]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNextCard = async () => {
        if (!currentCard) return;
        setLoading(true);
        try {
            const nextCard = await getNextCard(deck, currentCard._id);
            setCurrentCard(nextCard);
            setYesResources(getResources(nextCard.yes.persona));
            setNoResources(getResources(nextCard.no.persona));
            setIsFlipped(false);
        } catch (error) {
            console.error('Error fetching next card:', error);
            alert('No more cards in the deck or error fetching.');
        } finally {
            setLoading(false);
        }
    };

    if (!currentCard) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full" />
            </div>
        );
    }

    const currentResources = isFlipped ? noResources : yesResources;

    return (
        <GameCard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
            onNextCard={handleNextCard}
            isLoading={loading}
            resources={currentResources}
        />
    );
}
