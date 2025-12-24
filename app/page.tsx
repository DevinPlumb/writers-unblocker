'use client';

import { useState } from 'react';
import QuoteCarousel, { type Quote } from './components/QuoteCarousel';
import PromptForm from './components/PromptForm';
import SceneViewer from './components/SceneViewer';

type Step = 'quotes' | 'prompt' | 'scene';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('quotes');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [generatedScene, setGeneratedScene] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleQuoteSelect = (quote: Quote) => {
    setSelectedQuote(quote);
    setGeneratedScene(null);
    setCurrentStep('prompt');
  };

  const handleSceneGenerate = (scene: string) => {
    setGeneratedScene(scene);
    setCurrentStep('scene');
  };

  const handleBack = () => {
    if (currentStep === 'prompt') {
      setCurrentStep('quotes');
    } else if (currentStep === 'scene') {
      setCurrentStep('prompt');
    }
  };

  const handleStartOver = () => {
    setCurrentStep('quotes');
    setSelectedQuote(null);
    setGeneratedScene(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <PenNibIcon />
          <h1>Writer&apos;s Unblocker</h1>
        </div>
      </header>

      <main className="main-content">
        {currentStep !== 'quotes' && (
          <button className="btn-back" onClick={handleBack}>
            <BackArrowIcon />
            Back
          </button>
        )}

        <div className={`step-content ${currentStep}`}>
          {currentStep === 'quotes' && (
            <section className="step-section quotes-step">
              <QuoteCarousel
                onSelectQuote={handleQuoteSelect}
                selectedQuote={selectedQuote}
              />
            </section>
          )}

          {currentStep === 'prompt' && (
            <section className="step-section prompt-step">
              <PromptForm
                selectedQuote={selectedQuote}
                onGenerate={handleSceneGenerate}
                isGenerating={isGenerating}
                setIsGenerating={setIsGenerating}
              />
            </section>
          )}

          {currentStep === 'scene' && (
            <section className="step-section scene-step">
              <SceneViewer scene={generatedScene} isGenerating={isGenerating} />
              <button className="btn-start-over" onClick={handleStartOver}>
                <RefreshIcon />
                Start Over with New Quote
              </button>
            </section>
          )}
        </div>
      </main>
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

function BackArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M23 4v6h-6M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}
