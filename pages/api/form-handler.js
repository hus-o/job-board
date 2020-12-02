// import Stripe from "stripe"
// import firebase from "../../lib/firebase"

// //const stripe = new Stripe(process.env.STRIPE_KEY)

// const calculateAmount = (formData) => {
//     let amount = 5000
//     if (formData["isAddTimeChecked"]){
//         amount += 10000
//     }
//     if (formData["isFeatureMonthChecked"]){
//         amount += 17000
//     }
//     console.log("AMOUNT" + amount)
//     return amount
// }

// export default async (req, res) => {
//     const {id} = req.body;
//     const amount = calculateAmount(req.body)
//     try {
//         const payment = await stripe.paymentIntents.create({
//             amount,
//             currency: "gbp",
//             description: "Job Post",
//             payment_method: id,
//             confirm: true

//         })
//         .then(response => {
//             if (response.status == "succeeded"){
//                 // add to database
//                 console.log("we're gonna write to db")
//                 firebase.collection("jobs").add({
//                     companyName : req.body.companyName,

//                 })
                
//             }
//         })
//         res.redirect(200, "/") // this won't work serverside so find another way to show "success/failed page"
//     } catch (error) {
//         switch (error.type) {
//             case 'StripeCardError':
//               // A declined card error
//               console.log("sutn went yonk")
//               console.log(error.statusCode)
//               console.log(error.message)
//               res.status(error.statusCode).send(error.message) // => e.g. "Your card's expiration year is invalid."
//               break;
//             case 'StripeRateLimitError':
//               // Too many requests made to the API too quickly
//               break;
//             case 'StripeInvalidRequestError':
//               // Invalid parameters were supplied to Stripe's API
//               break;
//             case 'StripeAPIError':
//               // An error occurred internally with Stripe's API
//               break;
//             case 'StripeConnectionError':
//               // Some kind of error occurred during the HTTPS communication
//               break;
//             case 'StripeAuthenticationError':
//               // You probably used an incorrect API key
//               break;
//             default:
//               // Handle any other types of unexpected errors
//               break;
//           }        
//     }
// }