import React from "react";
import styles from "./registerForm.module.css";
import { IFormInput } from "./types";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Container, Box, TextField, Button } from "@mui/material";

const RegisterForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: "example@example.com",
      compagnyName: "Default Company",
      siretNumber: "12345678901234",
      password: "12345678",
      confirmPassword: "12345678",
    },
  });

  const password = watch('password');
  // const confirmPassword = watch('confirmPassword');

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await fetch("http://localhost:3333/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        console.log(responseData.message);
      } else {
        console.log(responseData.errors[0].message)
      }
    } catch (error) {
      console.log("An error odddccured ");
    }
  };

  return (
    <Container>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Controller
          name="email"
          control={control}
          defaultValue=""
          // rules={{
          //   required: "Email obligatoire",
          //   pattern: {
          //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          //     message: "L'email renseigné est incorrect",
          //   },
          // }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          )}
        />
        <Controller
          name="compagnyName"
          control={control}
          defaultValue=""
          rules={{ required: "Dénomination sociale est obligatoire" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dénomination Sociale"
              variant="outlined"
              error={!!errors.compagnyName}
              helperText={
                errors.compagnyName ? errors.compagnyName.message : ""
              }
            />
          )}
        />
        <Controller
          name="siretNumber"
          control={control}
          defaultValue=""
          rules={{
            required: "Le Numéro SIRET est obligatoire",
            pattern: {
              value: /^[0-9]{14}$/,
              message: "Le numéro siret est incorrect",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Numéro SIRET"
              variant="outlined"
              error={!!errors.siretNumber}
              helperText={errors.siretNumber ? errors.siretNumber.message : ""}
            />
          )}
        />
        <Controller
          name="password"
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
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
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
              value === password || 'Les mots de passe ne correspondent pas',
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
          Envoyer
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
