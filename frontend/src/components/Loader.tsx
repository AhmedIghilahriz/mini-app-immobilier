// src/components/Loader.tsx
import React from 'react';
import './Loader.css';

export const Loader: React.FC = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="spinner"></div>
        <p className="loader-text">Chargement...</p>
      </div>
    </div>
  );
};