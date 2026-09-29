import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

import { Navigate } from 'react-router-dom';

import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        px: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 420,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{ fontWeight: 700 }}
            gutterBottom
          >
            Control de asistencia
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Inicia sesión para continuar
          </Typography>

          <LoginForm />
        </CardContent>
      </Card>
    </Box>
  );
}