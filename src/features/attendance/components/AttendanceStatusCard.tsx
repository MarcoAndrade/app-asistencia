import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';

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

function getWorkedMinutes(
  checkIn: string | null,
  checkOut: string | null,
): number {
  if (!checkIn) {
    return 0;
  }

  const start = new Date(checkIn).getTime();

  const end = checkOut
    ? new Date(checkOut).getTime()
    : Date.now();

  return Math.max(0, Math.floor((end - start) / 60000));
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} min`;
  }

  if (mins === 0) {
    return `${hours} h`;
  }

  return `${hours} h ${mins} min`;
}

function AttendancePoint({
  type,
  time,
  registered,
}: {
  type: 'entry' | 'exit';
  time: string;
  registered: boolean;
}) {
  const isEntry = type === 'entry';

  return (
    <Stack
      spacing={1.25}
      sx={{
        width: '100%',
        alignItems: {
          xs: 'flex-start',
          md: 'center'
        }
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: registered
            ? isEntry
              ? 'primary.main'
              : 'success.main'
            : 'action.hover',
          color: registered
            ? 'common.white'
            : 'text.disabled',
          transition: 'all 0.2s ease',
        }}
      >
        {isEntry ? (
          <LoginRoundedIcon />
        ) : (
          <LogoutRoundedIcon />
        )}
      </Box>

      <Box
        sx={{
          textAlign: {
            xs: 'left',
            md: 'center',
          },
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 600 }}
        >
          {isEntry ? 'Entrada' : 'Salida'}
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: 28,
              md: 30,
            },
            lineHeight: 1.15,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            mt: 0.5,
          }}
        >
          {time}
        </Typography>

        <Typography
          variant="caption"
          color={registered ? 'success.main' : 'text.disabled'}
          sx={{
            display: 'block',
            mt: 0.5,
            fontWeight: 600,
          }}
        >
          {registered ? 'Registrado' : 'Pendiente'}
        </Typography>
      </Box>
    </Stack>
  );
}

export function AttendanceStatusCard({
  attendance,
  onCheckIn,
  onCheckOut,
}: AttendanceStatusCardProps) {
  const hasCheckedIn = Boolean(attendance?.checkIn);
  const hasCheckedOut = Boolean(attendance?.checkOut);

  const workedMinutes = getWorkedMinutes(
    attendance?.checkIn ?? null,
    attendance?.checkOut ?? null,
  );

  const status = !hasCheckedIn
    ? 'pending'
    : hasCheckedOut
      ? 'completed'
      : 'active';

  const statusConfig = {
    pending: {
      label: 'Sin registrar',
      color: 'default' as const,
      icon: <ScheduleRoundedIcon />,
    },
    active: {
      label: 'Jornada en curso',
      color: 'warning' as const,
      icon: <AccessTimeRoundedIcon />,
    },
    completed: {
      label: 'Jornada completada',
      color: 'success' as const,
      icon: <CheckCircleRoundedIcon />,
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: 'background.paper',
      }}
    >
      <CardContent
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          '&:last-child': {
            pb: {
              xs: 2,
              sm: 3,
              md: 4,
            },
          },
        }}
      >
        <Stack spacing={3}>
          {/* Card header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: {
                xs: 'flex-start',
                sm: 'center',
              },
              justifyContent: 'space-between',
              gap: 2,
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                }}
              >
                Jornada de hoy
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Registra tu entrada y salida para llevar el
                control de tu jornada.
              </Typography>
            </Box>

            <Chip
              icon={currentStatus.icon}
              label={currentStatus.label}
              color={currentStatus.color}
              sx={{
                fontWeight: 600,
                '& .MuiChip-icon': {
                  fontSize: 18,
                },
              }}
            />
          </Box>

          {/* Main attendance panel */}
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2.5,
              backgroundColor: 'background.default',
              overflow: 'hidden',
            }}
          >
            {/* Desktop / tablet */}
            <Box
              sx={{
                display: {
                  xs: 'none',
                  md: 'grid',
                },
                gridTemplateColumns:
                  'minmax(0, 1fr) 220px minmax(0, 1fr)',
                alignItems: 'center',
                minHeight: 260,
                px: 4,
                py: 4,
              }}
            >
              <AttendancePoint
                type="entry"
                time={formatTime(
                  attendance?.checkIn ?? null,
                )}
                registered={hasCheckedIn}
              />

              {/* Center */}
              <Stack
                spacing={1}
                sx={{
                  height: '100%',
                  borderLeft: '1px solid',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                  px: 3,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    color: 'primary.main',
                  }}
                >
                  <AccessTimeRoundedIcon />
                </Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Tiempo trabajado
                </Typography>

                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {hasCheckedIn
                    ? formatDuration(workedMinutes)
                    : '--'}
                </Typography>
              </Stack>

              <AttendancePoint
                type="exit"
                time={formatTime(
                  attendance?.checkOut ?? null,
                )}
                registered={hasCheckedOut}
              />
            </Box>

            {/* Mobile */}
            <Box
              sx={{
                display: {
                  xs: 'block',
                  md: 'none',
                },
              }}
            >
              <Stack
                divider={
                  <Divider
                    flexItem
                    sx={{
                      borderColor: 'divider',
                    }}
                  />
                }
              >
                <Box sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        flexShrink: 0,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: hasCheckedIn
                          ? 'primary.main'
                          : 'action.hover',
                        color: hasCheckedIn
                          ? 'common.white'
                          : 'text.disabled',
                      }}
                    >
                      <LoginRoundedIcon />
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 600 }}
                      >
                        Entrada
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 26,
                          fontWeight: 700,
                          lineHeight: 1.15,
                        }}
                      >
                        {formatTime(
                          attendance?.checkIn ?? null,
                        )}
                      </Typography>
                    </Box>

                    <Box sx={{ ml: 'auto' }}>
                      <Typography
                        variant="caption"
                        color={
                          hasCheckedIn
                            ? 'success.main'
                            : 'text.disabled'
                        }
                        sx={{ fontWeight: 600 }}
                      >
                        {hasCheckedIn
                          ? 'Registrado'
                          : 'Pendiente'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    p: 2.5,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <Stack
                    direction="row"
                    sx= {{ alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor:
                            'action.hover',
                          color: 'primary.main',
                        }}
                      >
                        <AccessTimeRoundedIcon />
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Tiempo trabajado
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 20,
                            fontWeight: 700,
                          }}
                        >
                          {hasCheckedIn
                            ? formatDuration(
                              workedMinutes,
                            )
                            : '--'}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Box>

                <Box sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        flexShrink: 0,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: hasCheckedOut
                          ? 'success.main'
                          : 'action.hover',
                        color: hasCheckedOut
                          ? 'common.white'
                          : 'text.disabled',
                      }}
                    >
                      <LogoutRoundedIcon />
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 600 }}
                      >
                        Salida
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 26,
                          fontWeight: 700,
                          lineHeight: 1.15,
                        }}
                      >
                        {formatTime(
                          attendance?.checkOut ?? null,
                        )}
                      </Typography>
                    </Box>

                    <Box sx={{ ml: 'auto' }}>
                      <Typography
                        variant="caption"
                        color={
                          hasCheckedOut
                            ? 'success.main'
                            : 'text.disabled'
                        }
                        sx={{ fontWeight: 600 }}
                      >
                        {hasCheckedOut
                          ? 'Registrado'
                          : 'Pendiente'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>

          {/* Actions */}
          <Box
            sx={{
              display: 'flex',
              alignItems: {
                xs: 'stretch',
                sm: 'center',
              },
              justifyContent: 'space-between',
              gap: 2,
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
            }}
          >
            <Box>
              {status === 'pending' && (
                <>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600 }}
                  >
                    ¿Comenzando tu jornada?
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Registra tu entrada para comenzar.
                  </Typography>
                </>
              )}

              {status === 'active' && (
                <>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600 }}
                  >
                    Tu jornada está activa
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Recuerda registrar tu salida al terminar.
                  </Typography>
                </>
              )}

              {status === 'completed' && (
                <>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600 }}
                  >
                    Jornada finalizada
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Tu asistencia de hoy quedó registrada.
                  </Typography>
                </>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
                minWidth: {
                  sm: 300,
                },
              }}
            >
              <Button
                variant="contained"
                size="large"
                fullWidth
                disabled={hasCheckedIn}
                onClick={onCheckIn}
                startIcon={<LoginRoundedIcon />}
                sx={{
                  minHeight: 46,
                  fontWeight: 700,
                  borderRadius: 1.5,
                }}
              >
                Registrar entrada
              </Button>

              <Button
                variant="outlined"
                size="large"
                fullWidth
                disabled={!hasCheckedIn || hasCheckedOut}
                onClick={onCheckOut}
                startIcon={<LogoutRoundedIcon />}
                sx={{
                  minHeight: 46,
                  fontWeight: 700,
                  borderRadius: 1.5,
                }}
              >
                Registrar salida
              </Button>
            </Box>
          </Box>

          {/* Completion */}
          {hasCheckedOut && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.5,
                borderRadius: 1.5,
                backgroundColor: 'success.50',
                border: '1px solid',
                borderColor: 'success.100',
              }}
            >
              <CheckCircleRoundedIcon
                color="success"
              />

              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: 'success.dark',
                  }}
                >
                  Asistencia registrada correctamente
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Entrada y salida registradas para el día de
                  hoy.
                </Typography>
              </Box>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
