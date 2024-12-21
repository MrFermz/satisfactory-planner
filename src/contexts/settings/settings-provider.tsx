import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { defaultSettings, Settings, SettingsContext } from './settings-context';

interface SettingsProviderProps {
  children?: ReactNode;
}

const STORAGE_KEY = 'app.settings';

const restoreSettings = (): Settings | null => {
  let value = null;
  try {
    const restored: string | null = window.localStorage.getItem(STORAGE_KEY);
    if (restored) {
      value = JSON.parse(restored);
    }
  } catch (error: unknown) {
    console.error(error);
  }
  return value;
};

const storeSettings = (value: Record<string, any>): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (error: unknown) {
    console.error(error);
  }
};

export const SettingsProvider: FC<SettingsProviderProps> = (props) => {
  const { children } = props;

  const [state, setState] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const restored = restoreSettings();

    if (restored) {
      setState((prevState) => ({
        ...prevState,
        ...restored,
      }));
    }
  }, []);

  const handleUpdate = useCallback((settings: Settings): void => {
    setState((prevState) => {
      storeSettings({
        ...settings,
      });

      return {
        ...prevState,
        ...settings,
      };
    });
  }, []);

  return (
    <SettingsContext.Provider value={{ ...state, handleUpdate }}>
      {children}
    </SettingsContext.Provider>
  );
};
