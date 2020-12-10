import Stripe from "stripe";
import { parseCookies, setCookie } from "nookies";

const calculateAmount = addOnData => {
    console.log(addOnData)
    let amount = 5000
    if (addOnData["extraTime"]){
        amount += 10000
    }
    if (addOnData["featureMonth"]){
        amount += 17000
    }
    if (addOnData["featureWeek"]){
        amount += 300
    }
    if (addOnData["Logo"]){
        amount += 5000
    }
    console.log("AMOUNT " + amount)
    return amount
}

// serverside function
export default async (req,res) => {
    if (req.method == "POST"){
        console.log(req.body)
        const addOnData = req.body
        const amount = calculateAmount(addOnData)
        res.send({amount:amount})
    }
}