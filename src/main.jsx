import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from '../src/context/AuthContext';
import './index.css';
import App from './App';

// Wij importeren hier de provider die wij hebben aangemaakt in AuthContext.jsx
// Hiermee geven we de data door aan de app component.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>  
  </React.StrictMode>,
)
