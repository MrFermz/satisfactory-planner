import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import { Box, Grow, IconButton } from '@mui/material';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  getSimpleBezierPath,
  getSmoothStepPath,
  getStraightPath,
  useReactFlow,
} from '@xyflow/react';
import { memo, useCallback, useMemo } from 'react';

export const Calculate = memo((props: EdgeProps) => {
  const { id, selected, sourceX, sourceY, targetX, targetY } = props;

  const { setEdges } = useReactFlow();

  const { path, labelX, labelY } = useMemo(() => {
    const [pathSimpleBezier, labelX, labelY] = getSimpleBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

    const [pathStraight] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

    const [pathSmoothStep] = getSmoothStepPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

    const [pathBezier] = getBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

    return { path: pathSimpleBezier, labelX, labelY };
  }, [sourceX, sourceY, targetX, targetY]);

  const handleClose = useCallback(() => {
    setEdges((edge) => edge.filter((ed) => ed.id !== id));
  }, [id, setEdges]);

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
      />
      <EdgeLabelRenderer>
        <Box
          sx={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <Grow in={selected}>
            <IconButton
              color="error"
              onClick={handleClose}
            >
              <CancelTwoToneIcon />
            </IconButton>
          </Grow>
        </Box>
      </EdgeLabelRenderer>
    </>
  );
});

Calculate.displayName = 'calculate';
