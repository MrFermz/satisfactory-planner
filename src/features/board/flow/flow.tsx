import { Stack } from '@mui/material';
import {
  Background,
  Connection,
  DefaultEdgeOptions,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  ReactFlow,
  SelectionMode,
  useReactFlow,
  Viewport,
} from '@xyflow/react';
import { FC, useCallback } from 'react';
import { useParams } from 'react-router';

import '@xyflow/react/dist/style.css';

import { useStoreBoard } from '@stores/board';
import { uuid } from '@utils/uuid';
import { Build } from 'src/types/building';
import { BoardTools } from '../board-tools';
import { Controls } from '../controls';
import { DevTools } from '../dev-tools';
import { NodePanel } from '../node-panel';
import { NodeProperties } from '../node-properties';
import { nodeTypes } from '../nodes';
import { edgeTypes } from '../edges';
import { useDrop, XYCoord } from 'react-dnd';

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

export const Flow: FC = () => {
  const { code } = useParams();
  const { screenToFlowPosition } = useReactFlow();
  const boardData = useStoreBoard((state) => state.board.find((board) => board.id === code));
  const nodes = useStoreBoard((state) => state.board.find((board) => board.id === code)?.nodes);
  const edges = useStoreBoard((state) => state.board.find((board) => board.id === code)?.edges);
  const viewport = useStoreBoard(
    (state) => state.board.find((board) => board.id === code)?.viewport
  );
  const settings = useStoreBoard((state) => state.settings);
  const onNodesChange = useStoreBoard((state) => state.onNodesChange);
  const onEdgesChange = useStoreBoard((state) => state.onEdgesChange);
  const addNodes = useStoreBoard((state) => state.addNodes);
  const onConnect = useStoreBoard((state) => state.onConnect);
  const onViewportChange = useStoreBoard((state) => state.onViewportChange);

  const [, drop] = useDrop({
    accept: ['node-card'],
    drop(item: Build, monitor) {
      const { x, y } = monitor.getClientOffset() as XYCoord;
      const build = item;

      if (!build) {
        return;
      }

      const position = screenToFlowPosition({ x, y });

      const group: Node = {
        id: uuid(),
        position,
        type: 'group',
        style: {
          width: 200,
          height: 200,
        },
        data: {},
      };

      const node: Node = {
        id: uuid(),
        position,
        ...build,
        data: { ...build.data, type: build.type },
      };

      if (build.type === 'resource-well-pressurizer') {
        addNodes(code!, group);
        node.parentId = group.id;
        node.extent = 'parent';
        node.position = { x: 0, y: 0 };
      }

      addNodes(code!, node);
    },
  });

  const handleViewportChange = useCallback(
    (viewport: Viewport) => {
      if (settings.enablePersistViewport) {
        onViewportChange(code!, viewport);
      }
    },
    [code, onViewportChange, settings.enablePersistViewport]
  );

  return (
    <Stack
      ref={drop}
      width="100vw"
      height="100vh"
    >
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        edgeTypes={edgeTypes}
        panOnScroll
        selectionOnDrag
        selectionMode={SelectionMode.Partial}
        panOnDrag={[1, 2]}
        snapToGrid={settings.enableSnapgrid}
        snapGrid={[10, 10]}
        defaultViewport={viewport}
        defaultEdgeOptions={defaultEdgeOptions}
        // onDragOver={onDragOver}
        // onDrop={onDrop}
        onNodesChange={(changes: NodeChange[]) => onNodesChange(code!, changes)}
        onEdgesChange={(changes: EdgeChange[]) => onEdgesChange(code!, changes)}
        onConnect={(connection: Connection) => onConnect(code!, connection)}
        onViewportChange={handleViewportChange}
      >
        <BoardTools board={boardData} />
        {settings.enableDevmode && <DevTools />}
        {settings.enableControls && <Controls showLock={false} />}
        {settings.enableMinimap && <MiniMap />}
        <NodePanel />

        <Background
          variant={settings.bgVariant}
          gap={10}
          size={1}
        />
      </ReactFlow>
    </Stack>
  );
};
