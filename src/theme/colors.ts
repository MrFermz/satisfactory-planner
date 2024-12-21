import { PaletteColor } from '@mui/material';
import { ColorRange } from '@mui/material/styles/createPalette';

const withAplha = (color: PaletteColor): PaletteColor => {
  return {
    ...color,
  };
};

export const grey: ColorRange = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
};

export const blueGrey: ColorRange = {
  50: '#eceff1',
  100: '#cfd8dc',
  200: '#b0bec5',
  300: '#90a4ae',
  400: '#78909c',
  500: '#607d8b',
  600: '#546e7a',
  700: '#455a64',
  800: '#37474f',
  900: '#263238',
};

export const primary = withAplha({
  contrastText: '#ffffff',
  light: '#9fa8da',
  main: '#3f51b5',
  dark: '#1a237e',
});

export const success = withAplha({
  contrastText: '#ffffff',
  light: '#a5d6a7',
  main: '#4caf50',
  dark: '#1b5e20',
});

export const error = withAplha({
  contrastText: '#ffffff',
  light: '#ef9a9a',
  main: '#f44336',
  dark: '#b71c1c',
});
