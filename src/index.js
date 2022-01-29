// React
import React from 'react';
import ReactDOM from 'react-dom';

// Chakra-UI
import { ChakraProvider } from '@chakra-ui/react'

// My App
import App from './App';

// Global styles
import './index.css'

// Custom Chakra-UI theme
import theme from './theme'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
