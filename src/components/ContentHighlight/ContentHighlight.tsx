// src\components\ContentHighlight\ContentHighlight.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from '@docusaurus/router';
import useIsBrowser from '@docusaurus/useIsBrowser';
import styles from './ContentHighlight.module.css';

interface HighlightState {
  isActive: boolean;
  targetElement: HTMLElement | null;
  rect: DOMRect | null;
}

const HIGHLIGHT_DURATION = 3000; // 3 seconds fade duration
const SCROLL_OFFSET = 100; // Offset from top when scrolling

export default function ContentHighlight(): JSX.Element | null {
  const location = useLocation();
  const isBrowser = useIsBrowser();
  const [highlight, setHighlight] = useState<HighlightState>({
    isActive: false,
    targetElement: null,
    rect: null,
  });

  const clearHighlight = useCallback(() => {
    setHighlight({
      isActive: false,
      targetElement: null,
      rect: null,
    });
  }, []);

  const updateHighlightPosition = useCallback(() => {
    if (highlight.targetElement) {
      const rect = highlight.targetElement.getBoundingClientRect();
      setHighlight(prev => ({ ...prev, rect }));
    }
  }, [highlight.targetElement]);

  useEffect(() => {
    if (!isBrowser) return;

    const hash = location.hash;
    if (!hash) {
      clearHighlight();
      return;
    }

    // Extract the ID from the hash (remove the #)
    const targetId = hash.slice(1);
    
    // Small delay to ensure DOM is ready after navigation
    const findAndHighlight = () => {
      const element = document.getElementById(targetId);
      
      if (element) {
        // Scroll to element with offset
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementTop - SCROLL_OFFSET,
          behavior: 'smooth',
        });

        // Get element position for highlight overlay
        const rect = element.getBoundingClientRect();
        
        setHighlight({
          isActive: true,
          targetElement: element,
          rect,
        });

        // Auto-clear highlight after duration
        const timeout = setTimeout(() => {
          clearHighlight();
        }, HIGHLIGHT_DURATION);

        return () => clearTimeout(timeout);
      }
    };

    // Delay to allow page render
    const timer = setTimeout(findAndHighlight, 100);
    return () => clearTimeout(timer);
  }, [location.hash, isBrowser, clearHighlight]);

  // Update position on scroll/resize
  useEffect(() => {
    if (!isBrowser || !highlight.isActive) return;

    window.addEventListener('scroll', updateHighlightPosition);
    window.addEventListener('resize', updateHighlightPosition);

    return () => {
      window.removeEventListener('scroll', updateHighlightPosition);
      window.removeEventListener('resize', updateHighlightPosition);
    };
  }, [isBrowser, highlight.isActive, updateHighlightPosition]);

  if (!highlight.isActive || !highlight.rect) {
    return null;
  }

  return (
    <div
      className={styles.highlightOverlay}
      style={{
        top: highlight.rect.top + window.scrollY,
        left: highlight.rect.left,
        width: highlight.rect.width,
        height: Math.max(highlight.rect.height, 50), // Minimum height
      }}
      onClick={clearHighlight}
      aria-hidden="true"
    />
  );
}
