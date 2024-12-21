import { Paper, Stack, Typography } from '@mui/material';
import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { EXTRACTOR_VALUES } from '@data/common';
import { tokens } from '@locales/tokens';
import { overClock } from '@utils/formular';
import { WaterExtractor } from 'src/types/building';
import { Quality } from 'src/types/common';
import { ClockspeedSelector, QualitySelector } from '../components';

export const WaterExtractorNode = memo((props: NodeProps) => {
  const { id } = props;
  const {
    mark = 1,
    quality = 'normal',
    input = 'water',
    output = [],
    clockSpeed = 100,
  } = props?.data as WaterExtractor;

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

  const handleSelectQuality = useCallback(
    (quality: Quality) => updateNodeData(id, { quality } as WaterExtractor),
    [id, updateNodeData]
  );

  const handleChangeClockSpeed = useCallback(
    (clockSpeed: number) => updateNodeData(id, { clockSpeed } as WaterExtractor),
    [id, updateNodeData]
  );

  return (
    <Stack
      component={Paper}
      p={1}
    >
      <Typography>{t(tokens.build.waterExtractor)}</Typography>
      <QualitySelector
        quality={quality}
        onSelectQuality={handleSelectQuality}
      />
      <ClockspeedSelector
        clockSpeed={clockSpeed}
        output={output!}
        onSelectClockSpeed={handleChangeClockSpeed}
      />
      <Handle
        type="source"
        position={Position.Right}
      />
    </Stack>
  );
});

WaterExtractorNode.displayName = 'water-extractor-node';
