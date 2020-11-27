import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_KEY)

export default async (req, res) => {
    const {id, amount} = req.body;

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "gbp",
            description: "Job Post",
            payment_method: id,
            confirm: true

        })

        console.log(payment)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: error.message
        })
        
    }
}