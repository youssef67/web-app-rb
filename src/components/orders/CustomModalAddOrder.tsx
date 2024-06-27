import { useState } from "react";
import Button from "@mui/joy/Button";
import ModalOverflow from "@mui/joy/ModalOverflow";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@styles/customDatePicker.css";
import { fr } from "date-fns/locale";
import Textarea from "@mui/joy/Textarea";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import FormHelperText from "@mui/joy/FormHelperText";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";
import { useNotification } from "@contexts/NotificationContext";
import { useHeader } from "@hooks/useHeader";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addOrder } from "@utils/apiUtils";
import { validatePickupDate, validatePickupTime } from "@utils/commonUtils";
import { NumericFormatAdapter } from "@utils/modalUtils";
import { IFormInputOrder } from "@interfaces/interfaces";

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
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<Date | null>(null);

  const mutation = useMutation({
    mutationFn: (data: IFormInputOrder) => addOrder(data, currentUser, headers),
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
        message: "Une erreur est survenue dans l'enregistrement de la commande",
        variant: "error",
      });
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputOrder>({
    defaultValues: {
      name: "youssef",
      lastname: "Moudni",
      phone: "0668735937",
      email: "you.moudni@gmail.com",
      amount: 20,
      detailsForCustomer: "test detailsForCustomer",
      detailsForUser: "test detailsForUser",
    },
  });

  const onSubmit: SubmitHandler<IFormInputOrder> = (data) => {
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
                        message:
                          "Le prénom doit contenir au moins 2 caractères",
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Prénom du client"
                          size="lg"
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
                <Grid container spacing={2}>
                  <Grid xs={12} sm={6}>
                    <FormControl>
                      <Controller
                        name="pickupDate"
                        control={control}
                        rules={{
                          validate: (date) => validatePickupDate(date),
                        }}
                        render={({ field: { onChange } }) => (
                          <>
                            <DatePicker
                              selected={pickupDate}
                              onChange={(date) => {
                                setPickupDate(date);
                                onChange(date);
                              }}
                              locale={fr}
                              isClearable
                              placeholderText="Date de récupération"
                              dateFormat="dd/MM/yyyy"
                              withPortal
                              customInput={
                                <Input
                                  size="lg"
                                  className="custom-datepicker__input"
                                />
                              }
                              className="custom-datepicker"
                              calendarClassName="custom-datepicker__calendar"
                              dayClassName={() => "custom-datepicker__day"}
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
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Controller
                      name="pickupTime"
                      control={control}
                      rules={{
                        validate: (date) => validatePickupTime(date),
                      }}
                      render={({ field: { onChange } }) => (
                        <>
                          <DatePicker
                            selected={pickupTime}
                            onChange={(date) => {
                              setPickupTime(date);
                              onChange(date);
                            }}
                            locale={fr}
                            placeholderText="Heure de récupération"
                            isClearable
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Heure"
                            dateFormat="HH:mm"
                            customInput={<Input size="lg" />}
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
                  </Grid>
                </Grid>
                <FormControl>
                  <Controller
                    name="detailsForCustomer"
                    control={control}
                    rules={{
                      maxLength: {
                        value: 600,
                        message: "Le texte ne doit pas dépasser 600 caractères",
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Textarea
                          {...field}
                          value={field.value || ""}
                          size="lg"
                          placeholder="Détails pour le client"
                        />
                        {errors.detailsForCustomer && (
                          <FormHelperText style={{ color: "red" }}>
                            <InfoOutlined style={{ color: "red" }} />
                            {errors.detailsForCustomer.message}
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
                    rules={{
                      maxLength: {
                        value: 600,
                        message: "Le texte ne doit pas dépasser 600 caractères",
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Textarea
                          {...field}
                          value={field.value || ""}
                          size="lg"
                          placeholder="Détails pour vous"
                        />
                        {errors.detailsForUser && (
                          <FormHelperText style={{ color: "red" }}>
                            <InfoOutlined style={{ color: "red" }} />
                            {errors.detailsForUser.message}
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
