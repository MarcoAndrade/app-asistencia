import { useCallback, useEffect, useState } from 'react';

import {
  createUser as createUserService,
  getUsers,
  updateUser as updateUserService,
} from '../services/userService';

import type { User } from '../types';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = useCallback(() => {
    setIsLoading(true);

    setUsers(getUsers());

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const createUser = useCallback(
    (data: Omit<User, 'id' | 'createdAt'>) => {
      const user = createUserService(data);

      setUsers((currentUsers) => [
        ...currentUsers,
        user,
      ]);

      return user;
    },
    [],
  );

  const updateUser = useCallback(
    (userId: string, changes: Partial<User>) => {
      const updatedUser = updateUserService(
        userId,
        changes,
      );

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId ? updatedUser : user,
        ),
      );

      return updatedUser;
    },
    [],
  );

  return {
    users,
    isLoading,
    createUser,
    updateUser,
    refresh: loadUsers,
  };
}