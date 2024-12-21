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
import { some } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SMELTER_RECIPE } from '@data/smelter';
import { tokens } from '@locales/tokens';
import { success } from '@theme/colors';
import { overClock } from '@utils/formular';
import { Smelter } from 'src/types/building';
import { Recipe } from 'src/types/common';
import { Mineral } from 'src/types/mineral';
import { Ore } from 'src/types/ore';
import { ClockspeedSelector, RecipeSelctor } from '../components';

const acceptOre = ['iron-ore', 'caterium-ore', 'copper-ore'] as Ore[];
const acceptMineral = ['aluminum-scrap'] as Mineral[];

export const SmelterNode = memo((props: NodeProps) => {
  const { id } = props;
  const { output = [], clockSpeed = 100 } = props.data as Smelter;

  const { t } = useTranslation();
  const { updateNodeData } = useReactFlow();
  const connection = useConnection();
  const fromNodeData = connection?.fromNode?.data as Smelter;
  const connections = useHandleConnections({ type: 'target' });
  const source = useNodesData(connections?.[0]?.source)?.data as Smelter;

  const [recipe, setRecipe] = useState<Recipe>(props.data.recipe as Recipe);

  const isConnectable = useMemo(() => {
    const acceptOreBool = some(acceptOre, (item) =>
      fromNodeData?.output?.[0]?.type?.includes(item)
    );
    const acceptMineralBool = some(acceptMineral, (item) =>
      fromNodeData?.output?.[0]?.type?.includes(item)
    );
    return connections.length === 0 && (acceptOreBool || acceptMineralBool);
  }, [connections.length, fromNodeData?.output]);

  useEffect(() => {
    const type = source?.output?.[0]?.type;
    const value = source?.output?.[0]?.value;
    if (value && type) {
      const smelter = recipe;
      // const process = smelter?.value;
      const outputVal = smelter?.output;
      const result = smelter?.result;
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
      } as Smelter);
    } else {
      updateNodeData(id, { output: [] } as Smelter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clockSpeed, id, recipe, source?.output, updateNodeData]);

  const handleChangeClockSpeed = useCallback(
    (clockSpeed: number) => updateNodeData(id, { clockSpeed } as Smelter),
    [id, updateNodeData]
  );

  const handleChangeRecipe = useCallback((recipe: Recipe) => {
    setRecipe(recipe);
  }, []);

  return (
    <Stack
      component={Paper}
      p={1}
      bgcolor={isConnectable ? success.light : 'paper'}
    >
      <Typography>{t(tokens.build.smelter)}</Typography>
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
            recipes={SMELTER_RECIPE}
            onSelectRecipe={handleChangeRecipe}
          />
          ({output[0]?.value})
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

SmelterNode.displayName = 'smelter-node';
