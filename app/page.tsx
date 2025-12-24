'use client';

import { useState } from 'react';
import QuoteCarousel, { type Quote } from './components/QuoteCarousel';
import PromptForm from './components/PromptForm';
import SceneViewer from './components/SceneViewer';

export default function Home() {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [generatedScene, setGeneratedScene] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleQuoteSelect = (quote: Quote) => {
    setSelectedQuote(quote);
    // Clear previous scene when selecting a new quote
    setGeneratedScene(null);
  };

  const handleSceneGenerate = (scene: string) => {
    setGeneratedScene(scene);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <PenNibIcon />
          <h1>Writer&apos;s Unblocker</h1>
        </div>
        <p className="tagline">
          Find inspiration. Write scenes. Defeat the blank page.
        </p>
      </header>

      <main className="main-content">
        <section className="quote-section">
          <QuoteCarousel
            onSelectQuote={handleQuoteSelect}
            selectedQuote={selectedQuote}
          />
        </section>

        <section className="prompt-section">
          <PromptForm
            selectedQuote={selectedQuote}
            onGenerate={handleSceneGenerate}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
        </section>

        <section className="scene-section">
          <SceneViewer scene={generatedScene} isGenerating={isGenerating} />
        </section>
      </main>

      <footer className="app-footer">
        <p>Powered by quotes & AI • Built for writers, by writers</p>
      </footer>
    </div>
  );
}

function PenNibIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}
