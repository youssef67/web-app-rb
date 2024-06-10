import React from "react";
import { useNotification } from "@contexts/NotificationContext";
import { useHeader } from "@hooks/useHeader";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Grid, TextField, Button } from "@mui/material";
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';

import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  amount: number;
  pickupDate: string;
}

const CreateOrderForm: React.FC = () => {
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const currentUser = useCurrentUser();
  const headers = useHeader();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      name: "youssef",
      lastname: "moudni",
      email: "you.moudni@gmail.com",
      phone: "0668735937",
      amount: 20,
      pickupDate: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    axios
      .post(
        "http://localhost:3333/api/v1/order/add",
        { ...data, ...currentUser },
        { headers }
      )
      .then((res) => {
        if (res.status === 201) {
          setNotification({
            message: "Commande enregistré avec succès",
            variant: "success",
          });
        } else {
          setNotification({
            message: "Une erreur est survenu",
            variant: "error",
          });
        }
      })
      .catch(() => {
        setNotification({
          message: "Une erreur est survenu",
          variant: "error",
        });
      })
      .finally(() => {
        navigate("/orders-of-day");
      });
  };

  return (
    <Grid container component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: "Le nom est obligatoire" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="nom"
            variant="filled"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : " "}
          />
        )}
      />
      <Controller
        name="lastname"
        control={control}
        rules={{ required: "Le prénom est obligatoire" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="prénom"
            variant="filled"
            fullWidth
            margin="normal"
            error={!!errors.lastname}
            helperText={errors.lastname ? errors.lastname.message : " "}
          />
        )}
      />
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
            helperText={errors.email ? "Format d'email invalide" : " "}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        rules={{
          required: "Le numéro de téléphone est obligatoire",
          pattern: {
            value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
            message: "Le numéro de téléphone est incorrect",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="numéro de téléphone"
            variant="filled"
            fullWidth
            margin="normal"
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : " "}
          />
        )}
      />
      <Controller
        name="amount"
        control={control}
        rules={{
          required: "Montant de la commande requis",
          validate: {
            positiveNumber: (value) => {
              const floatValue = parseFloat(String(value));
              if (!floatValue || isNaN(floatValue) || floatValue <= 0) {
                return "Veuillez entrer un montant valide et supérieur à zéro";
              }
              return true;
            },
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label="Montant de la commande"
            variant="filled"
            fullWidth
            error={!!errors.amount}
            helperText={errors.amount ? errors.amount.message : " "}
            margin="normal"
          />
        )}
      />
      <Controller
        name="pickupDate"
        control={control}
        rules={{
          required: "Date de commande requise",
          validate: {
            futureDate: (value) => {
              const selectedDate = new Date(value);
              const currentDate = new Date();
              currentDate.setHours(0, 0, 0, 0);
              if (!value || selectedDate < currentDate) {
                return "Veuillez sélectionner une date future pour la commande";
              }
              return true;
            },
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="date"
            label="Date de commande"
            variant="filled"
            fullWidth
            error={!!errors.pickupDate}
            helperText={errors.pickupDate ? errors.pickupDate.message : " "}
            margin="normal"
          />
        )}
      />
      <Grid container direction="column" alignItems={"center"} my={10}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginBottom: "50px", background: "#ed2025", width: "70%" }}
        >
          Envoyer
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateOrderForm;
