import { Paper, Stack, Typography } from '@mui/material';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@locales/tokens';
import { Foundry, Manufacturer } from 'src/types/building';

export const ManufacturerNode = memo((props: NodeProps) => {
  const { id } = props;
  const { output, clockSpeed = 100 } = props.data as Manufacturer;

  const { t } = useTranslation();

  return (
    <Stack
      component={Paper}
      p={1}
    >
      <Typography>{t(tokens.build.manufacturer)}</Typography>
      <Handle
        type="target"
        id="target-a"
        position={Position.Left}
        style={{ top: '25%' }}
      />
      <Handle
        type="target"
        id="target-b"
        position={Position.Left}
        style={{ top: '50%' }}
      />
      <Handle
        type="target"
        id="target-c"
        position={Position.Left}
        style={{ top: '75%' }}
      />
      <Handle
        type="target"
        id="target-d"
        position={Position.Left}
        style={{ top: '100%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
      />
    </Stack>
  );
});

ManufacturerNode.displayName = 'manufacturer-node';
