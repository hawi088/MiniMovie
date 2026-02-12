import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import {FavoriteProvider} from '../src/context/FavoritesContext.jsx'
import {ReviewProvider} from '../src/context/ReviewContext.jsx'
import { WatchListProvider } from './context/WatchListContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <FavoriteProvider>
    <ReviewProvider>
      <WatchListProvider>
    <App />
    </WatchListProvider>
    </ReviewProvider>
  </FavoriteProvider>
  </BrowserRouter>
)
