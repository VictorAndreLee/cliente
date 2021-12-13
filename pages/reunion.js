import React, { useEffect} from 'react'
import Layout from '../components/Layout/Layout';
import { gql, useQuery } from "@apollo/client";
import ItemsReuniones from '../components/Reunion/ItemsReuniones';

const OBTENER_APODERADO_ESTADO = gql`
   query obtenerApoderadoEstado {
    obtenerApoderadoEstado {
      id
      idApoderado
      estadoDniEst
      estadoDniApo
      estadoLibreta
      estadoProgramacion
    }
  }
`;

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
            creado
        }
    }
`;

const Reunion = () => {
    const { data, loading, error, refetch } = useQuery(OBTENER_ADMISIONES);
    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if(loading) return "cargando..."

    const { obtenerAdmisiones } = data;
    console.log(obtenerAdmisiones);
    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 h-full mt-12 mx-auto mb-32 bg-opacity-20">
            <div className=" md:shadow-lg p-5 bg-white rounded-lg py-14">
                    <h1 className="text-2xl text-gray-800 font-light">Estado de las reuniones</h1>
                    <div className='justify-around w-full  mt-16'>
                        {
                            obtenerAdmisiones.map(item => (
                                <ItemsReuniones 
                                  key={item.id}
                                  item={item}
                                />
                            ))
                        }
                    </div>
            </div>
            </div>
        </Layout>
    )
}

export default Reunion
