import React from "react";
import LoginForm from "@components/auth/forms/LoginForm";
import AppBarBeforeLogin from "@components/common/AppBarBeforeLogin";
import Cookies from "js-cookie";
import { Container, Grid, Divider, Typography, Chip, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";


const Login: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const allCookies = Cookies.get("compagnyUser");
  console.log(allCookies);

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div style={{ background : theme.palette.background.default, minHeight: '100vh' }}>
      <AppBarBeforeLogin />
      <Container>
        <Grid
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
        >
          <Grid container spacing={0} my={7} direction="column" width={'80%'}>
            <Grid>
              <Typography>Connectez-vous</Typography>
            </Grid>
            <Grid>
                <Typography>
                    Pas encore de compte ?{" "}
                    <span onClick={handleRegister} style={{ cursor: "pointer", color: "#ed2025" }}>
                        Créer un compte
                    </span>
                </Typography>
                <Box>
                    <Divider style={{ marginTop: "40px", borderColor: theme.palette.divider }}>
                        <Chip label="OU" size="medium" variant="outlined" sx={{color: "#f6eaea"}}/>
                    </Divider>
                </Box>
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
