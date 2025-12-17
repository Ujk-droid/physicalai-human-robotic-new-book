// src\theme\Layout\index.tsx
import React from 'react';
import Layout from '@theme-original/Layout';
import { AiChatButton } from '@site/src/components/Chat';
import { AuthProvider } from '@site/src/components/AuthContext';
import ContentHighlight from '@site/src/components/ContentHighlight';
import type {Props} from '@theme/Layout';

export default function LayoutWrapper(props: Props): JSX.Element {
  return (
    <AuthProvider>
      <Layout {...props} />
      <AiChatButton />
      <ContentHighlight />
    </AuthProvider>
  );
}
