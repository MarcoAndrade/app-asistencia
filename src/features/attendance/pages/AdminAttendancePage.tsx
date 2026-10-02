import { useState } from 'react';

import {
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import { useUsers } from '@/features/users/hooks/useUsers';

import { AdminAttendanceTable } from '../components/AdminAttendanceTable';
import {
  AttendanceJustificationDialog,
} from '../components/AttendanceJustificationDialog';
import { useAdminAttendance } from '../hooks/useAdminAttendance';

import type { Attendance } from '../types';

export function AdminAttendancePage() {
  const {
    records,
    isLoading: isAttendanceLoading,
    updateAttendance,
  } = useAdminAttendance();

  const {
    users,
    isLoading: isUsersLoading,
  } = useUsers();

  const [selectedAttendance, setSelectedAttendance] =
    useState<Attendance | null>(null);

  const isLoading =
    isAttendanceLoading || isUsersLoading;

  const handleSave = (
    status: Attendance['status'],
    justification: string,
  ) => {
    if (!selectedAttendance) {
      return;
    }

    updateAttendance(
      selectedAttendance.id,
      {
        status,
        justification: justification || undefined,
      },
    );

    setSelectedAttendance(null);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">
          Control de asistencia
        </Typography>

        <Typography
          color="text.secondary"
        >
          Consulta y administra los registros de
          asistencia de los empleados.
        </Typography>
      </div>

      <AdminAttendanceTable
        records={records}
        users={users}
        onEdit={setSelectedAttendance}
      />

      <AttendanceJustificationDialog
        key={selectedAttendance?.id}
        open={Boolean(selectedAttendance)}
        attendance={selectedAttendance}
        onClose={() =>
          setSelectedAttendance(null)
        }
        onSave={handleSave}
      />
    </Stack>
  );
}