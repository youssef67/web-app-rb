import React from 'react'
import PasswordForgottenForm from '@components/auth/forms/PasswordForgottenForm'
import { useTheme } from '@mui/material/styles'
import { Container, Grid, Typography } from '@mui/material'
import AppBarBeforeLogin from '@components/common/AppBarBeforeLogin'

const PasswordForgotten: React.FC = () => {
    const theme = useTheme()

    return (
        <div
            style={{
                background: theme.palette.background.default,
                minHeight: '100vh',
            }}
        >
            <AppBarBeforeLogin />
            <Container style={{ maxWidth: '50%' }}>
                <Grid
                    container
                    justifyContent="center"
                    direction="column"
                    alignItems="center"
                    spacing={3}
                    my={10}
                >
                    <Typography>
                        Afin de procéder à la réinitialisation de votre mot de
                        passe
                    </Typography>
                    <Typography>
                        Merci de bien vouloir indiquer votre email utilisé lors
                        de votre première inscription
                    </Typography>
                </Grid>
                <PasswordForgottenForm />
            </Container>
        </div>
    )
}

export default PasswordForgotten
