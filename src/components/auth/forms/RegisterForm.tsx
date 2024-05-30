import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Grid, TextField, Button } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface IFormInput {
    email: string
    compagny_name: string
    siret_number: string
    password: string
    confirm_password: string
}

const RegisterForm: React.FC = () => {
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<IFormInput>()

    const password = watch('password')

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        axios
            .post('http://localhost:3333/api/v1/auth/register', data)
            .then((res) => {
                console.log(res)
                if (res.status === 201) {
                    console.log('response 201')
                    navigate('/login')
                } else {
                    throw new Error('erreur survenu')
                }
            })
            .catch((error) => console.log(error))
    }

    return (
        <Grid container component={'form'} onSubmit={handleSubmit(onSubmit)}>
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
                            errors.email ? "Format d'email invalide" : ' '
                        }
                    />
                )}
            />
            <Controller
                name="compagny_name"
                control={control}
                rules={{ required: 'Dénomination sociale est obligatoire' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Dénomination sociale"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        error={!!errors.compagny_name}
                        helperText={
                            errors.compagny_name
                                ? errors.compagny_name.message
                                : ' '
                        }
                    />
                )}
            />
            <Controller
                name="siret_number"
                control={control}
                rules={{
                    required: 'Le Numéro SIRET est obligatoire',
                    pattern: {
                        value: /^[0-9]{14}$/,
                        message: 'Le numéro siret est incorrect',
                    },
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Numéro SIRET"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        error={!!errors.siret_number}
                        helperText={
                            errors.siret_number
                                ? errors.siret_number.message
                                : ' '
                        }
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                rules={{
                    required: 'Nouveau mot de passe requis',
                    minLength: {
                        value: 8,
                        message:
                            'Le mot de passe doit avoir au moins 8 caractères',
                    },
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="password"
                        label="Nouveau mot de Passe"
                        variant="filled"
                        fullWidth
                        error={!!errors.password}
                        helperText={
                            errors.password ? errors.password.message : ' '
                        }
                        margin="normal"
                    />
                )}
            />
            <Controller
                name="confirm_password"
                control={control}
                rules={{
                    required: 'Confirmation du mot de passe requise',
                    validate: (value) =>
                        value === password ||
                        'Les mots de passe ne correspondent pas',
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="password"
                        label="Confirmer le mot de Passe"
                        variant="filled"
                        fullWidth
                        error={!!errors.confirm_password}
                        helperText={
                            errors.confirm_password
                                ? errors.confirm_password.message
                                : ' '
                        }
                        margin="normal"
                    />
                )}
            />
            <Grid container direction="column" alignItems={'center'} my={10}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: '50px', background: '#ed2025', width : '70%' }}
                >
                    Envoyer
                </Button>
            </Grid>
        </Grid>
    )
}

export default RegisterForm
