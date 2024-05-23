import React from 'react'
import LoginForm from './auth/LoginForm'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
    const navigate = useNavigate()

    const allCookies = Cookies.get('accessToken')
    console.log(allCookies)

    const handleRegister = () => {
        navigate('/register')
    }

    return (
        <>
            <h1>home</h1>
            <LoginForm />
            <button onClick={handleRegister}>Pas encore de compte</button>
        </>
    )
}

export default Home
