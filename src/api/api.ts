import type { Card, DeckType } from '../types/index.js';

//const API_BASE_URL = 'http://localhost:8080';
const API_BASE_URL = 'https://helmet-chose-ave-cottages.trycloudflare.com';

export async function getRandomCard(deck: DeckType): Promise<Card> {
    const response = await fetch(`${API_BASE_URL}/random?deck=${deck}`);
    if (!response.ok) {
        throw new Error('Failed to fetch random card');
    }
    return response.json();
}

export async function getNextCard(deck: DeckType, currentId: number): Promise<Card> {
    const response = await fetch(`${API_BASE_URL}/next?deck=${deck}&current_id=${currentId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch next card');
    }
    return response.json();
}
