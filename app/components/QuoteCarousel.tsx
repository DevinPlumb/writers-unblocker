'use client';

import { useState, useEffect } from 'react';

export interface Quote {
  text: string;
  author: string;
  source: string;
  tags: string[];
}

interface QuoteCarouselProps {
  onSelectQuote: (quote: Quote) => void;
  selectedQuote: Quote | null;
}

export default function QuoteCarousel({
  onSelectQuote,
  selectedQuote,
}: QuoteCarouselProps) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/quotes');
      const data = await response.json();
      setQuotes(data.quotes);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Failed to fetch quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
  };

  const currentQuote = quotes[currentIndex];
  const isSelected = selectedQuote?.text === currentQuote?.text;

  if (loading) {
    return (
      <div className="quote-carousel">
        <div className="quote-card loading">
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
          <div className="skeleton-author"></div>
        </div>
      </div>
    );
  }

  if (!currentQuote) {
    return (
      <div className="quote-carousel">
        <div className="quote-card error">
          <p>No quotes available</p>
          <button onClick={fetchQuotes} className="btn-refresh">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-carousel">
      <div className="carousel-header">
        <h2>Find Your Inspiration</h2>
        <button
          onClick={fetchQuotes}
          className="btn-refresh"
          disabled={loading}
        >
          <RefreshIcon />
          New Quotes
        </button>
      </div>

      <div className="carousel-container">
        <button
          onClick={handlePrevious}
          className="carousel-nav prev"
          aria-label="Previous quote"
        >
          <ChevronIcon direction="left" />
        </button>

        <div className={`quote-card ${isSelected ? 'selected' : ''}`}>
          <div className="quote-mark">&quot;</div>
          <blockquote className="quote-content">{currentQuote.text}</blockquote>
          <cite className="quote-author">— {currentQuote.author}</cite>

          <button
            onClick={() => onSelectQuote(currentQuote)}
            className={`btn-select ${isSelected ? 'selected' : ''}`}
          >
            {isSelected ? '✓ Selected' : 'Use This Quote'}
          </button>
        </div>

        <button
          onClick={handleNext}
          className="carousel-nav next"
          aria-label="Next quote"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>

      <div className="carousel-dots">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to quote ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function RefreshIcon() {
  return (
    <svg
      width="16"
      height="16"
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

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {direction === 'left' ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}
