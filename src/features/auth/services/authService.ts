import { usersMock } from '@/mocks/users.mock';
import { storage } from '@/services/storage/localStorage';

import type {
  AuthSession,
  LoginCredentials,
} from '../types';

const AUTH_STORAGE_KEY = 'app-asistencia-session';

const DEMO_PASSWORD = 'demo123';

export async function login(
  credentials: LoginCredentials,
): Promise<AuthSession> {
  const user = usersMock.find(
    (item) =>
      item.email.toLowerCase() === credentials.email.toLowerCase(),
  );

  if (!user || credentials.password !== DEMO_PASSWORD) {
    throw new Error('Correo o contraseña incorrectos.');
  }

  if (!user.active) {
    throw new Error('El usuario se encuentra inactivo.');
  }

  const session: AuthSession = {
    user,
    token: `mock-token-${user.id}`,
  };

  storage.set(AUTH_STORAGE_KEY, session);

  return session;
}

export function getSession(): AuthSession | null {
  return storage.get<AuthSession>(AUTH_STORAGE_KEY);
}

export function logout(): void {
  storage.remove(AUTH_STORAGE_KEY);
}