import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { destroyCookie } from "nookies";

const CheckoutForm = ({ intent, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [checkoutError, setCheckoutError] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  console.log(`id: ${intent.id} & amount ${intent.amount}`)
  const handleSubmit = async e => {
    e.preventDefault();
    try{
      const {paymentIntent, error} = await stripe.confirmCardPayment(intent.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
      console.log(paymentIntent)
      if (error){
        console.log(error)
        setCheckoutError(error.message)
      }
      else if (paymentIntent.status == "succeeded"){
        console.log(paymentIntent)
        destroyCookie(null, "paymentIntentId");
        setCheckoutSuccess(true);
        // hit database api to write
      }
    } catch{
        console.log(err)
        setCheckoutError(err)
    }
  };

  
  if (checkoutSuccess) return <p>Payment successfull!</p>;
  // should I add a "start over" button to delete the cookie and restart, so if ppl go back and forth in browser
  // nothing changes. OR just maxAge cookie / no cookie
  return (
    <form onSubmit={handleSubmit}> 
      <CardElement />

      <button type="submit" disabled={!stripe}>
        Pay  £{intent.amount / 100}
      </button>

      {checkoutError && <span style={{ color: "red" }}>{checkoutError}</span>}
    </form>
  );
};

export default CheckoutForm;