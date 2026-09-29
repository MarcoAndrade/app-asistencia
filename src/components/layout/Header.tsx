import { useState } from 'react';

import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';

import { AccountCircle as AccountCircleIcon, Menu as MenuIcon } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

import { useAuth } from '@/features/auth/hooks/useAuth';

import { drawerWidth } from './Sidebar';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isUserMenuOpen = Boolean(anchorEl);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    logout();
  };

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

        <IconButton
          id="user-menu-button"
          color="inherit"
          aria-label="Usuario"
          onClick={handleUserMenuOpen}
          aria-controls={ isUserMenuOpen ? 'user-menu' : undefined }
          aria-haspopup="true"
          aria-expanded={ isUserMenuOpen ? 'true' : undefined }
        >
          <AccountCircleIcon />
        </IconButton>

        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={isUserMenuOpen}
          onClose={handleUserMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{
            list: { 'aria-labelledby': 'user-menu-button' },
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              minWidth: 220,
            }}
          >
            <Typography variant="subtitle2">
              {user?.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
            >
              {user?.email}
            </Typography>
          </Box>

          <Divider />

          <MenuItem onClick={handleUserMenuClose}>
            <PersonIcon
              fontSize="small"
              sx={{ mr: 1.5 }}
            />
            Mi perfil
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <LogoutIcon
              fontSize="small"
              sx={{ mr: 1.5 }}
            />
            Cerrar sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}