import {
  BackgroundVariant,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  Viewport,
} from '@xyflow/react';

export type Board = {
  id: string;
  name?: string;
  description?: string;
  nodes?: Node[];
  edges?: Edge[];
  viewport?: Viewport;
};

export type BoardState = {
  board: Board[];
  settings: Settings;
  insertBoard: (board: Board) => void;
  updateBoard: (board: Board) => void;
  deleteBoard: (board: Board) => void;
  onNodesChange: (id: string, changes: NodeChange[]) => void;
  onEdgesChange: (id: string, changes: EdgeChange[]) => void;
  addNodes: (id: string, node: Node) => void;
  onConnect: (id: string, connection: Connection) => void;
  onViewportChange: (id: string, viewport: Viewport) => void;
  updateBgVariant: (bg: BackgroundVariant) => void;
  updateEnableControls: (bool: boolean) => void;
  updateEnableMinimap: (bool: boolean) => void;
  updateEnableSnapgrid: (bool: boolean) => void;
  updateEnableDevmode: (bool: boolean) => void;
  updateEnablePersistViewport: (bool: boolean) => void;
};

type Settings = {
  bgVariant: BackgroundVariant;
  enableControls: boolean;
  enableMinimap: boolean;
  enableSnapgrid: boolean;
  enableDevmode: boolean;
  enablePersistViewport: boolean;
};
