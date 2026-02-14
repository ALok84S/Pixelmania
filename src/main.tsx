import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { HousingProvider } from './context/HousingContext'
import 'leaflet/dist/leaflet.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HousingProvider>
            <App />
        </HousingProvider>
    </React.StrictMode>,
)
