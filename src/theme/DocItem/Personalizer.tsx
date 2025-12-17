// src\theme\DocItem\Personalizer.tsx
import React, { useState, useContext, useCallback } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { AuthContext } from '@site/src/components/AuthContext';
import { getSharedOriginalContent, setSharedOriginalContent } from './TranslationControl';
import styles from './ContentControls.module.css';

const API_URL = 'https://ai-rative-book-backend-production.up.railway.app';
const API_KEY = 'fwnelrjrl2ur08d9s0fsdhf90324h30493';

// Cache for personalized content per page + user background
const personalizationCache = new Map<string, string>();

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

interface PersonalizerProps {
  onStateChange?: (isActive: boolean) => void;
  otherTransformActive?: boolean;
  onResetOther?: () => void;
}

export default function Personalizer({ 
  onStateChange, 
  otherTransformActive,
  onResetOther 
}: PersonalizerProps): JSX.Element {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const isBrowser = useIsBrowser();

  // Get cache key based on current page URL and user background
  const getCacheKey = useCallback(() => {
    if (!isBrowser) return '';
    const bgHash = user?.background 
      ? JSON.stringify(user.background) 
      : 'default';
    return `personalization_${window.location.pathname}_${bgHash}`;
  }, [isBrowser, user?.background]);

  const handlePersonalize = async () => {
    if (!isBrowser) return;
    
    if (!isAuthenticated) {
      alert('Please log in to personalize content');
      return;
    }

    if (isLoading) return;

    const contentElement = document.querySelector('.theme-doc-markdown');
    if (!contentElement) {
      setError('Content not found');
      return;
    }

    if (isPersonalized) {
      // Restore original content
      const originalContent = getSharedOriginalContent();
      if (originalContent) {
        contentElement.innerHTML = originalContent;
      }
      setIsPersonalized(false);
      onStateChange?.(false);
      return;
    }

    // If other transformation is active, reset it first
    if (otherTransformActive) {
      onResetOther?.();
    }

    // Store original content before any transformation
    if (!getSharedOriginalContent()) {
      setSharedOriginalContent(contentElement.innerHTML);
    }

    const cacheKey = getCacheKey();
    
    // Check cache first
    if (personalizationCache.has(cacheKey)) {
      contentElement.innerHTML = personalizationCache.get(cacheKey)!;
      setIsPersonalized(true);
      onStateChange?.(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Always use original content for personalization
      const originalContent = getSharedOriginalContent();
      const originalText = originalContent 
        ? new DOMParser().parseFromString(originalContent, 'text/html').body.textContent 
        : contentElement.textContent;

      const response = await fetchWithTimeout(`${API_URL}/api/personalize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
        },
        body: JSON.stringify({
          content: originalText || '',
          user_background: user?.background || {
            programming_experience: 'intermediate',
            robotics_experience: 'none',
            preferred_languages: ['Python'],
            hardware_access: [],
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to personalize content');
      }

      const data = await response.json();
      
      // Format the personalized content with proper markdown rendering
      const personalizedHTML = `
        <div class="${styles.personalizedBanner}">
          ✨ Content personalized for your experience level
        </div>
        <div class="${styles.personalizedContent}">
          ${formatMarkdownContent(data.personalized_content)}
        </div>
      `;
      
      // Cache the result
      personalizationCache.set(cacheKey, personalizedHTML);
      
      contentElement.innerHTML = personalizedHTML;
      setIsPersonalized(true);
      onStateChange?.(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Personalization failed');
      console.error('Personalization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Method to reset state externally
  const reset = useCallback(() => {
    setIsPersonalized(false);
    setError(null);
  }, []);

  // Expose reset method
  React.useEffect(() => {
    (window as any).__resetPersonalization = reset;
    return () => {
      delete (window as any).__resetPersonalization;
    };
  }, [reset]);

  return (
    <div className={styles.iconControlWrapper}>
      <button
        onClick={handlePersonalize}
        disabled={isLoading}
        className={`${styles.iconButton} ${isPersonalized ? styles.active : ''}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isPersonalized ? 'Show original content' : 'Personalize for your level'}
      >
        {isLoading ? (
          <svg className={styles.spinnerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        )}
      </button>
      
      {showTooltip && (
        <div className={styles.tooltip}>
          {isPersonalized ? 'Show Original' : 'Personalize for your level'}
        </div>
      )}
      
      {isPersonalized && (
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
