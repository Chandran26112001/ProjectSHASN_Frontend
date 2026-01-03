# SHASN Frontend

A React-based interactive card game frontend for exploring ideology personas and resources. Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion for smooth animations.

## Overview

SHASN is an engaging application featuring dynamic ideology cards with four distinct personas:
- **THE IDEALIST** (gains TRUST)
- **THE CAPITALIST** (gains FUNDS)
- **THE SHOWSTOPPER** (gains MEDIA)
- **THE SUPREMO** (gains CLOUT)

Players draw cards from different decks (Gemini or GPT-powered) and make choices that affect their resource accumulation.

## Features

- **Home Page**: Browse and draw cards from multiple decks
- **Card Page**: Interactive flip cards showing different persona perspectives with resource tracking
- **Generation Page**: Create custom ideology cards (in development)
- **Side Menu Navigation**: Easy navigation between pages
- **Responsive Design**: Beautiful dark theme with gold accents
- **Smooth Animations**: Powered by Framer Motion for engaging transitions

## Project Structure

```
src/
├── pages/
│   ├── HomePage.tsx       # Main card selection and drawing interface
│   ├── CardPage.tsx       # Interactive card display with persona choices
│   └── GenerationPage.tsx # Custom card generation (WIP)
├── components/
│   ├── GameCard.tsx       # Reusable card component
│   └── SideMenu.tsx       # Navigation menu
├── api/
│   └── api.ts             # Backend API integration
├── types/
│   └── index.ts           # TypeScript type definitions
├── App.tsx                # Main application component
└── main.tsx               # React entry point
```

## Technology Stack

- **React 19**: UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast development server and build tool
- **Tailwind CSS 4**: Utility-first styling
- **Framer Motion**: Animation library
- **React Router v7**: Client-side navigation
- **ESLint**: Code quality

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Starts the development server with hot module replacement (HMR).

## Build

```bash
npm run build
```

Compiles TypeScript and builds the project for production.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## API Integration

The frontend connects to a backend API for fetching cards:
- **Get Random Card**: `GET /random?deck={gemini|gpt}`
- **Get Next Card**: `GET /next?deck={gemini|gpt}&current_id={id}`

Ensure the backend server is running before using card-fetching features.

## Card Structure

Each card contains:
- `_id`: Unique identifier
- `question`: The scenario or question
- `caution`: Important context
- `yes`: Persona and statement for yes choice
- `no`: Persona and statement for no choice
- `deck`: Source deck (gemini or gpt)
