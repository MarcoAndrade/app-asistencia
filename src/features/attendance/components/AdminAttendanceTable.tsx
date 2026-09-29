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

import EditIcon from '@mui/icons-material/Edit';

import type { Attendance } from '../types';
import type { User } from '@/features/users/types';

interface AdminAttendanceTableProps {
  records: Attendance[];
  users: User[];
  onEdit: (record: Attendance) => void;
}

function formatTime(value: string | null): string {
  if (!value) {
    return '--:--';
  }

  return new Date(value).toLocaleTimeString(
    'es-MX',
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  );
}

function getStatusLabel(
  status: Attendance['status'],
): string {
  switch (status) {
    case 'PRESENT':
      return 'Presente';

    case 'ABSENT':
      return 'Ausente';

    case 'JUSTIFIED':
      return 'Justificada';

    case 'INCOMPLETE':
      return 'Incompleta';
  }
}

export function AdminAttendanceTable({
  records,
  users,
  onEdit,
}: AdminAttendanceTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Empleado</TableCell>
            <TableCell>Entrada</TableCell>
            <TableCell>Salida</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Justificación</TableCell>
            <TableCell align="right">
              Acción
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {records.map((record) => {
            const user = users.find(
              (item) =>
                item.id === record.userId,
            );

            return (
              <TableRow key={record.id}>
                <TableCell>
                  {new Date(
                    `${record.date}T00:00:00`,
                  ).toLocaleDateString('es-MX')}
                </TableCell>

                <TableCell>
                  {user?.name ?? 'Usuario desconocido'}
                </TableCell>

                <TableCell>
                  {formatTime(record.checkIn)}
                </TableCell>

                <TableCell>
                  {formatTime(record.checkOut)}
                </TableCell>

                <TableCell>
                  <Chip
                    label={getStatusLabel(
                      record.status,
                    )}
                    size="small"
                    color={
                      record.status === 'PRESENT'
                        ? 'success'
                        : record.status ===
                            'JUSTIFIED'
                          ? 'default'
                          : 'warning'
                    }
                  />
                </TableCell>

                <TableCell>
                  {record.justification ?? '—'}
                </TableCell>

                <TableCell align="right">
                  <Tooltip title="Modificar registro">
                    <IconButton
                      onClick={() =>
                        onEdit(record)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}