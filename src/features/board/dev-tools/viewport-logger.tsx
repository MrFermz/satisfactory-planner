import { Typography } from '@mui/material';
import { Panel, useStore } from '@xyflow/react';
import { FC } from 'react';

import { FONT_FAMILY, FONT_SIZE, LINE_HEIGHT, VARIANT } from './dev-tools';

export const ViewportLogger: FC = () => {
  const viewport = useStore(
    (view) =>
      `x:${view.transform[0].toFixed(2)}, y:${view.transform[1].toFixed(2)}, zoom:${view.transform[2].toFixed(2)}`
  );

  return (
    <Panel position="top-center">
      <Typography
        variant={VARIANT}
        lineHeight={LINE_HEIGHT}
        fontSize={FONT_SIZE * 1.5}
        fontFamily={FONT_FAMILY}
      >
        {viewport}
      </Typography>
    </Panel>
  );
};
