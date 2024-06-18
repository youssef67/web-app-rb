import Button from "@mui/joy/Button";
import ModalOverflow from "@mui/joy/ModalOverflow";

import Textarea from "@mui/joy/Textarea";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import FormHelperText from "@mui/joy/FormHelperText";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Box from "@mui/joy/Box";

import Stack from "@mui/joy/Stack";
import { useNotification } from "@contexts/NotificationContext";
import { useHeader } from "@hooks/useHeader";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { NumericFormatAdapter } from "@utils/modalUtils";
import { addOrder } from "@utils/apiUtils";
import { IFormInput } from "@interfaces/interfaces";

interface CustomModalAddOrderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onChangeMade: () => void;
}

const CustomModalAddOrder = ({
  open,
  setOpen,
  onChangeMade,
}: CustomModalAddOrderProps) => {
  const { setNotification } = useNotification();
  const currentUser = useCurrentUser();
  const headers = useHeader();

  const mutation = useMutation({
    mutationFn: (data: IFormInput) => addOrder(data, currentUser, headers),
    onSuccess: () => {
      onChangeMade();
      setNotification({
        message: "Commande enregistrée avec succès",
        variant: "success",
      });
      setOpen(false);
    },
    onError: () => {
      setNotification({
        message: "Une erreur est survenue",
        variant: "error",
      });
    },
  });

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
      detailsForCustomer: "Livraison à domicile",
      detailsForUser: "Client régulier"
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalOverflow>
          <ModalDialog>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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
                        <Input
                          placeholder="Nom du client"
                          size="lg"
                          {...field}
                          required
                        />
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
                        message:
                          "Le prénom doit contenir au moins 2 caractères",
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          placeholder="Prénom du client"
                          size="lg"
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
                        value:
                          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                        message: "L'email est invalide",
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          type="email"
                          size="lg"
                          placeholder="Email"
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
                      required: "Le téléphone est obligatoire",
                      pattern: {
                        value: /^0[0-9]{9}$/,
                        message: "Le téléphone est invalide",
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          placeholder="Téléphone"
                          size="lg"
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
                          size="lg"
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
                  <Controller
                    name="pickupDate"
                    control={control}
                    rules={{
                      required: "La date de retrait est obligatoire",
                    }}
                    render={({ field }) => (
                      <>
                        <Input type="date" {...field} size="lg" required />
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
                <FormControl>
                  <Controller
                    name="detailsForCustomer"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Textarea
                          {...field}
                          size="lg"
                          placeholder="Détails pour le client"
                        />
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
                <FormControl>
                  <Controller
                    name="detailsForUser"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Textarea
                          {...field}
                          size="lg"
                          placeholder="Détails pour vous"
                        />
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
                <Button size="lg" type="submit">
                  Ajouter
                </Button>
              </Stack>
            </form>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </>
  );
};

export default CustomModalAddOrder;
