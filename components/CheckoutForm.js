import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { destroyCookie } from "nookies";
import { useForm } from 'react-hook-form';
import {Button, Alert, AlertIcon, 
        FormControl, FormLabel, Box, Flex,
        Input, InputGroup, InputLeftElement,
        Select, NumberInputField, NumberInput} from "@chakra-ui/react"

const CheckoutForm = ({ intent }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { register, handleSubmit, errors} = useForm();
  const [checkoutError, setCheckoutError] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [loading, setLoading] = useState(false)
  const [isPayEnabled, setIsPayEnabled] = useState(false)
  const [salaryType, setSalaryType] = useState("singleSalary")
  console.log(`id: ${intent.id} & amount ${intent.amount}`)

  const onSubmit = async data => {
    console.log(data)
    setLoading(true)
    try{
      const {paymentIntent, error} = await stripe.confirmCardPayment(intent.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (error){
        setLoading(false)
        console.log(error)
        setCheckoutError(error.message)
      }
      else if (paymentIntent.status == "succeeded"){
        setLoading(false)
        destroyCookie(null, "paymentIntentId");
        // hit database api to write
        setCheckoutSuccess(true); // wouldn't need this as after db write should get-redirect serverside
      }
    } catch (err) {
        setCheckoutError(err.message)
    }
  };

  
  if (checkoutSuccess) return <p>Payment successfull!</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      
      <FormControl>
        <Select onChange={(e) => setSalaryType(e.target.value)}>
          <option value="singleSalary">Single Salary</option>
          <option value="rangeSalary">Salary Range</option>
        </Select>
        {salaryType == "singleSalary" ?
       <NumberInput>
         <NumberInputField placeholder="e.g 30,000" name="salary" ref={register({required: true})}></NumberInputField>
       </NumberInput>
       :
       <Flex>
          <NumberInput width={500} mr={2}>
            <NumberInputField placeholder="e.g 20,000" name="salaryMin" ref={register({required: true})}></NumberInputField>
          </NumberInput>
          to
          <NumberInput width={500} ml={2}>
            <NumberInputField placeholder="e.g 30,000" name="salaryMax" ref={register({required: true})}></NumberInputField>
          </NumberInput>
       </Flex>}
      </FormControl>


      <CardElement />
      {checkoutError && <span><Alert status="error"><AlertIcon />{checkoutError}</Alert></span>}

      <Button isLoading={loading} type="submit" disabled={!stripe}>
        Pay  £{intent.amount / 100}
      </Button>
    
    </form>

  );
};

export default CheckoutForm;