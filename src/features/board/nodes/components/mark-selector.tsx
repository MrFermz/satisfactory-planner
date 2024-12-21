import { Button, ButtonGroup } from '@mui/material';
import { FC } from 'react';

import { MARKS } from '@data/buidings';
import { Mark } from 'src/types/building';

interface MarkSelectorProps {
  mark: Mark;
  onSelectMark: (mark: Mark) => void;
}

export const MarkSelector: FC<MarkSelectorProps> = ({ mark, onSelectMark }) => {
  return (
    <ButtonGroup
      className="nodrag"
      size="small"
    >
      {MARKS.map((mk, i) => (
        <Button
          key={mk}
          variant={mark === mk ? 'contained' : 'outlined'}
          onClick={() => onSelectMark(mk)}
        >
          MK{i + 1}
        </Button>
      ))}
    </ButtonGroup>
  );
};
