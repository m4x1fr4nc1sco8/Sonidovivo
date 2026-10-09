import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App' // Si exportaste "export function App"
import 'bootstrap/dist/css/bootstrap.min.css';
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"></link>
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)