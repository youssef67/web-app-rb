import React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import FormHelperText from "@mui/joy/FormHelperText";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Box from '@mui/joy/Box';



import Stack from "@mui/joy/Stack";
import { useNotification } from "@contexts/NotificationContext";
import { useHeader } from "@hooks/useHeader";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NumericFormatAdapter } from "@utils/modalUtils";

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

  console.log(errors);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    // axios
    //   .post(
    //     "http://localhost:3333/api/v1/order/add",
    //     { ...data, ...currentUser },
    //     { headers }
    //   )
    //   .then((res) => {
    //     if (res.status === 201) {
    //       setNotification({
    //         message: "Commande enregistré avec succès",
    //         variant: "success",
    //       });
    //     } else {
    //       setNotification({
    //         message: "Une erreur est survenu",
    //         variant: "error",
    //       });
    //     }
    //   })
    //   .catch(() => {
    //     setNotification({
    //       message: "Une erreur est survenu",
    //       variant: "error",
    //     });
    //   })
    //   .finally(() => {
    //     navigate("/orders-of-day");
    //   });
  };

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <Box sx={{ display: "flex", justifyContent: "flex-end",  mb: 2 }}>
            <ModalClose variant="plain" sx={{ mb: 1 }} />
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FormControl>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "Le nom est obligatoire",
                    minLength: {
                      value: 2,
                      message: "Le nom doit contenir au moins 2 caractères",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <Input placeholder="Nom du client" {...field} required />
                      {errors.name && (
                        <FormHelperText style={{ color: "red" }}>
                          <InfoOutlined style={{ color: "red" }} />
                          {errors.name.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  name="lastname"
                  control={control}
                  rules={{
                    required: "Le prénom est obligatoire",
                    minLength: {
                      value: 2,
                      message: "Le prénom doit contenir au moins 2 caractères",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <Input
                        placeholder="Prénom du client"
                        {...field}
                        required
                      />
                      {errors.lastname && (
                        <FormHelperText style={{ color: "red" }}>
                          <InfoOutlined style={{ color: "red" }} />
                          {errors.lastname.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <FormControl>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "L'email est obligatoire",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "L'email n'est pas valide",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <Input
                        placeholder="Email du client"
                        {...field}
                        required
                      />
                      {errors.email && (
                        <FormHelperText style={{ color: "red" }}>
                          <InfoOutlined style={{ color: "red" }} />
                          {errors.email.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <FormControl>
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
                    <>
                      <Input
                        placeholder="Téléphone du client"
                        {...field}
                        required
                      />
                      {errors.phone && (
                        <FormHelperText style={{ color: "red" }}>
                          <InfoOutlined style={{ color: "red" }} />
                          {errors.phone.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <FormControl>
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
                  render={({ field }) => (
                    <>
                      <Input
                        placeholder="Montant de la commande"
                        slotProps={{
                          input: {
                            component: NumericFormatAdapter,
                          },
                        }}
                        {...field}
                        required
                      />
                      {errors.amount && (
                        <FormHelperText style={{ color: "red" }}>
                          <InfoOutlined style={{ color: "red" }} />
                          {errors.amount.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Date de la commande</FormLabel>
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
                    <>
                      <Input type="date" {...field} required />
                      {errors.pickupDate && (
                        <FormHelperText style={{ color: "red" }}>
                          <InfoOutlined style={{ color: "red" }} />
                          {errors.pickupDate.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>

              <Button type="submit">Enregistrer la commande</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
