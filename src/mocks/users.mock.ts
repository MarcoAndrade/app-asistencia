import type { User } from '@/features/users/types';

export const usersMock: User[] = [
  {
    id: '1',
    employeeNumber: 'EMP-001',
    name: 'Luis Capetillo Admin',
    email: 'admin@demo.com',
    department: 'IT',
    role: 'ADMIN',
    active: true,
    createdAt: '2026-09-01',
  },
  {
    id: '2',
    employeeNumber: 'EMP-002',
    name: 'Luis Capetillo',
    email: 'user@demo.com',
    department: 'Finanzas',
    role: 'USER',
    active: true,
    createdAt: '2026-09-01',
  },
];