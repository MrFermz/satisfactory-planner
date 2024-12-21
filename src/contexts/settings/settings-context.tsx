import { createContext, useContext } from 'react';
import { PaletteMode } from '@mui/material';

export interface Settings {
  paletteMode?: PaletteMode;
}

interface SettingsValue extends Settings {
  handleUpdate?: (settings: Settings) => void;
}

export const defaultSettings: Settings = {
  paletteMode: 'light',
};

export const SettingsContext = createContext<SettingsValue>({
  ...defaultSettings,
});

export const useSettings = (): SettingsValue => {
  const settingsContext = useContext(SettingsContext);
  if (settingsContext === undefined) {
    throw new Error('Settings provider error');
  }
  return settingsContext;
};
