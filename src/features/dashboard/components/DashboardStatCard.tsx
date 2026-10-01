import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';

interface DashboardStatCardProps {
  title: string;
  value: number;
  description: string;
  percentage?: number;
  icon: React.ReactNode;
  accent: string;
  delay?: number;
}

function useCountUp(
  target: number,
  duration = 900,
  delay = 0,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;

    const timeout = window.setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startTime === null) {
          startTime = timestamp;
        }

        const elapsed =
          timestamp - startTime;

        const progress = Math.min(
          elapsed / duration,
          1,
        );

        // Ease-out cubic
        const eased =
          1 -
          Math.pow(
            1 - progress,
            3,
          );

        setValue(
          Math.round(
            target * eased,
          ),
        );

        if (progress < 1) {
          animationFrame =
            requestAnimationFrame(
              animate,
            );
        }
      };

      animationFrame =
        requestAnimationFrame(
          animate,
        );
    }, delay);

    return () => {
      window.clearTimeout(timeout);

      if (animationFrame) {
        cancelAnimationFrame(
          animationFrame,
        );
      }
    };
  }, [target, duration, delay]);

  return value;
}

export function DashboardStatCard({
  title,
  value,
  description,
  percentage,
  icon,
  accent,
  delay = 0,
}: DashboardStatCardProps) {
  const animatedValue =
    useCountUp(
      value,
      900,
      delay,
    );

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',

        border: '1px solid',
        borderColor: '#e5e7eb',

        boxShadow:
          '0 1px 2px rgba(15, 23, 42, 0.02)',

        opacity: 0,

        animation:
          'dashboardCardIn 550ms cubic-bezier(0.22, 1, 0.36, 1) forwards',

        animationDelay: `${delay}ms`,

        transition:
          'transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease',

        '&:hover': {
          transform:
            'translateY(-4px)',

          borderColor:
            '#d1d5db',

          boxShadow:
            '0 12px 30px rgba(15, 23, 42, 0.08)',

          '& .stat-icon': {
            transform:
              'scale(1.08) rotate(-4deg)',
          },

          '& .stat-accent': {
            transform:
              'scaleX(1)',
          },
        },

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 3,
          height: '100%',
          backgroundColor: accent,
        },

        '@keyframes dashboardCardIn': {
          from: {
            opacity: 0,
            transform:
              'translateY(16px)',
          },

          to: {
            opacity: 1,
            transform:
              'translateY(0)',
          },
        },
      }}
    >
      <CardContent
        sx={{
          p: 2.5,

          '&:last-child': {
            pb: 2.5,
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                mb: 1,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: 30,
                  md: 34,
                },

                lineHeight: 1,

                fontWeight: 700,

                letterSpacing:
                  '-0.045em',

                color: '#111827',
              }}
            >
              {animatedValue}
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                mt: 1.5,
              }}
            >
              {percentage !==
                undefined && (
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 0.75,
                      py: 0.25,

                      borderRadius: 1,

                      backgroundColor:
                        `${accent}12`,

                      color: accent,

                      fontSize: 11,

                      fontWeight: 700,
                    }}
                  >
                    {percentage}%
                  </Box>
                )}

              <Typography
                variant="caption"
                color="text.secondary"
                noWrap
              >
                {description}
              </Typography>
            </Stack>
          </Box>

          <Box
            className="stat-icon"
            sx={{
              width: 44,
              height: 44,

              flexShrink: 0,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              borderRadius: 2,

              backgroundColor:
                `${accent}12`,

              color: accent,

              transition:
                'transform 220ms ease',

              '& svg': {
                fontSize: 22,
              },
            }}
          >
            {icon}
          </Box>
        </Stack>

        {/* Línea decorativa */}
        <Box
          sx={{
            height: 2,
            mt: 2.5,

            borderRadius: 10,

            backgroundColor:
              '#f1f5f9',

            overflow: 'hidden',
          }}
        >
          <Box
            className="stat-accent"
            sx={{
              height: '100%',
              width:
                percentage !== undefined
                  ? `${Math.min(
                    percentage,
                    100,
                  )}%`
                  : '45%',

              backgroundColor:
                accent,

              transformOrigin:
                'left',

              transform:
                'scaleX(0)',

              animation:
                'statProgress 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards',

              animationDelay:
                `${delay + 300}ms`,

              '@keyframes statProgress':
              {
                from: {
                  transform:
                    'scaleX(0)',
                },

                to: {
                  transform:
                    'scaleX(1)',
                },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}