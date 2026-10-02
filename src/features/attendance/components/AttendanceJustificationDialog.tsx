import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

import type { Attendance } from '../types';

interface AttendanceJustificationDialogProps {
  open: boolean;
  attendance: Attendance | null;
  onClose: () => void;
  onSave: (
    status: Attendance['status'],
    justification: string,
  ) => void;
}

export function AttendanceJustificationDialog({
  open,
  attendance,
  onClose,
  onSave,
}: AttendanceJustificationDialogProps) {
  const [status, setStatus] = useState<Attendance['status']>(attendance?.status ?? 'JUSTIFIED');

  const [justification, setJustification] = useState(attendance?.justification ?? '');

  const handleSave = () => {
    onSave(status, justification);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Modificar asistencia
      </DialogTitle>

      <DialogContent>
        <Stack
          spacing={2}
          sx={{ pt: 1 }}
        >
          <TextField
            select
            label="Estado"
            value={status}
            onChange={(event) =>
              setStatus(
                event.target
                  .value as Attendance['status'],
              )
            }
          >
            <MenuItem value="PRESENT">
              Presente
            </MenuItem>

            <MenuItem value="ABSENT">
              Ausente
            </MenuItem>

            <MenuItem value="JUSTIFIED">
              Justificada
            </MenuItem>

            <MenuItem value="INCOMPLETE">
              Incompleta
            </MenuItem>
          </TextField>

          <TextField
            label="Justificación"
            multiline
            rows={4}
            value={justification}
            onChange={(event) =>
              setJustification(event.target.value)
            }
            placeholder="Describe el motivo de la modificación..."
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}