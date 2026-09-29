import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/components/layout/AppLayout';
import { AttendanceHistoryPage } from '@/features/attendance/pages/AttendanceHistoryPage';
import { AttendancePage } from '@/features/attendance/pages/AttendancePage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { UsersPage } from '@/features/users/pages/UsersPage';

const basename = import.meta.env.MODE === 'production' ? '/app-asistencia' : '/';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: 'dashboard',
          element: <DashboardPage />,
        },
        {
          path: 'attendance',
          element: <AttendancePage />,
        },
        {
          path: 'attendance/history',
          element: <AttendanceHistoryPage />,
        },
        {
          path: 'users',
          element: <UsersPage />,
        },
      ],
    },
  ],
  {
    basename
  },
);