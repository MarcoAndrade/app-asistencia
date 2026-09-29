import {
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

import type { ReactNode } from 'react';

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
}

export function DashboardStatCard({
  title,
  value,
  description,
  icon,
}: DashboardStatCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={1}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {title}
            </Typography>

            {icon}
          </Stack>

          <Typography variant="h4">
            {value}
          </Typography>

          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {description}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}