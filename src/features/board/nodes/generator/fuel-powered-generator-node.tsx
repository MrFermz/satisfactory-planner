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
import { BiomassBurner, Constructor, Smelter } from 'src/types/building';
import { Mineral } from 'src/types/mineral';
import { Ore } from 'src/types/ore';
import { ClockspeedSelector } from '../components';

export const FuelPoweredGeneratorNode = memo((props: NodeProps) => {
  const { id } = props;
  const { output, clockSpeed = 100 } = props.data as BiomassBurner;

  const { t } = useTranslation();

  return (
    <Stack
      component={Paper}
      p={1}
    >
      <Typography>{t(tokens.build.fuelPoweredGenerator)}</Typography>
      <Handle
        type="target"
        position={Position.Left}
      />
    </Stack>
  );
});

FuelPoweredGeneratorNode.displayName = 'fuel-powered-generator-node';
