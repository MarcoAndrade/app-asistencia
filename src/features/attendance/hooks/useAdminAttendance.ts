import { useCallback, useState } from 'react';

import {
  getAllAttendance,
  updateAttendance as updateAttendanceService,
} from '../services/attendanceService';

import type { Attendance } from '../types';

export function useAdminAttendance() {
  const [records, setRecords] = useState<Attendance[]>(() => getAllAttendance());
  const [isLoading, setIsLoading] = useState(false);

  const loadRecords = useCallback(() => {
    setIsLoading(true);

    setRecords(getAllAttendance());

    setIsLoading(false);
  }, []);

  const updateAttendance = useCallback(
    (
      attendanceId: string,
      changes: Partial<Attendance>,
    ) => {
      const updatedRecord =
        updateAttendanceService(
          attendanceId,
          changes,
        );

      setRecords((currentRecords) =>
        currentRecords.map((record) =>
          record.id === attendanceId
            ? updatedRecord
            : record,
        ),
      );

      return updatedRecord;
    },
    [],
  );

  return {
    records,
    isLoading,
    updateAttendance,
    refresh: loadRecords,
  };
}