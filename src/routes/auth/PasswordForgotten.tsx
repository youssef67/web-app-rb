import React from "react";
import PasswordForgottenForm from "@components/auth/forms/PasswordForgottenForm";
import { useTheme } from "@mui/material/styles";
import { Container, Grid, Typography } from "@mui/material";
import AppBarBeforeLogin from "@components/common/AppBarBeforeLogin";

const PasswordForgotten: React.FC = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        background: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <AppBarBeforeLogin />
      <Container maxWidth="sm">
        <Grid
          container
          justifyContent="center"
          direction="column"
          my={10}
        >
          <Grid maxWidth="sm">
            <Typography>
              Afin de procéder à la réinitialisation de votre mot de passe,
              Merci de bien vouloir indiquer votre email utilisé lors de votre
              première inscription
            </Typography>
          </Grid>
        </Grid>
        <PasswordForgottenForm />
      </Container>
    </div>
  );
};

export default PasswordForgotten;
