import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNotification } from "@contexts/NotificationContext";
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
  const { setNotification } = useNotification();
  const { handleSubmit, control, formState: { errors } } = useForm<LoginFormInputs>({
    defaultValues: { email: "you.moudni+user-1@gmail.com", password: "12345678" },
  });

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
          setNotification({ message: "Impossible de s'inscrire", variant: "error" });
        }
      })
      .catch(() => {
        setNotification({ message: "Impossible de s'inscrire", variant: "error" });
      });
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
            error={!!errors.email}
            helperText={errors.email ? 'Format d\'email invalide' : ' '}
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
            helperText={errors.password ? 'Le mot de passe doit contenir entre 8 et 64 caractères' : ' '}
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
