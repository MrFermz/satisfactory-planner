import { FC, useCallback, useState } from 'react';
import { Button, ButtonGroup, Fab, Paper, Popper } from '@mui/material';

import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import { Settings as SettingsType, useSettings } from '@contexts/settings';
import { useLocation } from 'react-router';

export const Settings: FC = () => {
  const { paletteMode, handleUpdate } = useSettings();
  const { state } = useLocation();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleFieldUpdate = useCallback(
    (field: keyof SettingsType, value: any): void => {
      handleUpdate?.({ [field]: value });
    },
    [handleUpdate]
  );

  return (
    <>
      {!state?.disableSetting && (
        <Fab
          color="primary"
          onClick={(event) => {
            setAnchorEl(anchorEl ? null : event.currentTarget);
          }}
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
          }}
        >
          <SettingsTwoToneIcon />
        </Fab>
      )}

      <Popper
        open={!!anchorEl}
        anchorEl={anchorEl}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ]}
      >
        <Paper>
          <ButtonGroup>
            <Button
              variant={paletteMode === 'dark' ? 'contained' : 'text'}
              onClick={() => handleFieldUpdate('paletteMode', 'dark')}
            >
              Dark
            </Button>
            <Button
              variant={paletteMode === 'light' ? 'contained' : 'text'}
              onClick={() => handleFieldUpdate('paletteMode', 'light')}
            >
              Light
            </Button>
          </ButtonGroup>
        </Paper>
      </Popper>
    </>
  );
};
