import { FC, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';

import { tokens } from '@locales/tokens';
import { Dropzone } from '@components/dropzone';
import { NestedMenu } from '@components/nested-menu';
import { PlannerForm } from '../planner-form';
import { useStoreBoard } from '@stores/board';

export const PlannerBar: FC = () => {
  const { t } = useTranslation();
  const { board, insertBoard } = useStoreBoard();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClickDownload = (ext: string) => {
    const file = new File(
      [JSON.stringify(board)],
      `${dayjs().format('YYYYMMDDHHmmssSSS')}-backup${ext}`,
      {
        type: 'text/plain;charset=utf-8',
      }
    );
    saveAs(file);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      const reader = new FileReader();
      reader.onloadend = (event) => {
        const result = event.target?.result as string;
        const array = JSON.parse(result);
        for (let j = 0; j < array.length; j++) {
          const board = array[j];
          insertBoard(board);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box component="div">
          <Typography>{t(tokens.planner.planner)}</Typography>
        </Box>
        <Stack direction="row">
          <Box
            component="div"
            position="relative"
          >
            <Button color="primary">
              <CloudUploadTwoToneIcon />
              {t(tokens.common.upload)}
            </Button>
            <Dropzone
              multiple={false}
              accept={{
                'text/plain': ['.txt'],
                'application/json': ['.json'],
              }}
              onDrop={handleDrop}
            />
          </Box>
          <Box component="div">
            <Button
              color="primary"
              disabled={board.length === 0}
              onClick={(event) => {
                if (anchorEl) setAnchorEl(null);
                else setAnchorEl(event.currentTarget);
              }}
            >
              <DownloadTwoToneIcon />
              {t(tokens.common.download)}
            </Button>
          </Box>
          <Box component="div">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              <AddTwoToneIcon />
              {t(tokens.common.create)}
            </Button>
          </Box>
        </Stack>
      </Stack>
      <PlannerForm
        open={open}
        action="create"
        onClose={() => setOpen(false)}
      />
      <NestedMenu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        items={[
          {
            id: 'json',
            label: '.json',
            action: 'button',
            callback() {
              handleClickDownload('.json');
            },
          },
          {
            id: 'txt',
            label: '.txt',
            action: 'button',
            callback() {
              handleClickDownload('.txt');
            },
          },
        ]}
      />
    </>
  );
};
