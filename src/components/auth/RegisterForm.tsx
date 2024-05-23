import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Container, Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface IFormInput {
  email: string
  compagny_name: string
  siret_number: string
  password: string
  confirm_password: string
}

const RegisterForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: "youssef@gmail.com",
      compagny_name: "Default Company",
      siret_number: "12345678901234",
      password: "youssefmoudni",
      confirm_password: "youssefmoudni",
    },
  });

  const navigate = useNavigate()

  const handleMoveToLoginPage = () => {
    navigate("/")
  }
  const password = watch('password');
  // const confirm_password = watch('confirm_password');

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    axios
      .post("http://localhost:3333/api/register", data)
      .then((res) => {
        if (res.status === 201) {
          navigate('/')
        } else {
          throw new Error("erreur survenu");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email obligatoire",
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
              helperText={errors.email ? errors.email.message : ""}
              margin="normal"
            />
          )}
        />
        <Controller
          name="compagny_name"
          control={control}
          defaultValue=""
          rules={{ required: "Dénomination sociale est obligatoire" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dénomination Sociale"
              variant="outlined"
              error={!!errors.compagny_name}
              helperText={
                errors.compagny_name ? errors.compagny_name.message : ""
              }
              margin="normal"
            />
          )}
        />
        <Controller
          name="siret_number"
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
              error={!!errors.siret_number}
              helperText={errors.siret_number ? errors.siret_number.message : ""}
              margin="normal"
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
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              margin="normal"
            />
          )}
        />
        <Controller
          name="confirm_password"
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
              error={!!errors.confirm_password}
              helperText={
                errors.confirm_password
                  ? errors.confirm_password.message
                  : ''
              }
              margin="normal"
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Envoyer
        </Button>
      </Box>
      <button onClick={handleMoveToLoginPage}>Page login</button>
    </Container>
  );
};

export default RegisterForm;
