import { useEffect } from "react";

import Button from "@mui/joy/Button";
import ModalOverflow from "@mui/joy/ModalOverflow";

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

import { updateCustomer } from "@utils/apiUtils";
import { IFormInputCustomer } from "@interfaces/interfaces";
import { CustomerFullData } from "@interfaces/interfaces";

interface CustomModalUpdateOrderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onChangeMade: () => void;
  customerToUpdate: CustomerFullData | undefined;
}

const CustomModalUpdateOrder = ({
  open,
  setOpen,
  onChangeMade,
  customerToUpdate,
}: CustomModalUpdateOrderProps) => {
  const { setNotification } = useNotification();
  const headers = useHeader();

  const mutation = useMutation({
    mutationFn: (data: IFormInputCustomer) =>
      updateCustomer(data, headers, customerToUpdate),
    onSuccess: () => {
      onChangeMade();
      setNotification({
        message: "Client modifié avec succès",
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
  } = useForm<IFormInputCustomer>();

  useEffect(() => {
    if (customerToUpdate) {
      setValue("name", customerToUpdate.customer.name ?? "");
      setValue("lastname", customerToUpdate.customer.lastname ?? "");
      setValue("email", customerToUpdate.customer.email ?? "");
      setValue("phone", customerToUpdate.customer.phone ?? "");
    }
  }, [customerToUpdate, setValue]);

  const onSubmit: SubmitHandler<IFormInputCustomer> = (data) => {
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
                          {...field}
                          placeholder="Nom du client"
                          size="lg"
                          value={field.value || ""}
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
                        message: "Le prénom doit contenir au moins 2 caractères",
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          placeholder="Prénom du client"
                          size="lg"
                          value={field.value || ""}
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
                          {...field}
                          type="email"
                          value={field.value || ""}
                          size="lg"
                          placeholder="Email"
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
                          {...field}
                          value={field.value || ""}
                          placeholder="Téléphone"
                          size="lg"
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
                <Button size="lg" type="submit">
                  Valider les modifications
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
