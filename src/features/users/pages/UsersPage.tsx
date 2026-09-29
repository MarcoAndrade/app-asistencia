import { Box, Typography } from '@mui/material';

export function UsersPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Usuarios
      </Typography>

      <Typography color="text.secondary">
        Administración de empleados.
      </Typography>
    </Box>
  );
}