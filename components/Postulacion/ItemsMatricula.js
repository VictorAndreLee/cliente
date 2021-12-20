import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client'
import Link from 'next/link';
import pdf from "../../img/pdf.svg";
import Image from "next/dist/client/image";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ACTUALIZAR_CONST_TRASLADO = gql`
    mutation actualizarConstTraslado($id: ID!, $input: String!) {
    actualizarConstTraslado(id: $id, input: $input)
    }
`;
const ACTUALIZAR_FICH_MATRICULA = gql`
    mutation actualizarFichaMatricula($id: ID!, $input: String!) {
        actualizarFichaMatricula(id: $id, input: $input)
    }
`;
const ACTUALIZAR_CONST_MATRICULA = gql`
    mutation actualizarConstanciaMatri($id: ID!, $input: String!) {
        actualizarConstanciaMatri(id: $id, input: $input)
    }
`;
const ACTUALIZAR_CERTIFCADOS_ESTUDIO = gql`
    mutation actualizarCertificadoEstudios($id: ID!, $input: String!) {
        actualizarCertificadoEstudios(id: $id, input: $input)
    }
`;
const ACTUALIZAR_CONST_NO_ADEUDO = gql`
    mutation actualizarConstNoAdeudo($id: ID!, $input: String!) {
        actualizarConstNoAdeudo(id: $id, input: $input)
    }
`;
const ACTUALIZAR_LIBRETA_ESTUDIOS = gql`
    mutation actualizarLibreEstudios($id: ID!, $input: String!) {
        actualizarLibreEstudios(id: $id, input: $input)
    }
`;
const ACTUALIZAR_LIBRETA_COMPORTAMIENTO = gql`
    mutation actualizarLibretaComportamiento($id: ID!, $input: String!) {
        actualizarLibretaComportamiento(id: $id, input: $input)
    }
`;


const ItemsMatricula = ({item}) => {
    const [ actualizarConstTraslado ] = useMutation(ACTUALIZAR_CONST_TRASLADO);
    const [ actualizarFichaMatricula ] = useMutation(ACTUALIZAR_FICH_MATRICULA);
    const [ actualizarConstanciaMatri ] = useMutation(ACTUALIZAR_CONST_MATRICULA);
    const [ actualizarCertificadoEstudios ] = useMutation(ACTUALIZAR_CERTIFCADOS_ESTUDIO);
    
    const [ actualizarConstNoAdeudo ] = useMutation(ACTUALIZAR_CONST_NO_ADEUDO);
    
    const [ actualizarLibreEstudios ] = useMutation(ACTUALIZAR_LIBRETA_ESTUDIOS);
    
    const [ actualizarLibretaComportamiento ] = useMutation(ACTUALIZAR_LIBRETA_COMPORTAMIENTO);
    
    
    const {
        id,
        estadoFichaMatricula,
        nombreApoderado,
        apellidoApoderado,
        estadoConstancia,
        estadoCertificado, //libreta de estudio
        estadoCertoNoAdeu,
        estadoLibreMatri,
        estadoComportamiento,
        estadoCopiaDNI, // Traslado
        constancias,
        creado
    } = item

    const [EstadoFichatMatricula, setEstadoFichatMatricula  ] = useState(estadoFichaMatricula);
    const [EstadoConstanciaMatri, setEstadoConstanciaMatri ] = useState(estadoConstancia);
    const [EstadoCertificadoEstudio, setEstadoCertificadoEstudio  ] = useState(estadoLibreMatri);
    const [EstadoConstanciaNoAdeudo, setEstadoConstanciaNoAdeudo  ] = useState(estadoCertoNoAdeu);
    const [EstadoLibretaComportamiento, setEstadoLibretaComportamiento ] = useState(estadoComportamiento);
    const [EstadoConstTraslado, setEstadoConstTraslado  ] = useState(estadoCopiaDNI);
    const [EstadoLibretaEstudio, setEstadoLibretaEstudio  ] = useState(estadoCertificado);

    const cambiarFichaMatricula = async estado => {
        try {
            const { data } = await actualizarFichaMatricula({
                variables:{
                    id,
                    input: estado
                }
            })
            setEstadoFichatMatricula(data.actualizarFichaMatricula)
        } catch (error) {
            toast.success(error.message, {
                autoClose: 3000,
            });  
        }
    }
    const cambiarConstMatricula = async estado => {
        try {
            const { data } = await actualizarConstanciaMatri({
                variables:{
                    id,
                    input: estado
                }
            })
            setEstadoConstanciaMatri(data.actualizarConstanciaMatri)
        } catch (error) {
            toast.success(error.message, {
                autoClose: 3000,
            });  
        }
    }
    const cambiarCertificadoEstudio = async estado => {
        try {
            const { data } = await actualizarCertificadoEstudios({
                variables:{
                    id,
                    input: estado
                }
            })
            setEstadoCertificadoEstudio(data.actualizarCertificadoEstudios)
        } catch (error) {
            toast.success(error.message, {
                autoClose: 3000,
            });  
        }
    }
    const cambiarConstanciaNoAdeudo = async estado => {
        try {
            const { data } = await actualizarConstNoAdeudo({
                variables:{
                    id,
                    input: estado
                }
            })
            setEstadoConstanciaNoAdeudo(data.actualizarConstNoAdeudo)
        } catch (error) {
            toast.success(error.message, {
                autoClose: 3000,
            });  
        }
    }
    const cambiarLibretaComportamiento = async estado => {
        try {
            const { data } = await actualizarLibretaComportamiento({
                variables:{
                    id,
                    input: estado
                }
            })
            setEstadoLibretaComportamiento(data.actualizarLibretaComportamiento)
        } catch (error) {
            toast.success(error.message, {
                autoClose: 3000,
            });  
        }
    }
    const cambiarConstTraslado = async estado => {
        try {
            const { data } = await actualizarConstTraslado({
                variables:{
                    id,
                    input: estado
                }
            })
            setEstadoConstTraslado(data.actualizarConstTraslado)
        } catch (error) {
            toast.success(error.message, {
                autoClose: 3000,
            });  
        }
    }
    const cambiarLibretaEstudio = async estado => {
        try {
            const { data } = await actualizarLibreEstudios({
                variables:{
                    id,
                    input: estado
                }
            })
            setEstadoLibretaEstudio(data.actualizarLibreEstudios)
        } catch (error) {
            toast.success(error.message, {
                autoClose: 3000,
            });  
        }
    }

    const estadosFichaMatricula = () => {
        if (EstadoFichatMatricula === 'Rechazado') {
            return ' mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (EstadoFichatMatricula === 'Pendiente') {
            return ' mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (EstadoFichatMatricula === 'Aprobado'){
            return ' mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    const estadosConstMatricula = () => {
        if (EstadoConstanciaMatri === 'Rechazado') {
            return ' mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (EstadoConstanciaMatri === 'Pendiente') {
            return ' mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (EstadoConstanciaMatri === 'Aprobado'){
            return ' mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    const estadoComportamientoMatr = () => {
        if (EstadoLibretaComportamiento === 'Rechazado') {
            return ' mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (EstadoLibretaComportamiento === 'Pendiente') {
            return ' mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (EstadoLibretaComportamiento === 'Aprobado'){
            return ' mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    const estadoNoAdeu = () => {
        if (EstadoConstanciaNoAdeudo === 'Rechazado') {
            return ' mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (EstadoConstanciaNoAdeudo === 'Pendiente') {
            return ' mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (EstadoConstanciaNoAdeudo === 'Aprobado'){
            return ' mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }  
    }   
    const estadoLibEstudio = () => {
        if (EstadoLibretaEstudio === 'Rechazado') {
            return ' mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (EstadoLibretaEstudio === 'Pendiente') {
            return ' mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (EstadoLibretaEstudio === 'Aprobado'){
            return ' mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        } 
    }
    
    const estadoConstTraslado = () => {
        if (EstadoConstTraslado === 'Rechazado') {
            return ' mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (EstadoConstTraslado === 'Pendiente') {
            return ' mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (EstadoConstTraslado === 'Aprobado'){
            return ' mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        } 
    }
     
    const estadosEstadoLibreta = () => {
        if (EstadoCertificadoEstudio === 'Rechazado') {
            return ' mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (EstadoCertificadoEstudio === 'Pendiente') {
            return ' mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (EstadoCertificadoEstudio === 'Aprobado'){
            return ' mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }

    if (item.constancias.length === 0){
    return (
        <div className='bg-white text-gray-800 shadow-2xl my-3'>
            <div className="px-4 py-2">
                <div className='flex justify-around items-center'>
                    <h1 className='font-bold text-lg m-4'>
                        El solicitante: 
                    </h1>
                    <p className='font-bold text-lg'>
                        {nombreApoderado} {apellidoApoderado}
                    </p>
                </div>
                 

                <div className="w-full mx-auto">
                    <p className='font-bold text-base text-center'>Aún no subió archivos necesarios para la matrícula</p> 
                </div>
            </div>
        </div>
    )
    } else 
    {return (
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
            <div className="w-full mx-auto">
                <p className='font-bold text-base text-center'>Archivos recibidos</p>
                <div className='flex justify-evenly lg:flex-row flex-col text-center mt-4'>
                    <div className='flex flex-col items-center'>
                        <Link href={constancias[0]}>
                            <a className="cursor-pointer flex flex-col items-center" >
                                <Image src={pdf} alt="archivo 1" />
                                <span>Ficha Matrícula</span>  
                            </a>
                        </Link>
                        <select
                            value={ EstadoFichatMatricula }
                            className= {estadosFichaMatricula()}
                            onChange={ e => cambiarFichaMatricula(e.target.value)}
                        >
                            <option value="Aprobado">Aprobado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>

                    </div>

                    <div className='flex flex-col items-center'>
                        <Link href={constancias[1]}>
                            <a className="cursor-pointer flex flex-col items-center">
                                <Image src={pdf} alt="archivo 2"/>  
                                <span>Const. Matrícula</span>  
                            </a>
                        </Link>
                        <select
                            value={ EstadoConstanciaMatri }
                            className={estadosConstMatricula()}
                            onChange={ e => cambiarConstMatricula(e.target.value)}
                        >
                            <option value="Aprobado">Aprobado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>
                    </div>

                    <div className='flex flex-col items-center'>
                        <Link href={constancias[2]}>
                            <a className="cursor-pointer flex flex-col items-center">
                                <Image src={pdf} alt="archivo 3" /> 
                                <span>Certificado estudio</span>  
                            </a>
                        </Link>
                        <select
                            value={ EstadoCertificadoEstudio }
                            className={estadosEstadoLibreta()}
                            onChange={ e => cambiarCertificadoEstudio(e.target.value)}
                        >
                            <option value="Aprobado">Aprobado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Link href={constancias[3]}>
                            <a className="cursor-pointer flex flex-col items-center" >
                                <Image src={pdf} alt="archivo 1" />
                                <span>Const. No Adeudo</span>  
                            </a>
                        </Link>
                        <select
                            value={ EstadoConstanciaNoAdeudo }
                            className= {estadoNoAdeu()}
                            onChange={ e => cambiarConstanciaNoAdeudo(e.target.value)}
                        >
                            <option value="Aprobado">Aprobado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>

                    </div>

                    <div className='flex flex-col items-center'>
                        <Link href={constancias[4]}>
                            <a className="cursor-pointer flex flex-col items-center">
                                <Image src={pdf} alt="archivo 2"/>  
                                <span>Lib. Estudios</span>  
                            </a>
                        </Link>
                        <select
                            value={ EstadoLibretaEstudio }
                            className={estadoLibEstudio()}
                            onChange={ e => cambiarLibretaEstudio(e.target.value)}
                        >
                            <option value="Aprobado">Aprobado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>
                    </div>

                    <div className='flex flex-col items-center'>
                        <Link href={constancias[5]}>
                            <a className="cursor-pointer flex flex-col items-center">
                                <Image src={pdf} alt="archivo 3" /> 
                                <span>Lib. Comportamiento</span>  
                            </a>
                        </Link>
                        <select
                            value={ EstadoLibretaComportamiento }
                            className={estadoComportamientoMatr()}
                            onChange={ e => cambiarLibretaComportamiento(e.target.value)}
                        >
                            <option value="Aprobado">Aprobado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Link href={constancias[6]}>
                            <a className="cursor-pointer flex flex-col items-center">
                                <Image src={pdf} alt="archivo 3" /> 
                                <span>Const. traslado</span>  
                            </a>
                        </Link>
                        <select
                            value={ EstadoConstTraslado }
                            className={estadoConstTraslado()}
                            onChange={ e => cambiarConstTraslado(e.target.value)}
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
    )}
}

export default ItemsMatricula
