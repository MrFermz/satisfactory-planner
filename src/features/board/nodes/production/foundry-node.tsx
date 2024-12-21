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

import { FOUNDRY_RECIPE } from '@data/foundry';
import { tokens } from '@locales/tokens';
import { overClock } from '@utils/formular';
import { Blender, Constructor, Foundry, Miner, Refinery, Smelter } from 'src/types/building';
import { Recipe } from 'src/types/common';
import { Ficsmas } from 'src/types/ficsmas';
import { Fuel } from 'src/types/fuel';
import { Ingot } from 'src/types/ingot';
import { Mineral } from 'src/types/mineral';
import { Ore } from 'src/types/ore';
import { ClockspeedSelector, RecipeSelctor } from '../components';

type ConnectionUsed = Miner | Refinery | Blender | Constructor | Smelter | Foundry | undefined;

const acceptFicsmas = ['red-ficsmas-ornament', 'blue-ficsmas-ornament'] as Ficsmas[];
const acceptIngot = ['copper-ingot', 'iron-ingot', 'steel-ingot'] as Ingot[];
const acceptOre = [
  'iron-ore',
  'coal',
  'copper-ore',
  'raw-quartz',
  'limestone',
  'caterium-ore',
] as Ore[];
const acceptMineral = ['aluminum-scrap', 'silica', 'concrete', 'petroleum-coke'] as Mineral[];
const acceptFuel = ['compacted-coal'] as Fuel[];

export const FoundryNode = memo((props: NodeProps) => {
  const { id } = props;
  const { output = [], clockSpeed = 100 } = props.data as Foundry;

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
  const [recipe, setRecipe] = useState<Recipe>(props.data.recipe as Recipe);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals]);

  useEffect(() => {
    setConnectionUsedA(sourceA);
    setConnectionUsedB(sourceB);
  }, [sourceA, sourceB]);

  const type = useMemo(() => {
    return [sourceA?.output?.[0]?.type, sourceB?.output?.[0]?.type];
  }, [sourceA?.output, sourceB?.output]);

  const disabledRecipe = useMemo(() => {
    return !sourceA || !sourceB;
  }, [sourceA, sourceB]);

  const isConnectableA = useMemo(() => {
    const sameTypeBool = connectionUsedB?.output?.[0]?.type !== fromNodeData?.output?.[0]?.type;
    const coreBool = connectionsA.length === 0 && sameTypeBool;
    const acceptFicsmasBool = acceptFicsmas.includes(fromNodeData?.output?.[0]?.type as Ficsmas);
    const acceppIngotBool = acceptIngot.includes(fromNodeData?.output?.[0]?.type as Ingot);
    const acceptOreBool = acceptOre.includes(fromNodeData?.output?.[0]?.type as Ore);
    const acceptMineralBool = acceptMineral.includes(fromNodeData?.output?.[0]?.type as Mineral);
    const acceptFuelBool = acceptFuel.includes(fromNodeData?.output?.[0]?.type as Fuel);
    return (
      coreBool &&
      (acceptFicsmasBool || acceppIngotBool || acceptOreBool || acceptMineralBool || acceptFuelBool)
    );
  }, [connectionUsedB?.output, connectionsA.length, fromNodeData?.output]);

  const isConnectableB = useMemo(() => {
    const sameTypeBool = connectionUsedA?.output?.[0]?.type !== fromNodeData?.output?.[0]?.type;
    const coreBool = connectionsB.length === 0 && sameTypeBool;
    const acceptFicsmasBool = acceptFicsmas.includes(fromNodeData?.output?.[0]?.type as Ficsmas);
    const acceppIngotBool = acceptIngot.includes(fromNodeData?.output?.[0]?.type as Ingot);
    const acceptOreBool = acceptOre.includes(fromNodeData?.output?.[0]?.type as Ore);
    const acceptMineralBool = acceptMineral.includes(fromNodeData?.output?.[0]?.type as Mineral);
    const acceptFuelBool = acceptFuel.includes(fromNodeData?.output?.[0]?.type as Fuel);
    return (
      coreBool &&
      (acceptFicsmasBool || acceppIngotBool || acceptOreBool || acceptMineralBool || acceptFuelBool)
    );
  }, [connectionUsedA?.output, connectionsB.length, fromNodeData?.output]);

  useEffect(() => {
    const typeA = sourceA?.output?.[0]?.type;
    const valueA = sourceA?.output?.[0]?.type;
    const typeB = sourceB?.output?.[0]?.type;
    const valueB = sourceB?.output?.[0]?.type;
    const foundry = FOUNDRY_RECIPE.find(
      (foundry) => difference(foundry.type, [typeA, typeB]).length === 0
    );
    if (typeA && valueA && typeB && valueB && foundry) {
      // const process = refinery?.value;
      const outputVal = foundry?.output;
      const result = foundry?.result;
      const valueWithClockSpeed = overClock(outputVal?.[0] as number, clockSpeed);
      updateNodeData(id, {
        output: [
          {
            ...output[0],
            type: result?.[0],
            value: valueWithClockSpeed,
          },
        ],
        recipe,
      } as unknown as Foundry);
    } else {
      updateNodeData(id, { output: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clockSpeed, id, recipe, sourceA?.output, sourceB?.output, updateNodeData]);

  const handleChangeClockSpeed = useCallback(
    (clockSpeed: number) => updateNodeData(id, { clockSpeed } as Foundry),
    [id, updateNodeData]
  );

  const handleChangeRecipe = useCallback((recipe: Recipe) => {
    setRecipe(recipe);
  }, []);

  return (
    <Stack
      component={Paper}
      p={1}
    >
      <Typography>{t(tokens.build.foundry)}</Typography>
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
        <Box component="div">
          <Box component="div">
            <RecipeSelctor
              value={recipe}
              type={type}
              recipes={FOUNDRY_RECIPE}
              disabled={disabledRecipe}
              onSelectRecipe={handleChangeRecipe}
            />
          </Box>
        </Box>
      </Stack>
      <ClockspeedSelector
        clockSpeed={clockSpeed}
        output={output}
        onSelectClockSpeed={handleChangeClockSpeed}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="target-a"
        style={{ top: '25%' }}
        isConnectable={isConnectableA}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="target-b"
        style={{ top: '75%' }}
        isConnectable={isConnectableB}
      />
      <Handle
        type="source"
        position={Position.Right}
      />
    </Stack>
  );
});

FoundryNode.displayName = 'foundry-node';
