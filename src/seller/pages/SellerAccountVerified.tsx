import { Alert, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../Redux Toolkit/Store'
import { performLogout } from '../../Redux Toolkit/Customer/AuthSlice'
import { resetSellerAuthState } from '../../Redux Toolkit/Seller/sellerAuthenticationSlice'

const SellerAccountVerified = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <div className='h-[80vh] flex flex-col justify-center items-center space-y-3'>

            <Alert variant="filled" severity="success">
                Your Email Get Verified Successfully
            </Alert>
            <div>
                <Button
                    variant='contained'
                    onClick={() => {
                        // Clear any existing auth so seller login form starts clean.
                        dispatch(performLogout())
                        dispatch(resetSellerAuthState())
                        navigate("/become-seller?mode=login")
                    }}
                >
                    Login As Seller
                </Button>
            </div>

        </div>
    )
}

export default SellerAccountVerified