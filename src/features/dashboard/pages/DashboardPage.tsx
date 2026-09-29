import { useAuth } from '@/features/auth/hooks/useAuth';

import { AdminDashboard } from '../components/AdminDashboard';
import { UserDashboard } from '../components/UserDashboard';

export function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (user.role === 'ADMIN') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}