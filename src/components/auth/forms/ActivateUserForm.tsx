import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Button } from '@mui/material'
import axios from 'axios'

interface ActivateUserFormProps {
    email?: string
    token?: string
}

const ActivateUserForm: React.FC<ActivateUserFormProps> = ({
    email,
    token,
}) => {
    const navigate = useNavigate()

    const handleValidate = () => {
        axios
            .post('http://localhost:3333/api/v1/user/activate', {
                token: token,
                email: email,
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log('reponse 200')
                    navigate('/login')
                } else {
                    throw new Error('error')
                }
            })
            .catch((error) => console.log(error))
    }

    return (
        <Grid>
            <Button
                onClick={handleValidate}
                type="submit"
                variant="contained"
                color="primary"
                style={{
                    marginBottom: '50px',
                    background: '#ed2025',
                }}
            >
                Confirmer mon email
            </Button>
        </Grid>
    )
}

export default ActivateUserForm
