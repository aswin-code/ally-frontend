import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { DarkModeContextProider } from './context/darkModeContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProider>
      <AuthContextProvider>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_google_client_id}>
          <App />
        </GoogleOAuthProvider>
      </AuthContextProvider>
    </DarkModeContextProider>
  </React.StrictMode>
);

