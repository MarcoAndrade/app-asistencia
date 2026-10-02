import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  getSession,
  login as loginService,
  logout as logoutService,
} from '../services/authService';

import { AuthContext } from '../hooks/useAuth';

import type {
  AuthUser,
  LoginCredentials,
} from '../types';
import type { UserRole } from '@/features/users/types';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const session = getSession();
    return session ? session.user : null;
  });
  const [isLoading] = useState(false);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const session = await loginService(credentials);

      setUser(session.user);
    },
    [],
  );

  const logout = useCallback(() => {
    logoutService();
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (role: UserRole) => user?.role === role,
    [user],
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
      hasRole,
    }),
    [user, isLoading, login, logout, hasRole],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}