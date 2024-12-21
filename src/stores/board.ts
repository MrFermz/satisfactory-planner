import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Board, BoardState } from 'src/types/board';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  BackgroundVariant,
  Viewport,
} from '@xyflow/react';

export const useStoreBoard = create<BoardState>()(
  persist(
    (set, get) => ({
      board: [],
      settings: {
        bgVariant: BackgroundVariant.Dots,
        enableControls: true,
        enableMinimap: true,
        enableSnapgrid: true,
        enableDevmode: false,
        enablePersistViewport: true,
      },
      insertBoard: (data: Board) => {
        set({
          board: [...get().board, data],
        });
      },
      updateBoard: (data: Board) => {
        set({
          board: get().board.map((board) => {
            if (board.id === data.id) {
              board = { ...data };
            }
            return board;
          }),
        });
      },
      deleteBoard(data: Board) {
        set({
          board: get().board.filter((board) => board.id !== data.id),
        });
      },
      onNodesChange(id: string, changes) {
        set({
          board: get().board.map((board) => {
            if (board.id === id) {
              const nodes = applyNodeChanges(changes, board.nodes!);
              board = { ...board, nodes };
            }
            return board;
          }),
        });
      },
      onEdgesChange(id: string, changes) {
        set({
          board: get().board.map((board) => {
            if (board.id === id) {
              const edges = applyEdgeChanges(changes, board.edges!);
              board = { ...board, edges };
            }
            return board;
          }),
        });
      },
      addNodes(id: string, node) {
        set({
          board: get().board.map((board) => {
            if (board.id === id) {
              board = { ...board, nodes: [...board.nodes!, node] };
            }
            return board;
          }),
        });
      },
      onConnect(id: string, connection) {
        // Prevent self connected
        if (connection.source !== connection.target) {
          set({
            board: get().board.map((board) => {
              if (board.id === id) {
                const edges = addEdge({ ...connection }, board.edges!);
                board = { ...board, edges };
              }
              return board;
            }),
          });
        }
      },
      onViewportChange(id: string, viewport: Viewport) {
        set({
          board: get().board.map((board) => {
            if (board.id === id) {
              board.viewport = viewport;
            }
            return board;
          }),
        });
      },
      updateBgVariant(bg: BackgroundVariant) {
        set({
          settings: { ...get().settings, bgVariant: bg },
        });
      },
      updateEnableControls(bool: boolean) {
        set({
          settings: { ...get().settings, enableControls: bool },
        });
      },
      updateEnableMinimap(bool: boolean) {
        set({
          settings: { ...get().settings, enableMinimap: bool },
        });
      },
      updateEnableSnapgrid(bool: boolean) {
        set({
          settings: { ...get().settings, enableSnapgrid: bool },
        });
      },
      updateEnableDevmode(bool: boolean) {
        set({
          settings: { ...get().settings, enableDevmode: bool },
        });
      },
      updateEnablePersistViewport(bool: boolean) {
        set({
          settings: { ...get().settings, enablePersistViewport: bool },
        });
      },
    }),
    {
      name: 'board-storage',
    }
  )
);
