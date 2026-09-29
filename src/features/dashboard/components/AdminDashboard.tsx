import {
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import WarningIcon from '@mui/icons-material/Warning';

import { useUsers } from '@/features/users/hooks/useUsers';
import { useAdminAttendance } from '@/features/attendance/hooks/useAdminAttendance';

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

export function AdminDashboard() {
  const {
    users,
    isLoading: usersLoading,
  } = useUsers();

  const {
    records,
    isLoading: attendanceLoading,
  } = useAdminAttendance();

  if (usersLoading || attendanceLoading) {
    return null;
  }

  const activeUsers = users.filter(
    (user) => user.active,
  );

  const today = new Date()
    .toISOString()
    .split('T')[0];

  const todayRecords = records.filter(
    (record) => record.date === today,
  );

  const presentCount = todayRecords.filter(
    (record) => record.status === 'PRESENT',
  ).length;

  const justifiedCount = todayRecords.filter(
    (record) => record.status === 'JUSTIFIED',
  ).length;

  const pendingCount =
  Math.max(
    activeUsers.length -
      presentCount -
      justifiedCount,
    0,
  );

  const getUserName = (userId: string) =>
    users.find((user) => user.id === userId)?.name ??
    'Usuario desconocido';

  return (
    <Stack spacing={3}>
      {/* Encabezado */}
      <Stack spacing={0.5}>
        <Typography variant="h4">
          Dashboard
        </Typography>

        <Typography color="text.secondary">
          Resumen de asistencia del día.
        </Typography>
      </Stack>

      {/* Métricas */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardStatCard
            title="Empleados activos"
            value={activeUsers.length}
            description="Personal registrado"
            icon={<PeopleIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardStatCard
            title="Presentes"
            value={presentCount}
            description="Jornadas completadas"
            icon={<CheckCircleIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardStatCard
            title="Justificadas"
            value={justifiedCount}
            description="Ausencias justificadas"
            icon={<EventAvailableIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardStatCard
            title="Pendientes"
            value={pendingCount}
            description="Sin registro completo"
            icon={<WarningIcon />}
          />
        </Grid>
      </Grid>

      {/* Asistencia de hoy */}
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <div>
              <Typography variant="h6">
                Asistencia de hoy
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Registros realizados durante la jornada.
              </Typography>
            </div>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Empleado
                    </TableCell>

                    <TableCell>
                      Entrada
                    </TableCell>

                    <TableCell>
                      Salida
                    </TableCell>

                    <TableCell>
                      Estado
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {todayRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        {getUserName(record.userId)}
                      </TableCell>

                      <TableCell>
                        {formatTime(record.checkIn)}
                      </TableCell>

                      <TableCell>
                        {formatTime(record.checkOut)}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={
                            record.status ===
                            'PRESENT'
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
                            record.status ===
                            'PRESENT'
                              ? 'success'
                              : record.status ===
                                  'INCOMPLETE'
                                ? 'warning'
                                : 'default'
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                  {todayRecords.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        align="center"
                      >
                        No existen registros de
                        asistencia para hoy.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}