import { FC, useMemo } from 'react';
import { IconButton, Paper, Stack } from '@mui/material';
import { Panel, useReactFlow } from '@xyflow/react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import CropFreeTwoToneIcon from '@mui/icons-material/CropFreeTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';

interface ControlsProps {
  showZoom?: boolean;
  showFitView?: boolean;
  showLock?: boolean;
}

export const Controls: FC<ControlsProps> = (props) => {
  const { showZoom = true, showFitView = true, showLock = true } = props;

  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const zoom = useMemo(() => {
    if (showZoom) {
      return (
        <>
          <IconButton
            color="primary"
            onClick={() => zoomIn()}
          >
            <AddTwoToneIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => zoomOut()}
          >
            <RemoveTwoToneIcon />
          </IconButton>
        </>
      );
    }
    return null;
  }, [showZoom, zoomIn, zoomOut]);

  const fitview = useMemo(() => {
    if (showFitView) {
      return (
        <IconButton
          color="primary"
          onClick={() => fitView()}
        >
          <CropFreeTwoToneIcon />
        </IconButton>
      );
    }
    return null;
  }, [fitView, showFitView]);

  const interative = useMemo(() => {
    if (showLock) {
      return (
        <IconButton color="primary">
          <LockTwoToneIcon />
          <LockOpenTwoToneIcon />
        </IconButton>
      );
    }
    return null;
  }, [showLock]);

  return (
    <Panel position="bottom-left">
      <Stack
        component={Paper}
        p={1}
        direction="row"
      >
        {zoom}
        {fitview}
        {interative}
      </Stack>
    </Panel>
  );
};
