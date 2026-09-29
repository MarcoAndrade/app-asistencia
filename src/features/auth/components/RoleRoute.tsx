import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import type { UserRole } from '@/features/users/types';

interface RoleRouteProps {
  allowedRoles: UserRole[];
}

export function RoleRoute({
  allowedRoles,
}: RoleRouteProps) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}