import { lazy, Suspense } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router';
import { useRoutes } from 'react-router-dom';

import { devRoutes } from './dev';

const NotfoundPage = lazy(() => import('@pages/notfound-page'));
const PlannerPage = lazy(() => import('@pages/planner-page'));
const BoardPage = lazy(() => import('@pages/board-page'));

const browserRoutes: RouteObject[] = [
  {
    element: (
      <Suspense>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Navigate
            replace
            to="/planner"
          />
        ),
      },
      {
        path: 'planner',
        element: <PlannerPage />,
      },
      {
        path: 'board/:code',
        element: <BoardPage />,
      },
      ...devRoutes,
    ],
  },
  { path: '*', element: <NotfoundPage /> },
];

const BrowserRoutes = () => {
  return useRoutes(browserRoutes);
};

const Routes = () => {
  return <BrowserRoutes />;
};

export default Routes;
