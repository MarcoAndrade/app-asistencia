import { useMemo, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

import { useUsers } from '../hooks/useUsers';
import { UserForm } from '../components/UserForm';
import { UsersTable } from '../components/UsersTable';

export function UsersPage() {
  const {
    users,
    isLoading,
    createUser,
    updateUser,
  } = useUsers();

  const [isDialogOpen, setIsDialogOpen] =
    useState(false);

  const handleCreateUser = (
    data: Parameters<typeof createUser>[0],
  ) => {
    try {
      createUser(data);
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleActive = (
    user: (typeof users)[number],
  ) => {
    updateUser(user.id, {
      active: !user.active,
    });
  };

  const stats = useMemo(() => {
    const active = users.filter(
      (user) => user.active,
    ).length;

    const inactive = users.length - active;

    const admins = users.filter(
      (user) => user.role === 'ADMIN',
    ).length;

    return {
      total: users.length,
      active,
      inactive,
      admins,
    };
  }, [users]);

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
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: {
              xs: 'flex-start',
              md: 'center',
            },
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
                letterSpacing: '-0.025em',
              }}
            >
              Empleados
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Administra los usuarios y accesos de tu
              organización.
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            startIcon={<AddRoundedIcon />}
            onClick={() => setIsDialogOpen(true)}
            sx={{
              minHeight: 46,
              px: 2.5,
              borderRadius: 1.5,
              fontWeight: 700,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
              },
            }}
          >
            Nuevo empleado
          </Button>
        </Box>

        {/* Statistics */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 2,
          }}
        >
          <StatCard
            icon={<PeopleAltRoundedIcon />}
            label="Total empleados"
            value={stats.total}
            color="primary"
          />

          <StatCard
            icon={<CheckCircleRoundedIcon />}
            label="Empleados activos"
            value={stats.active}
            color="success"
          />

          <StatCard
            icon={<PersonRoundedIcon />}
            label="Inactivos"
            value={stats.inactive}
            color="default"
          />

          <StatCard
            icon={<AdminPanelSettingsRoundedIcon />}
            label="Administradores"
            value={stats.admins}
            color="warning"
          />
        </Box>

        {/* Employees */}
        <Card
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <CardContent
            sx={{
              p: 0,
              '&:last-child': {
                pb: 0,
              },
            }}
          >
            {/* Table header */}
            <Box
              sx={{
                px: {
                  xs: 2,
                  sm: 3,
                },
                py: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  Directorio de empleados
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.25 }}
                >
                  Consulta y administra las cuentas
                  registradas.
                </Typography>
              </Box>

              <IconButton
                size="small"
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'flex',
                  },
                }}
              >
                <MoreHorizRoundedIcon />
              </IconButton>
            </Box>

            <Divider />

            <UsersTable
              users={users}
              onToggleActive={handleToggleActive}
            />
          </CardContent>
        </Card>
      </Stack>

      {/* Create employee dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden',
          },
        }}
      >
        <DialogTitle
          sx={{
            px: {
              xs: 2.5,
              sm: 3,
            },
            pt: 3,
            pb: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            Registrar empleado
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Crea una nueva cuenta para un miembro de la
            organización.
          </Typography>
        </DialogTitle>

        <DialogContent
          sx={{
            px: {
              xs: 2.5,
              sm: 3,
            },
            pb: 3,
          }}
        >
          <UserForm
            onSubmit={handleCreateUser}
            onCancel={() =>
              setIsDialogOpen(false)
            }
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'primary' | 'success' | 'warning' | 'default';
}

function StatCard({
  icon,
  label,
  value,
  color,
}: StatCardProps) {
  const colorStyles = {
    primary: {
      background: 'primary.50',
      icon: 'primary.main',
    },
    success: {
      background: 'success.50',
      icon: 'success.main',
    },
    warning: {
      background: 'warning.50',
      icon: 'warning.main',
    },
    default: {
      background: 'action.hover',
      icon: 'text.secondary',
    },
  };

  const styles = colorStyles[color];

  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2.5,
        transition:
          'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow:
            '0 8px 24px rgba(15, 23, 42, 0.07)',
        },
      }}
    >
      <CardContent
        sx={{
          p: 2,
          '&:last-child': {
            pb: 2,
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              flexShrink: 0,
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: styles.background,
              color: styles.icon,
            }}
          >
            {icon}
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
            >
              {label}
            </Typography>

            <Typography
              sx={{
                fontSize: 24,
                lineHeight: 1.2,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
