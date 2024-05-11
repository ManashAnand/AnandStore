"use client";

import { loadStripe } from '@stripe/stripe-js';

export async function checkout({lineItems,customerEmail }) {


      let stripePromise = null;
      let getStripe = async () => {
        if(!stripePromise){
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIP_KEY);
        }
        return stripePromise
             }
        const stripe = await getStripe()
        await stripe.redirectToCheckout({
            mode:"payment",
            lineItems,
            customerEmail, // Add customer email
            billingAddressCollection: 'required', // Collect billing address
            successUrl:`${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: window.location.url
        })
}

