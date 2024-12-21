import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { isEqual, orderBy } from 'lodash';
import { FC, useCallback, useMemo } from 'react';

import { Recipe } from 'src/types/common';
import { Ficsmas } from 'src/types/ficsmas';
import { Ingot } from 'src/types/ingot';
import { Liquid } from 'src/types/liquid';
import { Mineral } from 'src/types/mineral';
import { Ore } from 'src/types/ore';

interface RecipeSelctorProps {
  value?: Recipe;
  type?: RecipeType[];
  recipes: Recipe[];
  disabled?: boolean;
  onSelectRecipe: (recipe: Recipe) => void;
}

type RecipeType = Ore | Liquid | Mineral | Ficsmas | Ingot | undefined;

export const RecipeSelctor: FC<RecipeSelctorProps> = ({
  value,
  type = [],
  recipes = [],
  disabled = false,
  onSelectRecipe,
}) => {
  const disable = useMemo(() => {
    return disabled || recipes.length === 0;
  }, [disabled, recipes.length]);

  const array = useMemo(() => {
    const array = recipes.filter((recipe) => isEqual(orderBy(recipe.type), orderBy(type)));
    if (array.length === 1) {
      onSelectRecipe(array[0]);
    }
    return array;
  }, [onSelectRecipe, recipes, type]);

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const id = event.target.value;
      const find = array.find((recipe) => recipe.id === id);
      if (find) onSelectRecipe(find);
    },
    [array, onSelectRecipe]
  );

  return (
    <Select
      className="nodrag"
      size="small"
      value={value?.id}
      variant="outlined"
      disabled={disable}
      onChange={handleChange}
    >
      {array.map((recipe) => (
        <MenuItem
          key={recipe.id}
          value={recipe.id}
        >
          {recipe.result}
        </MenuItem>
      ))}
    </Select>
  );
};
