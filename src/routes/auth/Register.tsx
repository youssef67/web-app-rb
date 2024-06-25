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
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";

import { useNavigate } from "react-router-dom";
import { useNotification } from "@contexts/NotificationContext";
import { useSnackbar } from "notistack";
import { registerApiCallResult } from "@utils/apiUtils";
import { FormHelperText } from "@mui/joy";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  compagny_name: string;
  siret_number: string;
  password: HTMLInputElement;
  confirm_password: HTMLInputElement;
}
interface RegisterFormElement extends HTMLFormElement {
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

export default function Register() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { notification, setNotification } = useNotification();
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    siret_number: "",
    password: "",
    confirm_password: "",
  });

  const areAllErrorsEmpty = (
    errorsObj: { [s: string]: unknown } | ArrayLike<unknown>
  ) => {
    return Object.values(errorsObj).every((error) => error === "");
  };

  const handleEmailValidator = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };

  const handleSiretNumberValidation = (siret: string) => {
    if (siret.length !== 14 || !/^\d+$/.test(siret)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        siret_number: "Siret number must be 14 digits long",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        siret_number: "",
      }));
    }
  };

  const handlePasswordLength = (password: string) => {
    if (password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));

      setPassword(password);
    }
  };

  const handleCheckPassword = (passwordConfirmation: string) => {
    if (password !== passwordConfirmation) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirm_password: "Passwords do not match",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirm_password: "" }));
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
                <Typography component="h1" level="h3">
                  Pour obtenir votre compte, veuillez remplir le formulaire
                </Typography>
                <Typography level="body-sm">
                  <Link onClick={() => navigate("/login")} level="title-sm">
                    Revenir sur la page de connexion
                  </Link>
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
                onSubmit={(event: React.FormEvent<RegisterFormElement>) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
                  const data = {
                    email: formElements.email.value,
                    compagny_name: formElements.compagny_name.value,
                    siret_number: formElements.siret_number.value,
                    password: formElements.password.value,
                    confirm_password: formElements.confirm_password.value,
                  };

                  if (areAllErrorsEmpty(errors)) {
                    const registerApiCall = registerApiCallResult(data);

                    registerApiCall.then((res) => {
                      if (res.status === 201) {
                        setNotification({
                          message: "Mail envoyé",
                          variant: "success",
                        });
                      } else {
                        setNotification({
                          message: "Impossible de s'inscrire",
                          variant: "error",
                        });
                      }
                      navigate("/login");
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
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    defaultValue={"you.moudni+refonte@gmail.com"}
                    onChange={(event) =>
                      handleEmailValidator(event.target.value)
                    }
                  />
                  {errors.email && (
                    <FormHelperText>
                      <InfoOutlined />
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl required>
                  <FormLabel>Nom d'entreprise</FormLabel>
                  <Input
                    type="text"
                    name="compagny_name"
                    defaultValue={"marmi"}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Numéro SIRET</FormLabel>
                  <Input
                    type="text"
                    name="siret_number"
                    defaultValue={"12345678901234"}
                    onChange={(event) =>
                      handleSiretNumberValidation(event.target.value)
                    }
                  />
                  {errors.siret_number && (
                    <FormHelperText>
                      <InfoOutlined />
                      {errors.siret_number}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl required>
                  <FormLabel>Mot de passe</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    defaultValue={"123456782"}
                    onChange={(event) =>
                      handlePasswordLength(event.target.value)
                    }
                  />
                  {errors.password && (
                    <FormHelperText>
                      <InfoOutlined />
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl required>
                  <FormLabel>Confirmation du mot de passe</FormLabel>
                  <Input
                    type="password"
                    name="confirm_password"
                    defaultValue={"12345678"}
                    onChange={(event) =>
                      handleCheckPassword(event.target.value)
                    }
                  />
                  {errors.confirm_password && (
                    <FormHelperText>
                      <InfoOutlined />
                      {errors.confirm_password}
                    </FormHelperText>
                  )}
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button type="submit" fullWidth>
                    S'inscrire
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
