import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Grid, TextField, Button } from '@mui/material'

interface ResetPasswordFormInputs {
    newPassword: string
    confirmPassword: string
}

interface ResetPasswordFormProps {
    token: string
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<ResetPasswordFormInputs>()
    const newPassword = watch('newPassword')

    const onSubmit: SubmitHandler<ResetPasswordFormInputs> = (data) => {
        axios
            .post(
                `http://localhost:3333/api/v1/user/reset-password?token=${token}`,
                {
                    newPassword: data.newPassword,
                }
            )
            .then((res) => {
                if (res) {
                    navigate('/')
                } else {
                    throw new Error('absence de token')
                }
            })
            .catch((error) => console.log(error))
    }

    return (
        <Grid container component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                rules={{
                    required: 'Le nouveau mot de passe est requis',
                    minLength: {
                        value: 8,
                        message:
                            'Le mot de passe doit contenir au moins 8 caractères',
                    },
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Nouveau mot de passe"
                        type="password"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        error={!!errors.newPassword}
                        helperText={
                            errors.newPassword ? errors.newPassword.message : ''
                        }
                    />
                )}
            />
            <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{
                    required: 'La confirmation du mot de passe est requise',
                    validate: (value) =>
                        value === newPassword ||
                        'Les mots de passe ne correspondent pas',
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Confirmer le mot de passe"
                        type="password"
                        variant="filled"
                        margin="normal"
                        fullWidth
                        error={!!errors.confirmPassword}
                        helperText={
                            errors.confirmPassword
                                ? errors.confirmPassword.message
                                : ''
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
                    Réinitialiser le mot de passe
                </Button>
            </Grid>
        </Grid>
    )
}

export default ResetPasswordForm
