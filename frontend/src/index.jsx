import React from 'react';
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { App } from './App';

const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="*"
        element={
          <>
            <h1>Nothing here</h1>
            <Link to="/">Go home</Link>
          </>
        }
      />
    </Routes>
  </BrowserRouter>,
  rootElement
);
