import { ThemeOptions } from '@mui/material';

import { createComponents } from './create-components';
import { createPalette } from './create-palette';

export const createOptions = (): ThemeOptions => {
  const palette = createPalette();
  const components = createComponents();

  return {
    components,
    palette,
  };
};
