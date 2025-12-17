// src\theme\DocItem\Layout\index.tsx
import React, { useState, useCallback, useEffect } from 'react';
import DocItemLayout from '@theme-original/DocItem/Layout';
import TranslationControl, { clearSharedOriginalContent } from '../TranslationControl';
import Personalizer from '../Personalizer';
import type { Props } from '@theme/DocItem/Layout';
import styles from '../ContentControls.module.css';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { useLocation } from '@docusaurus/router';

export default function DocItemLayoutWrapper(props: Props): JSX.Element {
  const [isTranslationActive, setIsTranslationActive] = useState(false);
  const [isPersonalizationActive, setIsPersonalizationActive] = useState(false);
  const isBrowser = useIsBrowser();
  const location = useLocation();

  // Reset states when navigating to a new page
  useEffect(() => {
    setIsTranslationActive(false);
    setIsPersonalizationActive(false);
    clearSharedOriginalContent();
  }, [location.pathname]);

  const handleTranslationStateChange = useCallback((isActive: boolean) => {
    setIsTranslationActive(isActive);
    if (isActive) {
      setIsPersonalizationActive(false);
    }
  }, []);

  const handlePersonalizationStateChange = useCallback((isActive: boolean) => {
    setIsPersonalizationActive(isActive);
    if (isActive) {
      setIsTranslationActive(false);
    }
  }, []);

  const resetTranslation = useCallback(() => {
    if (isBrowser && (window as any).__resetTranslation) {
      (window as any).__resetTranslation();
    }
    setIsTranslationActive(false);
  }, [isBrowser]);

  const resetPersonalization = useCallback(() => {
    if (isBrowser && (window as any).__resetPersonalization) {
      (window as any).__resetPersonalization();
    }
    setIsPersonalizationActive(false);
  }, [isBrowser]);

  return (
    <>
      <div className={styles.controlsBar}>
        <TranslationControl
          onStateChange={handleTranslationStateChange}
          otherTransformActive={isPersonalizationActive}
          onResetOther={resetPersonalization}
        />
        <Personalizer
          onStateChange={handlePersonalizationStateChange}
          otherTransformActive={isTranslationActive}
          onResetOther={resetTranslation}
        />
      </div>
      <DocItemLayout {...props} />
    </>
  );
}
