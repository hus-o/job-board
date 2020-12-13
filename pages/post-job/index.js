import {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {useRouter} from "next/router"
import {Button, Flex, Box, Text} from "@chakra-ui/react"

export default function PickJob() {
  const { register, handleSubmit, errors, watch } = useForm();
  const watchAll = watch()
  const router = useRouter()
  const [total, setTotal] = useState(50)

  useEffect(() =>{
    let calcTotal = 50
    watchAll["addLogo"] ? calcTotal += 50 : null
    watchAll["featureWeek"] ? calcTotal += 30 : null
    watchAll["featureMonth"] ? calcTotal += 100 : null
    watchAll["extraTime"] ? calcTotal += 100 : null
    setTotal(calcTotal)
  }, [watchAll])

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
    <>
      <Text fontWeight={700} fontSize={[20,20,30,30]} textAlign={"center"} mb={10}>Step 1/3: Pick Your Post</Text>
    <Flex justify="center">
    <Box bg={"#6fff2c"} rounded="md" p={5} width={[300,300,500,500]} mb={10} textAlign="center" boxShadow="lg" >
      Standard Post &#x2713;<br/>Live for 30 days<br/>£50
    </Box>
    </Flex>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Flex align={["center","center","center","center"]} justify={["center","center","space-around","space-around"]} direction={["column","column","row","row"]} mb={[5,5,10,10]}>
      <input type="checkbox" id="logoAddOn" className="addOn" placeholder="Logo" name="addLogo" ref={register}  />
      <Box mb={[5,5,0,0,]} ml={[0,0,5,5]} mr={[0,0,5,5]} width={[250,250,"auto","auto"]} boxShadow="lg"
           bg={"white"} rounded="md" p={5} textAlign="center" value="100" as="label" htmlFor="logoAddOn"
           >
             Include Your Company Logo
      </Box>

      
      <input type="checkbox" id="weekAddOn" className="addOn" placeholder="featureWeek" name="featureWeek" ref={register} />
      <Box mb={[5,5,0,0,]} ml={[0,0,5,5]} mr={[0,0,5,5]} width={[250,250,"auto","auto"]} boxShadow="lg"
           bg={"white"} rounded="md" p={5} textAlign="center" value="100" as="label" htmlFor="weekAddOn"
           >
             Get featured for a week
       </Box>
      
      <input type="checkbox" id="monthAddOn" className="addOn" placeholder="featureMonth" name="featureMonth" ref={register} />
      <Box mb={[5,5,0,0,]} ml={[0,0,5,5]} mr={[0,0,5,5]} width={[250,250,"auto","auto"]} boxShadow="lg"
           bg={"white"} rounded="md" p={5} textAlign="center" value="100" as="label" htmlFor="monthAddOn"
           >
             Get featured for a month
      </Box>
      
      <input type="checkbox" id="timeAddOn" className="addOn" placeholder="extraTime" name="extraTime" ref={register} />
      <Box mb={[5,5,0,0,]} ml={[0,0,5,5]} mr={[0,0,5,5]} width={[250,250,"auto","auto"]} boxShadow="lg"
           bg={"white"} rounded="md" p={5} textAlign="center" value="100" as="label" htmlFor="timeAddOn"
           >
             Extend your job post to 60 days
      </Box>
      </Flex>
      <Flex align="center" direction="column">
        <Text fontWeight={500} fontSize={20} mb={5}>Total: £{total}</Text>
      <Button type="submit">Continue</Button>
      </Flex>
    </form>
    </>
  );
}