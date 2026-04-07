import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { paymentSuccess, stripePaymentSuccess } from "../../../Redux Toolkit/Customer/OrderSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchUserCart, resetCartState } from "../../../Redux Toolkit/Customer/CartSlice";

const PaymentSuccessHandler = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { orders } = useAppSelector(store => store)
    const navigate=useNavigate();
    const { orderId } = useParams();

    const getQueryParam = (key: string): string | null => {
        const params = new URLSearchParams(location.search);
        return params.get(key);
    };
    // Razorpay/Stripe providers may use slightly different query keys depending on integration.
    const paymentId =
        getQueryParam("razorpay_payment_id") ||
        getQueryParam("payment_id") ||
        getQueryParam("razorpayPaymentId");

    const paymentLinkId =
        getQueryParam("razorpay_payment_link_id") ||
        getQueryParam("payment_link_id") ||
        getQueryParam("razorpayPaymentLinkId");

    const stripeSessionId =
        getQueryParam("session_id") ||
        getQueryParam("stripe_session_id") ||
        getQueryParam("checkout_session_id");
    // const paymentId="cs_test_a1eU8pFuXZJlg3tiahN153QykvQl6LI5hLgSnUUh01alidIPrMU8KyDx67"

    useEffect(() => {
        // Stripe flow
        if (orderId && stripeSessionId) {
            dispatch(stripePaymentSuccess({
                paymentOrderId: orderId,
                sessionId: stripeSessionId,
                jwt: localStorage.getItem("jwt") || "",
            })).then((action) => {
                if (stripePaymentSuccess.fulfilled.match(action)) {
                    dispatch(resetCartState());
                    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
                }
            });
            return;
        }

        // Razorpay flow
        if (paymentId) {
            dispatch(
                paymentSuccess({
                    paymentId,
                    paymentLinkId: paymentLinkId || "",
                    jwt: localStorage.getItem("jwt") || "",
                })
            ).then((action) => {
                // Backend clears cart items on payment success; keep UI in sync.
                if (paymentSuccess.fulfilled.match(action)) {
                    dispatch(resetCartState());
                    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
                }
            });
        }
    }, [dispatch, orderId, stripeSessionId, paymentId, paymentLinkId]);


    return (
        <div className="min-h-[90vh] flex justify-center items-center">
            {orders ? <div className="bg-primary-color text-white p-8 w-[90%] lg:w-[25%] border rounded-md h-[40vh] flex flex-col gap-7 items-center justify-center">
                <h1 className="text-3xl font-semibold">Congratulations!</h1>
                <h1 className="text-2xl font-semibold">Your Order Get Success</h1>
                <div>
                    <Button onClick={()=>navigate("/")} color="secondary" variant="contained">Shopping More</Button>
                </div>

            </div> : <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            //   onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>}
           
        </div>
    );
};

export default PaymentSuccessHandler;
