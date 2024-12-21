import { Box, Typography } from '@mui/material';
import { camelCase } from 'lodash';
import { FC } from 'react';
import { useDrag } from 'react-dnd';

import { Build } from 'src/types/building';

interface NodeCardProps {
  data: Build;
}

export const NodeCard: FC<NodeCardProps> = (props) => {
  const { data } = props;

  const [, drag] = useDrag(
    () => ({
      type: 'node-card',
      item: data,
    }),
    []
  );

  return (
    <Box
      ref={drag}
      key={`${data.type}-node-base`}
      component="div"
    >
      <Typography>{camelCase(data.type)}</Typography>
    </Box>
  );
};
