import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC, useCallback, useMemo } from 'react';

import { LIQUIDS } from '@data/liquids';
import { Liquid } from 'src/types/liquid';

interface OreSelectorProps {
  liquid: Liquid;
  filterOptions: Liquid[];
  onSelectLiquid: (liquid: Liquid) => void;
}

export const LiquidSelector: FC<OreSelectorProps> = ({ liquid, filterOptions, onSelectLiquid }) => {
  const liquids = useMemo(() => {
    return LIQUIDS.filter((liquid) => filterOptions.indexOf(liquid.value) > -1);
  }, [filterOptions]);

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      onSelectLiquid(event.target.value as Liquid);
    },
    [onSelectLiquid]
  );

  return (
    <Select
      className="nodrag"
      size="small"
      value={liquid}
      variant="outlined"
      onChange={handleChange}
    >
      {liquids.map((liquid) => (
        <MenuItem
          key={liquid.id}
          value={liquid.value}
        >
          {liquid.label}
        </MenuItem>
      ))}
    </Select>
  );
};
