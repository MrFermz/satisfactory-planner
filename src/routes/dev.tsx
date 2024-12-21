import { lazy, Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router';

const Buttons = lazy(() => import('@pages/dev/buttons'));

export const devRoutes: RouteObject[] = [
  {
    path: 'dev',
    element: (
      <Suspense>
        <Outlet />
      </Suspense>
    ),
    children: [{ path: 'buttons', element: <Buttons /> }],
  },
];
