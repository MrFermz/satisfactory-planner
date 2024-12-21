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
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ASSEMBLER_RECIPE } from '@data/assembler';
import { tokens } from '@locales/tokens';
import { overClock } from '@utils/formular';
import { Ammo } from 'src/types/ammo';
import { Assembler } from 'src/types/building';
import { Recipe } from 'src/types/common';
import { Communication } from 'src/types/communication';
import { Consume } from 'src/types/consume';
import { Electronic } from 'src/types/electronic';
import { Ficsmas } from 'src/types/ficsmas';
import { Fuel } from 'src/types/fuel';
import { IndustrialPart } from 'src/types/industrial';
import { Ingot } from 'src/types/ingot';
import { Mineral } from 'src/types/mineral';
import { Nuclear } from 'src/types/nuclear';
import { Ore } from 'src/types/ore';
import { Special } from 'src/types/special';
import { StandartPart } from 'src/types/standart-part';
import { ClockspeedSelector, RecipeSelctor } from '../components';
import { Container } from 'src/types/container';

type ConnectionUsed = Assembler;

const acceptFicsmas = [
  'ficsmas-tree-barnch',
  'ficsmas-ornament-bundle',
  'ficsmas-wreath',
  'candy-cane',
  'copper-ficsmas-ornament',
  'iron-ficsmas-ornament',
  'ficsmas-actual-snow',
] as Ficsmas[];
const acceptStandartPart = [
  'copper-sheet',
  'plastic',
  'modular-frame',
  'steel-beam',
  'steel-pipe',
  'reinforced-iron-plate',
  'iron-rod',
  'screw',
  'fused-modular-frame',
  'alclad-aluminum-sheet',
  'iron-plate',
  'rubber',
  'aluminum-casing',
] as StandartPart[];
const acceptIngot = ['aluminum-ingot', 'copper-ingot', 'caterium-ingot', 'iron-ingot'] as Ingot[];
const acceptMineral = ['concrete', 'quartz-crystal', 'petroleum-coke', 'silica'] as Mineral[];
const acceptIndustrialPart = ['rotor', 'stator', 'cooling-system'] as IndustrialPart[];
const acceptElectronic = [
  'wire',
  'cable',
  'quickwire',
  'ai-limiter',
  'high-speed-connector',
  'circuit-board',
] as Electronic[];
const acceptNuclear = [
  'plutonium-pellet',
  'electromagnetic-control-rod',
  'encased-plutonium-cell',
] as Nuclear[];
const acceptCommunication = [
  'radio-control-unit',
  'supercomputer',
  'crystal-oscillator',
] as Communication[];
const acceptSpecial = ['adaptive-control-unit', 'versatile-framework'] as Special[];
const acceptAmmo = ['rifle-ammo', 'iron-rebar', 'nobelisk'] as Ammo[];
const acceptFuel = ['biomass', 'mycelia', 'compacted-coal'] as Fuel[];
const acceptConsume = ['smokeless-powder', 'black-powder'] as Consume[];
const acceptOre = ['sulfur', 'coal', 'limestone'] as Ore[];
const acceptContainer = ['pressure-conversion-cube'] as Container[];

export const AssemblerNode = memo((props: NodeProps) => {
  const { id } = props;
  const { output = [], clockSpeed = 100 } = props.data as Assembler;

  const { t } = useTranslation();
  const { updateNodeData } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const connection = useConnection();
  const fromNodeData = connection?.fromNode?.data as Assembler;
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
    const acceptStandartPartBool = acceptStandartPart.includes(
      fromNodeData?.output?.[0]?.type as StandartPart
    );
    const acceptIndustrialPartBool = acceptIndustrialPart.includes(
      fromNodeData?.output?.[0]?.type as IndustrialPart
    );
    const acceptElectronicBool = acceptElectronic.includes(
      fromNodeData?.output?.[0]?.type as Electronic
    );
    const acceptNuclearBool = acceptNuclear.includes(fromNodeData?.output?.[0]?.type as Nuclear);
    const acceptCommunicationBool = acceptCommunication.includes(
      fromNodeData?.output?.[0]?.type as Communication
    );
    const acceptSpecialBool = acceptSpecial.includes(fromNodeData?.output?.[0]?.type as Special);
    const acceptAmmoBool = acceptAmmo.includes(fromNodeData?.output?.[0]?.type as Ammo);
    const acceptConsumeBool = acceptConsume.includes(fromNodeData?.output?.[0]?.type as Consume);
    const acceptContainerBool = acceptContainer.includes(
      fromNodeData?.output?.[0]?.type as Container
    );
    return (
      coreBool &&
      (acceptFicsmasBool ||
        acceppIngotBool ||
        acceptOreBool ||
        acceptMineralBool ||
        acceptFuelBool ||
        acceptStandartPartBool ||
        acceptIndustrialPartBool ||
        acceptElectronicBool ||
        acceptNuclearBool ||
        acceptCommunicationBool ||
        acceptSpecialBool ||
        acceptAmmoBool ||
        acceptConsumeBool ||
        acceptContainerBool)
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
    const acceptStandartPartBool = acceptStandartPart.includes(
      fromNodeData?.output?.[0]?.type as StandartPart
    );
    const acceptIndustrialPartBool = acceptIndustrialPart.includes(
      fromNodeData?.output?.[0]?.type as IndustrialPart
    );
    const acceptElectronicBool = acceptElectronic.includes(
      fromNodeData?.output?.[0]?.type as Electronic
    );
    const acceptNuclearBool = acceptNuclear.includes(fromNodeData?.output?.[0]?.type as Nuclear);
    const acceptCommunicationBool = acceptCommunication.includes(
      fromNodeData?.output?.[0]?.type as Communication
    );
    const acceptSpecialBool = acceptSpecial.includes(fromNodeData?.output?.[0]?.type as Special);
    const acceptAmmoBool = acceptAmmo.includes(fromNodeData?.output?.[0]?.type as Ammo);
    const acceptConsumeBool = acceptConsume.includes(fromNodeData?.output?.[0]?.type as Consume);
    const acceptContainerBool = acceptContainer.includes(
      fromNodeData?.output?.[0]?.type as Container
    );
    return (
      coreBool &&
      (acceptFicsmasBool ||
        acceppIngotBool ||
        acceptOreBool ||
        acceptMineralBool ||
        acceptFuelBool ||
        acceptStandartPartBool ||
        acceptIndustrialPartBool ||
        acceptElectronicBool ||
        acceptNuclearBool ||
        acceptCommunicationBool ||
        acceptSpecialBool ||
        acceptAmmoBool ||
        acceptConsumeBool ||
        acceptContainerBool)
    );
  }, [connectionUsedA?.output, connectionsB.length, fromNodeData?.output]);

  useEffect(() => {
    const typeA = sourceA?.output?.[0]?.type;
    const valueA = sourceA?.output?.[0]?.type;
    const typeB = sourceB?.output?.[0]?.type;
    const valueB = sourceB?.output?.[0]?.type;
    if (typeA && valueA && typeB && valueB) {
      const assembler = recipe;
      // const process = assembler?.value;
      const outputVal = assembler?.output;
      const result = assembler?.result;
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
      } as Assembler);
    } else {
      updateNodeData(id, { output: [] });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clockSpeed, id, recipe, sourceA?.output, sourceB?.output, updateNodeData]);

  const handleChangeClockSpeed = useCallback(
    (clockSpeed: number) => updateNodeData(id, { clockSpeed } as Assembler),
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
      <Typography>{t(tokens.build.assembler)}</Typography>
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
          <RecipeSelctor
            value={recipe}
            type={type}
            recipes={ASSEMBLER_RECIPE}
            disabled={disabledRecipe}
            onSelectRecipe={handleChangeRecipe}
          />
        </Box>
      </Stack>
      <ClockspeedSelector
        clockSpeed={clockSpeed}
        output={output!}
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
        position={Position.Right}
      />
    </Stack>
  );
});

AssemblerNode.displayName = 'assembler';
