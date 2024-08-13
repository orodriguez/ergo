import React from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import Messages from './components/MessagesPage';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <BrowserRouter>
            <Routes>
              <Route path="/messages" element={<Messages />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
