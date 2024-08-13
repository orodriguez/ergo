import React from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import Messages from './components/MessagesPage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Messages />
      </Container>
    </ThemeProvider>
  );
};

export default App;
