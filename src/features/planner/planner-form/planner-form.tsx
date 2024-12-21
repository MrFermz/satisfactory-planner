import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { FormikValues, useFormik } from 'formik';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { tokens } from '@locales/tokens';
import { useStoreBoard } from '@stores/board';
import { uuid } from '@utils/uuid';
import { Board } from 'src/types/board';

interface PlannerCreateProps extends DialogProps {
  action?: 'create' | 'edit';
  editData?: Board;
}

export const PlannerForm: FC<PlannerCreateProps> = (props) => {
  const { open, action = 'create', editData, onClose } = props;

  const { t } = useTranslation();
  const { insertBoard, updateBoard } = useStoreBoard();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().max(32).required(),
    }),
    onSubmit: (values) => {
      if (action === 'create') {
        handleConfirmCreate(values);
      } else {
        handleConfirmEdit(values);
      }
    },
  });

  useEffect(() => {
    if (editData) {
      formik.setValues({
        name: editData.name!,
        description: editData.description!,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData, open]);

  const handleConfirmCreate = (values: FormikValues) => {
    const data = { ...values, id: uuid(), nodes: [], edges: [] } as Board;
    insertBoard(data);
    handleClose();
  };

  const handleConfirmEdit = (values: FormikValues) => {
    const data = { ...editData, ...values } as Board;
    updateBoard(data);
    handleClose();
  };

  const handleClose = () => {
    onClose?.({}, 'backdropClick');
    formik.resetForm();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        {action === 'create' && t(tokens.planner.create)}
        {action === 'edit' && t(tokens.planner.edit)}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Stack pt={1}>
            <TextField
              variant="outlined"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.errors.name}
            />
            <TextField
              variant="outlined"
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.errors.description}
              multiline
              rows={3}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t(tokens.common.cancel)}</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => formik.handleSubmit()}
        >
          {action === 'create' && t(tokens.common.create)}
          {action === 'edit' && t(tokens.common.edit)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
