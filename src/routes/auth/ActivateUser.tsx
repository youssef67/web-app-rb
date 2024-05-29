import React from 'react'
import ActivateUserForm from '@components/auth/forms/ActivateUserForm'
import { useTheme } from '@mui/material/styles'

import AppBarBeforeLogin from '@components/common/AppBarBeforeLogin'
import { Container, Grid, Typography } from '@mui/material'
import { useQuery } from '../../hooks/useQuery'

const ActivateUser: React.FC = () => {
    const theme = useTheme()
    const token: string | null = useQuery().get('token')
    const email: string | null = useQuery().get('email')

    console.log(email)

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
                    <Grid item>
                        <Typography>
                            Afin de finaliser votre inscription, merci de
                            confirmer votre email
                        </Typography>
                    </Grid>
                    <Grid item marginBottom={5}>
                        <Typography>
                            Votre email :{' '}
                            <span style={{ fontWeight: 'bold' }}>
                                {email == null ? 'you.moudni@gmail.com' : email}
                            </span>
                        </Typography>
                    </Grid>
                    <ActivateUserForm email={email || ''} token={token || ''} />
                </Grid>
            </Container>
        </div>
    )
}

export default ActivateUser
