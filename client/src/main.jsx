import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './scss/main.scss'
import React from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>
)