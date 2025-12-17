// src\theme\Navbar\index.tsx
import React from 'react';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';
import UserProfileButton from './UserProfileButton';

export default function Navbar(): JSX.Element {
  return (
    <NavbarLayout>
      <NavbarContent />
      <div style={{ 
        marginLeft: 'auto', 
        marginRight: '1rem',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        gap: '0.5rem',
      }}>
        <UserProfileButton />
      </div>
    </NavbarLayout>
  );
}
