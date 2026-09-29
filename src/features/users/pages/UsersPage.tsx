import { useState } from 'react';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

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

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <Typography variant="h4">
            Empleados
          </Typography>

          <Typography
            color="text.secondary"
          >
            Administra los empleados registrados.
          </Typography>
        </div>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsDialogOpen(true)}
        >
          Nuevo empleado
        </Button>
      </Stack>

      <UsersTable
        users={users}
        onToggleActive={handleToggleActive}
      />

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Registrar empleado
        </DialogTitle>

        <DialogContent>
          <UserForm
            onSubmit={handleCreateUser}
            onCancel={() =>
              setIsDialogOpen(false)
            }
          />
        </DialogContent>
      </Dialog>
    </Stack>
  );
}