import React from 'react'
import StripeCheckout from 'react-stripe-checkout'


// const PUBLIC_KEY = "pk_live_51MOHCjEZc0pM0di2hALU7sOKfa2S7tsyXkX2tmE5FOPnaqQdifeh0QrNtXaot1EX2ovxA3pqnBd4iXLsVuLFNO6000LZNvf1LA"
// const PUBLIC_KEY = "pk_test_rgWMA3zxjAtwaB6iV8b5W40x"
// const PUBLIC_KEY = "pk_test_51MOHCjEZc0pM0di2IDHRQc9PjbE28B01qoLZ0Qcw0gVpH07gciSnqU2UfPUs19Co5ubBhE0tgnonnSgsnKTE5hrw00nGWGJ2rg"

const StripeButton = ({price}) => {
  const stripePrice = price * 100
  const PUBLIC_KEY = "pk_test_51MOHCjEZc0pM0di2IDHRQc9PjbE28B01qoLZ0Qcw0gVpH07gciSnqU2UfPUs19Co5ubBhE0tgnonnSgsnKTE5hrw00nGWGJ2rg"

  const onToken = token => {
    console.log(token)
    alert("Payment Complete")
  }

  return (
    <StripeCheckout
    label="Buy Now"
    name="Test Name"
    billingAddress
    shippingAddress
    description={`Your total is $${price}`}
    amount={stripePrice}
    panelLabel="Buy Now"
    token={onToken}
    stripeKey={PUBLIC_KEY}
    />
  )
}

export default StripeButton
