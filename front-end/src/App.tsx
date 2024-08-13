import React from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import JobsPage from './components/JobsPage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/jobs" element={<JobsPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
};

export default App;
