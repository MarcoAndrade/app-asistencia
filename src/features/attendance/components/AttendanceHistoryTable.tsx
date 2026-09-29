import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import type { Attendance } from '../types';

interface AttendanceHistoryTableProps {
  records: Attendance[];
}

function formatTime(value: string | null): string {
  if (!value) {
    return '--:--';
  }

  return new Date(value).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getStatusLabel(status: Attendance['status']): string {
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

function getStatusColor(
  status: Attendance['status'],
): 'success' | 'error' | 'warning' | 'default' {
  switch (status) {
    case 'PRESENT':
      return 'success';

    case 'ABSENT':
      return 'error';

    case 'JUSTIFIED':
      return 'default';

    case 'INCOMPLETE':
      return 'warning';
  }
}

export function AttendanceHistoryTable({
  records,
}: AttendanceHistoryTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Entrada</TableCell>
            <TableCell>Salida</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>
                {new Date(
                  `${record.date}T00:00:00`,
                ).toLocaleDateString('es-MX')}
              </TableCell>

              <TableCell>
                {formatTime(record.checkIn)}
              </TableCell>

              <TableCell>
                {formatTime(record.checkOut)}
              </TableCell>

              <TableCell>
                <Chip
                  label={getStatusLabel(record.status)}
                  color={getStatusColor(record.status)}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}