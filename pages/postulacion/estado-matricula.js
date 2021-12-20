import React, { useEffect } from 'react';
import Layout from '../../components/PageComponents/LayoutPage';
import { gql, useQuery } from "@apollo/client";

const OBTENER_APODERADO_ESTADO = gql`
   query obtenerApoderadoEstado {
        obtenerApoderadoEstado {
        id
        idApoderado
        estadoFichaMatricula
        estadoConstancia
        estadoCertificado 
        estadoCertoNoAdeu
        estadoLibreMatri
        estadoComportamiento
        estadoCopiaDNI 
    }
  }
`;

const EstadoRevisionMatricula = () => {
    const { data, loading, error, refetch } = useQuery(OBTENER_APODERADO_ESTADO);
    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    
    if (loading) return "Cargando...";


    const { obtenerApoderadoEstado: {
        estadoFichaMatricula,
        estadoConstancia,
        estadoCertificado ,
        estadoCertoNoAdeu,
        estadoLibreMatri,
        estadoComportamiento,
        estadoCopiaDNI ,
    } } = data;

    const estadosFichaMatri = () => {
        if (estadoFichaMatricula === 'Rechazado') {
            return 'mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (estadoFichaMatricula === 'Pendiente') {
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (estadoFichaMatricula === 'Aprobado'){
            return 'mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        } else if (estadoFichaMatricula === 'Revisar'){
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    const estadosConstMatri = () => {
        if (estadoConstancia === 'Rechazado') {
            return 'mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (estadoConstancia === 'Pendiente') {
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (estadoConstancia === 'Aprobado'){
            return 'mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        } else if (estadoConstancia === 'Revisar'){
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    const estadosCertiEstudio = () => {
        if (estadoLibreMatri === 'Rechazado') {
            return 'mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (estadoLibreMatri === 'Pendiente') {
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (estadoLibreMatri === 'Aprobado'){
            return 'mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        } else if (estadoLibreMatri === 'Revisar'){
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    const estadosConstNoAdeu = () => {
        if (estadoCertoNoAdeu === 'Rechazado') {
            return 'mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (estadoCertoNoAdeu === 'Pendiente') {
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (estadoCertoNoAdeu === 'Aprobado'){
            return 'mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        } else if (estadoCertoNoAdeu === 'Revisar'){
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    const estadosLibEstudio = () => {
        if (estadoCertificado === 'Rechazado') {
            return 'mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (estadoCertificado === 'Pendiente') {
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (estadoCertificado === 'Aprobado'){
            return 'mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        } else if (estadoCertificado === 'Revisar'){
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    const estadosLibComportamiento = () => {
        if (estadoComportamiento === 'Rechazado') {
            return 'mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (estadoComportamiento === 'Pendiente') {
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (estadoComportamiento === 'Aprobado'){
            return 'mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        } else if (estadoComportamiento === 'Revisar'){
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    const estadosConsTraslado = () => {
        if (estadoCopiaDNI === 'Rechazado') {
            return 'mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (estadoCopiaDNI === 'Pendiente') {
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (estadoCopiaDNI === 'Aprobado'){
            return 'mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        } else if (estadoCopiaDNI === 'Revisar'){
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }


    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 h-full mt-12 mx-auto mb-32 bg-opacity-20">
                <div className=" md:shadow-lg p-5 bg-white rounded-lg py-14">
                    <h1 className="text-2xl text-gray-800 font-light">Estado de revisión de documentos enviados</h1>
                    <div className='flex justify-evenly lg:flex-row flex-col text-center w-full  mt-16'>
                        <div className='border my-4 shadow-xl p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-600 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            <div className='text-center'>
                                <p className='font-semibold text-gray-700'>Ficha Matricula</p>
                                <p className={estadosFichaMatri()}>{estadoFichaMatricula === "Revisar" ? 'Aún no revisado' : estadoFichaMatricula}</p>
                            </div>
                        </div>
                        <div className='border my-4 shadow-xl p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-600 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            <div className='text-center'>
                                <p className='font-semibold text-gray-700'>Constancia Matricula</p>
                                <p className={estadosConstMatri()}>{estadoConstancia === "Revisar" ? 'Aún no revisado' : estadoConstancia}</p>
                            </div>
                        </div>
                        <div className='border my-4 shadow-xl p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-600 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            <div className='text-center'>
                                <p className='font-semibold text-gray-700'>Certificado de estudio</p>
                                <p className={estadosCertiEstudio()}>{estadoLibreMatri === "Revisar" ? 'Aún no revisado' : estadoLibreMatri}</p>
                            </div>
                        </div>
                        <div className='border my-4 shadow-xl p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-600 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            <div className='text-center'>
                                <p className='font-semibold text-gray-700'>Constancia de no adeudo</p>
                                <p className={estadosConstNoAdeu()}>{estadoCertoNoAdeu === "Revisar" ? 'Aún no revisado' : estadoCertoNoAdeu}</p>
                            </div>
                        </div>
                        <div className='border my-4 shadow-xl p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-600 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            <div className='text-center'>
                                <p className='font-semibold text-gray-700'>Libreta de estudios</p>
                                <p className={estadosLibEstudio()}>{estadoCertificado === "Revisar" ? 'Aún no revisado' : estadoCertificado}</p>
                            </div>
                        </div>
                        <div className='border my-4 shadow-xl p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-600 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            <div className='text-center'>
                                <p className='font-semibold text-gray-700'>Libreta de comportamiento</p>
                                <p className={estadosLibComportamiento()}>{estadoComportamiento === "Revisar" ? 'Aún no revisado' : estadoComportamiento}</p>
                            </div>
                        </div>
                        <div className='border my-4 shadow-xl p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-600 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            <div className='text-center'>
                                <p className='font-semibold text-gray-700'>Constancia de traslado</p>
                                <p className={estadosConsTraslado()}>{estadoCopiaDNI === "Revisar" ? 'Aún no revisado' : estadoCopiaDNI}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default EstadoRevisionMatricula
