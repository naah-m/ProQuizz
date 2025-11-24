import React from 'react';
import { Routes } from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes/>
      </ThemeProvider>
    </AuthProvider>
  );
}