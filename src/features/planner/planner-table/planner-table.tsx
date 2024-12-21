import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { capitalize } from 'lodash';
import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { tokens } from '@locales/tokens';
import { useStoreBoard } from '@stores/board';
import { uuid } from '@utils/uuid';
import { Board } from 'src/types/board';
import { PlannerBar } from '../planner-bar';
import { PlannerForm } from '../planner-form';

export const PlannerTable: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const board = useStoreBoard((state) => state.board);
  const deleteBoard = useStoreBoard((state) => state.deleteBoard);
  const insertBoard = useStoreBoard((state) => state.insertBoard);

  const [deleteData, setDeleteData] = useState<Board>();
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<Board>();

  const handleClickDelete = useCallback((row: Board) => {
    setDeleteData(row);
    setOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setEditData(undefined);
    setDeleteData(undefined);
    setOpen(false);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    deleteBoard(deleteData!);
    handleCloseDialog();
  }, [deleteBoard, deleteData, handleCloseDialog]);

  const handleClickView = useCallback(
    (row: Board) => navigate(`/board/${row.id}`, { state: { disableSetting: true } }),
    [navigate]
  );

  const handleClickEdit = useCallback((row: Board) => {
    setEditData(row);
    setOpenForm(true);
  }, []);

  const handleClickDuplicate = useCallback(
    (row: Board) => {
      insertBoard({ ...row, id: uuid() });
    },
    [insertBoard]
  );

  return (
    <>
      <Stack>
        <PlannerBar />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell style={{ width: '50%' }}>Name</TableCell>
                <TableCell style={{ width: '50%' }}>Description</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {board.map((row, i) => (
                <TableRow
                  key={row.id}
                  hover
                >
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <Stack direction="row">
                      <Box>
                        <Tooltip title={capitalize(t(tokens.common.delete))}>
                          <IconButton
                            color="error"
                            onClick={() => handleClickDelete(row)}
                          >
                            <DeleteTwoToneIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Box>
                        <Tooltip title={capitalize(t(tokens.common.edit))}>
                          <IconButton onClick={() => handleClickEdit(row)}>
                            <EditNoteTwoToneIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Box>
                        <Tooltip title={capitalize(t(tokens.common.duplicate))}>
                          <IconButton onClick={() => handleClickDuplicate(row)}>
                            <ContentCopyTwoToneIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Box>
                        <Tooltip title={capitalize(t(tokens.common.view))}>
                          <IconButton
                            color="primary"
                            onClick={() => handleClickView(row)}
                          >
                            <ArrowForwardTwoToneIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <PlannerForm
        open={openForm}
        action="edit"
        editData={editData}
        onClose={() => setOpenForm(false)}
      />
      <Dialog
        open={open}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Delete confirm</DialogTitle>
        <DialogContent>Are you sure?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t(tokens.common.cancel)}</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            {t(tokens.common.delete)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
