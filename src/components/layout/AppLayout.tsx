import { useState } from 'react';

import {
  Box,
  Toolbar,
} from '@mui/material';

import { Outlet } from 'react-router-dom';

import { Header } from './Header';

import {
  Sidebar,
  drawerWidth,
  collapsedDrawerWidth,
} from './Sidebar';

export function AppLayout() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(
      (previousOpen) => !previousOpen,
    );
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const currentDrawerWidth =
    sidebarCollapsed
      ? collapsedDrawerWidth
      : drawerWidth;

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor:
          'background.default',
      }}
    >
      {/* HEADER */}
      <Header
        onMenuClick={handleDrawerToggle}
        sidebarWidth={currentDrawerWidth}
      />

      {/* SIDEBAR */}
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={handleDrawerClose}
        collapsed={sidebarCollapsed}
        onCollapsedChange={
          setSidebarCollapsed
        }
      />

      {/* MAIN */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          minHeight: '100vh',

          backgroundColor:
            'background.default',

          transition: (theme) =>
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
        }}
      >
        {/* ESPACIO DEL HEADER */}
        <Toolbar
          sx={{
            minHeight: {
              xs: 64,
              md: 72,
            },
          }}
        />

        {/* CONTENIDO DE LA PÁGINA */}
        <Box
          sx={{
            width: '100%',

            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            py: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            boxSizing: 'border-box',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}