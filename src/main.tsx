import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import '@fontsource/public-sans'
import '@fontsource/open-sans'
import '@fontsource/raleway'

// Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  fonts: {
    body: '"Open Sans", system-ui, sans-serif',
    heading: 'Raleway, "Public Sans", system-ui, Georgia, serif',
    mono: 'Menlo, monospace'
  }
}

// extend the theme
const theme = extendTheme({ config })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
