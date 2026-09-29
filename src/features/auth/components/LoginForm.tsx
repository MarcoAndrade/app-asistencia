import { useState } from 'react';

import {
  Alert,
  Box,
  Button,
  TextField,
} from '@mui/material';

import { useAuth } from '../hooks/useAuth';

export function LoginForm() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>,) {
    event.preventDefault();

    setError('');
    setIsSubmitting(true);

    try {
      await login({ email, password });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'No fue posible iniciar sesión.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      <TextField
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        fullWidth
      />

      <TextField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? 'Iniciando sesión...'
          : 'Iniciar sesión'}
      </Button>
    </Box>
  );
}