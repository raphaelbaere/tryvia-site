import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import App from './App';
import store from './redux/store';
import theme from './style/Themes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={ store }>
      <ThemeProvider theme={ theme }>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
);
