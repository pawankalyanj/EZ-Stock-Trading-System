import React from "react";
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRoutes } from "react-router-dom";
import { PUBLIC_KEY } from "../../utils/config";
import PaymentForm from "./PaymentForm"
import { useLocation } from "react-router-dom";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = ()=>{
    const state = useLocation();
    const {totalAmount} =  state;
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm totalAmount={totalAmount}/>
        </Elements>
    );
}

export default StripeContainer;


