import {
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import { useAuth } from '@/features/auth/hooks/useAuth';

import { AttendanceHistoryTable } from '../components/AttendanceHistoryTable';
import { useAttendance } from '../hooks/useAttendance';

export function AttendanceHistoryPage() {
  const { user } = useAuth();

  const {
    history,
    isLoading,
  } = useAttendance(user?.id ?? '');

  if (!user) {
    return null;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">
          Historial de asistencia
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          Consulta tus registros de asistencia.
        </Typography>
      </div>

      <AttendanceHistoryTable records={history} />
    </Stack>
  );
}