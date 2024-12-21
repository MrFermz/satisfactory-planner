import { FC } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Flow } from './flow';

export const Board: FC = () => {
  return (
    <ReactFlowProvider>
      <DndProvider backend={HTML5Backend}>
        <Flow />
      </DndProvider>
    </ReactFlowProvider>
  );
};
