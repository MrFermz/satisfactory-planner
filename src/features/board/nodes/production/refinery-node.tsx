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

import { REFINERY_RECIPE } from '@data/common';
import { tokens } from '@locales/tokens';
import { overClock } from '@utils/formular';
import { Miner, Output, Refinery, WaterExtractor } from 'src/types/building';
import { Liquid } from 'src/types/liquid';
import { Ore } from 'src/types/ore';
import { ClockspeedSelector } from '../components';

type ConnectionUsed = Miner | WaterExtractor | undefined;

const acceptOre = [
  'bauxite',
  'sulfur',
  'limestone',
  'raw-quartz',
  'iron-ore',
  'copper-ore',
  'caterium-ore',
] as Ore[];
const acceptLiquid = [
  'crude-oil',
  'heavy-oil-residue',
  'water',
  'alumina-solution',
  'nitric-acid',
  'sulfuric-acid',
] as Liquid[];

export const RefineryNode = memo((props: NodeProps) => {
  const { id } = props;
  const { output = [], clockSpeed = 100 } = props.data as Refinery;

  const { t } = useTranslation();
  const { updateNodeData } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const connection = useConnection();
  const fromNodeData = connection?.fromNode?.data as Miner;
  const connectionsA = useHandleConnections({ type: 'target', id: 'target-a' });
  const connectionsB = useHandleConnections({ type: 'target', id: 'target-b' });
  const sourceA = useNodesData(connectionsA?.[0]?.source)?.data as ConnectionUsed;
  const sourceB = useNodesData(connectionsB?.[0]?.source)?.data as ConnectionUsed;

  const [connectionUsedA, setConnectionUsedA] = useState<ConnectionUsed>();
  const [connectionUsedB, setConnectionUsedB] = useState<ConnectionUsed>();

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals]);

  useEffect(() => {
    setConnectionUsedA(sourceA);
    setConnectionUsedB(sourceB);
  }, [sourceA, sourceB]);

  const isConnectableA = useMemo(() => {
    const sameTypeBool = connectionUsedB?.output?.[0]?.type !== fromNodeData?.output?.[0]?.type;
    const coreBool = connectionsA.length === 0 && sameTypeBool;
    const acceptOreBool = acceptOre.includes(fromNodeData?.output?.[0]?.type as Ore);
    const acceptLiquidBool = acceptLiquid.includes(fromNodeData?.output?.[0]?.type as Liquid);
    return coreBool && (acceptOreBool || acceptLiquidBool);
  }, [connectionUsedB?.output, connectionsA.length, fromNodeData?.output]);

  const isConnectableB = useMemo(() => {
    const sameTypeBool = connectionUsedA?.output?.[0]?.type !== fromNodeData?.output?.[0]?.type;
    const coreBool = connectionsB.length === 0 && sameTypeBool;
    const acceptOreBool = acceptOre.includes(fromNodeData?.output?.[0]?.type as Ore);
    const acceptLiquidBool = acceptLiquid.includes(fromNodeData?.output?.[0]?.type as Liquid);
    return coreBool && (acceptOreBool || acceptLiquidBool);
  }, [connectionUsedA?.output, connectionsB.length, fromNodeData?.output]);

  useEffect(() => {
    const typeA = sourceA?.output?.[0]?.type;
    const valueA = sourceA?.output?.[0]?.type;
    const typeB = sourceB?.output?.[0]?.type;
    const valueB = sourceB?.output?.[0]?.type;
    const refinery = REFINERY_RECIPE.find(
      (refinery) => difference(refinery.type, [typeA, typeB]).length === 0
    );
    if (typeA && valueA && typeB && valueB && refinery) {
      const process = refinery?.value;
      const outputVal = refinery?.output;
      const result = refinery?.result;
      const valueWithClockSpeedA = overClock(outputVal?.[0] as number, clockSpeed);
      const valueWithClockSpeedB = overClock(outputVal?.[1] as number, clockSpeed);
      updateNodeData(id, {
        output: [
          {
            type: result?.[0],
            value: valueWithClockSpeedA,
          },
          {
            type: result?.[1],
            value: valueWithClockSpeedB,
          },
        ],
      } as unknown as Refinery);
    } else {
      updateNodeData(id, { output: [] });
    }
  }, [clockSpeed, id, sourceA?.output, sourceB?.output, updateNodeData]);

  const handleChangeClockSpeed = useCallback(
    (clockSpeed: number) => updateNodeData(id, { clockSpeed } as Refinery),
    [id, updateNodeData]
  );

  return (
    <Stack
      component={Paper}
      p={1}
    >
      <Typography>{t(tokens.build.refinery)}</Typography>
      <Stack direction="row">
        <Stack>
          <Box component="div">
            {sourceA?.output?.[0]?.type}({sourceA?.output?.[0]?.value})
          </Box>
          <Box component="div">
            {sourceB?.output?.[0]?.type}({sourceB?.output?.[0]?.value})
          </Box>
        </Stack>
        <Box component="div">
          <SvgIcon fontSize="large">
            <ArrowForwardTwoToneIcon />
          </SvgIcon>
        </Box>
        <Stack>
          <Box component="div">
            {output[0]?.type}({output[0]?.value})
          </Box>
          <Box component="div">
            {output[1]?.type}({output[1]?.value})
          </Box>
        </Stack>
      </Stack>
      <ClockspeedSelector
        clockSpeed={clockSpeed}
        output={output as [Output, Output?]}
        onSelectClockSpeed={handleChangeClockSpeed}
      />
      <Handle
        type="target"
        id="target-a"
        position={Position.Left}
        style={{ top: '25%' }}
        isConnectable={isConnectableA}
      />
      <Handle
        type="target"
        id="target-b"
        position={Position.Left}
        style={{ top: '75%' }}
        isConnectable={isConnectableB}
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

RefineryNode.displayName = 'refinery-node';
