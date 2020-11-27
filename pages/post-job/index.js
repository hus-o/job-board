import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";


const promise = loadStripe("pk_test_51HqJzLB1kCUVWOv5NvFducmjKHpzkKegTb8lbtIBkBhUV4wnBxpq9gaCscRFX9mfpCaA33WVsAn8StOwVw3BkrQG00e6iBGzkW");

export default function PickAdvert(){

    return(
        <>
        <Elements stripe={promise}>
            <CheckoutForm />
        </Elements>
        </>

    )
}