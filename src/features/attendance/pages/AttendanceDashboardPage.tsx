import { Box, Button, Typography } from '@mui/material';

import { useAuth } from '@/features/auth/hooks/useAuth';

export function AttendanceDashboardPage() {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Typography>
        Bienvenido, {user?.name}
      </Typography>

      <Typography sx={{ mb: 3 }}>
        Rol: {user?.role}
      </Typography>

      <Button
        variant="outlined"
        onClick={logout}
      >
        Cerrar sesión
      </Button>
    </Box>
  );
}