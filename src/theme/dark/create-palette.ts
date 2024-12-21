import { PaletteOptions } from '@mui/material';

import { grey, primary } from '@theme/colors';

export const createPalette = (): PaletteOptions => {
  return {
    background: {
      default: grey[900],
      paper: grey[800],
    },
    primary,
  };
};
