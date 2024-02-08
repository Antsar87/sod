'use server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const revalidate = async (path) => {
  return revalidatePath(path);
};

export const stripeAction = async () => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Deposito',
            },
            unit_amount: 10000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      cancel_url: 'http://localhost:3000',
      success_url: 'http://localhost:3000',
    });

    console.log(session);
    return session;
  } catch (error) {
    console.log(error);
  }
};
