import React from 'react';
import { useForm } from 'react-hook-form';
import {useRouter} from "next/router"
import axios from "axios"

export default function PickJob() {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter()
  const onSubmit = async formData => {
    let querystring = []
    for (const addOn in formData){
        if (formData[addOn] == true){
          querystring.push(addOn)
        }
    }
    router.push({
        pathname: "/post-job/checkout",
        query: querystring
    })
      
      
  }

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="checkbox" placeholder="Logo" name="Logo" ref={register} />
      <input type="checkbox" placeholder="featureWeek" name="featureWeek" ref={register} />
      <input type="checkbox" placeholder="featureMonth" name="featureMonth" ref={register} />
      <input type="checkbox" placeholder="extraTime" name="extraTime" ref={register} />

      <input type="submit" />
    </form>
  );
}