import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./paymentForm"

const PUBLIC_KEY = "pk_test_51MOHCjEZc0pM0di2IDHRQc9PjbE28B01qoLZ0Qcw0gVpH07gciSnqU2UfPUs19Co5ubBhE0tgnonnSgsnKTE5hrw00nGWGJ2rg"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(props) {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm currentOrderPrice={props.currentOrderPrice} submitOrder={props.submitOrder}/>
		</Elements>
	)
}
