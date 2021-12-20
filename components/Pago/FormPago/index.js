import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements  } from '@stripe/react-stripe-js';
import { size } from 'lodash'
import { useMutation, gql } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PAGAR = gql`
    mutation nuevoPago($input: OrderInput) {
    nuevoPago(input: $input) {
        id
        nombre
        idApoderado
        monto
        motivo
        apellido
    }
    }
`;

const FormPago = ({data}) => {
    const [loading, setLoading] = useState(false)
    const [clientSecret, setClientSecret] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const [ nuevoPago ] = useMutation(PAGAR);

    const totalPagar = 450;

    const {  id, idApoderado, nombreApoderado, apellidoApoderado } = data.obtenerApoderadoEstado; 
    // console.log("assadasdaad",data.obtenerApoderadoEstado);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const result = await stripe.createToken(cardElement);

        if(result.error){
            toast.error(result.error.message)
        }else {
            // console.log( result.token);
            // stripe.confirmCardPayment(result, {
            //     payment_method: {
            //         card: elements.getElement(CardElement)
            //     }
            // }).then(async({ paymentIntent }) => {
                try {
                    const pagar = await nuevoPago({
                        variables: {
                            input: {
                                idApoderado,
                                nombre: nombreApoderado,
                                apellido: apellidoApoderado,
                                motivo: "Matricula",
                                monto: totalPagar,
                                token: result.token
                            }
                        }
                    })
                    toast.success("Pago Completado");
                } catch (error) {
                    toast.error("Error al realizar el pago");
                    console.log(error);
                    return null
                }
            // }) 

            
            
        }
    }
    
    return (
        <form 
        className='w-2/3 '
        onSubmit={e => handleSubmit(e)}
        >
            <ToastContainer />
            <CardElement className='p-3 border-2 rounded-xl border-gray-300 shadow-lg'>Formulario pago</CardElement>
            <button type='submit' className='m-4 py-2 px-3 bg-green-dark rounded-xl text-white text-base shadow-md hover:bg-green'>Pagar</button>
        </form>
    )
}

export default FormPago
