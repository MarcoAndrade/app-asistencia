export type AttendanceStatus =
  | 'PRESENT'
  | 'ABSENT'
  | 'JUSTIFIED'
  | 'INCOMPLETE';

export interface Attendance {
  id: string;
  userId: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: AttendanceStatus;
  justification?: string;
  updatedAt: string;
}