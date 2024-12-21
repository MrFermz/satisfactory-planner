import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import { Box, Paper, Stack, SvgIcon, Typography } from '@mui/material';
import {
  Handle,
  NodeProps,
  Position,
  useConnection,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from '@xyflow/react';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@locales/tokens';
import { success } from '@theme/colors';
import { overClock } from '@utils/formular';
import {
  BiomassBurner,
  CoalPoweredGenerator,
  Constructor,
  FuelPoweredGenerator,
  NuclearPowerPlant,
  Smelter,
} from 'src/types/building';
import { Mineral } from 'src/types/mineral';
import { Ore } from 'src/types/ore';
import { ClockspeedSelector } from '../components';

export const NuclearPowerPlantNode = memo((props: NodeProps) => {
  const { id } = props;
  const { output, clockSpeed = 100 } = props.data as NuclearPowerPlant;

  const { t } = useTranslation();

  return (
    <Stack
      component={Paper}
      p={1}
    >
      <Typography>{t(tokens.build.nuclearPowerPlant)}</Typography>
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
        style={{ top: '75%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
      />
    </Stack>
  );
});

NuclearPowerPlantNode.displayName = 'nuclear-power-plant-node';
