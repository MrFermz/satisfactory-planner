import { createContext, FC, ReactNode, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { createTheme } from '@theme/theme';
import { useSettings } from '@contexts/settings';
import { Settings } from '@components/settings';

type ThemeProviderProps = {
  children?: ReactNode;
};

const ThemeContext = createContext({});

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const { children } = props;

  const settings = useSettings();

  const value = {
    settings: settings,
  };

  const theme = useMemo(() => {
    return createTheme({ ...settings });
  }, [settings]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      <Settings />
    </ThemeContext.Provider>
  );
};
