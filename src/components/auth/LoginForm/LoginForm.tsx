// /src/components/LoginForm/LoginForm.tsx
import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Container, Box, TextField, Button } from '@mui/material';
import styles from './LoginForm.module.css';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { handleSubmit, control } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              className={styles.inputField}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="Mot de passe"
              variant="outlined"
              fullWidth
              className={styles.inputField}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Se connecter
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
