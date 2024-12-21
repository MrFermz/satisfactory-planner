import { Stack, Typography } from '@mui/material';
import { useNodes, useReactFlow, ViewportPortal, XYPosition } from '@xyflow/react';
import { FC } from 'react';

import { FONT_FAMILY, FONT_SIZE, LINE_HEIGHT, VARIANT } from './dev-tools';

export const NodeInspector: FC = () => {
  const { getInternalNode } = useReactFlow();

  const nodes = useNodes();

  return (
    <ViewportPortal>
      {nodes.map((node) => {
        const internalNode = getInternalNode(node.id);

        if (!internalNode) {
          return null;
        }

        const absPosition = internalNode.internals.positionAbsolute;

        return (
          <NodeInfo
            key={node.id}
            id={node.id}
            selected={!!node.selected}
            type={node.type!}
            position={node.position}
            absPosition={absPosition}
            width={node.measured?.width ?? 0}
            height={node.measured?.height ?? 0}
            data={node.data}
          />
        );
      })}
    </ViewportPortal>
  );
};

interface NodeInfoProps {
  id: string;
  type: string;
  selected: boolean;
  position: XYPosition;
  absPosition: XYPosition;
  width: number;
  height: number;
  data: any;
}

const NodeInfo: FC<NodeInfoProps> = (props) => {
  const { id, type, selected, position, absPosition, width, height, data } = props;

  return (
    <Stack
      style={{
        position: 'absolute',
        transform: `translate(${absPosition.x}px, ${absPosition.y + height}px)`,
      }}
      gap={0}
    >
      <Typography
        variant={VARIANT}
        lineHeight={LINE_HEIGHT}
        fontSize={FONT_SIZE}
        fontFamily={FONT_FAMILY}
      >
        id:{id}
      </Typography>
      <Typography
        variant={VARIANT}
        lineHeight={LINE_HEIGHT}
        fontSize={FONT_SIZE}
        fontFamily={FONT_FAMILY}
      >
        type:{type}
      </Typography>
      <Typography
        variant={VARIANT}
        lineHeight={LINE_HEIGHT}
        fontSize={FONT_SIZE}
        fontFamily={FONT_FAMILY}
      >
        selected:{JSON.stringify(selected)}
      </Typography>
      <Typography
        variant={VARIANT}
        lineHeight={LINE_HEIGHT}
        fontSize={FONT_SIZE}
        fontFamily={FONT_FAMILY}
      >
        position: {position?.x?.toFixed(1)}, {position?.y?.toFixed(1)}
      </Typography>
      <Typography
        variant={VARIANT}
        lineHeight={LINE_HEIGHT}
        fontSize={FONT_SIZE}
        fontFamily={FONT_FAMILY}
      >
        dimensions: {width} x {height}
      </Typography>
      <Typography
        variant={VARIANT}
        lineHeight={LINE_HEIGHT}
        fontSize={FONT_SIZE}
        fontFamily={FONT_FAMILY}
        component="pre"
      >
        data: {JSON.stringify(data, null, 2)}
      </Typography>
    </Stack>
  );
};
