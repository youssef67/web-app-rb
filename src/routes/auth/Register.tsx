import React from "react";
import RegisterForm from "@components/auth/forms/RegisterForm";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Grid, Typography } from "@mui/material";
import AppBarBeforeLogin from "@components/common/AppBarBeforeLogin";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleMoveToLoginPage = () => {
    navigate("/login");
  };
  return (
    <div
      style={{
        background: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <AppBarBeforeLogin />
      <Container style={{ maxWidth: "70%" }}>
        <Grid
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
        >
          <Grid
            container
            spacing={0}
            my={7}
            direction="column"
            alignItems="center"
          >
            <Grid>
              <Typography>
                Pour obtenir votre compte, veuillez remplir le formulaire
              </Typography>
            </Grid>
            <Grid>
              <Typography>
                <span
                  onClick={handleMoveToLoginPage}
                  style={{ cursor: "pointer", color: "#ed2025" }}
                >
                  Revenir sur la page de connexion
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid >
          <RegisterForm />
        </Grid>
      </Container>
    </div>
  );
};

export default Register;
