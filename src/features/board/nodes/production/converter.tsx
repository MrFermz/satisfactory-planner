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
  useUpdateNodeInternals,
} from '@xyflow/react';
import { difference } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@locales/tokens';
import { overClock } from '@utils/formular';
import { Converter, Miner, Output, Refinery, WaterExtractor } from 'src/types/building';
import { Liquid } from 'src/types/liquid';
import { Ore } from 'src/types/ore';
import { ClockspeedSelector } from '../components';

export const ConverterNode = memo((props: NodeProps) => {
  const { id } = props;
  const { output = [], clockSpeed = 100 } = props.data as Converter;

  const { t } = useTranslation();

  return (
    <Stack
      component={Paper}
      p={1}
    >
      <Typography>{t(tokens.build.converter)}</Typography>
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
        id="source-a"
        position={Position.Right}
        style={{ top: '25%' }}
      />
      <Handle
        type="source"
        id="source-b"
        position={Position.Right}
        style={{ top: '75%' }}
      />
    </Stack>
  );
});

ConverterNode.displayName = 'converter-node';
