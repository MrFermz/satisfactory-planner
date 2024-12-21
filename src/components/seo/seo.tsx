import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title?: string;
}

export const Seo: FC<SeoProps> = ({ title }) => (
  <Helmet>
    <title>Satisfactory-planner - {title}</title>
  </Helmet>
);
