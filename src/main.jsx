import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import GalleryApp from './GalleryApp.jsx'
import { UserProvider } from './context/UserProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <GalleryApp />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
)
