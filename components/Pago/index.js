import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import FormPago from './FormPago';
const stripePrimise = loadStripe(process.env.STRIPE_TOKEN)

const Pago = ({data}) => {
    
    console.log("assfasasadsadad", stripePrimise);

    return (
        <div className=''>
            <div>PAGO</div>  
            <div className='bg-gray-200 shadow-xl p-5 mt-2 rounded-lg'>
                <Elements stripe={stripePrimise} >
                    <FormPago data={data} /> 
                </Elements>
            </div>
        </div>
    )
}

export default Pago
