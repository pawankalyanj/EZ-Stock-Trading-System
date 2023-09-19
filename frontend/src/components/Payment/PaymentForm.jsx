import React, {useState,useMemo} from "react";
import {  useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement } from "@stripe/react-stripe-js";
import './payment.css';
import { BASE_URL} from "../../utils/config";
import useResponsiveFontSize from "./responsiveFonts";
import useFetch from "../../hooks/useFetch.js"
        
        
        const useOptions = () => {
            const fontSize = useResponsiveFontSize();
            const options = useMemo(
                () => ({
                    style: {
                        base: {
                            fontSize,
                            color: "#424770",
                            letterSpacing: "0.025em",
                            fontFamily: "Source Code Pro, monospace",
                            "::placeholder": {
                                color: "#aab7c4"
                            }
                        },
                        invalid: {
                            color: "#9e2146"
                        }
                    }
                }),
                [fontSize]
            );
        
            return options;
        };
        
  
        
const PaymentForm =(totalAmount)=>{
    const [success,setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error,paymentMethod} = await  stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardNumberElement)
        });

       
        
        if(!error){
            try{
             const {id} = paymentMethod;
             const pay = {
                totalAmount: 10 ,
                id: {id}
             };

             console.log(" .   ", pay);
           
             const res = await fetch(`${BASE_URL}/payment`,{
                 method: 'post',
                 headers: {
                     'content-type': 'application/json'
                 },
                 credentials: 'include',
                 body: JSON.stringify(pay)
             });
     
             const resp = await res.json();
             if(res.ok){
                setSuccess(true);
             }
            }catch(err){
                console.log("Error",err.message);
            }
         }else{
            console.log("Error",error.message);
         }
    }


            return (    
        
        
                <form onSubmit={handleSubmit}>
                    <label>
                        Card number
                        <div className="CardInputWrapper">
                            <CardNumberElement
                                options={options}
                                onChange={event => {
                                }}
                            />
                        </div>
                    </label>
                    <label>
                        Expiration date
                        <div className="CardInputWrapper">
                            <CardExpiryElement
                                options={options}
                                onChange={event => {
                                }}
                            />
                        </div>
                    </label>
                    <label>
                        CVC
                        <div className="CardInputWrapper">
                            <CardCvcElement
                                options={options}
                                onChange={event => {
                                }}
                            />
                        </div>
                    </label>
                    <button onSubmit={handleSubmit} className="FormButton" style={{ width: '10%', borderRadius: '4px', marginTop: '16px' }}
                        type="submit" disabled={!stripe || !elements}>
                        Pay
                    </button>
                </form>
            );
}

export default PaymentForm;