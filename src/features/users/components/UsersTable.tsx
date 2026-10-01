import type { ReactNode } from 'react';

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

import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

import type { User } from '../types';

interface UsersTableProps {
  users: User[];
  onToggleActive: (user: User) => void;
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function UsersTable({
  users,
  onToggleActive,
}: UsersTableProps) {
  if (users.length === 0) {
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
              backgroundColor: 'action.hover',
              color: 'text.secondary',
            }}
          >
            <AdminPanelSettingsRoundedIcon sx={{ fontSize: 30 }} />
          </Box>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 17,
            }}
          >
            No hay empleados registrados
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.75 }}
          >
            Los empleados que registres aparecerán aquí.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {/* =========================
          DESKTOP / TABLET
          ========================= */}
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
            minWidth: 900,

            '& .MuiTableCell-root': {
              borderColor: 'divider',
            },
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: 'background.default',
              }}
            >
              <TableCell
                sx={{
                  width: '30%',
                  py: 1.5,
                  px: 3,
                  color: 'text.secondary',
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Empleado
              </TableCell>

              <TableCell
                sx={{
                  width: '23%',
                  py: 1.5,
                  color: 'text.secondary',
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Contacto
              </TableCell>

              <TableCell
                sx={{
                  width: '17%',
                  py: 1.5,
                  color: 'text.secondary',
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Departamento
              </TableCell>

              <TableCell
                sx={{
                  width: '13%',
                  py: 1.5,
                  color: 'text.secondary',
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Rol
              </TableCell>

              <TableCell
                sx={{
                  width: '12%',
                  py: 1.5,
                  color: 'text.secondary',
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Estado
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  width: '5%',
                  py: 1.5,
                  px: 3,
                  color: 'text.secondary',
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Acción
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <DesktopUserRow
                key={user.id}
                user={user}
                onToggleActive={onToggleActive}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* =========================
          MOBILE
          ========================= */}
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
          py: 1.5,
        }}
      >
        {users.map((user, index) => (
          <MobileUserCard
            key={user.id}
            user={user}
            onToggleActive={onToggleActive}
            isLast={index === users.length - 1}
          />
        ))}
      </Box>
    </>
  );
}

/* =========================================================
   DESKTOP ROW
   ========================================================= */

interface UserRowProps {
  user: User;
  onToggleActive: (user: User) => void;
}

function DesktopUserRow({
  user,
  onToggleActive,
}: UserRowProps) {
  const initials = getInitials(user.name);

  return (
    <TableRow
      hover
      sx={{
        transition: 'background-color 0.18s ease',

        '&:hover': {
          backgroundColor: 'action.hover',
        },

        '&:last-child td': {
          borderBottom: 0,
        },
      }}
    >
      {/* EMPLEADO */}
      <TableCell
        sx={{
          px: 3,
          py: 2,
          minWidth: 280,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            minWidth: 0,
          }}
        >
          <Avatar initials={initials} />

          <Box
            sx={{
              minWidth: 0,
              flex: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                lineHeight: 1.35,

                /*
                 * Permitimos que nombres largos ocupen
                 * una segunda línea en lugar de cortarlos.
                 */
                whiteSpace: 'normal',
                overflowWrap: 'anywhere',
              }}
            >
              {user.name}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: 'block',
                mt: 0.25,
              }}
            >
              #{user.employeeNumber}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      {/* CONTACTO */}
      <TableCell
        sx={{
          py: 2,
          minWidth: 180,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {user.email}
        </Typography>
      </TableCell>

      {/* DEPARTAMENTO */}
      <TableCell
        sx={{
          py: 2,
          minWidth: 140,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {user.department}
        </Typography>
      </TableCell>

      {/* ROL */}
      <TableCell
        sx={{
          py: 2,
          minWidth: 130,
        }}
      >
        <RoleChip role={user.role} />
      </TableCell>

      {/* ESTADO */}
      <TableCell
        sx={{
          py: 2,
          minWidth: 110,
        }}
      >
        <StatusChip active={user.active} />
      </TableCell>

      {/* ACCIÓN */}
      <TableCell
        align="right"
        sx={{
          px: 3,
          py: 2,
          minWidth: 70,
        }}
      >
        <ToggleButton
          user={user}
          onToggleActive={onToggleActive}
        />
      </TableCell>
    </TableRow>
  );
}

/* =========================================================
   MOBILE CARD
   ========================================================= */

interface MobileUserCardProps {
  user: User;
  onToggleActive: (user: User) => void;
  isLast: boolean;
}

function MobileUserCard({
  user,
  onToggleActive,
  isLast,
}: MobileUserCardProps) {
  const initials = getInitials(user.name);

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
        <Avatar
          initials={initials}
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
              lineHeight: 1.3,

              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user.name}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'block',
              mt: 0.25,
            }}
          >
            #{user.employeeNumber}
          </Typography>
        </Box>

        <ToggleButton
          user={user}
          onToggleActive={onToggleActive}
        />
      </Box>

      {/* INFORMACIÓN */}
      <Box
        sx={{
          mt: 2,

          ml: {
            xs: 0,
            sm: 7,
          },

          display: 'grid',

          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
          },

          gap: 1,
        }}
      >
        <InfoItem
          icon={<EmailOutlinedIcon />}
          label="Correo"
          value={user.email}
        />

        <InfoItem
          icon={<BusinessOutlinedIcon />}
          label="Departamento"
          value={user.department}
        />
      </Box>

      {/* ROL / ESTADO */}
      <Box
        sx={{
          mt: 1.5,

          ml: {
            xs: 0,
            sm: 7,
          },

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',

          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <RoleChip role={user.role} />

          <StatusChip active={user.active} />
        </Box>
      </Box>
    </Box>
  );
}

/* =========================================================
   AVATAR
   ========================================================= */

function Avatar({
  initials,
  size = 'normal',
}: {
  initials: string;
  size?: 'normal' | 'large';
}) {
  const dimensions =
    size === 'large'
      ? 48
      : 40;

  return (
    <Box
      sx={{
        width: dimensions,
        height: dimensions,

        flexShrink: 0,

        borderRadius: '50%',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'primary.main',
        color: 'primary.contrastText',

        fontSize:
          size === 'large'
            ? 14
            : 12,

        fontWeight: 700,

        letterSpacing: '-0.02em',
      }}
    >
      {initials}
    </Box>
  );
}

/* =========================================================
   ROLE
   ========================================================= */

function RoleChip({
  role,
}: {
  role: User['role'];
}) {
  if (role === 'ADMIN') {
    return (
      <Chip
        icon={
          <AdminPanelSettingsRoundedIcon />
        }
        label="Administrador"
        size="small"
        sx={{
          height: 28,

          fontWeight: 600,

          backgroundColor: 'primary.50',
          color: 'primary.main',

          border: '1px solid',
          borderColor: 'primary.100',

          '& .MuiChip-icon': {
            color: 'primary.main',
            fontSize: 16,
          },
        }}
      />
    );
  }

  return (
    <Chip
      label="Empleado"
      size="small"
      variant="outlined"
      sx={{
        height: 28,

        fontWeight: 600,

        color: 'text.secondary',
        borderColor: 'divider',
      }}
    />
  );
}

/* =========================================================
   STATUS
   ========================================================= */

function StatusChip({
  active,
}: {
  active: boolean;
}) {
  return (
    <Chip
      label={
        active
          ? 'Activo'
          : 'Inactivo'
      }
      size="small"

      icon={
        active
          ? <CheckCircleRoundedIcon />
          : undefined
      }

      color={
        active
          ? 'success'
          : 'default'
      }

      variant={
        active
          ? 'filled'
          : 'outlined'
      }

      sx={{
        height: 28,

        fontWeight: 600,

        '& .MuiChip-icon': {
          fontSize: 16,
        },
      }}
    />
  );
}

/* =========================================================
   TOGGLE BUTTON
   ========================================================= */

function ToggleButton({
  user,
  onToggleActive,
}: UserRowProps) {
  return (
    <Tooltip
      title={
        user.active
          ? 'Desactivar empleado'
          : 'Activar empleado'
      }
      arrow
    >
      <IconButton
        size="small"
        onClick={() =>
          onToggleActive(user)
        }
        aria-label={
          user.active
            ? 'Desactivar empleado'
            : 'Activar empleado'
        }
        sx={{
          width: 38,
          height: 38,

          flexShrink: 0,

          border: '1px solid',
          borderColor: 'divider',

          color: user.active
            ? 'text.secondary'
            : 'success.main',

          backgroundColor:
            'background.paper',

          transition:
            'all 0.18s ease',

          '&:hover': {
            color: user.active
              ? 'error.main'
              : 'success.main',

            backgroundColor:
              user.active
                ? 'error.50'
                : 'success.50',

            borderColor:
              user.active
                ? 'error.200'
                : 'success.200',
          },
        }}
      >
        {user.active ? (
          <BlockRoundedIcon
            sx={{ fontSize: 18 }}
          />
        ) : (
          <CheckCircleRoundedIcon
            sx={{ fontSize: 18 }}
          />
        )}
      </IconButton>
    </Tooltip>
  );
}

/* =========================================================
   MOBILE INFO ITEM
   ========================================================= */

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Box
      sx={{
        minWidth: 0,

        display: 'flex',
        alignItems: 'center',

        gap: 1,

        px: 1.25,
        py: 1,

        borderRadius: 1.5,

        backgroundColor:
          'background.default',
      }}
    >
      <Box
        sx={{
          display: 'flex',

          color:
            'text.secondary',

          flexShrink: 0,

          '& svg': {
            fontSize: 17,
          },
        }}
      >
        {icon}
      </Box>

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
          {label}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 0.25,

            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}
