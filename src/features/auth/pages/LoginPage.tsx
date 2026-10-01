import {
  Box,
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
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        p: { xs: 1.5, sm: 3, md: 5 },

        backgroundColor: 'background.default',

        backgroundImage: `
          radial-gradient(
            circle at 10% 15%,
            rgba(21, 101, 192, 0.10),
            transparent 28%
          ),
          radial-gradient(
            circle at 90% 85%,
            rgba(69, 90, 100, 0.08),
            transparent 28%
          )
        `,
      }}
    >
      {/* VENTANA PRINCIPAL */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1050,
          minHeight: { xs: 'auto', md: 620 },

          display: 'flex',
          overflow: 'hidden',

          borderRadius: {
            xs: '24px',
            sm: '28px',
            md: '32px',
          },

          backgroundColor: '#ffffff',

          boxShadow: `
            0 35px 80px rgba(15, 23, 42, 0.14),
            0 8px 25px rgba(15, 23, 42, 0.06)
          `,
        }}
      >
        {/* =========================================
            PANEL IZQUIERDO
        ========================================= */}
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },

            position: 'relative',
            width: '50%',
            overflow: 'hidden',

            flexDirection: 'column',
            justifyContent: 'space-between',

            p: {
              md: 6,
              lg: 7,
            },

            color: '#ffffff',

            background: `
              radial-gradient(
                circle at 80% 15%,
                rgba(66, 165, 245, 0.28),
                transparent 27%
              ),
              radial-gradient(
                circle at 15% 85%,
                rgba(21, 101, 192, 0.35),
                transparent 32%
              ),
              linear-gradient(
                145deg,
                #0d2f57 0%,
                #124b87 50%,
                #1565c0 100%
              )
            `,
          }}
        >
          {/* Decoración superior */}
          <Box
            sx={{
              position: 'absolute',
              width: 500,
              height: 500,
              borderRadius: '50%',

              border:
                '1px solid rgba(255,255,255,0.08)',

              top: -250,
              right: -220,
            }}
          />

          {/* Decoración inferior */}
          <Box
            sx={{
              position: 'absolute',
              width: 300,
              height: 300,
              borderRadius: '50%',

              border:
                '1px solid rgba(255,255,255,0.07)',

              bottom: -150,
              left: -150,
            }}
          />

          {/* Glow azul */}
          <Box
            sx={{
              position: 'absolute',

              width: 220,
              height: 220,

              borderRadius: '50%',

              background:
                'rgba(66, 165, 245, 0.20)',

              filter: 'blur(80px)',

              top: '40%',
              left: '35%',
            }}
          />

          {/* Logo / nombre */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,

              display: 'flex',
              alignItems: 'center',

              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                borderRadius: '13px',

                backgroundColor:
                  'rgba(255,255,255,0.14)',

                border:
                  '1px solid rgba(255,255,255,0.16)',

                backdropFilter: 'blur(10px)',

                fontSize: 22,
                fontWeight: 800,

                boxShadow:
                  '0 12px 30px rgba(0,0,0,0.15)',
              }}
            >
              CA
            </Box>

            <Typography
              sx={{
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              Control de asistencia
            </Typography>
          </Box>

          {/* Mensaje principal */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              maxWidth: 400,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  md: '2.8rem',
                  lg: '3.4rem',
                },

                lineHeight: 1.04,

                fontWeight: 750,

                letterSpacing: '-0.055em',

                mb: 2.5,
              }}
            >
              Todo bajo
              <br />

              <Box
                component="span"
                sx={{
                  color: '#90caf9',
                }}
              >
                control.
              </Box>
            </Typography>

            <Typography
              sx={{
                maxWidth: 350,

                color:
                  'rgba(255,255,255,0.68)',

                fontSize: 14,

                lineHeight: 1.75,
              }}
            >
              Gestiona la asistencia de forma
              sencilla, rápida y segura desde
              cualquier lugar.
            </Typography>

            {/* Indicadores */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',

                gap: 1,

                mt: 4,
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 5,

                  borderRadius: 10,

                  backgroundColor: '#90caf9',
                }}
              />

              <Box
                sx={{
                  width: 8,
                  height: 5,

                  borderRadius: 10,

                  backgroundColor:
                    'rgba(255,255,255,0.25)',
                }}
              />

              <Box
                sx={{
                  width: 8,
                  height: 5,

                  borderRadius: 10,

                  backgroundColor:
                    'rgba(255,255,255,0.15)',
                }}
              />
            </Box>
          </Box>

          {/* Footer */}
          <Typography
            sx={{
              position: 'relative',
              zIndex: 2,

              fontSize: 10,

              color:
                'rgba(255,255,255,0.40)',

              letterSpacing: '0.12em',

              textTransform: 'uppercase',
            }}
          >
            Simple · Seguro · Intuitivo
          </Typography>
        </Box>

        {/* =========================================
            PANEL DERECHO
        ========================================= */}
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '50%',
            },

            display: 'flex',
            alignItems: 'center',

            backgroundColor: '#ffffff',

            p: {
              xs: 3,
              sm: 5,
              md: 6,
              lg: 7,
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 380,
              mx: 'auto',
            }}
          >
            {/* Logo móvil */}
            <Box
              sx={{
                display: {
                  xs: 'flex',
                  md: 'none',
                },

                justifyContent: 'center',

                mb: 5,
              }}
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  borderRadius: '14px',

                  color: '#ffffff',

                  fontSize: 22,
                  fontWeight: 800,

                  backgroundColor:
                    'primary.main',

                  boxShadow:
                    '0 12px 28px rgba(21,101,192,0.25)',
                }}
              >
                +
              </Box>
            </Box>

            {/* Encabezado */}
            <Box sx={{ mb: 4 }}>
              <Typography
                component="h1"
                sx={{
                  color: 'text.primary',

                  fontSize: {
                    xs: '2rem',
                    sm: '2.3rem',
                  },

                  lineHeight: 1.05,

                  fontWeight: 750,

                  letterSpacing: '-0.05em',

                  mb: 1.5,
                }}
              >
                Bienvenido
              </Typography>

              <Typography
                sx={{
                  color: 'text.secondary',

                  fontSize: 14,

                  lineHeight: 1.6,
                }}
              >
                Inicia sesión para continuar.
              </Typography>
            </Box>

            <LoginForm />

            {/* Estado */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                gap: 1,

                mt: 4,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,

                  borderRadius: '50%',

                  backgroundColor: '#4caf50',
                }}
              />

              <Typography
                sx={{
                  color: 'text.secondary',

                  fontSize: 11,
                }}
              >
                Acceso seguro
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}