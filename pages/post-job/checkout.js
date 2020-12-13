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
    console.log("we're calculating amount")
    for (const index in addOns){
      console.log(`amount in loop: ${amount}`)
      const addOn = addOns[index]
      switch (addOn){
        case ("addLogo"):
          amount += 50
          break
        case ("featureMonth"):
          amount += 100
          break
        case ("featureWeek"):
          amount += 30
          break
        case ("extraTime"): // make sure calculation works proper
          amount += 100
      }
    }
    console.log(`amount at end: ${amount * 100}`)
    return amount * 100
  }

  let paymentIntent;
  
  const { paymentIntentId } = await parseCookies(context);

  if (paymentIntentId) {
    // paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    paymentIntent = await stripe.paymentIntents.update(
      paymentIntentId,
      {amount: calculateAmount(context.query)}
    );

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