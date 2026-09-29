import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';

import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import type { User } from '../types';

interface UsersTableProps {
  users: User[];
  onToggleActive: (user: User) => void;
}

export function UsersTable({
  users,
  onToggleActive,
}: UsersTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Empleado</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Departamento</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">
              Acción
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {user.employeeNumber}
              </TableCell>

              <TableCell>{user.name}</TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>{user.department}</TableCell>

              <TableCell>
                <Chip
                  label={
                    user.role === 'ADMIN'
                      ? 'Administrador'
                      : 'Empleado'
                  }
                  size="small"
                />
              </TableCell>

              <TableCell>
                <Chip
                  label={
                    user.active
                      ? 'Activo'
                      : 'Inactivo'
                  }
                  color={
                    user.active
                      ? 'success'
                      : 'default'
                  }
                  size="small"
                />
              </TableCell>

              <TableCell align="right">
                <Tooltip
                  title={
                    user.active
                      ? 'Desactivar empleado'
                      : 'Activar empleado'
                  }
                >
                  <IconButton
                    onClick={() =>
                      onToggleActive(user)
                    }
                  >
                    {user.active ? (
                      <BlockIcon />
                    ) : (
                      <CheckCircleIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}