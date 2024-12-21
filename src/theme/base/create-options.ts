import { ThemeOptions } from '@mui/material';

import { createComponents } from './create-components';

export const createOptions = (): ThemeOptions => {
  return {
    components: createComponents(),
  };
};
