import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const userSchema = z.object({
  employeeNumber: z
    .string()
    .min(1, 'El número de empleado es obligatorio.'),

  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres.'),

  email: z
    .string()
    .email('Ingresa un correo válido.'),

  department: z
    .string()
    .min(1, 'El departamento es obligatorio.'),

  role: z.enum(['ADMIN', 'USER']),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  onSubmit: (
    data: UserFormData & { active: boolean },
  ) => void;
  onCancel: () => void;
}

export function UserForm({
  onSubmit,
  onCancel,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: 'USER',
    },
  });

  const submit = (data: UserFormData) => {
    onSubmit({
      ...data,
      active: true,
    });
  };

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={handleSubmit(submit)}
    >
      <TextField
        label="Número de empleado"
        {...register('employeeNumber')}
        error={Boolean(errors.employeeNumber)}
        helperText={errors.employeeNumber?.message}
      />

      <TextField
        label="Nombre completo"
        {...register('name')}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
      />

      <TextField
        label="Correo electrónico"
        type="email"
        {...register('email')}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />

      <TextField
        label="Departamento"
        {...register('department')}
        error={Boolean(errors.department)}
        helperText={errors.department?.message}
      />

      <TextField
        select
        label="Rol"
        defaultValue="USER"
        {...register('role')}
      >
        <MenuItem value="USER">
          Empleado
        </MenuItem>

        <MenuItem value="ADMIN">
          Administrador
        </MenuItem>
      </TextField>

      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'flex-end' }}
      >
        <Button
          variant="outlined"
          onClick={onCancel}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
        >
          Registrar empleado
        </Button>
      </Stack>
    </Stack>
  );
}