import { Components } from '@mui/material';

export const createComponents = (): Components => {
  return {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
  };
};
