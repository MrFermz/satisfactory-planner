import { Button, FormControlLabel, Paper, Stack, Switch, TypographyVariant } from '@mui/material';
import { Panel } from '@xyflow/react';
import { FC, useState } from 'react';

import { NodeInspector } from './node-inspector';
import { ViewportLogger } from './viewport-logger';
import { ChangeLogger } from './change-logger';
import { useStoreBoard } from '@stores/board';

export const VARIANT: TypographyVariant = 'caption';
export const LINE_HEIGHT = 1;
export const FONT_SIZE = 8;
export const FONT_FAMILY = 'monospace';

export const DevTools: FC = () => {
  const updateEnableDevmode = useStoreBoard((state) => state.updateEnableDevmode);

  const [nodeInspectorActive, setNodeInspectorActive] = useState(true);
  const [changeLoggerActive, setChangeLoggerActive] = useState(true);
  const [viewportLoggerActive, setViewportLoggerActive] = useState(true);

  return (
    <>
      <Panel position="top-center">
        <Stack
          component={Paper}
          p={1}
        >
          <FormControlLabel
            control={
              <Switch
                checked={nodeInspectorActive}
                onChange={() => setNodeInspectorActive(!nodeInspectorActive)}
              />
            }
            label="Node Inspector"
          />
          <FormControlLabel
            control={
              <Switch
                checked={changeLoggerActive}
                onChange={() => setChangeLoggerActive(!changeLoggerActive)}
              />
            }
            label="Toggle Change Logger"
          />
          <FormControlLabel
            control={
              <Switch
                checked={viewportLoggerActive}
                onChange={() => setViewportLoggerActive(!viewportLoggerActive)}
              />
            }
            label="Viewport Logger"
          />
          <Button
            color="error"
            onClick={() => updateEnableDevmode(false)}
          >
            Close
          </Button>
        </Stack>
      </Panel>
      {changeLoggerActive && <ChangeLogger />}
      {nodeInspectorActive && <NodeInspector />}
      {viewportLoggerActive && <ViewportLogger />}
    </>
  );
};
