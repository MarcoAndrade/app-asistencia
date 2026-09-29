import { Box, Typography } from '@mui/material';

export function AttendanceHistoryPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Mi historial
      </Typography>

      <Typography color="text.secondary">
        Historial de asistencia del usuario.
      </Typography>
    </Box>
  );
}