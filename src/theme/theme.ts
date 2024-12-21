import { createTheme as createMuiTheme, Theme } from '@mui/material/styles';

import { createOptions as createBaseOptions } from './base/create-options';
import { createOptions as createDarkOptions } from './dark/create-options';
import { createOptions as createLightOptions } from './light/create-options';

declare module '@mui/material/styles/createPalette' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }
}

export type PaletteMode = 'dark' | 'light';

interface ThemeConfig {
  paletteMode?: PaletteMode;
}

export const createTheme = (config: ThemeConfig): Theme => {
  return createMuiTheme(
    createBaseOptions(),
    config?.paletteMode === 'dark' ? createDarkOptions() : createLightOptions()
  );
};
