export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id: string;
  employeeNumber: string;
  name: string;
  email: string;
  department: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
}