import React from "react";
import LoginForm from "@components/auth/forms/LoginForm";
import AppBarBeforeLogin from "@components/common/AppBarBeforeLogin";
import { Container, Grid, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";



const Login: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleRegister = () => {
    navigate("/register");
  };

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
          alignItems="center"
        >
          <Grid container spacing={0} my={7} direction="column" width={"80%"}>
            <Grid>
              <Typography>Connectez-vous</Typography>
            </Grid>
            <Grid>
              <Typography>
                Pas encore de compte ?{" "}
                <span
                  onClick={handleRegister}
                  style={{
                    cursor: "pointer",
                    color: "#ed2025",
                  }}
                >
                  Créer un compte
                </span>
              </Typography>
              <Grid item xs={12} style={{ width: "100%" }}>
                <Divider variant="middle" style={{ margin: "20px 0" }} />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <LoginForm />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
