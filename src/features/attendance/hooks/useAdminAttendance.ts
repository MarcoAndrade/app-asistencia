import { useCallback, useEffect, useState } from 'react';

import {
  getAllAttendance,
  updateAttendance as updateAttendanceService,
} from '../services/attendanceService';

import type { Attendance } from '../types';

export function useAdminAttendance() {
  const [records, setRecords] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRecords = useCallback(() => {
    setIsLoading(true);

    setRecords(getAllAttendance());

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

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