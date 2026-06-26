import stripe from 'stripe'


export const stripeWebhook = async (request, response) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
    let event;
    if (endpointSecret) {
        //getting signature sent by stripe

        const signature = request.headers['stripe-signature'];
        
    }
    
}