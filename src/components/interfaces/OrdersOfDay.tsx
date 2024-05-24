import { useAuth } from '@hooks/useAuth'
import axios from 'axios'
import Cookies from 'js-cookie'

const OrdersOfDay: React.FC = () => {
    const { logout } = useAuth()

    const accessToken = Cookies.get('accessToken')

    console.log(accessToken)
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
    }

    const handleLogout = () => {
        axios
            .get('http://localhost:3333/api/logout', { headers })
            .then(() => {
              logout()
            })
            .catch((error) => console.log(error))

        
    }

    const handleValidateOrder = () => {
        axios
            .get('http://localhost:3333/api/order-validate', { headers })
            .then((res) => {
                console.log(res)
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            <div>OrderOfDay</div>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleValidateOrder}>Valider une commande</button>
        </>
    )
}

export default OrdersOfDay
