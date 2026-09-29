import { useAuth } from '@/features/auth/hooks/useAuth';
import {
  AccessTime as AccessTimeIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  CalendarMonth as CalendarMonthIcon,
  FactCheck as FactCheckIcon
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
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
  {
    label: 'Historial Asistencias',
    path: '/attendance/history',
    icon: <CalendarMonthIcon />,
  }
];

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  
  const drawerContent = (
    <Box>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          App Asistencia
        </Typography>
      </Toolbar>

      <Divider />

      <List>
        {navigationItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            onClick={onClose}
            sx={{
              '&.active': {
                backgroundColor: 'action.selected',
                color: 'primary.main',

                '& .MuiListItemIcon-root': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>

            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}

        {user?.role === 'ADMIN' && (
          <>
            <ListItemButton
              component={NavLink}
              to="/users"
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>

              <ListItemText primary="Empleados" />
            </ListItemButton>

            <ListItemButton
              component={NavLink}
              to="/attendance/admin"
            >
              <ListItemIcon>
                <FactCheckIcon />
              </ListItemIcon>

              <ListItemText
                primary="Control de asistencia"
              />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },

          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },

          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export { drawerWidth };