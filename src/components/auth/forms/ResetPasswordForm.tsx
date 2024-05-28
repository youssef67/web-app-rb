import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useQuery } from "../../../hooks/useQuery";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Box, TextField, Button } from '@mui/material';

interface ResetPasswordFormInputs {
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  const token = useQuery().get("token");

  console.log('token ', token)

  const { handleSubmit, control, watch, formState: { errors } } = useForm<ResetPasswordFormInputs>(
    {
      defaultValues: {
        newPassword: "drusslalegende",
        confirmPassword: "drusslalegende",
      },
    }
  );
  const newPassword = watch('newPassword');

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = (data) => {
    console.log(token);
    console.log(data);

    axios
      .post(`http://localhost:3333/api/v1/user/reset-password?token=${token}`, {
        newPassword: data.newPassword,
      })
      .then((res) => {
        if (res) {
          console.log("reset password success");
          navigate("/");
        } else {
          throw new Error("absence de token");
        }
      })
      .catch((error) => console.log(error));
    // Envoyer une demande de réinitialisation du mot de passe
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="newPassword"
          control={control}
          defaultValue=""
          rules={{
            required: 'Le nouveau mot de passe est requis',
            minLength: {
              value: 8,
              message: 'Le mot de passe doit contenir au moins 8 caractères'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nouveau mot de passe"
              type="password"
              variant="outlined"
              fullWidth
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
            required: 'La confirmation du mot de passe est requise',
            validate: value =>
              value === newPassword || 'Les mots de passe ne correspondent pas'
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Confirmer le mot de passe"
              type="password"
              variant="outlined"
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Réinitialiser le mot de passe
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPasswordForm;
