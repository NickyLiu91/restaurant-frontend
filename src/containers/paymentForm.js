import React from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

class PaymentForm extends React.Component {

  state = {
    success: false,
    pay: false
  }

  // let stripe = this.useStripe()
  // let elements = useElements()

  handleSubmit = async (e) => {
    e.preventDefault()
    const [error, paymentMethod] = await useStripe.createPaymentMethod({
      type: "card",
      card: useElements.getElement(CardElement)
    })

  if(!error) {
    try {
      const {id} = paymentMethod
    //   const response = await fetch(`http://localhost:3000/api/accounts`, {
    //     method: 'POST',
    //     headers: {
    //        'Content-Type': 'application/json',
    //        'Accept': 'application/json'
    //     },
    //     body: JSON.stringify(
    //     {
    //       amount: 1000,
    //       id
    //     }
    //    )
     //
    //    if(response.data.success) {
    //      console.log("Successful payment! ")
    //      setSuccess(true)
    //    }
    //  })
      const response = await axios.post("http://localhost:4000/payment", {
        amount: 1000,
        id
      })

      if(response.data.success) {
        console.log("Successful payment! ")
        // setSuccess(true)
        this.setState({
          success: true
        })
      }

    } catch (error) {
      console.log("Error", error)
    }
  } else {
    console.log(error.message)
  }
}

  render() {
    if (!this.state.success) {
      return (
        <>
          <form onSubmit={this.handleSubmit}>
            <fieldset className="FormGroup">
              <div className="FormRow">
                <CardElement options={CARD_OPTIONS}/>
              </div>
            </fieldset>
            <button>Pay</button>
          </form>
        </>
      )
    } else {
      return (
        <>
        <div>
          <h2>Purchase Successful!</h2>
        </div>
        </>
      )
    }

  }
}

export default PaymentForm
