import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import { useNotification } from "@contexts/NotificationContext";
import { useHeader } from "@hooks/useHeader";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Grid, TextField } from "@mui/material";
import Add from "@mui/icons-material/Add";

import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ModalAddOrderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormInput {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  amount: number;
  pickupDate: string;
}

export default function ModalAddOrder({ open, setOpen }: ModalAddOrderProps) {
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
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create new project</DialogTitle>
          <DialogContent>Fill in the information of the project.</DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Nom</FormLabel>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Le nom est obligatoire" }}
                  render={({ field }) => <Input {...field} required />}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Prénom</FormLabel>
                <Controller
                  name="lastname"
                  control={control}
                  rules={{ required: "Le prénom est obligatoire" }}
                  render={({ field }) => <Input {...field} required />}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true, pattern: /^\S+@\S+$/i }}
                  render={({ field }) => <Input {...field} required />}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Téléphone</FormLabel>
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
                  render={({ field }) => <Input {...field} required />}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Montant</FormLabel>
                <Controller
                  name="amount"
                  control={control}
                  rules={{
                    required: "Montant de la commande requis",
                    validate: {
                      positiveNumber: (value) => {
                        const floatValue = parseFloat(String(value));
                        if (
                          !floatValue ||
                          isNaN(floatValue) ||
                          floatValue <= 0
                        ) {
                          return "Veuillez entrer un montant valide et supérieur à zéro";
                        }
                        return true;
                      },
                    },
                  }}
                  render={({ field }) => <Input {...field} required />}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Montant</FormLabel>
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
                  render={({ field }) => <Input {...field} required />}
                />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
