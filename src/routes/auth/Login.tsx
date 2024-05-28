import React from 'react'
import LoginForm from '@components/auth/forms/LoginForm'
import AppBarBeforeLogin from '@components/common/AppBarBeforeLogin'
import Cookies from 'js-cookie'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
    const navigate = useNavigate()

    const allCookies = Cookies.get('compagnyUser')
    console.log(allCookies)

    const handleRegister = () => {
        navigate('/register')
    }

    const handlePasswordForgottent = () => {
        navigate('/password-forgotten')
    }
    return (
        <>
            <Grid container>
                <AppBarBeforeLogin/>
                <Grid item>
                    <div>Login</div>
                </Grid>
                <LoginForm />
                <button onClick={handleRegister}>Pas encore de compte</button>
                <button onClick={handlePasswordForgottent}>
                    mot de passe oublié
                </button>
            </Grid>
        </>
    )
}

export default Login
