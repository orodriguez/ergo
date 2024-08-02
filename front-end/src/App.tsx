import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Todos from './todos';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Todos.Page />
    </ThemeProvider>
  );
};

export default App;
