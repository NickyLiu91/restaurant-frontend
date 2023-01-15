import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
// import CheckoutForm from './checkoutForm.js'



// const PUBLIC_KEY = "pk_live_51MOHCjEZc0pM0di2hALU7sOKfa2S7tsyXkX2tmE5FOPnaqQdifeh0QrNtXaot1EX2ovxA3pqnBd4iXLsVuLFNO6000LZNvf1LA"
// const PUBLIC_KEY = "pk_test_rgWMA3zxjAtwaB6iV8b5W40x"
// const PUBLIC_KEY = "pk_test_51MOHCjEZc0pM0di2IDHRQc9PjbE28B01qoLZ0Qcw0gVpH07gciSnqU2UfPUs19Co5ubBhE0tgnonnSgsnKTE5hrw00nGWGJ2rg"

const StripeCheckoutPage = (props) => {
  const PUBLIC_KEY = "pk_test_51MOHCjEZc0pM0di2IDHRQc9PjbE28B01qoLZ0Qcw0gVpH07gciSnqU2UfPUs19Co5ubBhE0tgnonnSgsnKTE5hrw00nGWGJ2rg"

  const onToken = token => {
    // console.log(token)
    props.confirmPayment(token)
    alert("Payment Complete")
  }

  return (
    <StripeCheckout
    label="Pay"
    name="Input Info"
    // billingAddress
    // shippingAddress
    // amount={stripePrice}
    panelLabel="Buy Now"
    token={onToken}
    stripeKey={PUBLIC_KEY}
    />
  )
}

export default StripeCheckoutPage

// const stripePromise = loadStripe('pk_test_51MOHCjEZc0pM0di2IDHRQc9PjbE28B01qoLZ0Qcw0gVpH07gciSnqU2UfPUs19Co5ubBhE0tgnonnSgsnKTE5hrw00nGWGJ2rg');
//
// export default function StripeCheckoutPage() {
//   const options = {
//     // passing the client secret obtained from the server
//     clientSecret: '{{CLIENT_SECRET}}',
//   };
//
//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <CheckoutForm />
//     </Elements>
//   );
// };
