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
import { AlienPowerAugmenter, BiomassBurner, Constructor, Smelter } from 'src/types/building';
import { Mineral } from 'src/types/mineral';
import { Ore } from 'src/types/ore';
import { ClockspeedSelector } from '../components';

export const AlienPowerAugmenterNode = memo((props: NodeProps) => {
  const { id } = props;
  const { output, clockSpeed = 100 } = props.data as AlienPowerAugmenter;

  const { t } = useTranslation();

  return (
    <Stack
      component={Paper}
      p={1}
    >
      <Typography>{t(tokens.build.alienPowerAugmenter)}</Typography>
      <Handle
        type="target"
        position={Position.Left}
      />
    </Stack>
  );
});

AlienPowerAugmenterNode.displayName = 'alien-power-augmenter-node';
