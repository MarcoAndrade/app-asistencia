import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import WarningIcon from '@mui/icons-material/Warning';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

function formatDate(): string {
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'PRESENT':
      return 'Presente';

    case 'JUSTIFIED':
      return 'Justificada';

    case 'INCOMPLETE':
      return 'Incompleta';

    default:
      return 'Ausente';
  }
}

function getStatusStyles(status: string) {
  switch (status) {
    case 'PRESENT':
      return {
        color: '#15803d',
        backgroundColor: '#f0fdf4',
        dot: '#16a34a',
      };

    case 'JUSTIFIED':
      return {
        color: '#0369a1',
        backgroundColor: '#f0f9ff',
        dot: '#0284c7',
      };

    case 'INCOMPLETE':
      return {
        color: '#b45309',
        backgroundColor: '#fffbeb',
        dot: '#d97706',
      };

    default:
      return {
        color: '#64748b',
        backgroundColor: '#f8fafc',
        dot: '#94a3b8',
      };
  }
}

/* =============================================================
   LOADING
============================================================= */

function DashboardLoading() {
  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Skeleton width={180} height={40} />
        <Skeleton width={280} height={24} />
      </Stack>

      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((item) => (
          <Grid
            key={item}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Skeleton
              variant="rounded"
              height={150}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid
          size={{
            xs: 12,
            md: 7,
          }}
        >
          <Skeleton
            variant="rounded"
            height={360}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 5,
          }}
        >
          <Skeleton
            variant="rounded"
            height={360}
          />
        </Grid>
      </Grid>

      <Skeleton
        variant="rounded"
        height={300}
      />
    </Stack>
  );
}

/* =============================================================
   DASHBOARD
============================================================= */

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
    return <DashboardLoading />;
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

  const pendingCount = Math.max(
    activeUsers.length -
    presentCount -
    justifiedCount,
    0,
  );

  const totalEmployees = activeUsers.length;

  const attendancePercentage =
    totalEmployees > 0
      ? Math.round(
        (presentCount / totalEmployees) * 100,
      )
      : 0;

  const justifiedPercentage =
    totalEmployees > 0
      ? Math.round(
        (justifiedCount / totalEmployees) * 100,
      )
      : 0;

  const pendingPercentage =
    totalEmployees > 0
      ? Math.round(
        (pendingCount / totalEmployees) * 100,
      )
      : 0;

  const getUserName = (userId: string) =>
    users.find(
      (user) => user.id === userId,
    )?.name ?? 'Usuario desconocido';

  const getUserInitial = (userId: string) =>
    getUserName(userId)
      .charAt(0)
      .toUpperCase();

  return (
    <Stack
      spacing={3}
      sx={{
        width: '100%',
        minWidth: 0,

        animation:
          'dashboardPageIn 450ms ease-out',

        '@keyframes dashboardPageIn': {
          from: {
            opacity: 0,
          },

          to: {
            opacity: 1,
          },
        },
      }}
    >
      {/* =====================================================
          ENCABEZADO
      ===================================================== */}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',

          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },

          flexDirection: {
            xs: 'column',
            sm: 'row',
          },

          gap: 2,
        }}
      >
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 27,
                  md: 30,
                },

                fontWeight: 700,
                lineHeight: 1.15,

                letterSpacing: '-0.04em',

                color: '#111827',
              }}
            >
              Dashboard
            </Typography>

            <Box
              sx={{
                width: 7,
                height: 7,

                borderRadius: '50%',

                backgroundColor: '#22c55e',

                animation:
                  'statusPulse 2s infinite',

                '@keyframes statusPulse': {
                  '0%, 100%': {
                    opacity: 1,
                  },

                  '50%': {
                    opacity: 0.4,
                  },
                },
              }}
            />
          </Stack>

          <Typography
            color="text.secondary"
            sx={{
              mt: 0.6,
              fontSize: 14,
            }}
          >
            Resumen de asistencia de hoy.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,

            px: 1.5,
            py: 1,

            borderRadius: 2,

            backgroundColor: '#fff',

            border: '1px solid',
            borderColor: '#e5e7eb',

            whiteSpace: 'nowrap',
          }}
        >
          <AccessTimeIcon
            sx={{
              fontSize: 18,
              color: 'primary.main',
            }}
          />

          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          >
            {formatDate()}
          </Typography>
        </Box>
      </Box>

      {/* =====================================================
          KPIs
      ===================================================== */}

      <Grid
        container
        spacing={2}
        alignItems="stretch"
      >
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
          sx={{
            display: 'flex',
          }}
        >
          <DashboardStatCard
            title="Empleados activos"
            value={totalEmployees}
            description="personal registrado"
            icon={<PeopleIcon />}
            accent="#1565c0"
            delay={50}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
          sx={{
            display: 'flex',
          }}
        >
          <DashboardStatCard
            title="Presentes"
            value={presentCount}
            percentage={attendancePercentage}
            description="del personal"
            icon={<CheckCircleIcon />}
            accent="#16a34a"
            delay={120}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
          sx={{
            display: 'flex',
          }}
        >
          <DashboardStatCard
            title="Justificadas"
            value={justifiedCount}
            percentage={justifiedPercentage}
            description="del personal"
            icon={<EventAvailableIcon />}
            accent="#0284c7"
            delay={190}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
          sx={{
            display: 'flex',
          }}
        >
          <DashboardStatCard
            title="Pendientes"
            value={pendingCount}
            percentage={pendingPercentage}
            description="sin registro"
            icon={<WarningIcon />}
            accent="#d97706"
            delay={260}
          />
        </Grid>
      </Grid>

      {/* =====================================================
          RESUMEN PRINCIPAL
      ===================================================== */}

      <Grid
        container
        spacing={2}
        alignItems="stretch"
      >
        {/* ===================================================
            ASISTENCIA DE HOY
        =================================================== */}

        <Grid
          size={{
            xs: 12,
            md: 7,
          }}
          sx={{
            display: 'flex',
          }}
        >
          <Card
            sx={{
              width: '100%',
              minHeight: 360,

              border: '1px solid',
              borderColor: '#e5e7eb',

              boxShadow:
                '0 1px 2px rgba(15, 23, 42, 0.02)',

              display: 'flex',
            }}
          >
            <CardContent
              sx={{
                width: '100%',

                p: {
                  xs: 2.5,
                  md: 3,
                },

                '&:last-child': {
                  pb: {
                    xs: 2.5,
                    md: 3,
                  },
                },
              }}
            >
              <Stack
                spacing={3}
                sx={{
                  height: '100%',
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.3,
                    }}
                  >
                    Asistencia de hoy
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 0.5,
                    }}
                  >
                    Distribución del personal
                    durante la jornada.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flex: 1,

                    display: 'flex',

                    alignItems: 'center',

                    justifyContent: {
                      xs: 'center',
                      sm: 'flex-start',
                    },

                    gap: {
                      xs: 3,
                      sm: 5,
                    },

                    flexDirection: {
                      xs: 'column',
                      sm: 'row',
                    },
                  }}
                >
                  {/* DONUT */}

                  <Box
                    sx={{
                      position: 'relative',

                      width: 176,
                      height: 176,

                      flexShrink: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',

                        borderRadius: '50%',

                        background:
                          `conic-gradient(#16a34a 0deg, #16a34a ${attendancePercentage * 3.6}deg, #e2e8f0 ${attendancePercentage * 3.6}deg 360deg)`,

                        display: 'flex',

                        alignItems: 'center',
                        justifyContent: 'center',

                        animation:
                          'donutIn 900ms cubic-bezier(0.22, 1, 0.36, 1)',

                        '@keyframes donutIn': {
                          from: {
                            opacity: 0,
                            transform:
                              'scale(.75) rotate(-30deg)',
                          },

                          to: {
                            opacity: 1,
                            transform:
                              'scale(1) rotate(0)',
                          },
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 130,
                          height: 130,

                          borderRadius: '50%',

                          backgroundColor: '#fff',

                          display: 'flex',

                          flexDirection:
                            'column',

                          alignItems: 'center',
                          justifyContent: 'center',

                          boxShadow:
                            '0 0 0 1px #f1f5f9',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 31,
                            fontWeight: 700,
                            lineHeight: 1,

                            letterSpacing:
                              '-0.04em',
                          }}
                        >
                          {attendancePercentage}%
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            mt: 0.75,
                          }}
                        >
                          asistencia
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* BARRAS */}

                  <Stack
                    spacing={2.5}
                    sx={{
                      width: {
                        xs: '100%',
                        sm: 250,
                      },

                      maxWidth: 280,
                    }}
                  >
                    <AttendanceProgress
                      label="Presentes"
                      value={presentCount}
                      percentage={
                        attendancePercentage
                      }
                      color="#16a34a"
                    />

                    <AttendanceProgress
                      label="Justificadas"
                      value={justifiedCount}
                      percentage={
                        justifiedPercentage
                      }
                      color="#0284c7"
                    />

                    <AttendanceProgress
                      label="Pendientes"
                      value={pendingCount}
                      percentage={
                        pendingPercentage
                      }
                      color="#d97706"
                    />
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* ===================================================
            ESTADO DE LA JORNADA
        =================================================== */}

        <Grid
          size={{
            xs: 12,
            md: 5,
          }}
          sx={{
            display: 'flex',
          }}
        >
          <Card
            sx={{
              width: '100%',
              minHeight: 360,

              border: '1px solid',
              borderColor: '#e5e7eb',

              boxShadow:
                '0 1px 2px rgba(15, 23, 42, 0.02)',

              display: 'flex',
            }}
          >
            <CardContent
              sx={{
                width: '100%',

                p: {
                  xs: 2.5,
                  md: 3,
                },

                '&:last-child': {
                  pb: {
                    xs: 2.5,
                    md: 3,
                  },
                },
              }}
            >
              <Stack
                spacing={2}
                sx={{
                  height: '100%',
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.3,
                    }}
                  >
                    Estado de la jornada
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 0.5,
                    }}
                  >
                    Situación actual del personal.
                  </Typography>
                </Box>

                <Stack
                  sx={{
                    flex: 1,
                    justifyContent: 'center',
                  }}
                >
                  <StatusRow
                    icon={<CheckCircleIcon />}
                    title="Presentes"
                    description="Entrada registrada"
                    value={presentCount}
                    background="#f0fdf4"
                    color="#16a34a"
                  />

                  <Divider />

                  <StatusRow
                    icon={<EventAvailableIcon />}
                    title="Justificadas"
                    description="Ausencias justificadas"
                    value={justifiedCount}
                    background="#f0f9ff"
                    color="#0284c7"
                  />

                  <Divider />

                  <StatusRow
                    icon={<WarningIcon />}
                    title="Pendientes"
                    description="Sin registro completo"
                    value={pendingCount}
                    background="#fffbeb"
                    color="#d97706"
                  />
                </Stack>

                <Box
                  sx={{
                    px: 2,
                    py: 1.5,

                    borderRadius: 2,

                    backgroundColor:
                      '#f8fafc',

                    border: '1px solid',
                    borderColor:
                      '#f1f5f9',
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Total de empleados
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                      }}
                    >
                      {totalEmployees}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* =====================================================
          ACTIVIDAD RECIENTE
      ===================================================== */}

      <Card
        sx={{
          border: '1px solid',
          borderColor: '#e5e7eb',

          boxShadow:
            '0 1px 2px rgba(15, 23, 42, 0.02)',

          overflow: 'hidden',
        }}
      >
        {/* IMPORTANTE:
            No usamos CardContent aquí para evitar que
            el padding interno afecte el centrado del
            estado vacío.
        */}

        {/* HEADER */}

        <Box
          sx={{
            px: {
              xs: 2,
              sm: 3,
            },

            py: 2.5,

            borderBottom: '1px solid',
            borderColor: '#e5e7eb',
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                }}
              >
                Actividad reciente
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                }}
              >
                Últimos movimientos de asistencia.
              </Typography>
            </Box>

            <Chip
              label={`${todayRecords.length} ${todayRecords.length === 1
                  ? 'registro'
                  : 'registros'
                }`}
              size="small"
              sx={{
                flexShrink: 0,

                backgroundColor:
                  'rgba(21, 101, 192, 0.08)',

                color: 'primary.main',

                fontWeight: 600,
              }}
            />
          </Stack>
        </Box>

        {/* =================================================
            CON REGISTROS
        ================================================= */}

        {todayRecords.length > 0 ? (
          <Stack>
            {todayRecords
              .slice(0, 6)
              .map((record, index) => {
                const name =
                  getUserName(
                    record.userId,
                  );

                const statusStyles =
                  getStatusStyles(
                    record.status,
                  );

                return (
                  <Box
                    key={record.id}
                    sx={{
                      px: {
                        xs: 2,
                        sm: 3,
                      },

                      py: 1.75,

                      borderBottom:
                        index <
                          Math.min(
                            todayRecords.length,
                            6,
                          ) -
                          1
                          ? '1px solid'
                          : 'none',

                      borderColor: '#f1f5f9',

                      transition:
                        'background-color 180ms ease',

                      animation:
                        'activityIn 400ms ease forwards',

                      animationDelay:
                        `${index * 60}ms`,

                      opacity: 0,

                      '@keyframes activityIn': {
                        from: {
                          opacity: 0,
                          transform:
                            'translateX(-8px)',
                        },

                        to: {
                          opacity: 1,
                          transform:
                            'translateX(0)',
                        },
                      },

                      '&:hover': {
                        backgroundColor:
                          '#fafafa',

                        '& .activity-arrow': {
                          transform:
                            'translateX(4px)',

                          color:
                            'primary.main',
                        },
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1.5}
                    >
                      <Avatar
                        sx={{
                          width: 38,
                          height: 38,

                          flexShrink: 0,

                          fontSize: 13,
                          fontWeight: 600,

                          backgroundColor:
                            'rgba(21, 101, 192, 0.1)',

                          color:
                            'primary.main',
                        }}
                      >
                        {getUserInitial(
                          record.userId,
                        )}
                      </Avatar>

                      <Box
                        sx={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,

                            overflow:
                              'hidden',

                            textOverflow:
                              'ellipsis',

                            whiteSpace:
                              'nowrap',
                          }}
                        >
                          {name}
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            Entrada{' '}
                            {formatTime(
                              record.checkIn,
                            )}
                          </Typography>

                          <Box
                            sx={{
                              width: 3,
                              height: 3,

                              borderRadius:
                                '50%',

                              backgroundColor:
                                '#cbd5e1',
                            }}
                          />

                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            Salida{' '}
                            {formatTime(
                              record.checkOut,
                            )}
                          </Typography>
                        </Stack>
                      </Box>

                      <Chip
                        label={getStatusLabel(
                          record.status,
                        )}
                        size="small"
                        sx={{
                          display: {
                            xs: 'none',
                            sm: 'flex',
                          },

                          flexShrink: 0,

                          color:
                            statusStyles.color,

                          backgroundColor:
                            statusStyles.backgroundColor,

                          fontWeight: 600,

                          '&::before': {
                            content: '""',

                            width: 6,
                            height: 6,

                            borderRadius:
                              '50%',

                            backgroundColor:
                              statusStyles.dot,

                            mr: 0.75,
                          },
                        }}
                      />

                      <ArrowForwardIcon
                        className="activity-arrow"
                        sx={{
                          flexShrink: 0,

                          fontSize: 18,

                          color:
                            '#cbd5e1',

                          transition:
                            'all 180ms ease',
                        }}
                      />
                    </Stack>
                  </Box>
                );
              })}
          </Stack>
        ) : (
          /* =================================================
             EMPTY STATE
          ================================================= */

          <Box
            sx={{
              height: 240,
              width: '100%',

              display: 'flex',
              flexDirection: 'column',

              alignItems: 'center',
              justifyContent: 'center',

              textAlign: 'center',

              boxSizing: 'border-box',

              animation:
                'emptyStateIn 450ms ease-out',

              '@keyframes emptyStateIn': {
                from: {
                  opacity: 0,
                  transform:
                    'translateY(8px)',
                },

                to: {
                  opacity: 1,
                  transform:
                    'translateY(0)',
                },
              },
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                borderRadius: '50%',

                backgroundColor:
                  'rgba(21, 101, 192, 0.07)',

                border: '1px solid',
                borderColor:
                  'rgba(21, 101, 192, 0.10)',

                color: 'primary.main',

                mb: 1.5,

                '& svg': {
                  fontSize: 23,
                },
              }}
            >
              <AccessTimeIcon />
            </Box>

            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 600,

                lineHeight: 1.4,

                color: '#1f2937',
              }}
            >
              Sin actividad todavía
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,

                lineHeight: 1.5,
              }}
            >
              Aún no existen registros de asistencia
              <br />
              para hoy.
            </Typography>
          </Box>
        )}
      </Card>
    </Stack>
  );
}

/* =============================================================
   BARRA DE PROGRESO
============================================================= */

interface AttendanceProgressProps {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

function AttendanceProgress({
  label,
  value,
  percentage,
  color,
}: AttendanceProgressProps) {
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mb: 0.75,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Box
            sx={{
              width: 7,
              height: 7,

              borderRadius: '50%',

              backgroundColor: color,
            }}
          />

          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
            }}
          >
            {label}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="baseline"
          spacing={0.75}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
            }}
          >
            {value}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            {percentage}%
          </Typography>
        </Stack>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 7,

          borderRadius: 10,

          backgroundColor: '#f1f5f9',

          '& .MuiLinearProgress-bar': {
            borderRadius: 10,

            backgroundColor: color,

            transition:
              'transform 900ms cubic-bezier(0.22, 1, 0.36, 1)',
          },
        }}
      />
    </Box>
  );
}

/* =============================================================
   FILA DE ESTADO
============================================================= */

interface StatusRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: number;
  background: string;
  color: string;
}

function StatusRow({
  icon,
  title,
  description,
  value,
  background,
  color,
}: StatusRowProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      sx={{
        py: 1.5,
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,

          flexShrink: 0,

          borderRadius: 2,

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          backgroundColor: background,

          color,

          '& svg': {
            fontSize: 21,
          },
        }}
      >
        {icon}
      </Box>

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          {description}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 700,
          color: '#111827',
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}