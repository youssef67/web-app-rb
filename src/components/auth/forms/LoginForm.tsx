// /src/components/LoginForm/LoginForm.tsx
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Container, Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { useAuth } from "@hooks/useAuth";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { handleSubmit, control } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "you.moudni@gmail.com",
      password: "youssefmoudni",
    },
  });
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
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        // className={styles.form}
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
              margin="normal"
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
              margin="normal"
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
