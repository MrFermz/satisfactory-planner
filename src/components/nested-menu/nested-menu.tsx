import { FC, ReactNode, useMemo, useState } from 'react';
import { List, Menu, MenuProps, PopoverOrigin } from '@mui/material';

import { ClickEvent, ItemMenu } from './item-menu';

interface NestedMenuProps extends MenuProps {
  items: Item[];
  isChild?: boolean;
}

export type Item = {
  id: string | number;
  label?: ReactNode;
  icon?: ReactNode;
  action?: Action;
  children?: Item[];
  disabled?: boolean;
  options?: Option;
  callback?: (item: Item) => void;
};

type Action = 'button' | 'radio' | 'switch';

type Option = {
  value?: string | boolean;
  radio?: string;
  switch?: string | boolean;
};

export const NestedMenu: FC<NestedMenuProps> = (props) => {
  const { items, isChild, onClose, ...rest } = props;

  const [anchorElChild, setAnchorElChild] = useState<HTMLElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const open = useMemo(() => {
    return props.open;
  }, [props.open]);

  const anchorEl = useMemo(() => {
    return props.anchorEl;
  }, [props.anchorEl]);

  const anchorOrigin = useMemo((): PopoverOrigin => {
    if (isChild) return { vertical: 'top', horizontal: 'right' };
    return { vertical: 'bottom', horizontal: 'left' };
  }, [isChild]);

  const transformOrigin = useMemo((): PopoverOrigin => {
    return { vertical: 'top', horizontal: 'left' };
  }, []);

  const handleAnchor = (data: Item, event: ClickEvent) => {
    setSelectedItem(data);
    setAnchorElChild(event.currentTarget);
  };

  const handleAnchorClose = (
    event: Event | HTMLElement,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    setSelectedItem(null);
    setAnchorElChild(null);
    onClose?.(event, reason);
  };

  const handleButton = (data: Item) => {
    data.callback?.(data);
    handleAnchorClose(anchorElChild!, 'backdropClick');
  };

  const handleRadio = (data: Item) => {
    data.callback?.(data);
  };

  const handleSwitch = (data: Item) => {
    data.callback?.(data);
  };

  return (
    <Menu
      {...rest}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      onClose={onClose}
    >
      <List disablePadding>
        {items.map((item) => {
          if (item?.action && (!item?.children || item?.children?.length === 0)) {
            return [
              <ItemMenu
                key={item.id}
                item={item}
                selected={selectedItem}
                onButton={handleButton}
                onRadio={handleRadio}
                onSwitch={handleSwitch}
              />,
            ];
          } else if (item.children && item.children?.length > 0) {
            const open = !!anchorElChild && selectedItem?.id === item.id;
            return [
              <ItemMenu
                key={item.id}
                item={item}
                selected={selectedItem}
                onChild={handleAnchor}
                onButton={handleButton}
              />,
              <NestedMenu
                key={`${item.id}-child`}
                items={item.children}
                isChild
                anchorEl={anchorElChild}
                open={open}
                onClose={handleAnchorClose}
              />,
            ];
          }
          return null;
        })}
      </List>
    </Menu>
  );
};
