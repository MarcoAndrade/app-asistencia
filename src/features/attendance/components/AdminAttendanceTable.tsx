import type { ReactNode } from 'react';

import {
  alpha,
  useTheme,
} from '@mui/material/styles';

import {
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';

import type { Attendance } from '../types';
import type { User } from '@/features/users/types';

interface AdminAttendanceTableProps {
  records: Attendance[];
  users: User[];
  onEdit: (record: Attendance) => void;
}

/* =========================================================
   HELPERS
   ========================================================= */

function formatTime(value: string | null): string {
  if (!value) {
    return '--:--';
  }

  return new Date(value).toLocaleTimeString(
    'es-MX',
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  );
}

function formatDate(value: string): {
  day: string;
  date: string;
} {
  const date = new Date(`${value}T00:00:00`);

  return {
    day: date.toLocaleDateString('es-MX', {
      weekday: 'short',
    }),

    date: date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
  };
}

function getStatusLabel(
  status: Attendance['status'],
): string {
  switch (status) {
    case 'PRESENT':
      return 'Presente';

    case 'ABSENT':
      return 'Ausente';

    case 'JUSTIFIED':
      return 'Justificada';

    case 'INCOMPLETE':
      return 'Incompleta';

    default:
      return 'Desconocido';
  }
}

function getStatusPalette(
  status: Attendance['status'],
) {
  switch (status) {
    case 'PRESENT':
      return {
        color: 'success',
      };

    case 'ABSENT':
      return {
        color: 'error',
      };

    case 'JUSTIFIED':
      return {
        color: 'info',
      };

    case 'INCOMPLETE':
      return {
        color: 'warning',
      };

    default:
      return {
        color: 'default',
      };
  }
}

function getUser(
  users: User[],
  userId: string,
): User | undefined {
  return users.find(
    (user) => user.id === userId,
  );
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(
      (part) =>
        part[0]?.toUpperCase() ?? '',
    )
    .join('');
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export function AdminAttendanceTable({
  records,
  users,
  onEdit,
}: AdminAttendanceTableProps) {
  if (records.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      {/* ===================================================
          DESKTOP
          =================================================== */}

      <TableContainer
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },

          width: '100%',
          overflowX: 'auto',
        }}
      >
        <Table
          sx={{
            width: '100%',
            minWidth: 980,

            '& .MuiTableCell-root': {
              borderColor: 'divider',
            },
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor:
                  'background.default',
              }}
            >
              <HeaderCell width="15%">
                Fecha
              </HeaderCell>

              <HeaderCell width="23%">
                Empleado
              </HeaderCell>

              <HeaderCell width="12%">
                Entrada
              </HeaderCell>

              <HeaderCell width="12%">
                Salida
              </HeaderCell>

              <HeaderCell width="14%">
                Estado
              </HeaderCell>

              <HeaderCell width="18%">
                Justificación
              </HeaderCell>

              <HeaderCell
                width="6%"
                align="right"
              >
                Acción
              </HeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {records.map((record) => {
              const user = getUser(
                users,
                record.userId,
              );

              return (
                <DesktopAttendanceRow
                  key={record.id}
                  record={record}
                  user={user}
                  onEdit={onEdit}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ===================================================
          MOBILE
          =================================================== */}

      <Box
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },

          px: {
            xs: 1.5,
            sm: 2,
          },

          py: 1,
        }}
      >
        {records.map((record, index) => {
          const user = getUser(
            users,
            record.userId,
          );

          return (
            <MobileAttendanceCard
              key={record.id}
              record={record}
              user={user}
              onEdit={onEdit}
              isLast={
                index ===
                records.length - 1
              }
            />
          );
        })}
      </Box>
    </>
  );
}

/* =========================================================
   DESKTOP ROW
   ========================================================= */

interface DesktopAttendanceRowProps {
  record: Attendance;
  user?: User;
  onEdit: (record: Attendance) => void;
}

function DesktopAttendanceRow({
  record,
  user,
  onEdit,
}: DesktopAttendanceRowProps) {
  const date = formatDate(record.date);

  return (
    <TableRow
      hover
      sx={{
        transition:
          'background-color 0.18s ease',

        '&:hover': {
          backgroundColor:
            'action.hover',
        },

        '&:last-child td': {
          borderBottom: 0,
        },
      }}
    >
      {/* FECHA */}
      <TableCell
        sx={{
          py: 2,
          px: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,

              flexShrink: 0,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              borderRadius: 1.5,

              backgroundColor:
                'action.hover',

              color:
                'text.secondary',
            }}
          >
            <EventOutlinedIcon
              sx={{
                fontSize: 19,
              }}
            />
          </Box>

          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                textTransform:
                  'capitalize',
              }}
            >
              {date.day}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform:
                  'capitalize',
              }}
            >
              {date.date}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      {/* EMPLEADO */}
      <TableCell
        sx={{
          py: 2,
          minWidth: 220,
        }}
      >
        <EmployeeInfo user={user} />
      </TableCell>

      {/* ENTRADA */}
      <TableCell sx={{ py: 2 }}>
        <TimeValue
          value={formatTime(
            record.checkIn,
          )}
        />
      </TableCell>

      {/* SALIDA */}
      <TableCell sx={{ py: 2 }}>
        <TimeValue
          value={formatTime(
            record.checkOut,
          )}
          muted={!record.checkOut}
        />
      </TableCell>

      {/* ESTADO */}
      <TableCell sx={{ py: 2 }}>
        <AttendanceStatusChip
          status={record.status}
        />
      </TableCell>

      {/* JUSTIFICACIÓN */}
      <TableCell
        sx={{
          py: 2,
          maxWidth: 240,
        }}
      >
        {record.justification ? (
          <Typography
            variant="body2"
            color="text.secondary"
            title={record.justification}
            sx={{
              overflow: 'hidden',
              textOverflow:
                'ellipsis',
              whiteSpace:
                'nowrap',
            }}
          >
            {record.justification}
          </Typography>
        ) : (
          <Typography
            variant="body2"
            color="text.disabled"
          >
            Sin justificación
          </Typography>
        )}
      </TableCell>

      {/* ACCIÓN */}
      <TableCell
        align="right"
        sx={{
          py: 2,
          px: 3,
        }}
      >
        <EditButton
          onClick={() =>
            onEdit(record)
          }
        />
      </TableCell>
    </TableRow>
  );
}

/* =========================================================
   MOBILE CARD
   ========================================================= */

interface MobileAttendanceCardProps {
  record: Attendance;
  user?: User;
  onEdit: (record: Attendance) => void;
  isLast: boolean;
}

function MobileAttendanceCard({
  record,
  user,
  onEdit,
  isLast,
}: MobileAttendanceCardProps) {
  const date = formatDate(record.date);

  return (
    <Box
      sx={{
        py: 2,

        borderBottom: isLast
          ? 'none'
          : '1px solid',

        borderColor: 'divider',
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <EmployeeAvatar
          name={
            user?.name ??
            'Usuario desconocido'
          }
          size="large"
        />

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,

              overflow: 'hidden',
              textOverflow:
                'ellipsis',
              whiteSpace:
                'nowrap',
            }}
          >
            {user?.name ??
              'Usuario desconocido'}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,

              mt: 0.25,
            }}
          >
            <EventOutlinedIcon
              sx={{
                fontSize: 14,
                color:
                  'text.secondary',
              }}
            />

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform:
                  'capitalize',
              }}
            >
              {date.date}
            </Typography>
          </Box>
        </Box>

        <EditButton
          onClick={() =>
            onEdit(record)
          }
        />
      </Box>

      {/* ESTADO */}
      <Box
        sx={{
          mt: 1.75,
        }}
      >
        <AttendanceStatusChip
          status={record.status}
        />
      </Box>

      {/* HORARIOS */}
      <Box
        sx={{
          mt: 1.5,

          display: 'grid',

          gridTemplateColumns:
            '1fr 1fr',

          gap: 1,
        }}
      >
        <TimeCard
          label="Entrada"
          value={formatTime(
            record.checkIn,
          )}
          icon={
            <AccessTimeRoundedIcon />
          }
          muted={!record.checkIn}
        />

        <TimeCard
          label="Salida"
          value={formatTime(
            record.checkOut,
          )}
          icon={
            <AccessTimeRoundedIcon />
          }
          muted={!record.checkOut}
        />
      </Box>

      {/* JUSTIFICACIÓN */}
      {record.justification && (
        <Box
          sx={{
            mt: 1,

            display: 'flex',
            alignItems:
              'flex-start',

            gap: 1,

            px: 1.25,
            py: 1,

            borderRadius: 1.5,

            backgroundColor:
              'background.default',
          }}
        >
          <NotesOutlinedIcon
            sx={{
              fontSize: 17,

              color:
                'text.secondary',

              mt: 0.1,

              flexShrink: 0,
            }}
          />

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: 'block',
                lineHeight: 1.2,
              }}
            >
              Justificación
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 0.25,
                lineHeight: 1.35,
              }}
            >
              {record.justification}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

/* =========================================================
   EMPLOYEE INFO
   ========================================================= */

function EmployeeInfo({
  user,
}: {
  user?: User;
}) {
  const name =
    user?.name ??
    'Usuario desconocido';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,

        minWidth: 0,
      }}
    >
      <EmployeeAvatar name={name} />

      <Box
        sx={{
          minWidth: 0,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,

            overflow: 'hidden',
            textOverflow:
              'ellipsis',
            whiteSpace:
              'nowrap',
          }}
        >
          {name}
        </Typography>

        {user?.employeeNumber && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'block',
              mt: 0.2,
            }}
          >
            #{user.employeeNumber}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

/* =========================================================
   AVATAR
   ========================================================= */

function EmployeeAvatar({
  name,
  size = 'normal',
}: {
  name: string;
  size?: 'normal' | 'large';
}) {
  const initials =
    getInitials(name);

  const dimension =
    size === 'large'
      ? 46
      : 38;

  return (
    <Box
      sx={{
        width: dimension,
        height: dimension,

        flexShrink: 0,

        borderRadius: '50%',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor:
          'primary.main',

        color:
          'primary.contrastText',

        fontSize:
          size === 'large'
            ? 13
            : 11,

        fontWeight: 700,
      }}
    >
      {initials}
    </Box>
  );
}

/* =========================================================
   TIME VALUE
   ========================================================= */

function TimeValue({
  value,
  muted = false,
}: {
  value: string;
  muted?: boolean;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
      }}
    >
      <AccessTimeRoundedIcon
        sx={{
          fontSize: 17,

          color: muted
            ? 'text.disabled'
            : 'text.secondary',
        }}
      />

      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,

          color: muted
            ? 'text.disabled'
            : 'text.primary',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

/* =========================================================
   MOBILE TIME CARD
   ========================================================= */

function TimeCard({
  label,
  value,
  icon,
  muted = false,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  muted?: boolean;
}) {
  return (
    <Box
      sx={{
        px: 1.25,
        py: 1.1,

        borderRadius: 1.5,

        backgroundColor:
          'background.default',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,

          color:
            'text.secondary',
        }}
      >
        <Box
          sx={{
            display: 'flex',

            '& svg': {
              fontSize: 16,
            },
          }}
        >
          {icon}
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          {label}
        </Typography>
      </Box>

      <Typography
        sx={{
          mt: 0.5,

          fontSize: 16,
          fontWeight: 700,

          color: muted
            ? 'text.disabled'
            : 'text.primary',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

/* =========================================================
   STATUS CHIP
   ========================================================= */

function AttendanceStatusChip({
  status,
}: {
  status: Attendance['status'];
}) {
  const theme = useTheme();

  const palette =
    getStatusPalette(status);

  const color =
    palette.color === 'default'
      ? theme.palette
        .text
        .secondary
      : theme.palette[
        palette.color
      ].main;

  return (
    <Chip
      size="small"
      label={getStatusLabel(status)}
      icon={
        <Box
          component="span"
          sx={{
            width: 6,
            height: 6,

            borderRadius: '50%',

            backgroundColor:
              color,
          }}
        />
      }
      sx={{
        height: 28,

        fontWeight: 600,

        backgroundColor:
          alpha(color, 0.08),

        color,

        border: '1px solid',

        borderColor:
          alpha(color, 0.18),

        '& .MuiChip-icon': {
          color,
          marginLeft: 1,
        },
      }}
    />
  );
}

/* =========================================================
   EDIT BUTTON
   ========================================================= */

function EditButton({
  onClick,
}: {
  onClick: () => void;
}) {
  const theme = useTheme();

  return (
    <Tooltip
      title="Modificar registro"
      arrow
    >
      <IconButton
        size="small"
        onClick={onClick}
        aria-label="Modificar registro"
        sx={{
          width: 38,
          height: 38,

          flexShrink: 0,

          border: '1px solid',

          borderColor:
            theme.palette.divider,

          color:
            theme.palette.text
              .secondary,

          backgroundColor:
            theme.palette.background
              .paper,

          transition:
            'all 0.18s ease',

          '&:hover': {
            color:
              theme.palette.primary
                .main,

            backgroundColor:
              alpha(
                theme.palette
                  .primary.main,
                0.08,
              ),

            borderColor:
              alpha(
                theme.palette
                  .primary.main,
                0.2,
              ),
          },
        }}
      >
        <EditRoundedIcon
          sx={{
            fontSize: 18,
          }}
        />
      </IconButton>
    </Tooltip>
  );
}

/* =========================================================
   TABLE HEADER
   ========================================================= */

function HeaderCell({
  children,
  width,
  align = 'left',
}: {
  children: ReactNode;
  width: string;
  align?: 'left' | 'right' | 'center';
}) {
  return (
    <TableCell
      align={align}
      sx={{
        width,

        py: 1.5,

        px: 2,

        color:
          'text.secondary',

        fontSize: 11,

        fontWeight: 700,

        textTransform:
          'uppercase',

        letterSpacing:
          '0.06em',

        '&:first-of-type': {
          pl: 3,
        },

        '&:last-of-type': {
          pr: 3,
        },
      }}
    >
      {children}
    </TableCell>
  );
}

/* =========================================================
   EMPTY STATE
   ========================================================= */

function EmptyState() {
  return (
    <Box
      sx={{
        minHeight: 300,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        px: 3,
        py: 6,
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: 360,
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,

            mx: 'auto',
            mb: 2,

            borderRadius: '50%',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            backgroundColor:
              'action.hover',

            color:
              'text.secondary',
          }}
        >
          <EventOutlinedIcon
            sx={{
              fontSize: 30,
            }}
          />
        </Box>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 17,
          }}
        >
          No hay registros de
          asistencia
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.75,
          }}
        >
          Los registros de
          asistencia aparecerán
          aquí.
        </Typography>
      </Box>
    </Box>
  );
}

