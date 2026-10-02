import {
  AccessTime as AccessTimeIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  FactCheck as FactCheckIcon,
  People as PeopleIcon,
  SettingsOutlined as SettingsOutlinedIcon,
} from '@mui/icons-material';

import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';

import { NavLink } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks/useAuth';

export const drawerWidth = 248;
export const collapsedDrawerWidth = 72;

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    label: 'Asistencias',
    path: '/attendance',
    icon: <AccessTimeIcon />,
  },
];

const adminNavigationItems: NavigationItem[] = [
  {
    label: 'Empleados',
    path: '/users',
    icon: <PeopleIcon />,
  },
  {
    label: 'Control de asistencia',
    path: '/attendance/admin',
    icon: <FactCheckIcon />,
  },
];

export function Sidebar({
  mobileOpen,
  onClose,
  collapsed,
  onCollapsedChange,
}: SidebarProps) {
  const { user } = useAuth();

  const desktopWidth = collapsed
    ? collapsedDrawerWidth
    : drawerWidth;

  const renderNavigationItem = (
    item: NavigationItem,
    isMobile = false,
  ) => {
    const collapsedMode = collapsed && !isMobile;

    const content = (
      <ListItemButton
        component={NavLink}
        to={item.path}
        onClick={isMobile ? onClose : undefined}
        sx={{
          position: 'relative',

          minHeight: 44,

          mx: 1,
          mb: 0.5,

          px: collapsedMode ? 1.5 : 1.5,

          borderRadius: 1.5,

          justifyContent: collapsedMode
            ? 'center'
            : 'flex-start',

          color: 'text.secondary',

          transition: (theme) =>
            theme.transitions.create(
              [
                'background-color',
                'color',
                'padding',
              ],
              {
                duration:
                  theme.transitions.duration.short,
              },
            ),

          '&:hover': {
            backgroundColor:
              'rgba(21, 101, 192, 0.05)',
            color: 'text.primary',
          },

          '&.active': {
            backgroundColor:
              'rgba(21, 101, 192, 0.08)',

            color: 'primary.main',

            fontWeight: 600,

            '&::before': {
              content: '""',

              position: 'absolute',

              left: 0,
              top: 8,
              bottom: 8,

              width: 3,

              borderRadius:
                '0 4px 4px 0',

              backgroundColor:
                'primary.main',
            },

            '& .MuiListItemIcon-root': {
              color: 'primary.main',
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: collapsedMode
              ? 'auto'
              : 40,

            color: 'inherit',

            justifyContent: 'center',
          }}
        >
          {item.icon}
        </ListItemIcon>

        {!collapsedMode && (
          <ListItemText
            primary={item.label}
            slotProps={{
              primary: {
                noWrap: true,
                sx: { fontSize: 14, fontWeight: 'inherit' },
              }
            }}
          />
        )}
      </ListItemButton>
    );

    if (collapsedMode) {
      return (
        <Tooltip
          key={item.path}
          title={item.label}
          placement="right"
          arrow
        >
          {content}
        </Tooltip>
      );
    }

    return (
      <Box key={item.path}>
        {content}
      </Box>
    );
  };

  const sidebarContent = (
    isMobile = false,
  ) => {
    const collapsedMode =
      collapsed && !isMobile;

    return (
      <Box
        sx={{
          height: '100%',

          display: 'flex',

          flexDirection: 'column',

          overflow: 'hidden',
        }}
      >
        {/* BRAND */}
        <Box
          sx={{
            height: 72,

            display: 'flex',

            alignItems: 'center',

            px: collapsedMode ? 1.5 : 2,

            justifyContent:
              collapsedMode
                ? 'center'
                : 'flex-start',

            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,

              borderRadius: 1.5,

              backgroundColor:
                'primary.main',

              color: '#fff',

              display: 'flex',

              alignItems: 'center',
              justifyContent: 'center',

              fontSize: 20,

              fontWeight: 700,

              flexShrink: 0,
            }}
          >
            ✓
          </Box>

          {!collapsedMode && (
            <Box
              sx={{
                ml: 1.5,

                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: 15,

                  fontWeight: 700,

                  lineHeight: 1.2,

                  color: 'text.primary',
                }}
              >
                Asistencia
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color:
                    'text.secondary',

                  fontSize: 11,
                }}
              >
                Gestión laboral
              </Typography>
            </Box>
          )}
        </Box>

        <Divider />

        {/* NAVIGATION */}
        <Box
          sx={{
            flex: 1,

            overflowY: 'auto',

            overflowX: 'hidden',

            py: 2,
          }}
        >
          {/* PRINCIPAL */}
          {!collapsedMode && (
            <Typography
              sx={{
                px: 2.5,

                mb: 1,

                fontSize: 10,

                fontWeight: 700,

                letterSpacing: 0.8,

                color:
                  'text.secondary',

                textTransform:
                  'uppercase',
              }}
            >
              Principal
            </Typography>
          )}

          <List disablePadding>
            {navigationItems.map(
              (item) =>
                renderNavigationItem(
                  item,
                  isMobile,
                ),
            )}
          </List>

          {/* ADMINISTRACIÓN */}
          {user?.role === 'ADMIN' && (
            <>
              {!collapsedMode && (
                <Typography
                  sx={{
                    px: 2.5,

                    mt: 3,

                    mb: 1,

                    fontSize: 10,

                    fontWeight: 700,

                    letterSpacing: 0.8,

                    color:
                      'text.secondary',

                    textTransform:
                      'uppercase',
                  }}
                >
                  Administración
                </Typography>
              )}

              <List disablePadding>
                {adminNavigationItems.map(
                  (item) =>
                    renderNavigationItem(
                      item,
                      isMobile,
                    ),
                )}
              </List>
            </>
          )}

          {/* CONFIGURACIÓN */}
          {!collapsedMode ? (
            <ListItemButton
              sx={{
                minHeight: 44,

                mx: 1,

                mt: 3,

                px: 1.5,

                borderRadius: 1.5,

                color:
                  'text.secondary',

                '&:hover': {
                  backgroundColor:
                    'rgba(21, 101, 192, 0.05)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,

                  color: 'inherit',
                }}
              >
                <SettingsOutlinedIcon />
              </ListItemIcon>

              <ListItemText
                primary="Configuración"
                slotProps={{
                  primary: {
                    sx: { fontSize: 14 }
                  }
                }}
              />
            </ListItemButton>
          ) : (
            <Tooltip
              title="Configuración"
              placement="right"
              arrow
            >
              <ListItemButton
                sx={{
                  minHeight: 44,

                  mx: 1,

                  mt: 3,

                  px: 1.5,

                  borderRadius: 1.5,

                  justifyContent:
                    'center',

                  color:
                    'text.secondary',

                  '&:hover': {
                    backgroundColor:
                      'rgba(21, 101, 192, 0.05)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 'auto',

                    color: 'inherit',
                  }}
                >
                  <SettingsOutlinedIcon />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          )}
        </Box>

        {/* USER */}
        <Box
          sx={{
            borderTop:
              '1px solid',

            borderColor:
              'divider',

            p: collapsedMode
              ? 1
              : 1.5,

            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: 'flex',

              alignItems:
                'center',

              justifyContent:
                collapsedMode
                  ? 'center'
                  : 'flex-start',

              minWidth: 0,
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,

                flexShrink: 0,

                fontSize: 14,

                fontWeight: 600,

                backgroundColor:
                  'rgba(21, 101, 192, 0.1)',

                color:
                  'primary.main',
              }}
            >
              {user?.name
                ?.charAt(0)
                .toUpperCase() ?? 'U'}
            </Avatar>

            {!collapsedMode && (
              <Box
                sx={{
                  ml: 1.25,

                  minWidth: 0,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 13,

                    fontWeight: 600,

                    color:
                      'text.primary',

                    overflow:
                      'hidden',

                    textOverflow:
                      'ellipsis',

                    whiteSpace:
                      'nowrap',
                  }}
                >
                  {user?.name ??
                    'Usuario'}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 11,

                    color:
                      'text.secondary',
                  }}
                >
                  {user?.role ===
                    'ADMIN'
                    ? 'Administrador'
                    : 'Empleado'}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <>
      {/* DESKTOP */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },

          width: desktopWidth,

          flexShrink: 0,

          transition:
            (theme) =>
              theme.transitions.create(
                'width',
                {
                  duration:
                    theme.transitions
                      .duration.standard,

                  easing:
                    theme.transitions
                      .easing.easeInOut,
                },
              ),

          '& .MuiDrawer-paper': {
            width: desktopWidth,

            boxSizing:
              'border-box',

            borderRight:
              '1px solid',

            borderColor:
              'divider',

            backgroundColor:
              '#fff',

            overflow:
              'visible',

            transition:
              (theme) =>
                theme.transitions.create(
                  'width',
                  {
                    duration:
                      theme.transitions
                        .duration.standard,

                    easing:
                      theme.transitions
                        .easing.easeInOut,
                  },
                ),
          },
        }}
      >
        {sidebarContent(false)}

        {/* COLLAPSE BUTTON */}
        <IconButton
          onClick={() =>
            onCollapsedChange(!collapsed)
          }
          aria-label={
            collapsed
              ? 'Expandir menú'
              : 'Contraer menú'
          }
          sx={{
            position: 'absolute',

            /*
             * El Header mide 72px en desktop,
             * por eso colocamos la flecha
             * justo debajo de él.
             */
            top: 84,

            right: -14,

            width: 28,
            height: 28,

            backgroundColor: '#fff',

            border: '1px solid',
            borderColor: 'divider',

            boxShadow:
              '0 1px 4px rgba(15, 23, 42, 0.12)',

            zIndex: (theme) =>
              theme.zIndex.appBar + 2,

            '&:hover': {
              backgroundColor: '#f8fafc',
            },
          }}
        >
          {collapsed ? (
            <ChevronRightIcon
              sx={{
                fontSize: 18,
              }}
            />
          ) : (
            <ChevronLeftIcon
              sx={{
                fontSize: 18,
              }}
            />
          )}
        </IconButton>
      </Drawer>

      {/* MOBILE */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },

          '& .MuiDrawer-paper': {
            width: drawerWidth,

            boxSizing:
              'border-box',

            backgroundColor:
              '#fff',

            borderRight:
              '1px solid',

            borderColor:
              'divider',
          },
        }}
      >
        {sidebarContent(true)}
      </Drawer>
    </>
  );
}