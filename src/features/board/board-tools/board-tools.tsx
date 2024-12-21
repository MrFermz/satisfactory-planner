import KeyboardArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardArrowLeftTwoTone';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { IconButton, Paper, Stack, Typography } from '@mui/material';
import { BackgroundVariant, Panel } from '@xyflow/react';
import { FC, MouseEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { NestedMenu } from '@components/nested-menu';
import { Settings as SettingsType, useSettings } from '@contexts/settings';
import { useStoreBoard } from '@stores/board';
import { Board } from 'src/types/board';

interface BoardToolsProps {
  board?: Board;
}

export const BoardTools: FC<BoardToolsProps> = (props) => {
  const { board } = props;

  const navigate = useNavigate();
  const { paletteMode, handleUpdate } = useSettings();
  const settings = useStoreBoard((state) => state.settings);
  const updateBgVariant = useStoreBoard((state) => state.updateBgVariant);
  const updateEnableControls = useStoreBoard((state) => state.updateEnableControls);
  const updateEnableMinimap = useStoreBoard((state) => state.updateEnableMinimap);
  const updateEnableSnapgrid = useStoreBoard((state) => state.updateEnableSnapgrid);
  const updateEnableDevmode = useStoreBoard((state) => state.updateEnableDevmode);
  const updateEnablePersistViewport = useStoreBoard((state) => state.updateEnablePersistViewport);

  const [anchorMenuEl, setAnchorMenuEl] = useState<HTMLElement | null>(null);

  const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorMenuEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorMenuEl(null);
  };

  const handleFieldUpdate = useCallback(
    (field: keyof SettingsType, value: any): void => {
      handleUpdate?.({ [field]: value });
    },
    [handleUpdate]
  );

  return (
    <>
      <Panel position="top-left">
        <Stack
          component={Paper}
          p={1}
          direction="row"
          alignItems="center"
        >
          <IconButton
            color="primary"
            onClick={() => navigate('/planner')}
          >
            <KeyboardArrowLeftTwoToneIcon />
          </IconButton>
          <Typography>{board?.name}</Typography>
          <IconButton
            color="primary"
            onClick={handleClickMenu}
          >
            <MenuTwoToneIcon />
          </IconButton>
        </Stack>
      </Panel>
      <NestedMenu
        open={!!anchorMenuEl}
        anchorEl={anchorMenuEl}
        items={[
          {
            id: 'view',
            label: 'View',
            children: [
              {
                id: 'controls',
                label: 'Controls',
                action: 'switch',
                options: { value: settings.enableControls },
                callback() {
                  updateEnableControls(!settings.enableControls);
                },
              },
              {
                id: 'minimap',
                label: 'Minimap',
                action: 'switch',
                options: { value: settings.enableMinimap },
                callback() {
                  updateEnableMinimap(!settings.enableMinimap);
                },
              },
            ],
          },
          {
            id: 'theme',
            label: 'Theme',
            children: [
              {
                id: 'theme-light',
                label: 'Light',
                action: 'radio',
                options: { value: paletteMode, radio: 'light' },
                callback() {
                  handleFieldUpdate('paletteMode', 'light');
                },
              },
              {
                id: 'theme-dark',
                label: 'Dark',
                action: 'radio',
                options: { value: paletteMode, radio: 'dark' },
                callback() {
                  handleFieldUpdate('paletteMode', 'dark');
                },
              },
            ],
          },
          {
            id: 'bg-variant',
            label: 'bg variant',
            children: [
              {
                id: 'lines',
                label: 'Lines',
                action: 'radio',
                options: { value: settings.bgVariant, radio: 'lines' },
                callback() {
                  updateBgVariant(BackgroundVariant.Lines);
                },
              },
              {
                id: 'dots',
                label: 'Dots',
                action: 'radio',
                options: { value: settings.bgVariant, radio: 'dots' },
                callback() {
                  updateBgVariant(BackgroundVariant.Dots);
                },
              },
              {
                id: 'cross',
                label: 'Cross',
                action: 'radio',
                options: { value: settings.bgVariant, radio: 'cross' },
                callback() {
                  updateBgVariant(BackgroundVariant.Cross);
                },
              },
            ],
          },
          {
            id: 'snap-grid',
            label: 'snap grid',
            action: 'switch',
            options: { value: settings.enableSnapgrid },
            callback: () => {
              updateEnableSnapgrid(!settings.enableSnapgrid);
            },
          },
          {
            id: 'persist-viewport',
            label: 'Persist viewport',
            action: 'switch',
            options: { value: settings.enablePersistViewport },
            callback: () => {
              updateEnablePersistViewport(!settings.enablePersistViewport);
            },
          },
          {
            id: 'dev-tool',
            label: 'Devtools',
            action: 'button',
            callback: () => {
              updateEnableDevmode(true);
            },
          },
        ]}
        onClose={handleCloseMenu}
      />
    </>
  );
};
