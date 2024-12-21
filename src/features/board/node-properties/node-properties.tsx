import { FC } from 'react';
import { Paper, Stack } from '@mui/material';
import { Panel } from '@xyflow/react';

export const NodeProperties: FC = () => {
  return (
    <Panel position="top-right">
      <Stack
        component={Paper}
        p={1}
      >
        NodeProperties
      </Stack>
    </Panel>
  );
};
