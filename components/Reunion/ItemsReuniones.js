import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ACTUALIZAR_ESTADO_PROGRAMACION = gql`
    mutation actualizarEstadoProgramacion($id: ID!, $input: String!) {
        actualizarEstadoProgramacion(id: $id, input: $input)
    }
`;

const ItemsReuniones = ({item}) => {
    const [ actualizarEstadoProgramacion ] = useMutation(ACTUALIZAR_ESTADO_PROGRAMACION);
    const { estadoProgramacion, apellidoApoderado, nombreApoderado, creado, id } = item

    const [EstadoPro, setEstadoProgr ] = useState(estadoProgramacion);
    const estadosColoresPro = () => {
        if (EstadoPro === 'Rechazado') {
            return 'mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-800 uppercase text-xs font-bold'
        } else if (EstadoPro === 'Programacion pendiente') {
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-800 uppercase text-xs font-bold'
        } else if (EstadoPro === 'Aprobado'){
            return 'mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-800 uppercase text-xs font-bold'
        } else if (EstadoPro === 'Bloqueado'){
            return 'mt-1 mb-2 appearance-none bg-gray-700 border border-gray-700 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-gray-900 focus:border-gray-900 uppercase text-xs font-bold'
        }
    }

    const cambiarEstadoProgra = async estado => {
        try {
            const { data } = await actualizarEstadoProgramacion({
                variables:{
                    id,
                    input: estado
                }
            })
            setEstadoProgr(data.actualizarEstadoProgramacion)
        } catch (error) {
            toast.error(error.message, {
                autoClose: 3000,
            });  
        }
    }
    return (
        <div className='bg-white text-gray-800 shadow-2xl my-3'>
            <div className="px-4 py-2 flex justify-around items-center">
            <ToastContainer />
                <h1 className=' font-bold text-base m-4'>
                    Reunión con el apoderado: 
                </h1>
                <p className='font-bold text-lg'>
                    {nombreApoderado} {apellidoApoderado}
                </p> 
            </div>
            <div className="w-2/4 mx-auto">
                <p className='text-base text-center'>Seleccione estado de la reunión</p>
                <div className='flex justify-evenly mt-2'>
                    <div>
                        
                        <select
                            value={ EstadoPro }
                            className= {estadosColoresPro()}
                            onChange={ e => cambiarEstadoProgra(e.target.value)}
                        >
                            <option value="Aprobado">Aprobado</option>
                            <option value="Programacion pendiente">Pendiente</option>
                            <option value="Bloqueado">Bloqueado</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>

                    </div>
                </div>
            </div>
            <div className='flex justify-around bg-gray-100 font-semibold mt-2'>
                <p>Fecha de reunión registrada</p>
                <p>
                    {creado}
                </p>
            </div>
        </div>
    )
}

export default ItemsReuniones
