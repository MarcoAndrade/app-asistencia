import { useCallback, useState } from 'react';

import {
  checkIn as checkInService,
  checkOut as checkOutService,
  getAttendanceByUser,
  getTodayAttendance,
} from '../services/attendanceService';

import type { Attendance } from '../types';

export function useAttendance(userId: string) {
  const [todayAttendance, setTodayAttendance] = useState<Attendance | null>(() => getTodayAttendance(userId));

  const [history, setHistory] = useState<Attendance[]>(() => getAttendanceByUser(userId));

  const [isLoading, setIsLoading] = useState(false);

  const loadAttendance = useCallback(() => {
    setIsLoading(true);

    setTodayAttendance(getTodayAttendance(userId));
    setHistory(getAttendanceByUser(userId));

    setIsLoading(false);
  }, [userId]);

  const checkIn = useCallback(() => {
    checkInService(userId);
    loadAttendance();
  }, [userId, loadAttendance]);

  const checkOut = useCallback(() => {
    checkOutService(userId);
    loadAttendance();
  }, [userId, loadAttendance]);

  return {
    todayAttendance,
    history,
    isLoading,
    checkIn,
    checkOut,
    refresh: loadAttendance,
  };
}