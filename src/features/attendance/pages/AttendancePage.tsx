import {
  Box,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';

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
    return (
      <Box
        sx={{
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography color="text.secondary">
          Cargando asistencia...
        </Typography>
      </Box>
    );
  }

  const now = new Date();

  const dateLabel = now.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const timeLabel = now.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1180,
        mx: 'auto',
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: {
              xs: 'flex-start',
              md: 'center',
            },
            justifyContent: 'space-between',
            gap: 2,
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'text.primary',
              }}
            >
              Mi asistencia
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Consulta y registra tu jornada laboral.
            </Typography>
          </Box>

          {/* Fecha */}
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 2,
              py: 1.25,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              backgroundColor: 'background.paper',
              minWidth: {
                xs: '100%',
                md: 260,
              },
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                flexShrink: 0,
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
              }}
            >
              <CalendarTodayRoundedIcon fontSize="small" />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                noWrap
              >
                {dateLabel}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  mt: 0.25,
                }}
              >
                <AccessTimeRoundedIcon
                  sx={{
                    fontSize: 16,
                    color: 'primary.main',
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700 }}
                >
                  {timeLabel}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Attendance */}
        <AttendanceStatusCard
          attendance={todayAttendance}
          onCheckIn={checkIn}
          onCheckOut={checkOut}
        />
      </Stack>
    </Box>
  );
}