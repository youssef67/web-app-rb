// /src/components/MyForm/MyForm.tsx
import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Container, Box, Grid, TextField, Button } from '@mui/material';
import { IFormInput } from './types';
import styles from './RegisterForm.module.css';

const RegisterForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Box
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: 'Email obligatoire',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "L'email renseigné est incorrect",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
          )}
        />
        <Controller
          name="compagnyName"
          control={control}
          defaultValue=""
          rules={{ required: 'Dénomination sociale est obligatoire' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dénomination Sociale"
              variant="outlined"
              error={!!errors.compagnyName}
              helperText={errors.compagnyName ? errors.compagnyName.message : ''}
            />
          )}
        />
        <Controller
          name="siretNumber"
          control={control}
          defaultValue=""
          rules={{
            required: 'Le Numéro SIRET est obligatoire',
            pattern: {
              value: /^[0-9]{14}$/,
              message: 'Le numéro siret est incorrect',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Numéro SIRET"
              variant="outlined"
              error={!!errors.siretNumber}
              helperText={errors.siretNumber ? errors.siretNumber.message : ''}
            />
          )}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: 'Le nom est obligatoire' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nom"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="surname"
              control={control}
              defaultValue=""
              rules={{ required: 'Le prenom est obligatoire' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Prénom"
                  variant="outlined"
                  error={!!errors.surname}
                  helperText={errors.surname ? errors.surname.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Envoyer
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
