import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC, useCallback } from 'react';

import { ORES } from '@data/ores';
import { Ore } from 'src/types/ore';

interface OreSelectorProps {
  ore: Ore;
  onSelectOre: (ore: Ore) => void;
}

export const OreSelector: FC<OreSelectorProps> = ({ ore, onSelectOre }) => {
  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      onSelectOre(event.target.value as Ore);
    },
    [onSelectOre]
  );

  return (
    <Select
      className="nodrag"
      size="small"
      value={ore}
      variant="outlined"
      onChange={handleChange}
    >
      {ORES.map((ore) => (
        <MenuItem
          key={ore.id}
          value={ore.value}
        >
          {ore.label}
        </MenuItem>
      ))}
    </Select>
  );
};
