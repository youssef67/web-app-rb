import React from 'react'
import ResetPasswordForm from '@components/auth/forms/ResetPasswordForm'
import AppBarBeforeLogin from '@components/common/AppBarBeforeLogin'

import { useTheme } from '@mui/material/styles'
import { Container, Grid, Typography } from '@mui/material'

import { useQuery } from '../../hooks/useQuery'

const ResetPassword: React.FC = () => {
    const theme = useTheme()

    const token: string | null = useQuery().get('token')

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
                        Afin de finaliser la réinitialisation de votre mot de
                        passe
                    </Typography>
                    <Typography>
                        Merci de bien vouloir indiquer votre nouveau mot de
                        passe et le confirmer
                    </Typography>
                </Grid>
                <ResetPasswordForm token={token || ''} />
            </Container>
        </div>
    )
}

export default ResetPassword
