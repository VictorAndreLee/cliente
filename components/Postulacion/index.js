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
            estadoPostulacion
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

    return (
        <>
            <h1 className="text-2xl text-gray-800 font-light">Revisión de documentos</h1>


            <div className="overflow-x-scroll">
                <table className="table-auto shadow-md mt-10 w-full w-lg">
                    <thead className="bg-gray-800">
                        <tr className="text-white">
                            <th className="w-1/5 py-2">Solicitante</th>
                            <th className="w-1/5 py-2">Documentos</th>
                            <th className="w-1/5 py-2">Fecha realizada</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {obtenerAdmisiones.map((item) => (
                            <TablaPostulaciones key={item.id} item={item} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Postulacion
