import { err } from 'inngest/types';
import stripe from 'stripe'
import prisma from '../configs/prisma.js';
import { inngest } from '../inngest/index.js';

export const stripeWebhook = async (request, response) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
    
    // ⚠️ IMPORTANT: For Stripe webhooks to work, request.body must be the RAW unparsed buffer.
    // If you are using Express, you need express.raw({ type: 'application/json' }) for this specific route.
    const signature = request.headers['stripe-signature'];
    let event;

    if (!endpointSecret) {
        console.error("Missing STRIPE_WEBHOOK_SECRET");
        return response.status(400).send("Webhook secret missing");
    }

    try {
        // Verify the signature
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            signature,
            endpointSecret
        );
    } catch (error) {
        console.log(`Webhook signature verification failed:`, error.message);
        return response.status(400).send(`Webhook Error: ${error.message}`);
    }

    try {
        switch (event.type) {
            // FIX 1: Listen for standard checkout completion
            case 'checkout.session.completed': {
                const session = event.data.object; // This IS the session directly!
                
                // Extract metadata directly from the session
                const { transactionId, appId } = session.metadata;

                if (appId === 'flipearn' && transactionId) {
                    console.log(`Processing successful payment for transaction: ${transactionId}`);
                    
                    const transaction = await prisma.transaction.update({
                        where: { id: transactionId },
                        data: { isPaid: true }
                    });

                    // send new credentials to the buyer
                    await inngest.send({
                        name: "app/purchase",
                        data: { transaction }
                    });

                    // mark the listing as sold
                    await prisma.listing.update({
                        where: { id: transaction.listingId },
                        data: { status: "sold" }
                    });

                    // add the amount to the user's balance
                    await prisma.user.update({
                        where: { id: transaction.ownerId },
                        data: { earned: { increment: transaction.amount } }
                    });
                }
                break;
            }
            
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        response.json({ received: true });
    } catch (error) {
        console.error("Webhook processing error:", error);
        response.status(500).send("Internal Server Error");
    }
}