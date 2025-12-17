// src\theme\DocItem\TranslationControl.tsx
import React, { useState, useContext, useRef, useCallback } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { AuthContext } from '@site/src/components/AuthContext';
import styles from './ContentControls.module.css';

const API_URL = 'https://ai-rative-book-backend-production.up.railway.app';
const API_KEY = 'fwnelrjrl2ur08d9s0fsdhf90324h30493';

// Cache for translated content per page
const translationCache = new Map<string, string>();

// Helper function for mobile-friendly fetch with timeout
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number = 60000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      mode: 'cors',
      credentials: 'omit',
    });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw err;
  }
}

// Shared original content storage (module-level to share between components)
let sharedOriginalContent: string | null = null;

export function getSharedOriginalContent() {
  return sharedOriginalContent;
}

export function setSharedOriginalContent(content: string | null) {
  sharedOriginalContent = content;
}

export function clearSharedOriginalContent() {
  sharedOriginalContent = null;
}

interface TranslationControlProps {
  onStateChange?: (isActive: boolean) => void;
  otherTransformActive?: boolean;
  onResetOther?: () => void;
}

export default function TranslationControl({ 
  onStateChange, 
  otherTransformActive,
  onResetOther 
}: TranslationControlProps): JSX.Element {
  const { isAuthenticated } = useContext(AuthContext);
  const [isTranslated, setIsTranslated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const isBrowser = useIsBrowser();

  // Get cache key based on current page URL
  const getCacheKey = useCallback(() => {
    if (!isBrowser) return '';
    return `translation_${window.location.pathname}`;
  }, [isBrowser]);

  const handleTranslate = async () => {
    if (!isBrowser) return;
    
    if (!isAuthenticated) {
      alert('Please log in to translate content');
      return;
    }

    if (isLoading) return;

    const contentElement = document.querySelector('.theme-doc-markdown');
    if (!contentElement) {
      setError('Content not found');
      return;
    }

    if (isTranslated) {
      // Restore original content
      if (sharedOriginalContent) {
        contentElement.innerHTML = sharedOriginalContent;
      }
      setIsTranslated(false);
      onStateChange?.(false);
      return;
    }

    // If other transformation is active, reset it first
    if (otherTransformActive) {
      onResetOther?.();
    }

    // Store original content before any transformation
    if (!sharedOriginalContent) {
      sharedOriginalContent = contentElement.innerHTML;
    }

    const cacheKey = getCacheKey();
    
    // Check cache first
    if (translationCache.has(cacheKey)) {
      contentElement.innerHTML = translationCache.get(cacheKey)!;
      setIsTranslated(true);
      onStateChange?.(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Always use original content for translation
      const originalText = sharedOriginalContent 
        ? new DOMParser().parseFromString(sharedOriginalContent, 'text/html').body.textContent 
        : contentElement.textContent;

      const response = await fetchWithTimeout(`${API_URL}/api/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
        },
        body: JSON.stringify({
          content: originalText || '',
          target_language: 'urdu',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to translate content');
      }

      const data = await response.json();
      
      // Format the translated content with proper markdown rendering
      const translatedHTML = `
        <div class="${styles.translatedBanner}">
          🌐 اردو میں ترجمہ شدہ
        </div>
        <div class="${styles.translatedContent}" dir="rtl">
          ${formatMarkdownContent(data.translated_content)}
        </div>
      `;
      
      // Cache the result
      translationCache.set(cacheKey, translatedHTML);
      
      contentElement.innerHTML = translatedHTML;
      setIsTranslated(true);
      onStateChange?.(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Translation failed');
      console.error('Translation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Method to reset state externally
  const reset = useCallback(() => {
    setIsTranslated(false);
    setError(null);
  }, []);

  // Expose reset method
  React.useEffect(() => {
    (window as any).__resetTranslation = reset;
    return () => {
      delete (window as any).__resetTranslation;
    };
  }, [reset]);

  return (
    <div className={styles.iconControlWrapper}>
      <button
        onClick={handleTranslate}
        disabled={isLoading}
        className={`${styles.iconButton} ${isTranslated ? styles.active : ''}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isTranslated ? 'Show English content' : 'Translate to Urdu'}
      >
        {isLoading ? (
          <svg className={styles.spinnerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        )}
      </button>
      
      {showTooltip && (
        <div className={styles.tooltip}>
          {isTranslated ? 'Show English' : 'Translate to Urdu'}
        </div>
      )}
      
      {isTranslated && (
        <span className={styles.activeDot} />
      )}
      
      {error && (
        <div className={styles.errorTooltip}>{error}</div>
      )}
    </div>
  );
}

// Helper function to format markdown content for display
function formatMarkdownContent(content: string): string {
  let html = content
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^\s*[-*]\s+(.*$)/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  
  if (!html.startsWith('<')) {
    html = '<p>' + html + '</p>';
  }
  
  html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
  
  return html;
}
