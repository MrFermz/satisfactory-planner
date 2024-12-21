import { Button, ButtonGroup } from '@mui/material';
import { FC } from 'react';

import { QUALITIES } from '@data/common';
import { Quality } from 'src/types/common';

interface QualitySelectorProps {
  quality: Quality;
  onSelectQuality: (quality: Quality) => void;
}

export const QualitySelector: FC<QualitySelectorProps> = ({ quality, onSelectQuality }) => {
  return (
    <ButtonGroup
      className="nodrag"
      size="small"
    >
      {QUALITIES.map((qua) => (
        <Button
          key={qua}
          variant={quality === qua ? 'contained' : 'outlined'}
          onClick={() => onSelectQuality(qua)}
        >
          {qua}
        </Button>
      ))}
    </ButtonGroup>
  );
};
