import React from 'react';
import { useMutation, useQuery, gql } from "@apollo/client";
import TablaPostulaciones from "./TablaPostulaciones";

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
            copias
            constancias
            creado
        }
    }
`;

const Postulacion = () => {

    const { data, loading, error } = useQuery(OBTENER_ADMISIONES);

    if(loading) return "cargando..."

    const { obtenerAdmisiones } = data;
    console.log(obtenerAdmisiones);
    return (
        <>
            <h1 className="text-2xl text-gray-800 font-light">Revisión de documentos</h1>


            <div className="overflow-x-scroll">
                <div className="shadow-md mt-10 w-full max-lg flex justify-center">
                    <div className='w-2/3'>
                        {   
                            obtenerAdmisiones.length === 0 ? 
                            (
                                <p className='text-center font-bold text-base'>Aun no hay solicitud de postulaciones</p>
                            )
                            :
                           obtenerAdmisiones.map(item => (
                                <TablaPostulaciones 
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

export default Postulacion
