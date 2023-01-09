import React from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "./paymentForm"


const PUBLIC_KEY = "pk_live_51MOHCjEZc0pM0di2hALU7sOKfa2S7tsyXkX2tmE5FOPnaqQdifeh0QrNtXaot1EX2ovxA3pqnBd4iXLsVuLFNO6000LZNvf1LA"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  )
}
