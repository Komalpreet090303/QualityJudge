// src/main.tsx (or index.js/index.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Assuming you have this
// --- VVV Add Google OAuth Import VVV ---
import { GoogleOAuthProvider } from '@react-oauth/google';

// --- VVV Replace with YOUR Google Client ID VVV ---
const GOOGLE_CLIENT_ID = "554041605261-rmiqcnvfbsafu35ftp48sefimv5esh69.apps.googleusercontent.com";
// --- ^^^ Replace with YOUR Google Client ID ^^^ ---

if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "554041605261-rmiqcnvfbsafu35ftp48sefimv5esh69.apps.googleusercontent.com") {
  console.error("ERROR: Google Client ID is not set. Please configure it in src/main.tsx");
  // Consider rendering an error message or stopping the app load here
}

// Keep your theme initialization logic if present
const savedTheme = localStorage.getItem('theme');
document.body.className = savedTheme === 'dark' ? 'dark-mode' : 'light-mode'; // Or your light default logic

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* --- VVV Wrap App with Provider VVV --- */}
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
    {/* --- ^^^ Wrap App with Provider ^^^ --- */}
  </React.StrictMode>,
);