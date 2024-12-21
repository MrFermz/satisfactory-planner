import { FC, MouseEvent, ReactNode, useCallback, useMemo } from 'react';
import {
  IconButton,
  ListItem,
  ListItemButton,
  Radio,
  SvgIcon,
  Switch,
  Typography,
} from '@mui/material';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';

import { Item } from './nested-menu';

interface ItemMenuProps {
  item: Item;
  selected: Item | null;
  onChild?: (data: Item, event: ClickEvent) => void;
  onButton?: (data: Item) => void;
  onRadio?: (data: Item) => void;
  onSwitch?: (data: Item) => void;
}

export type ClickEvent = MouseEvent<HTMLDivElement | HTMLButtonElement>;

export const ItemMenu: FC<ItemMenuProps> = (props) => {
  const { item, selected, onChild, onButton, onRadio, onSwitch } = props;

  const { label, icon, action, disabled, options } = item;

  const handleClick = useCallback(
    (event: ClickEvent) => {
      if (!action) {
        onChild?.(item, event);
      } else {
        if (action === 'button') {
          onButton?.(item);
        } else if (action === 'radio') {
          onRadio?.(item);
        } else if (action === 'switch') {
          onSwitch?.(item);
        }
      }
    },
    [action, item, onButton, onChild, onRadio, onSwitch]
  );

  const handleChangeRadio = useCallback(() => {
    onRadio?.(item);
  }, [item, onRadio]);

  const handleChangeSwitch = useCallback(() => {
    onSwitch?.(item);
  }, [item, onSwitch]);

  const children = useMemo(() => {
    return (
      <ListItemButton
        disabled={disabled}
        selected={selected?.id === item.id}
        onClick={handleClick}
      >
        {icon && <SvgIcon color="primary">{icon}</SvgIcon>}
        <Typography>{label}</Typography>
      </ListItemButton>
    );
  }, [disabled, handleClick, icon, item.id, label, selected?.id]);

  const secondaryAction = useMemo((): ReactNode => {
    if (!action) {
      return (
        <IconButton
          disabled={disabled}
          color="primary"
          onClick={handleClick}
        >
          <SvgIcon>
            <ChevronRightTwoToneIcon />
          </SvgIcon>
        </IconButton>
      );
    } else {
      if (action === 'radio') {
        const checked = options?.value === options?.radio;
        const value = options?.value;
        return (
          <Radio
            checked={checked}
            value={value}
            onChange={handleChangeRadio}
          />
        );
      } else if (action === 'switch') {
        const checked = !!options?.value;
        return (
          <Switch
            checked={checked}
            onChange={handleChangeSwitch}
          />
        );
      }
    }
  }, [
    action,
    disabled,
    handleChangeRadio,
    handleChangeSwitch,
    handleClick,
    options?.radio,
    options?.value,
  ]);

  return (
    <ListItem
      disablePadding
      secondaryAction={secondaryAction}
    >
      {children}
    </ListItem>
  );
};
