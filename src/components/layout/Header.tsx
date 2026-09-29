import {
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';

import { drawerWidth } from './Sidebar';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          md: `calc(100% - ${drawerWidth}px)`,
        },
        ml: {
          md: `${drawerWidth}px`,
        },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{
            mr: 2,
            display: {
              md: 'none',
            },
          }}
          aria-label="Abrir menú"
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
          }}
        >
          Sistema de asistencia
        </Typography>

        <IconButton color="inherit" aria-label="Usuario">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}