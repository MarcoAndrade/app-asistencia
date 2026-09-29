import { usersMock } from '@/mocks/users.mock';
import { storage } from '@/services/storage/localStorage';

import type { User } from '../types';

const USERS_STORAGE_KEY = 'app-asistencia-users';

function getStoredUsers(): User[] {
  const stored = storage.get<User[]>(USERS_STORAGE_KEY);

  if (stored) {
    return stored;
  }

  storage.set(USERS_STORAGE_KEY, usersMock);

  return usersMock;
}

function saveUsers(users: User[]): void {
  storage.set(USERS_STORAGE_KEY, users);
}

export function getUsers(): User[] {
  return getStoredUsers();
}

export function createUser(
  data: Omit<User, 'id' | 'createdAt'>,
): User {
  const users = getStoredUsers();

  const emailExists = users.some(
    (user) =>
      user.email.toLowerCase() === data.email.toLowerCase(),
  );

  if (emailExists) {
    throw new Error(
      'Ya existe un usuario con ese correo electrónico.',
    );
  }

  const employeeNumberExists = users.some(
    (user) =>
      user.employeeNumber.toLowerCase() ===
      data.employeeNumber.toLowerCase(),
  );

  if (employeeNumberExists) {
    throw new Error(
      'Ya existe un empleado con ese número.',
    );
  }

  const user: User = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, user]);

  return user;
}

export function updateUser(
  userId: string,
  changes: Partial<User>,
): User {
  const users = getStoredUsers();

  const index = users.findIndex(
    (user) => user.id === userId,
  );

  if (index === -1) {
    throw new Error('Usuario no encontrado.');
  }

  const updatedUser = {
    ...users[index],
    ...changes,
  };

  const updatedUsers = [...users];
  updatedUsers[index] = updatedUser;

  saveUsers(updatedUsers);

  return updatedUser;
}