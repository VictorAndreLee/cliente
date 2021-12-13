import React, { useEffect } from 'react'
import Layout from '../../components/PageComponents/LayoutPage';
import { gql, useQuery } from "@apollo/client";

const OBTENER_APODERADO_ESTADO = gql`
   query obtenerApoderadoEstado {
    obtenerApoderadoEstado {
      id
      idApoderado
      estadoDniEst
      estadoDniApo
      estadoLibreta
    }
  }
`;
const EstadoRevision = () => {
    const { data, loading, error, refetch } = useQuery(OBTENER_APODERADO_ESTADO);

    useEffect(() => {
        refetch()
    }, [data]);
    
    if (loading) return "Cargando...";
    
    const { obtenerApoderadoEstado: {estadoDniEst, estadoDniApo, estadoLibreta} } = data;
    const estadosColoresEst = () => {
        if (estadoDniEst === 'Rechazado') {
            return 'mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (estadoDniEst === 'Pendiente') {
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (estadoDniEst === 'Aprobado'){
            return 'mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        } else if (estadoDniEst === 'Revisar'){
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    const estadosColoresApo = () => {
        if (estadoDniApo === 'Rechazado') {
            return 'mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (estadoDniApo === 'Pendiente') {
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (estadoDniApo === 'Aprobado'){
            return 'mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        } else if (estadoDniEst === 'Revisar'){
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    const estadosColoresLibreta = () => {
        if (estadoLibreta === 'Rechazado') {
            return 'mt-1 mb-2 appearance-none bg-red-600 border border-red-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-red-800 focus:border-red-500 uppercase text-xs font-bold'
        } else if (estadoLibreta === 'Pendiente') {
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-yellow-800 focus:border-yellow-500 uppercase text-xs font-bold'
        } else if (estadoLibreta === 'Aprobado'){
            return 'mt-1 mb-2 appearance-none bg-green-600 border border-green-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        } else if (estadoDniEst === 'Revisar'){
            return 'mt-1 mb-2 appearance-none bg-yellow-600 border border-yellow-600 text-white p-1 text-center rounded leading-tight focus:outline-none  focus:bg-green-800 focus:border-green-500 uppercase text-xs font-bold'
        }
    }
    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 h-full mt-12 mx-auto mb-32 bg-opacity-20">
                <div className=" md:shadow-lg p-5 bg-white rounded-lg py-14">
                    <h1 className="text-2xl text-gray-800 font-light">Estado de revisión de copias enviadas</h1>
                    <div className='flex justify-around w-full  mt-16'>
                        <div className='border my-4 shadow-xl p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-600 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            <div className='text-center'>
                                <p className='font-semibold text-gray-700'>Copia del Estudiante</p>
                                <p className={estadosColoresEst()}>{estadoDniEst === "Revisar" ? 'Aún no revisado' : estadoDniEst}</p>
                            </div>
                        </div>
                        <div className='border my-4 shadow-xl p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-600 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            <div className='text-center'>
                                <p className='font-semibold text-gray-700'>Copia del Apoderado</p>
                                <p className={estadosColoresApo()}>{estadoDniApo === "Revisar" ? 'Aún no revisado' : estadoDniApo}</p>
                            </div>
                        </div>
                        <div className='border my-4 shadow-xl p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-600 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            <div className='text-center'>
                                <p className='font-semibold text-gray-700'>Copia de libreta de notas</p>
                                <p className={estadosColoresLibreta()}>{estadoLibreta === "Revisar" ? 'Aún no revisado' : estadoLibreta}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default EstadoRevision
