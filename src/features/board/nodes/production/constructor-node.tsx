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
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CONSTRUCTOR_RECIPE } from '@data/constructor';
import { tokens } from '@locales/tokens';
import { overClock } from '@utils/formular';
import { Constructor } from 'src/types/building';
import { Recipe } from 'src/types/common';
import { Electronic } from 'src/types/electronic';
import { Ficsmas } from 'src/types/ficsmas';
import { Fuel } from 'src/types/fuel';
import { Ingot } from 'src/types/ingot';
import { Ore } from 'src/types/ore';
import { Special } from 'src/types/special';
import { StandartPart } from 'src/types/standart-part';
import { ClockspeedSelector, RecipeSelctor } from '../components';

const acceptOre = ['sam', 'raw-quartz', 'limestone'] as Ore[];
const acceptIngot = [
  'iron-ingot',
  'ficsite-ingot',
  'steel-ingot',
  'aluminum-ingot',
  'copper-ingot',
  'caterium-ingot',
] as Ingot[];
const acceptStandartPart = ['plastic', 'iron-rod', 'steel-beam'] as StandartPart[];
const acceptFuel = ['biomass', 'mycelia', 'leaves', 'wood'] as Fuel[];
const acceptSpecial = [
  'hog-remains',
  'splitter-remains',
  'blue-power-slug',
  'stinger-remains',
  'hatcher-remains',
  'alien-protein',
  'purple-power-slug',
  'yello-power-slug',
] as Special[];
const acceptElectronic = ['wire'] as Electronic[];
const acceptFicsmas = ['ficsmas-actual-snow'] as Ficsmas[];

export const ConstructorNode = memo((props: NodeProps) => {
  const { id } = props;
  const { output = [], clockSpeed = 100 } = props.data as Constructor;

  const { t } = useTranslation();
  const { updateNodeData } = useReactFlow();
  const connection = useConnection();
  const fromNodeData = connection?.fromNode?.data as Constructor;
  const connections = useHandleConnections({ type: 'target' });
  const source = useNodesData(connections?.[0]?.source)?.data as Constructor;

  const [recipe, setRecipe] = useState<Recipe>(props.data.recipe as Recipe);

  const isConnectable = useMemo(() => {
    const acceptOreBool = acceptOre.includes(fromNodeData?.output?.[0]?.type as Ore);
    const acceptIngotBool = acceptIngot.includes(fromNodeData?.output?.[0]?.type as Ingot);
    const acceptStandartPartBool = acceptStandartPart.includes(
      fromNodeData?.output?.[0]?.type as StandartPart
    );
    const acceptFuelBool = acceptFuel.includes(fromNodeData?.output?.[0]?.type as Fuel);
    const acceptSpecialBool = acceptSpecial.includes(fromNodeData?.output?.[0]?.type as Special);
    const acceptElectronicBool = acceptElectronic.includes(
      fromNodeData?.output?.[0]?.type as Electronic
    );
    const acceptFicsmasBool = acceptFicsmas.includes(fromNodeData?.output?.[0]?.type as Ficsmas);
    return (
      connections.length === 0 &&
      (acceptOreBool ||
        acceptIngotBool ||
        acceptStandartPartBool ||
        acceptFuelBool ||
        acceptSpecialBool ||
        acceptElectronicBool ||
        acceptFicsmasBool)
    );
  }, [connections.length, fromNodeData?.output]);

  useEffect(() => {
    const type = source?.output?.[0]?.type;
    const value = source?.output?.[0]?.value;
    if (value && type) {
      const constructor = recipe;
      // const process = constructor?.value;
      const outputVal = constructor?.output;
      const result = constructor?.result;
      // const processWithClockSpeed = overClock(process!, clockSpeed);
      const valueWithClockSpeed = overClock(outputVal?.[0], clockSpeed);
      updateNodeData(id, {
        output: [
          {
            ...output[0],
            type: result,
            value: valueWithClockSpeed,
          },
        ],
        input: type,
        recipe,
      } as Constructor);
    } else {
      updateNodeData(id, { output: [] } as Constructor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clockSpeed, id, recipe, source?.output, updateNodeData]);

  const handleChangeClockSpeed = useCallback(
    (clockSpeed: number) => updateNodeData(id, { clockSpeed } as Constructor),
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
      <Typography>{t(tokens.build.constructor_)}</Typography>
      <Stack direction="row">
        <Box component="div">
          {source?.output?.[0]?.type}({source?.output?.[0]?.value})
        </Box>
        <Box component="div">
          <SvgIcon fontSize="large">
            <ArrowForwardTwoToneIcon />
          </SvgIcon>
        </Box>
        <Box component="div">
          <RecipeSelctor
            value={recipe}
            type={[source?.output?.[0]?.type]}
            recipes={CONSTRUCTOR_RECIPE}
            onSelectRecipe={handleChangeRecipe}
          />
          ({output?.[0]?.value})
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
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
      />
    </Stack>
  );
});

ConstructorNode.displayName = 'constructor-node';
