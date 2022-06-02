import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { IssueProvider } from './context/IssueContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <IssueProvider>
        <App />
      </IssueProvider>
    </AuthProvider>
  </React.StrictMode>
);
