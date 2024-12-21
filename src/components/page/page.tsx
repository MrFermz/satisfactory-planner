import { FC, ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import { Seo } from '@components/seo';

interface PageProps {
  children: ReactNode;
  title: string;
}

export const Page: FC<PageProps> = ({ children, title }) => (
  <Box>
    <Seo title={title} />
    <Container sx={{ mt: 3 }}>{children}</Container>
  </Box>
);
