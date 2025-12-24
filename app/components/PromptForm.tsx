'use client';

import { useState } from 'react';
import type { Quote } from './QuoteCarousel';

interface PromptFormProps {
  selectedQuote: Quote | null;
  onGenerate: (scene: string) => void;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
}

export default function PromptForm({
  selectedQuote,
  onGenerate,
  isGenerating,
  setIsGenerating,
}: PromptFormProps) {
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedQuote) {
      setError('Please select a quote first');
      return;
    }

    if (!prompt.trim()) {
      setError('Please enter a scene description');
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quote: selectedQuote.text,
          author: selectedQuote.author,
          prompt: prompt.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate scene');
      }

      onGenerate(data.scene);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  };

  const placeholder = 'A tense confrontation between old friends at a funeral';

  return (
    <div className="prompt-form-container">
      <div className="form-header">
        <h2>Describe Your Scene</h2>
        <p className="form-subtitle">
          Tell us the context, setting, or situation for your scene
        </p>
      </div>

      {selectedQuote && (
        <div className="selected-quote-preview">
          <span className="label">Using quote:</span>
          <p className="preview-text">
            &ldquo;{selectedQuote.text.slice(0, 80)}...&rdquo;
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            rows={4}
            disabled={isGenerating}
            className="prompt-input"
          />
          <div className="char-count">{prompt.length} / 500</div>
        </div>

        {error && (
          <div className="error-message">
            <WarningIcon />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!selectedQuote || !prompt.trim() || isGenerating}
          className="btn-generate"
        >
          {isGenerating ? (
            <>
              <SpinnerIcon />
              Generating Scene...
            </>
          ) : (
            <>
              <PenIcon />
              Generate Scene
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function WarningIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="spinner"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg
      width="18"
      height="18"
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
