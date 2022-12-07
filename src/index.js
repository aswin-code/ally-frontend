import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { DarkModeContextProider } from './context/darkModeContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import CreatePostProvider from './context/CreatePostContext';
import SpinnerContextProvider from './context/spinnerContext';
import ActionContextProvider from './context/ActionContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProider>
      <AuthContextProvider>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_google_client_id}>
          <CreatePostProvider>
            <SpinnerContextProvider>
              <ActionContextProvider>
                <App />
              </ActionContextProvider>
            </SpinnerContextProvider>
          </CreatePostProvider>
        </GoogleOAuthProvider>
      </AuthContextProvider>
    </DarkModeContextProider>
  </React.StrictMode>
);

