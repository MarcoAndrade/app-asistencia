import {
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

import type { Attendance } from '../types';

interface AttendanceStatusCardProps {
  attendance: Attendance | null;
  onCheckIn: () => void;
  onCheckOut: () => void;
}

function formatTime(value: string | null): string {
  if (!value) {
    return '--:--';
  }

  return new Date(value).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function AttendanceStatusCard({
  attendance,
  onCheckIn,
  onCheckOut,
}: AttendanceStatusCardProps) {
  const hasCheckedIn = Boolean(attendance?.checkIn);
  const hasCheckedOut = Boolean(attendance?.checkOut);

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <div>
            <Typography variant="h6">
              Asistencia de hoy
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Registra tu entrada y salida.
            </Typography>
          </div>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
          >
            <div>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Entrada
              </Typography>

              <Typography variant="h5">
                {formatTime(attendance?.checkIn ?? null)}
              </Typography>
            </div>

            <div>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Salida
              </Typography>

              <Typography variant="h5">
                {formatTime(attendance?.checkOut ?? null)}
              </Typography>
            </div>

            {attendance && (
              <Chip
                label={
                  attendance.status === 'PRESENT'
                    ? 'Presente'
                    : 'Jornada en curso'
                }
                color={
                  attendance.status === 'PRESENT'
                    ? 'success'
                    : 'warning'
                }
              />
            )}
          </Stack>

          <Stack
            direction="row"
            spacing={2}
          >
            <Button
              variant="contained"
              disabled={hasCheckedIn}
              onClick={onCheckIn}
            >
              Registrar entrada
            </Button>

            <Button
              variant="outlined"
              disabled={!hasCheckedIn || hasCheckedOut}
              onClick={onCheckOut}
            >
              Registrar salida
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}