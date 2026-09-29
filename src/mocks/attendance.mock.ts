import type { Attendance } from '@/features/attendance/types';

export const attendanceMock: Attendance[] = [
  {
    id: 'att-001',
    userId: '2',
    date: '2026-09-26',
    checkIn: '2026-09-26T08:05:00',
    checkOut: '2026-09-26T17:10:00',
    status: 'PRESENT',
    updatedAt: '2026-09-26T17:10:00',
  },
  {
    id: 'att-002',
    userId: '2',
    date: '2026-09-25',
    checkIn: '2026-09-25T08:12:00',
    checkOut: '2026-09-25T17:03:00',
    status: 'PRESENT',
    updatedAt: '2026-09-25T17:03:00',
  },
  {
    id: 'att-003',
    userId: '2',
    date: '2026-09-24',
    checkIn: null,
    checkOut: null,
    status: 'JUSTIFIED',
    justification: 'Cita médica',
    updatedAt: '2026-09-24T08:00:00',
  },
];