import { Box, Typography } from '@mui/material';

export function AttendancePage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Asistencias
      </Typography>

      <Typography color="text.secondary">
        Gestión y consulta de asistencias.
      </Typography>
    </Box>
  );
}