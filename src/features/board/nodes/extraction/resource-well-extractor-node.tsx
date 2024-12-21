import { FC } from 'react';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { tokens } from '@locales/tokens';

export const ResourceWellExtractorNode: FC<NodeProps> = (props) => {
  const { t } = useTranslation();

  return (
    <Stack
      component={Paper}
      p={1}
    >
      <Typography>{t(tokens.build.resourceWellExtractor)}</Typography>
      <Handle
        type="source"
        position={Position.Right}
      />
    </Stack>
  );
};
