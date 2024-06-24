import React, { useEffect, useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";

import { useNavigate } from "react-router-dom";
import { useNotification } from "@contexts/NotificationContext";
import { useSnackbar } from "notistack";
import { resetPasswordApiCallResult } from "@utils/apiUtils";
import { FormHelperText } from "@mui/joy";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

import { useQuery } from "../../hooks/useQuery";

interface FormElements extends HTMLFormControlsCollection {
  newPassword: HTMLInputElement;
  confirmPassword: HTMLInputElement;
}
interface ResetPasswordFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light");
        onClick?.(event);
      }}
      {...other}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { notification, setNotification } = useNotification();
  const [newPassword, setNewPassword] = useState("");
  const token: string | null = useQuery().get("token");

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const areAllErrorsEmpty = (
    errorsObj: { [s: string]: unknown } | ArrayLike<unknown>
  ) => {
    return Object.values(errorsObj).every((error) => error === "");
  };

  const handlePasswordLength = (newPassword: string) => {
    if (newPassword.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: "Password must be at least 8 characters long",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: "",
      }));

      setNewPassword(newPassword);
    }
  };

  const handleCheckPassword = (passwordConfirmation: string) => {
    console.log(newPassword);
    console.log(passwordConfirmation);
    if (newPassword !== passwordConfirmation) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
  };

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification.message, { variant: notification.variant });
      setNotification(null);
    }
  }, [notification, enqueueSnackbar, setNotification]);

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Rabbit Butcher</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography level="body-sm">
                  Afin de finaliser la réinitialisation de votre mot de passe
                </Typography>
                <Typography level="body-sm">
                  Merci de bien vouloir indiquer votre nouveau mot de passe et
                  le confirmer
                </Typography>
              </Stack>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                },
              })}
            ></Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form
                onSubmit={(
                  event: React.FormEvent<ResetPasswordFormElement>
                ) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
                  const data = {
                    newPassword: formElements.newPassword.value,
                    confirmPassword: formElements.confirmPassword.value,
                  };

                  if (areAllErrorsEmpty(errors)) {
                    console.log(data);
                    const resetPasswordApiCall = resetPasswordApiCallResult(
                      data,
                      token
                    );

                    console.log(resetPasswordApiCall);

                    resetPasswordApiCall.then((res) => {
                      if (res.status === 200) {
                        setNotification({
                          message: "Mot de passe modifié avec succès",
                          variant: "success",
                        });
                      } else {
                        setNotification({
                          message: "Une erreur est survenue, merci de recommencer",
                          variant: "error",
                        });
                      }
                      navigate('/login')
                    });
                  } else {
                    setNotification({
                      message: "Veuillez compléter les champs",
                      variant: "error",
                    });
                  }
                }}
              >
                <FormControl required>
                  <FormLabel>Mot de passe</FormLabel>
                  <Input
                    type="password"
                    name="newPassword"
                    defaultValue={"123456782"}
                    onChange={(event) =>
                      handlePasswordLength(event.target.value)
                    }
                  />
                  {errors.newPassword && (
                    <FormHelperText>
                      <InfoOutlined />
                      {errors.newPassword}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl required>
                  <FormLabel>Confirmation du mot de passe</FormLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    defaultValue={"12345678"}
                    onChange={(event) =>
                      handleCheckPassword(event.target.value)
                    }
                  />
                  {errors.confirmPassword && (
                    <FormHelperText>
                      <InfoOutlined />
                      {errors.confirmPassword}
                    </FormHelperText>
                  )}
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button type="submit" fullWidth>
                    Réinitialiser le mot de passe
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Rabbit Butcher {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
          },
        })}
      />
    </CssVarsProvider>
  );
}
