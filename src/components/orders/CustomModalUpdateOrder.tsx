import { useEffect, useState } from "react";

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
import Grid from "@mui/joy/Grid";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Box from "@mui/joy/Box";

import Stack from "@mui/joy/Stack";
import { useNotification } from "@contexts/NotificationContext";
import { useHeader } from "@hooks/useHeader";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { NumericFormatAdapter } from "@utils/modalUtils";
import { updateOrder } from "@utils/apiUtils";
import { IFormInputOrder } from "@interfaces/interfaces";
import { Order } from "@interfaces/interfaces";
import { validatePickupDate, validatePickupTime } from "@utils/commonUtils";

import { DateTime } from "luxon";

interface CustomModalUpdateOrderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onChangeMade: () => void;
  orderToUpdate: Order | undefined;
}

const CustomModalUpdateOrder = ({
  open,
  setOpen,
  orderToUpdate,
  onChangeMade,
}: CustomModalUpdateOrderProps) => {
  const { setNotification } = useNotification();
  const headers = useHeader();
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<Date | null>(null);

  const mutation = useMutation({
    mutationFn: (data: IFormInputOrder) => updateOrder(data, headers, orderToUpdate),
    onSuccess: () => {
      onChangeMade();
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
  } = useForm<IFormInputOrder>();

  useEffect(() => {
    if (orderToUpdate) {
      setPickupDate(DateTime.fromISO(orderToUpdate.pickupDate).toJSDate());
      setPickupTime(DateTime.fromISO(orderToUpdate.pickupTime).toJSDate());
      setValue("amount", Number(orderToUpdate.orderPrice));
      setValue("detailsForCustomer", orderToUpdate.detailsForCustomer ?? "");
      setValue("detailsForUser", orderToUpdate.detailsForUser ?? "");
    }
  }, [orderToUpdate, setValue]);

  const onSubmit: SubmitHandler<IFormInputOrder> = (data) => {
    data.pickupDate = pickupDate ?? pickupDate;
    data.pickupTime = pickupTime ?? pickupTime;

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
                <Grid container spacing={2}>
                  <Grid xs={12} sm={6}>
                    <FormControl>
                      <Controller
                        name="pickupDate"
                        control={control}
                        rules={{
                          validate: () => validatePickupDate(pickupDate),
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
                        validate: () => validatePickupTime(pickupTime),
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
