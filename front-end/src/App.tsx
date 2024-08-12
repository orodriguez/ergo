import React from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import Status from './components/Status';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Status />
      </Container>
    </ThemeProvider>
  );
};

export default App;
