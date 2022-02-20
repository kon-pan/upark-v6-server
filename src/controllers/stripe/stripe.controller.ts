import { Request, Response } from 'express';
import { Stripe } from 'stripe';

const stripe = new Stripe(`${process.env.STRIPE_SK_TEST_KEY}`, {
  apiVersion: '2020-08-27',
});

export const createPaymentIntent = async (req: Request, res: Response) => {
  const cost = req.body.cost;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: cost * 100,
    currency: 'eur',
    payment_method_types: ['card'],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
