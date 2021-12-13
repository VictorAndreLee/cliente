import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client'
import Image from "next/dist/client/image";
import Link from 'next/link';
import pdf from "../../img/pdf.svg";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ACTUALIZAR_ESTADO_ESTU = gql`
    mutation actualizarEstadoDniEst($id: ID!, $input: String!) {
    actualizarEstadoDniEst(id: $id, input: $input)
    }
`;
const ACTUALIZAR_ESTADO_APO = gql`
    mutation actualizarEstadoDniApo($id: ID!, $input: String!) {
    actualizarEstadoDniApo(id: $id, input: $input)
    }
`;
const ACTUALIZAR_ESTADO_LIBRETA = gql`
    mutation actualizarEstadoLibreta($id: ID!, $input: String!) {
    actualizarEstadoLibreta(id: $id, input: $input)
    }
`;

const TablaPostulaciones = ({item}) => {

    const [ actualizarEstadoDniEst ] = useMutation(ACTUALIZAR_ESTADO_ESTU);
    const [ actualizarEstadoDniApo ] = useMutation(ACTUALIZAR_ESTADO_APO);
    const [ actualizarEstadoLibreta ] = useMutation(ACTUALIZAR_ESTADO_LIBRETA);
    const {
        id,
        nombreApoderado,
        apellidoApoderado,
        creado,
        estadoDniEst,
        estadoDniApo,
        estadoLibreta,
        copias
    } = item;

    const [EstadoEst, setEstadoEst  ] = useState(estadoDniEst);
    const [EstadoApo, setEstadoApo  ] = useState(estadoDniApo);
    const [EstadoLibreta, setEstadoLibreta  ] = useState(estadoLibreta);

    const cambiarEstadoEst = async estado => {
        try {
            const { data } = await actualizarEstadoDniEst({
                variables:{
                    id,
                    input: estado
                }
            })
            setEstadoEst(data.actualizarEstadoDniEst)
        } catch (error) {
            toast.success(error.message, {
                autoClose: 3000,
            });  
        }
    }
    const cambiarEstadoApo = async estado => {
        try {
            const { data } = await actualizarEstadoDniApo({
                variables:{
                    id,
                    input: estado
                }
            })
            setEstadoApo(data.actualizarEstadoDniApo)
        } catch (error) {
            toast.error(error.message, {
                autoClose: 3000,
            });  
        }
    }
    const cambiarEstadoLibreta = async estado => {
        try {
            const { data } = await actualizarEstadoLibreta({
                variables:{
                    id,
                    input: estado
                }
            })
            setEstadoLibreta(data.actualizarEstadoLibreta)
        } catch (error) {
            toast.error(error.message, {
                autoClose: 3000,
            });  
        }
    }

    const estadosColoresEst = () => {
        if (EstadoEst === 'Rechazado') {
            return 'mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (EstadoEst === 'Pendiente') {
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (EstadoEst === 'Aprobado'){
            return 'mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    const estadosColoresApo = () => {
        if (EstadoApo === 'Rechazado') {
            return 'mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (EstadoApo === 'Pendiente') {
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (EstadoApo === 'Aprobado'){
            return 'mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    const estadosColoresLibreta = () => {
        if (EstadoLibreta === 'Rechazado') {
            return 'mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (EstadoLibreta === 'Pendiente') {
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (EstadoLibreta === 'Aprobado'){
            return 'mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    
    // console.log(EstadoEst);
    // console.log(EstadoApo);
    // console.log(EstadoLibreta);
    return (
        <div className='bg-white text-gray-800 shadow-2xl my-3'>
            <ToastContainer />
            <div className="px-4 py-2 flex justify-around items-center">
                <h1 className=' font-bold text-base m-4'>
                    Solicitante: 
                </h1>
                <p className='font-bold text-lg'>
                    {nombreApoderado} {apellidoApoderado}
                </p> 
            </div>
            <div className="w-2/4 mx-auto">
                <p className='font-bold text-base text-center'>Copias recibidas</p>
                <div className='flex justify-evenly mt-2'>
                    <div>
                        <Link href={copias[0]}>
                            <a className="cursor-pointer flex flex-col items-center" >
                                <Image src={pdf} alt="archivo 1" />
                                <span>Cop. Estudiante</span>  
                            </a>
                        </Link>
                        <select
                            value={ EstadoEst }
                            className= {estadosColoresEst()}
                            onChange={ e => cambiarEstadoEst(e.target.value)}
                        >
                            <option value="Aprobado">Aprobado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>

                    </div>

                    <div>
                        <Link href={copias[1]}>
                            <a className="cursor-pointer flex flex-col items-center">
                                <Image src={pdf} alt="archivo 2"/>  
                                <span>Cop. Apoderado</span>  
                            </a>
                        </Link>
                        <select
                            value={ EstadoApo }
                            className={estadosColoresApo()}
                            onChange={ e => cambiarEstadoApo(e.target.value)}
                        >
                            <option value="Aprobado">Aprobado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>
                    </div>

                    <div>
                        <Link href={copias[2]}>
                            <a className="cursor-pointer flex flex-col items-center">
                                <Image src={pdf} alt="archivo 3" /> 
                                <span>Cop. Libreta</span>  

                            </a>
                        </Link>
                        <select
                            value={ EstadoLibreta }
                            className={estadosColoresLibreta()}
                            onChange={ e => cambiarEstadoLibreta(e.target.value)}
                        >
                            <option value="Aprobado">Aprobado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='flex justify-around bg-gray-100 font-semibold mt-2'>
                <p>Fecha de solicitud</p>
                <p>
                    {creado}
                </p>
            </div>
        </div>
    )
}

export default TablaPostulaciones