// /src/components/ResetPasswordForm/ResetPasswordForm.tsx
import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Container, Box, TextField, Button } from '@mui/material';
import styles from './ResetPasswordForm.module.css';

interface ResetPasswordFormInputs {
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>();

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = (data) => {
    console.log(data);
    // Logique pour réinitialiser le mot de passe
  };

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Controller
          name="newPassword"
          control={control}
          defaultValue=""
          rules={{
            required: 'Nouveau mot de passe requis',
            minLength: {
              value: 8,
              message: 'Le mot de passe doit avoir au moins 8 caractères',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="Nouveau Mot de Passe"
              variant="outlined"
              fullWidth
              className={styles.inputField}
              error={!!errors.newPassword}
              helperText={errors.newPassword ? errors.newPassword.message : ''}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: 'Confirmation du mot de passe requise',
            validate: (value) =>
              value === newPassword || 'Les mots de passe ne correspondent pas',
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="Confirmer le Mot de Passe"
              variant="outlined"
              fullWidth
              className={styles.inputField}
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword
                  ? errors.confirmPassword.message
                  : ''
              }
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Réinitialiser le Mot de Passe
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPasswordForm;
