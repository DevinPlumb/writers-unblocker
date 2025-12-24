"use client";

import { useState } from "react";

interface SceneViewerProps {
  scene: string | null;
  isGenerating: boolean;
}

export default function SceneViewer({ scene, isGenerating }: SceneViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!scene) return;
    
    try {
      await navigator.clipboard.writeText(scene);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = () => {
    if (!scene) return;
    
    const blob = new Blob([scene], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scene-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isGenerating) {
    return (
      <div className="scene-viewer">
        <div className="scene-header">
          <h2>Your Scene</h2>
        </div>
        <div className="scene-content generating">
          <div className="typewriter-animation">
            <span className="cursor"></span>
            <p className="generating-text">Writing your scene...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!scene) {
    return (
      <div className="scene-viewer">
        <div className="scene-header">
          <h2>Your Scene</h2>
        </div>
        <div className="scene-content empty">
          <div className="empty-state">
            <ScriptIcon />
            <p>Your generated screenplay scene will appear here</p>
            <span className="hint">Select a quote and describe your scene to get started</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="scene-viewer">
      <div className="scene-header">
        <h2>Your Scene</h2>
        <div className="scene-actions">
          <button onClick={handleCopy} className="btn-action">
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button onClick={handleDownload} className="btn-action">
            <DownloadIcon />
            Download
          </button>
        </div>
      </div>
      <div className="scene-content">
        <pre className="screenplay">{scene}</pre>
      </div>
    </div>
  );
}

function ScriptIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

