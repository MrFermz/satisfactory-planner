import { Slider, Typography } from '@mui/material';
import { FC, useCallback, useMemo } from 'react';

import { Output } from 'src/types/building';

interface ClockspeedSelectorProps {
  clockSpeed: number;
  output: [Output?, Output?];
  onSelectClockSpeed: (clockspeed: number) => void;
}

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 100,
    label: '100%',
  },
  {
    value: 150,
    label: '150%',
  },
  {
    value: 200,
    label: '200%',
  },
  {
    value: 250,
    label: '250%',
  },
];

export const ClockspeedSelector: FC<ClockspeedSelectorProps> = ({
  clockSpeed,
  output,
  onSelectClockSpeed,
}) => {
  const rate = useMemo(() => {
    if (output?.length > 0) {
      return output.map((out) => (
        <>
          <Typography
            fontSize={10}
            lineHeight={1}
          >
            output: {out?.type}
          </Typography>
          <Typography
            fontSize={10}
            lineHeight={1}
          >
            rate: {out?.value}
          </Typography>
        </>
      ));
    }
    return null;
  }, [output]);

  const handleChange = useCallback(
    (_event: Event, clockSpeed: number | number[]) => onSelectClockSpeed(clockSpeed as number),
    [onSelectClockSpeed]
  );

  return (
    <>
      <Typography
        fontSize={10}
        lineHeight={1}
      >
        Clock speed: {clockSpeed}%
      </Typography>
      {rate}
      <Slider
        className="nodrag"
        size="small"
        valueLabelDisplay="auto"
        value={clockSpeed}
        min={0}
        max={250}
        marks={marks}
        onChange={handleChange}
      />
    </>
  );
};
