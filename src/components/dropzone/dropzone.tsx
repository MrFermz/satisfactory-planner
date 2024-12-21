import { CSSProperties, FC, useMemo } from 'react';
import { Box, ButtonBase } from '@mui/material';
import {
  DropEvent,
  FileRejection,
  useDropzone,
  DropzoneProps as DropzoneRootProps,
} from 'react-dropzone';

import { error, primary, success } from '@theme/colors';

interface DropzoneProps extends DropzoneRootProps {
  onDrop?: (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => void;
}

const BASE_STYLE: CSSProperties = {
  flex: 1,
  display: 'flex',
  padding: 8,
  borderRadius: 8,
  borderWidth: 2,
  borderColor: primary.main,
  borderStyle: 'dashed',
  backgroundColor: 'transparent',
  outline: 'none',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

const FOCUS_STYLE: CSSProperties = {
  borderColor: primary.main,
};

const ACCEPT_STYLE: CSSProperties = {
  borderColor: success.main,
};

const REJECT_STYLE: CSSProperties = {
  borderColor: error.main,
};

export const Dropzone: FC<DropzoneProps> = (props) => {
  const { onDrop, ...rest } = props;

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    ...rest,
    onDrop: onDrop,
  });

  const style: CSSProperties = useMemo(() => {
    return {
      ...BASE_STYLE,
      ...(isFocused ? FOCUS_STYLE : {}),
      ...(isDragAccept ? ACCEPT_STYLE : {}),
      ...(isDragReject ? REJECT_STYLE : {}),
    };
  }, [isDragAccept, isDragReject, isFocused]);

  return (
    <Box
      component={ButtonBase}
      {...getRootProps({ style })}
    >
      <Box
        component="input"
        {...getInputProps()}
      ></Box>
    </Box>
  );
};
