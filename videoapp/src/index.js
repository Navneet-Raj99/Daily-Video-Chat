import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './SocketContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // doob maro sale react strict mode
  <React.StrictMode>   
  <ContextProvider>
    <App />
  </ContextProvider>
  </React.StrictMode>
);


