export interface CardSide {
    persona: 'THE IDEALIST' | 'THE CAPITALIST' | 'THE SHOWSTOPPER' | 'THE SUPREMO';
    statement: string;
}

export interface Card {
    _id: number;
    caution: string;
    deck: 'gemini' | 'gpt';
    question: string;
    yes: CardSide;
    no: CardSide;
}

export type DeckType = 'gemini' | 'gpt';

export type PersonaType = 'THE IDEALIST' | 'THE CAPITALIST' | 'THE SHOWSTOPPER' | 'THE SUPREMO';

export type ResourceType = 'TRUST' | 'FUNDS' | 'MEDIA' | 'CLOUT';
