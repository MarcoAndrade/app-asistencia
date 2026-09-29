import { Alert, CircularProgress, Stack, Typography } from '@mui/material';

import { useAuth } from '@/features/auth/hooks/useAuth';

import { AttendanceStatusCard } from '../components/AttendanceStatusCard';
import { useAttendance } from '../hooks/useAttendance';

export function AttendancePage() {
  const { user } = useAuth();

  const {
    todayAttendance,
    isLoading,
    checkIn,
    checkOut,
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
          Mi asistencia
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          Consulta y registra tu jornada laboral.
        </Typography>
      </div>

      <Alert severity="info">
        Recuerda registrar tu salida al finalizar tu jornada.
      </Alert>

      <AttendanceStatusCard
        attendance={todayAttendance}
        onCheckIn={checkIn}
        onCheckOut={checkOut}
      />
    </Stack>
  );
}