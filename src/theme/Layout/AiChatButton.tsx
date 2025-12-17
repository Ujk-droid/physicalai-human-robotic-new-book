// src\theme\Layout\AiChatButton.tsx
import React from 'react';

export default function AiChatButton(): JSX.Element {
  return (
    <button
      type="button"
      onClick={() => alert('AI Chat button clicked!')}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
      }}
    >
      AI Chat
    </button>
  );
}
