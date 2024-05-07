import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import SearchProvider from './context/SearchProvider';
import NotificationProvider from './context/NotificationProvider';

ReactDOM.render(
  <BrowserRouter>
  <NotificationProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </NotificationProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

