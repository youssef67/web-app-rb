import React, { useEffect } from "react";

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
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { NumericFormatAdapter } from "@utils/modalUtils";
import { updateOrder } from "@utils/apiUtils";
import { IFormInput } from "@interfaces/interfaces";
import { Order } from "@interfaces/interfaces";

interface CustomModalUpdateOrderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onChangeMade: () => void;
  orderToUpdate: Order | undefined
}

const CustomModalUpdateOrder = ({
  open,
  setOpen,
  orderToUpdate,
  onChangeMade,
}: CustomModalUpdateOrderProps) => {
  const { setNotification } = useNotification();
  const headers = useHeader();

  const mutation = useMutation({
    mutationFn: (data: IFormInput) =>
      updateOrder(data, headers, orderToUpdate),
    onSuccess: () => {
      onChangeMade()
      setNotification({
        message: "Commande modifié avec succès",
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
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      amount: 20,
      pickupDate: new Date().toISOString().split("T")[0],
      detailsForCustomer: "Livraison à domicile",
      detailsForUser: "Client régulier",
    },
  });

  useEffect(() => {
    if (orderToUpdate) {
      setValue("amount", Number(orderToUpdate.orderPrice));
      setValue("pickupDate", new Date().toISOString().split("T")[0]);
      setValue("detailsForCustomer", orderToUpdate.detailsForCustomer ?? "");
      setValue("detailsForUser", orderToUpdate.detailsForUser ?? "");
    }
  }, [orderToUpdate, setValue]);

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

export default CustomModalUpdateOrder;
