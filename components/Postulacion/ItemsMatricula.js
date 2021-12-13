import React from 'react';
import Link from 'next/link';
import pdf from "../../img/pdf.svg";
import Image from "next/dist/client/image";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemsMatricula = ({item}) => {

    const {
        id,
        estadoFichaMatricula,
        nombreApoderado,
        apellidoApoderado,
        estadoConstancia,
        estadoCertificado,
        estadoCertoNoAdeu,
        estadoLibreMatri,
        estadoComportamiento,
        estadoCopiaDNI,
        constancias,
        creado
    } = item

    const cambiarFichaMatricula = () => {
        console.log("cambiando...");
    }
    const cambiarConstMatricula = () => {
        console.log("cambiando...");
    }
    const cambiarEstadoLibreta = () => {
        console.log("cambiando...");
    }

    const estadosFichaMatricula = () => {
        if (estadoFichaMatricula === 'Rechazado') {
            return ' mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (estadoFichaMatricula === 'Pendiente') {
            return ' mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (estadoFichaMatricula === 'Aprobado'){
            return ' mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    const estadosConstMatricula = () => {
        if (estadoConstancia === 'Rechazado') {
            return ' mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (estadoConstancia === 'Pendiente') {
            return ' mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (estadoConstancia === 'Aprobado'){
            return ' mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    const estadosEstadoLibreta = () => {
        if (estadoLibreMatri === 'Rechazado') {
            return ' mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (estadoLibreMatri === 'Pendiente') {
            return ' mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (estadoLibreMatri === 'Aprobado'){
            return ' mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }

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
            <div className="w-full mx-auto">
                <p className='font-bold text-base text-center'>Archivos recibidos</p>
                <div className='flex justify-evenly mt-4'>
                    <div className='flex flex-col items-center'>
                        <Link href={constancias[0]}>
                            <a className="cursor-pointer flex flex-col items-center" >
                                <Image src={pdf} alt="archivo 1" />
                                <span>Ficha Matrícula</span>  
                            </a>
                        </Link>
                        <select
                            value={ estadoFichaMatricula }
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
                            value={ estadoConstancia }
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
                                <span>Último certificado estudio</span>  
                            </a>
                        </Link>
                        <select
                            value={ estadoLibreMatri }
                            className={estadosEstadoLibreta()}
                            onChange={ e => cambiarEstadoLibreta(e.target.value)}
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
                            value={ estadoCertoNoAdeu }
                            className= {estadosFichaMatricula()}
                            onChange={ e => cambiarFichaMatricula(e.target.value)}
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
                                <span>Lib. Notas</span>  
                            </a>
                        </Link>
                        <select
                            value={ estadoCertificado }
                            className={estadosConstMatricula()}
                            onChange={ e => cambiarConstMatricula(e.target.value)}
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
                            value={ estadoComportamiento }
                            className={estadosEstadoLibreta()}
                            onChange={ e => cambiarEstadoLibreta(e.target.value)}
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
                            value={ estadoCopiaDNI }
                            className={estadosEstadoLibreta()}
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

export default ItemsMatricula
