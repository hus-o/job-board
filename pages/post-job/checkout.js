import Stripe from "stripe";
import { parseCookies, setCookie } from "nookies";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51HqJzLB1kCUVWOv5NvFducmjKHpzkKegTb8lbtIBkBhUV4wnBxpq9gaCscRFX9mfpCaA33WVsAn8StOwVw3BkrQG00e6iBGzkW"); // might wanna move this to wrap whole app, once everything works

// serverside function
export const getServerSideProps = async context => {
  const stripe = new Stripe(process.env.STRIPE_KEY);
  const calculateAmount = (addOns) =>{
    let amount = 50
    for (const index in addOns){
      const addOn = addOns[index]
      switch (addOn){
        case ("featureWeek"):
          amount += 30
          break
        case ("extraTime"):
          amount += 100
      }
    }
    return amount * 100
  }
  let paymentIntent;

  const { paymentIntentId } = await parseCookies(context);

  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return {
      props: {
        paymentIntent
      }
    };
  }

  paymentIntent = await stripe.paymentIntents.create({
    amount: calculateAmount(context.query),
    currency: "gbp"
  });

  setCookie(context, "paymentIntentId", paymentIntent.id);

  return {
    props: {
      paymentIntent
    }
  };
};

// this page, passing down the payment intent to the checkoutform component
const CheckoutPage = ({ paymentIntent }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm intent={paymentIntent} />
  </Elements>
);

export default CheckoutPage;