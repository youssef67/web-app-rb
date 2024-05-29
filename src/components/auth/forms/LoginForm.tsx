import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Grid, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors } } = useForm<LoginFormInputs>();

  const handlePasswordForgotten = () => {
    navigate("/password-forgotten");
  };

  const { login } = useAuth();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    axios
      .post("http://localhost:3333/api/v1/auth/login", data)
      .then((res) => {
        if (res.data.token) {
          login({
            id: res.data.id,
            email: res.data.email,
            token: res.data.token,
          });
        } else {
          throw new Error("absence de token");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      // className={styles.form}
    >
      <Controller
        name="email"
        control={control}
        rules={{ required: true, pattern: /^\S+@\S+$/i }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="filled"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email ? 'Format d\'email invalide' : ''}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true, minLength: 8, maxLength: 64 }} // Validation du mot de passe
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            label="Mot de passe"
            variant="filled"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password ? 'Le mot de passe doit contenir entre 8 et 64 caractères' : ''}
          />
        )}
      />
      <Grid
        container
        direction="column"
        justifyContent="right"
        textAlign="right"
      >
        <Box my={3}>
          <span onClick={handlePasswordForgotten} style={{ cursor: "pointer", color: "#ed2025" }}>
            Mot de passe oublié
          </span>{" "}
        </Box>
          <Button type="submit" variant="contained" color="primary" style={{marginBottom: '50px', background: "#ed2025"}}>
            Se connecter
          </Button>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
