import { format } from 'date-fns';

import { attendanceMock } from '@/mocks/attendance.mock';
import { storage } from '@/services/storage/localStorage';

import type { Attendance } from '../types';

const ATTENDANCE_STORAGE_KEY = 'app-asistencia-attendance';

function getStoredAttendance(): Attendance[] {
  const stored = storage.get<Attendance[]>(ATTENDANCE_STORAGE_KEY);

  if (stored) {
    return stored;
  }

  storage.set(ATTENDANCE_STORAGE_KEY, attendanceMock);

  return attendanceMock;
}

function saveAttendance(records: Attendance[]): void {
  storage.set(ATTENDANCE_STORAGE_KEY, records);
}

export function getAttendanceByUser(userId: string): Attendance[] {
  return getStoredAttendance()
    .filter((record) => record.userId === userId)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getTodayAttendance(
  userId: string,
): Attendance | null {
  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    getStoredAttendance().find(
      (record) =>
        record.userId === userId &&
        record.date === today,
    ) ?? null
  );
}

export function checkIn(userId: string): Attendance {
  const records = getStoredAttendance();
  const today = format(new Date(), 'yyyy-MM-dd');

  const existingRecord = records.find(
    (record) =>
      record.userId === userId &&
      record.date === today,
  );

  if (existingRecord) {
    throw new Error('La entrada ya fue registrada.');
  }

  const now = new Date().toISOString();

  const attendance: Attendance = {
    id: crypto.randomUUID(),
    userId,
    date: today,
    checkIn: now,
    checkOut: null,
    status: 'INCOMPLETE',
    updatedAt: now,
  };

  saveAttendance([...records, attendance]);

  return attendance;
}

export function checkOut(userId: string): Attendance {
  const records = getStoredAttendance();
  const today = format(new Date(), 'yyyy-MM-dd');

  const index = records.findIndex(
    (record) =>
      record.userId === userId &&
      record.date === today,
  );

  if (index === -1) {
    throw new Error(
      'No existe un registro de entrada para hoy.',
    );
  }

  const record = records[index];

  if (!record.checkIn) {
    throw new Error(
      'Debes registrar tu entrada antes de registrar la salida.',
    );
  }

  if (record.checkOut) {
    throw new Error('La salida ya fue registrada.');
  }

  const now = new Date().toISOString();

  const updatedRecord: Attendance = {
    ...record,
    checkOut: now,
    status: 'PRESENT',
    updatedAt: now,
  };

  const updatedRecords = [...records];
  updatedRecords[index] = updatedRecord;

  saveAttendance(updatedRecords);

  return updatedRecord;
}

export function getAllAttendance(): Attendance[] {
  return getStoredAttendance().sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}

export function updateAttendance(
  attendanceId: string,
  changes: Partial<Attendance>,
): Attendance {
  const records = getStoredAttendance();

  const index = records.findIndex(
    (record) => record.id === attendanceId,
  );

  if (index === -1) {
    throw new Error(
      'Registro de asistencia no encontrado.',
    );
  }

  const updatedRecord: Attendance = {
    ...records[index],
    ...changes,
    updatedAt: new Date().toISOString(),
  };

  const updatedRecords = [...records];
  updatedRecords[index] = updatedRecord;

  saveAttendance(updatedRecords);

  return updatedRecord;
}