import { useState } from 'react';

import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';

import {
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

import { useAuth } from '@/features/auth/hooks/useAuth';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarWidth: number;
}

export function Header({
  onMenuClick,
  sidebarWidth,
}: HeaderProps) {
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(
      null,
    );

  const isUserMenuOpen =
    Boolean(anchorEl);

  const handleUserMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setAnchorEl(
      event.currentTarget,
    );
  };

  const handleUserMenuClose =
    () => {
      setAnchorEl(null);
    };

  const handleLogout = () => {
    handleUserMenuClose();
    logout();
  };

  const userInitial =
    user?.name
      ?.charAt(0)
      .toUpperCase() ?? 'U';

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: {
          xs: '100%',

          md: `calc(100% - ${sidebarWidth}px)`,
        },

        ml: {
          xs: 0,

          md: `${sidebarWidth}px`,
        },

        backgroundColor:
          '#fff',

        color:
          'text.primary',

        borderBottom:
          '1px solid',

        borderColor:
          'divider',

        zIndex:
          (theme) =>
            theme.zIndex.drawer +
            1,

        transition:
          (theme) =>
            theme.transitions.create(
              [
                'width',
                'margin-left',
              ],
              {
                duration:
                  theme.transitions
                    .duration.standard,

                easing:
                  theme.transitions
                    .easing.easeInOut,
              },
            ),
      }}
    >
      <Toolbar
        sx={{
          minHeight: {
            xs: 64,
            md: 72,
          },

          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* MOBILE MENU */}
        <IconButton
          onClick={onMenuClick}
          aria-label="Abrir menú"
          sx={{
            display: {
              xs: 'flex',
              md: 'none',
            },

            mr: 1,

            color:
              'text.primary',
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* TITLE */}
        <Box
          sx={{
            flexGrow: 1,

            minWidth: 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,

              fontSize: {
                xs: 18,
                md: 20,
              },

              lineHeight: 1.2,
            }}
          >
            Sistema de asistencia
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
              },
            }}
          >
            Gestión y control de
            asistencia
          </Typography>
        </Box>

        {/* USER AVATAR */}
        <IconButton
          onClick={
            handleUserMenuOpen
          }
          aria-label="Abrir menú de usuario"
          aria-controls={
            isUserMenuOpen
              ? 'user-menu'
              : undefined
          }
          aria-haspopup="true"
          aria-expanded={
            isUserMenuOpen
              ? 'true'
              : undefined
          }
          sx={{
            p: 0.5,
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,

              fontSize: 14,

              fontWeight: 600,

              backgroundColor:
                'rgba(21, 101, 192, 0.1)',

              color:
                'primary.main',
            }}
          >
            {userInitial}
          </Avatar>
        </IconButton>

        {/* USER MENU */}
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={isUserMenuOpen}
          onClose={
            handleUserMenuClose
          }
          anchorOrigin={{
            vertical:
              'bottom',

            horizontal:
              'right',
          }}
          transformOrigin={{
            vertical:
              'top',

            horizontal:
              'right',
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,

                minWidth: 220,

                borderRadius: 2,

                border:
                  '1px solid',

                borderColor:
                  'divider',

                boxShadow:
                  '0 8px 24px rgba(15, 23, 42, 0.08)',
              },
            },
          }}
        >
          {/* USER INFO */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,

                fontWeight: 600,
              }}
            >
              {user?.name ??
                'Usuario'}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                wordBreak:
                  'break-word',
              }}
            >
              {user?.email ?? ''}
            </Typography>
          </Box>

          <Divider />

          {/* PROFILE */}
          <MenuItem
            onClick={
              handleUserMenuClose
            }
            sx={{
              py: 1.25,

              gap: 1.5,
            }}
          >
            <PersonIcon
              fontSize="small"
            />

            <Typography
              fontSize={14}
            >
              Mi perfil
            </Typography>
          </MenuItem>

          {/* LOGOUT */}
          <MenuItem
            onClick={handleLogout}
            sx={{
              py: 1.25,

              gap: 1.5,
            }}
          >
            <LogoutIcon
              fontSize="small"
            />

            <Typography
              fontSize={14}
            >
              Cerrar sesión
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}