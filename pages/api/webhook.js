import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { buffer } from 'micro';

const endpointSecret = "whsec_6ded623aaa6f76773a6083ce8474f2b52017c47c560d75c614d52c56ec4b3e52";

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        // Update the order's paid status to true
        await Order.findByIdAndUpdate(orderId, { paid: true });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send('OK');
}

export const config = {
  api: {
    bodyParser: false,
  },
};
