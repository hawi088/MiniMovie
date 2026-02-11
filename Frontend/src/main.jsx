import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import {FavoriteProvider} from '../src/context/FavoritesContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <FavoriteProvider>
    <App />
  </FavoriteProvider>
  </BrowserRouter>
)
