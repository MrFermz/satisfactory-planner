import { CssBaseline } from '@mui/material';
import { FC } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@locales/i18n';
import './global.css';

import { SettingsProvider } from '@contexts/settings';
import { ThemeProvider } from '@contexts/theme-provider';
import Routes from './routes';

export const App: FC = () => {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <HelmetProvider>
          <CssBaseline />
          <Routes />
        </HelmetProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
};
