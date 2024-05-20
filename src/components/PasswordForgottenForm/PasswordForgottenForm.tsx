// /src/components/ResetPasswordForm/ResetPasswordForm.tsx
import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Container, Box, TextField, Button } from '@mui/material';
import styles from './PasswordForgottenForm.module.css';

interface PasswordForgottenFormInputs {
  siretNumber: string;
}

const PasswordForgottenForm: React.FC = () => {
  const { handleSubmit, control } = useForm<PasswordForgottenFormInputs>();

  const onSubmit: SubmitHandler<PasswordForgottenFormInputs> = (data) => {
    console.log(data);
    // Envoyer une demande de réinitialisation du mot de passe avec le numéro de SIRET
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Controller
          name="siretNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Numéro SIRET"
              variant="outlined"
              fullWidth
              className={styles.inputField}
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

export default PasswordForgottenForm;
