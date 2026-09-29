import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAttendance } from '@/features/attendance/hooks/useAttendance';

import { DashboardStatCard } from './DashboardStatCard';

function formatTime(value: string | null): string {
  if (!value) {
    return '--:--';
  }

  return new Date(value).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) {
    return 'Buenos días';
  }

  if (hour < 19) {
    return 'Buenas tardes';
  }

  return 'Buenas noches';
}

export function UserDashboard() {
  const { user } = useAuth();

  const {
    todayAttendance,
    history,
    isLoading,
    checkIn,
    checkOut,
  } = useAttendance(user?.id ?? '');

  if (!user || isLoading) {
    return null;
  }

  const hasCheckedIn =
    Boolean(todayAttendance?.checkIn);

  const hasCheckedOut =
    Boolean(todayAttendance?.checkOut);

  const isComplete =
    hasCheckedIn && hasCheckedOut;

  const handleAttendanceAction = () => {
    if (!hasCheckedIn) {
      checkIn();
      return;
    }

    if (!hasCheckedOut) {
      checkOut();
    }
  };

  const actionLabel = !hasCheckedIn
    ? 'Registrar entrada'
    : !hasCheckedOut
      ? 'Registrar salida'
      : 'Jornada completada';

  return (
    <Stack spacing={3}>
      {/* Encabezado */}
      <Stack spacing={0.5}>
        <Typography variant="h4">
          {getGreeting()}, {user.name.split(' ')[0]}
        </Typography>

        <Typography color="text.secondary">
          {new Date().toLocaleDateString(
            'es-MX',
            {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            },
          )}
        </Typography>
      </Stack>

      {/* Estado */}
      <Alert
        severity={
          isComplete
            ? 'success'
            : hasCheckedIn
              ? 'warning'
              : 'info'
        }
      >
        {isComplete
          ? 'Tu jornada laboral ha sido completada.'
          : hasCheckedIn
            ? 'Tu jornada está en curso. Recuerda registrar tu salida.'
            : 'Aún no has registrado tu entrada de hoy.'}
      </Alert>

      {/* Métricas */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardStatCard
            title="Entrada"
            value={formatTime(
              todayAttendance?.checkIn ?? null,
            )}
            description="Hora de entrada de hoy"
            icon={<LoginIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardStatCard
            title="Salida"
            value={formatTime(
              todayAttendance?.checkOut ?? null,
            )}
            description="Hora de salida de hoy"
            icon={<LogoutIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardStatCard
            title="Estado"
            value={
              isComplete
                ? 'Presente'
                : hasCheckedIn
                  ? 'En curso'
                  : 'Pendiente'
            }
            description="Estado de la jornada"
          />
        </Grid>
      </Grid>

      {/* Acción principal */}
      <Card>
        <CardContent>
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={2}
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <Typography variant="h6">
                Control de jornada
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Registra tu entrada o salida.
              </Typography>
            </div>

            <Button
              variant="contained"
              size="large"
              disabled={isComplete}
              onClick={handleAttendanceAction}
              startIcon={
                !hasCheckedIn ? (
                  <LoginIcon />
                ) : (
                  <LogoutIcon />
                )
              }
            >
              {actionLabel}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Historial reciente */}
      <Stack spacing={2}>
        <Typography variant="h6">
          Asistencias recientes
        </Typography>

        <Stack spacing={1}>
          {history.slice(0, 5).map((record) => (
            <Card key={record.id}>
              <CardContent>
                <Stack
                  direction={{
                    xs: 'column',
                    sm: 'row',
                  }}
                  spacing={2}
                  sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography>
                    {new Date(
                      `${record.date}T00:00:00`,
                    ).toLocaleDateString('es-MX')}
                  </Typography>

                  <Typography>
                    {formatTime(record.checkIn)}
                    {' → '}
                    {formatTime(record.checkOut)}
                  </Typography>

                  <Chip
                    label={
                      record.status === 'PRESENT'
                        ? 'Presente'
                        : record.status ===
                            'JUSTIFIED'
                          ? 'Justificada'
                          : record.status ===
                              'INCOMPLETE'
                            ? 'Incompleta'
                            : 'Ausente'
                    }
                    size="small"
                    color={
                      record.status === 'PRESENT'
                        ? 'success'
                        : record.status ===
                            'INCOMPLETE'
                          ? 'warning'
                          : 'default'
                    }
                  />
                </Stack>
              </CardContent>
            </Card>
          ))}

          {history.length === 0 && (
            <Typography color="text.secondary">
              Aún no tienes registros de asistencia.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}