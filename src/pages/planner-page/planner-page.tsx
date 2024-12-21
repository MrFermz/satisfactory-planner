import { FC } from 'react';

import { Page } from '@components/page';
import { PlannerTable } from '@features/planner';

const PlannerList: FC = () => {
  return (
    <Page title="planner">
      <PlannerTable />
    </Page>
  );
};

export default PlannerList;
