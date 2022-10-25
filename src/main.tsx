import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { VisualizerApolloProvider } from './infrastructure/apollo'

import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <VisualizerApolloProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </VisualizerApolloProvider>
    </React.StrictMode>
)
