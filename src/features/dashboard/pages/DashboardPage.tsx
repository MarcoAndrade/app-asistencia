import { Box, Typography } from '@mui/material';

export function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Typography color="text.secondary">
        Resumen general del sistema de asistencia.
      </Typography>
    </Box>
  );
}