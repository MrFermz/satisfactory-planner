import { Stack, Typography } from '@mui/material';
import { NodeChange, OnNodesChange, Panel, useStore, useStoreApi } from '@xyflow/react';
import { FC, useEffect, useRef, useState } from 'react';

import { FONT_FAMILY, FONT_SIZE, LINE_HEIGHT, VARIANT } from './dev-tools';

interface ChangeLoggerProps {
  limit?: number;
  color?: string;
}

export const ChangeLogger: FC<ChangeLoggerProps> = (props) => {
  const { limit = 20 } = props;

  const [changes, setChanges] = useState<NodeChange[]>([]);
  const onNodesChangeIntercepted = useRef(false);
  const onNodesChange = useStore((s) => s.onNodesChange);
  const store = useStoreApi();

  useEffect(() => {
    if (!onNodesChange || onNodesChangeIntercepted.current) {
      return;
    }

    onNodesChangeIntercepted.current = true;
    const userOnNodesChange = onNodesChange;

    const onNodesChangeLogger: OnNodesChange = (changes) => {
      userOnNodesChange(changes);

      setChanges((oldChanges) => [...changes, ...oldChanges].slice(0, limit));
    };

    store.setState({ onNodesChange: onNodesChangeLogger });
  }, [onNodesChange, limit, store]);

  return (
    <Panel position="top-right">
      <Stack>
        <Typography
          variant={VARIANT}
          lineHeight={LINE_HEIGHT}
          fontSize={FONT_SIZE * 1.5}
          fontFamily={FONT_FAMILY}
        >
          Change logger
        </Typography>
        {changes.length === 0 && <Typography>No changes</Typography>}
        {changes.length > 0 &&
          changes.map((change, index) => (
            <ChangeInfo
              key={index}
              change={change}
            />
          ))}
      </Stack>
    </Panel>
  );
};

type ChangeInfoProps = {
  change: NodeChange;
};

const ChangeInfo: FC<ChangeInfoProps> = (props) => {
  const { change } = props;

  const { type } = change;

  const id = 'id' in change ? change.id : '-';

  return (
    <Stack direction="row">
      <Typography
        variant={VARIANT}
        lineHeight={LINE_HEIGHT}
        fontSize={FONT_SIZE * 1.5}
        fontFamily={FONT_FAMILY}
      >
        node id: {id}
      </Typography>
      <Typography
        variant={VARIANT}
        lineHeight={LINE_HEIGHT}
        fontSize={FONT_SIZE * 1.5}
        fontFamily={FONT_FAMILY}
      >
        {type === 'add' ? JSON.stringify(change.item, null, 2) : null}
        {type === 'dimensions'
          ? `dimensions: ${change.dimensions?.width} × ${change.dimensions?.height}`
          : null}
        {type === 'position'
          ? `position: ${change.position?.x.toFixed(1)}, ${change.position?.y.toFixed(1)}`
          : null}
        {type === 'remove' ? 'remove' : null}
        {type === 'select' ? (change.selected ? 'select' : 'unselect') : null}
      </Typography>
    </Stack>
  );
};
