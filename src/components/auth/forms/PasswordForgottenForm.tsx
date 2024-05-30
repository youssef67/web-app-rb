import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useNotification } from "@contexts/NotificationContext";
import { Grid, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface PasswordForgottenFormInputs {
    email: string
}

const PasswordForgottenForm: React.FC = () => {
    const navigate = useNavigate()
    const { setNotification } = useNotification();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<PasswordForgottenFormInputs>()

    const onSubmit: SubmitHandler<PasswordForgottenFormInputs> = (data) => {
        axios
            .post('http://localhost:3333/api/v1/user/forgot-password', data)
            .then((res) => {
                if (res) {
                    setNotification({ message: "Mail envoyé", variant: "success" });
                    navigate('/login')
                } else {
                    throw new Error('absence de token')
                }
            })
            .catch((error) => console.log(error))
    }

    return (
        <Grid container component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="email"
                control={control}
                rules={{ required: true, pattern: /^\S+@\S+$/i }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Email"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={
                            errors.email ? "Format d'email invalide" : ''
                        }
                    />
                )}
            />
            <Grid container direction="column" alignItems={'center'} my={10}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                        marginBottom: '50px',
                        background: '#ed2025',
                        width: '70%',
                    }}
                >
                    Recevoir un email de réinitialisation
                </Button>
            </Grid>
        </Grid>
    )
}

export default PasswordForgottenForm
