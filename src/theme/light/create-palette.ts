import { PaletteOptions } from '@mui/material';

import { grey, primary } from '@theme/colors';

export const createPalette = (): PaletteOptions => {
  return {
    background: {
      default: grey[100],
      paper: grey[50],
    },
    primary,
  };
};
