import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { RoleRoute } from '@/features/auth/components/RoleRoute';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { AttendanceHistoryPage } from '@/features/attendance/pages/AttendanceHistoryPage';
import { AttendancePage } from '@/features/attendance/pages/AttendancePage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { UsersPage } from '@/features/users/pages/UsersPage';
import { AppLayout } from '@/components/layout/AppLayout';

const basename = import.meta.env.MODE === 'production' ? '/app-asistencia' : '/';

export const router = createBrowserRouter(
  [
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <AppLayout />,
          children: [
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
            {
              element: <RoleRoute allowedRoles={['ADMIN']} />,
              children: [
                // Rutas administrativas futuras
              ],
            },
          ],
        }
      ],
    },
    {
      path: '*',
      element: <LoginPage />,
    },
  ],
  {
    basename
  },
);