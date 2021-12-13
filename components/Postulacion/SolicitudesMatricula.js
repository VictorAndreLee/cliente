import React from 'react';
import { useMutation, useQuery, gql } from "@apollo/client";
import ItemsMatricula from "./ItemsMatricula";

const OBTENER_ADMISIONES = gql`
    query obtenerAdmisiones {
        obtenerAdmisiones {
            id
            idApoderado
            nombreApoderado
            apellidoApoderado
            estadoAdmision
            estadoDniEst
            estadoDniApo
            estadoLibreta
            estadoProgramacion
            estadoFirma
            estadoMatricula
        estadoFichaMatricula
        estadoConstancia
        estadoCertificado
        estadoCertoNoAdeu
        estadoLibreMatri
        estadoComportamiento
        estadoCopiaDNI
            copias
            constancias
            creado
        }
    }
`;
const SolicitudesMatricula = () => {

    const { data, loading, error } = useQuery(OBTENER_ADMISIONES);

    if(loading) return "cargando..."

    const { obtenerAdmisiones } = data;

    

    return (
        <>
            <h1 className="text-2xl text-gray-800 font-light">Revisión de documentos</h1>


            <div className="overflow-x-scroll">
                <div className="shadow-md mt-10 w-full max-lg flex justify-center">
                    <div className='w-2/3'>
                        {
                            obtenerAdmisiones.map(item => (
                                <ItemsMatricula 
                                    key={item.id}
                                    item={item}
                                />     
                            ))
                        }
                           
                    </div>
                </div>
            </div>
        </>
    )
}

export default SolicitudesMatricula
