import { Paper, Stack, Typography } from '@mui/material';
import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { EXTRACTOR_VALUES } from '@data/common';
import { tokens } from '@locales/tokens';
import { overClock } from '@utils/formular';
import { Mark, Miner } from 'src/types/building';
import { Ore } from 'src/types/ore';
import { ClockspeedSelector, MarkSelector, OreSelector, QualitySelector } from '../components';
import { Quality } from 'src/types/common';

export const MinerNode = memo((props: NodeProps) => {
  const { id } = props;
  const {
    mark = 1,
    quality = 'normal',
    input = 'coal',
    output = [],
    clockSpeed = 100,
  } = props?.data as Miner;

  const { t } = useTranslation();
  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    const extractor = EXTRACTOR_VALUES.filter((extractor) => extractor.type === quality)[0];
    const value = extractor.value * mark;
    const valueWithClockSpeed = overClock(value, clockSpeed);
    updateNodeData(id, {
      output: [
        {
          ...output[0],
          type: input,
          value: valueWithClockSpeed,
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clockSpeed, id, input, mark, quality, updateNodeData]);

  const handleSelectMark = useCallback(
    (mark: Mark) => updateNodeData(id, { mark } as Miner),
    [id, updateNodeData]
  );

  const handleSelectQuality = useCallback(
    (quality: Quality) => updateNodeData(id, { quality } as Miner),
    [id, updateNodeData]
  );

  const handleSelectOre = useCallback(
    (ore: Ore) => updateNodeData(id, { input: ore } as Miner),
    [id, updateNodeData]
  );

  const handleChangeClockSpeed = useCallback(
    (clockSpeed: number) => updateNodeData(id, { clockSpeed } as Miner),
    [id, updateNodeData]
  );

  return (
    <Stack
      component={Paper}
      p={1}
    >
      <Typography>{t(tokens.build.miner)}</Typography>
      <MarkSelector
        mark={mark}
        onSelectMark={handleSelectMark}
      />
      <QualitySelector
        quality={quality}
        onSelectQuality={handleSelectQuality}
      />
      <OreSelector
        ore={input}
        onSelectOre={handleSelectOre}
      />
      <ClockspeedSelector
        clockSpeed={clockSpeed}
        output={output}
        onSelectClockSpeed={handleChangeClockSpeed}
      />
      <Handle
        type="source"
        position={Position.Right}
      />
    </Stack>
  );
});

MinerNode.displayName = 'miner-node';
