import { FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import { Page } from '@components/page';

const NotfoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Page title="not-found">
      <Stack direction="row">
        <Typography>404</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/planner')}
        >
          Return
        </Button>
      </Stack>
    </Page>
  );
};

export default NotfoundPage;
