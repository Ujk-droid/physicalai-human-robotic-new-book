// src/components/Chat/AiChatButton.tsx
import React, { useState, useEffect } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import ChatPanel from './ChatPanel';
import styles from './AiChatButton.module.css';

const CHAT_OPEN_KEY = 'physical-ai-chat-open';

export default function AiChatButton(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedText, setSelectedText] = useState<string>('');
  const isBrowser = useIsBrowser();

  useEffect(() => {
    if (!isBrowser) return;
    const savedState = sessionStorage.getItem(CHAT_OPEN_KEY);
    if (savedState === 'true') setIsOpen(true);
  }, [isBrowser]);

  useEffect(() => {
    if (!isBrowser) return;
    sessionStorage.setItem(CHAT_OPEN_KEY, isOpen.toString());
  }, [isOpen, isBrowser]);

  useEffect(() => {
    if (!isBrowser) return;
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        setSelectedText(selection.toString().trim());
      }
    };
    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, [isBrowser]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (isOpen) setSelectedText('');
  };

  return (
    <>
      <button
        className={`${styles.chatButton} ${isOpen ? styles.active : ''}`}
        onClick={toggleChat}
        aria-label={isOpen ? 'Close AI Chat' : 'Open AI Chat'}
      >
        {/* Modern AI Robot Icon SVG */}
        <div className={styles.iconWrapper}>
            {isOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            ) : (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <circle cx="12" cy="5" r="2" />
                    <path d="M12 7v4" />
                    <line x1="8" y1="16" x2="8.01" y2="16" />
                    <line x1="16" y1="16" x2="16.01" y2="16" />
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1" opacity="0.5" />
                </svg>
            )}
        </div>
        
        {selectedText && !isOpen && (
          <span className={styles.badge}>1</span>
        )}
        
        <span className={styles.tooltip}>AI Tutor</span>
      </button>

      <ChatPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedText={selectedText}
      />
    </>
  );
}