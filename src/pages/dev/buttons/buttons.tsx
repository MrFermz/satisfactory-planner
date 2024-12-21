import { FC, useMemo, useState } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { Page } from '@components/page';
import AccessAlarmTwoToneIcon from '@mui/icons-material/AccessAlarmTwoTone';

type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

type ButtonVariant = 'text' | 'outlined' | 'contained';

type ButtonSize = 'small' | 'medium' | 'large';

const Buttons: FC = () => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const colors = useMemo((): ButtonColor[] => {
    return ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'];
  }, []);

  const variants = useMemo((): ButtonVariant[] => {
    return ['contained', 'outlined', 'text'];
  }, []);

  const sizes = useMemo((): ButtonSize[] => {
    return ['large', 'medium', 'small'];
  }, []);

  return (
    <Page title="button">
      <Stack component={Paper}>
        <Stack direction="row">
          <FormControlLabel
            control={
              <Switch
                value={disabled}
                onChange={() => setDisabled(!disabled)}
              />
            }
            label="Disabled"
          />
          <FormControlLabel
            control={
              <Switch
                value={loading}
                onChange={() => setLoading(!loading)}
              />
            }
            label="Loading"
          />
        </Stack>
        {/* Button */}
        <Typography>Button</Typography>
        {colors.map((color) => (
          <Stack
            key={color}
            direction="row"
            alignItems="center"
          >
            {variants.map((variant) => (
              <Box key={variant}>
                <Button
                  disabled={disabled}
                  color={color}
                  variant={variant}
                >
                  {variant}
                </Button>
              </Box>
            ))}
            {sizes.map((size, i) => (
              <Box key={size}>
                <Button
                  disabled={disabled}
                  color={color}
                  variant={variants[i]}
                  size={size}
                >
                  {size}
                </Button>
              </Box>
            ))}
          </Stack>
        ))}
        {/* Loading Button */}
        <Typography>Loading Button</Typography>
        {colors.map((color) => (
          <Stack
            key={color}
            direction="row"
            alignItems="center"
          >
            {variants.map((variant) => (
              <Box key={variant}>
                <LoadingButton
                  disabled={disabled}
                  loading={loading}
                  color={color}
                  variant={variant}
                >
                  {variant}
                </LoadingButton>
              </Box>
            ))}
            {sizes.map((size, i) => (
              <Box key={size}>
                <LoadingButton
                  disabled={disabled}
                  loading={loading}
                  color={color}
                  variant={variants[i]}
                  size={size}
                >
                  {size}
                </LoadingButton>
              </Box>
            ))}
          </Stack>
        ))}
        {/* Icon Button */}
        <Typography>Icon Button</Typography>
        {colors.map((color) => (
          <Stack
            key={color}
            direction="row"
            alignItems="center"
          >
            <Box>
              <IconButton
                disabled={disabled}
                color={color}
              >
                <AccessAlarmTwoToneIcon />
              </IconButton>
            </Box>
            {sizes.map((size, i) => (
              <Box key={size}>
                <Tooltip title={size}>
                  <IconButton
                    disabled={disabled}
                    color={color}
                    size={size}
                  >
                    <AccessAlarmTwoToneIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            ))}
          </Stack>
        ))}
      </Stack>
    </Page>
  );
};

export default Buttons;
