
// export const stripeAction = async () => {
//   const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'Deposito',
//             },
//             unit_amount: 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       cancel_url: 'tatatakae',
//       success_url: 'hecho y derecho',
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
