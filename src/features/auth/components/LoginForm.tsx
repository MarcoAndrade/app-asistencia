import { useState } from 'react';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';

import {
  ArrowForward,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

import { useAuth } from '../hooks/useAuth';

export function LoginForm() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError('');
    setIsSubmitting(true);

    try {
      await login({
        email,
        password,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'No fue posible iniciar sesión.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        width: '100%',
      }}
    >
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: '12px',
            fontSize: 13,
          }}
        >
          {error}
        </Alert>
      )}

      {/* CORREO */}
      <TextField
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
        required
        fullWidth
        autoFocus
        autoComplete="email"
        placeholder="nombre@correo.com"
        variant="outlined"
        sx={{
          mb: 2.5,

          '& .MuiInputLabel-root': {
            fontSize: 14,
          },

          '& .MuiOutlinedInput-root': {
            height: 56,
            borderRadius: '12px',

            backgroundColor:
              'background.default',

            transition: 'all 0.2s ease',

            '& fieldset': {
              borderColor: '#e0e0e0',
            },

            '&:hover': {
              backgroundColor: '#ffffff',

              '& fieldset': {
                borderColor: '#bdbdbd',
              },
            },

            '&.Mui-focused': {
              backgroundColor: '#ffffff',

              boxShadow:
                '0 0 0 4px rgba(21,101,192,0.10)',

              '& fieldset': {
                borderColor:
                  'primary.main',

                borderWidth: 1,
              },
            },
          },

          '& input': {
            fontSize: 14,
          },

          '& input::placeholder': {
            color: '#9e9e9e',
            opacity: 1,
          },
        }}
      />

      {/* CONTRASEÑA */}
      <TextField
        label="Contraseña"
        type={
          showPassword
            ? 'text'
            : 'password'
        }
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
        required
        fullWidth
        autoComplete="current-password"
        placeholder="••••••••"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="button"
                edge="end"
                onClick={() =>
                  setShowPassword(
                    (current) => !current,
                  )
                }
                aria-label={
                  showPassword
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                }
                sx={{
                  color: '#90a4ae',

                  '&:hover': {
                    color: 'primary.main',

                    backgroundColor:
                      'transparent',
                  },
                }}
              >
                {showPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 3.5,

          '& .MuiInputLabel-root': {
            fontSize: 14,
          },

          '& .MuiOutlinedInput-root': {
            height: 56,
            borderRadius: '12px',

            backgroundColor:
              'background.default',

            transition: 'all 0.2s ease',

            '& fieldset': {
              borderColor: '#e0e0e0',
            },

            '&:hover': {
              backgroundColor: '#ffffff',

              '& fieldset': {
                borderColor: '#bdbdbd',
              },
            },

            '&.Mui-focused': {
              backgroundColor: '#ffffff',

              boxShadow:
                '0 0 0 4px rgba(21,101,192,0.10)',

              '& fieldset': {
                borderColor:
                  'primary.main',

                borderWidth: 1,
              },
            },
          },

          '& input': {
            fontSize: 14,
          },
        }}
      />

      {/* BOTÓN */}
      <Button
        type="submit"
        fullWidth
        disabled={isSubmitting}
        endIcon={
          !isSubmitting && (
            <ArrowForward
              sx={{
                fontSize: 18,
              }}
            />
          )
        }
        sx={{
          height: 56,

          borderRadius: '12px',

          textTransform: 'none',

          fontSize: 14,

          fontWeight: 650,

          color: '#ffffff',

          backgroundColor:
            'primary.main',

          boxShadow:
            '0 12px 25px rgba(21,101,192,0.25)',

          transition: 'all 0.2s ease',

          '&:hover': {
            backgroundColor:
              'primary.dark',

            boxShadow:
              '0 15px 30px rgba(21,101,192,0.30)',

            transform:
              'translateY(-1px)',
          },

          '&:active': {
            transform:
              'translateY(0)',
          },

          '&.Mui-disabled': {
            backgroundColor: '#cfd8dc',
            color: '#ffffff',
          },
        }}
      >
        {isSubmitting ? (
          <>
            <CircularProgress
              size={18}
              sx={{
                color: '#ffffff',
                mr: 1,
              }}
            />

            Iniciando sesión...
          </>
        ) : (
          'Iniciar sesión'
        )}
      </Button>
    </Box>
  );
}