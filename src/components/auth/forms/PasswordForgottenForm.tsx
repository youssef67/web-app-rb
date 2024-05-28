import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Container, Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface PasswordForgottenFormInputs {
  email: string;
}

const PasswordForgottenForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PasswordForgottenFormInputs>({
    defaultValues: {
      email: "you.moudni@gmail.com",
    },
  });

  const onSubmit: SubmitHandler<PasswordForgottenFormInputs> = (data) => {
    console.log(data);

    axios
      .post("http://localhost:3333/api/v1/user/forgot-password", data)
      .then((res) => {
        if (res) {
          console.log("email envoyé");
          navigate("/");
          console.log(res);
        } else {
          throw new Error("absence de token");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "L'email est requis",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "L'email n'est pas valide",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Recevoir un email de réinitialisation
        </Button>
      </Box>
    </Container>
  );
};

export default PasswordForgottenForm;
