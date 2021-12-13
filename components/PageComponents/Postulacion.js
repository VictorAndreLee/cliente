import React, { useEffect, useState, useContext } from 'react';
import DropzoneCopia from './DropzoneCopia';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import AdmisionContext from '../../context/admision/AdmisionContext';
import { gql, useMutation, useQuery } from "@apollo/client";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
      tipoUsuario
    }
  }

`;

const NUEVA_ADMISION = gql`
  mutation nuevaAdmision($input: AdmisionInput, $file1: Upload, $file2: Upload, $file3: Upload) {
  nuevaAdmision(input: $input, file1: $file1, file2: $file2, file3: $file3) 
    
  }
`;

const Postulacion = () => {
    const [ contador, setContador ] = useState(0)
    const router = useRouter();
    const  { loading, error, data, refetch }= useQuery(OBTENER_USUARIO);
    
    const [nuevaAdmision] = useMutation(NUEVA_ADMISION);
    
    const admisionContext = useContext(AdmisionContext);
    
    const { 
        postulacionFile,
        borrarArchivosPostulacion
    } = admisionContext;

    useEffect(() => {
      refetch();
      setContador(postulacionFile.length)
    }, [postulacionFile]);

    if (loading) return null; 

    const redirigirPanel = () => {
        router.push('/postulacion')
    }
    const enviarCopia = async () => {
      const {obtenerUsuario} = data
        // console.log(postulacionFile);
        console.log(obtenerUsuario.id); 
        try {
          
          const guardarAdmision = await nuevaAdmision({
            variables: {
              input: {
                idApoderado: obtenerUsuario.id,
                nombreApoderado: obtenerUsuario.nombre,
                apellidoApoderado: obtenerUsuario.apellido,
                estadoAdmision: 'Pendiente',
                estadoProgramacion: 'Bloqueado',
                estadoFirma: 'Bloqueado',
                estadoMatricula: 'Bloqueado'
              },
              file1: postulacionFile[0],
              file2: postulacionFile[1],
              file3: postulacionFile[2],
            }
          })
          borrarArchivosPostulacion()
          toast.success(guardarAdmision.data.nuevaAdmision, {
            autoClose: 3000,
          });
          setTimeout(() => {
            router.push('/postulacion')
          }, 3000);
        } catch (error) {
          console.log(error);
        }
    }

    const estados = (estado = 'pendiente') => {
      switch(estado) {
        case 'pendiente': return(
          <div className="text-yellow-500 ml-2 w-1 flex items-center">
            <p>
              Pendiente
            </p>
            <div className="animate-pulse flex ml-1">
              <FontAwesomeIcon className="opacity-80" size="xs" icon={faCircle}/>
              <FontAwesomeIcon className="opacity-60" size="xs" icon={faCircle}/>
              <FontAwesomeIcon className="opacity-40" size="xs" icon={faCircle}/>
            </div>
          </div>
        )
        case 'cargado': return(
          <div className=" flex ml-1 text-green-dark">
              <p>Listo para enviar</p>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
          </div>
        )
      }
    }

    return (
        <div className="md:w-4/5 xl:w-full h-full mx-auto mb-32">
          <ToastContainer />
          <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg text-gray-700 py-14">
            <DropzoneCopia />
            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
              <h2 className="text-4xl font-sans font-bold my-4">
                {" "}
                Entrega de documentos{" "}
              </h2>
              <p className="text-lg text-green-500 font-bold">
                Se solicita los siguientes documentos
              </p>
              <ul className="py-0 my-0 font-semibold list-decimal list-inside bg-rose-200">
                <div className="flex">
                 <li>Copia del DNI del estudiante.</li>
                  {contador !== 0 ? estados("cargado") : estados()}
                </div>
                <div className="flex">
                <li>Copia del DNI del padre de familia.</li>
                  {contador !==1 && contador !== 0  ? estados("cargado") : estados()}
                </div>
                <div className="flex">
                <li>Copia de la libreta de notas o informe de progreso.</li>
                  {contador === 3 ? estados("cargado") : estados()}
                </div>
                
                
              </ul>
    
              <p className="text-lg leading-loose">
                <span className="text-green-500 font-bold">
                  Requisitos de archivos
                </span>
              </p>
              <ul className="py-0 my-0 font-semibold list-decimal list-inside bg-rose-200">
                <li>Solo documentos en formato PDF</li>
                <li>El documento debe de pesar como máximo 5 MB</li>
                <li>
                  La cantidad aceptada de documentos es el número de archivos que se
                  solicita
                </li>
              </ul>
              <p className="text-lg ">
                <span className="text-green-500 font-bold">
                  Toma en consideración
                </span>{" "}
                en que los nombre de los documentos tengan una clara relación con la
                lista presentada
              </p>

                <button className="rounded text-white font-semibold bg-green-600 p-2 mx-2 mt-2 hover:bg-green-700" onClick={redirigirPanel}>
                    Regresar al panel del proceso
                </button>
                <button 
                disabled={contador === 3 ? false : true}
                className={contador === 3 ? 
                  "rounded text-white font-semibold bg-green-600 p-2 mx-2 mt-2 hover:bg-green-700" 
                  : 
                  "rounded text-white font-semibold bg-green-600 p-2 mx-2 mt-2 cursor-default opacity-50"} 
                onClick={enviarCopia}
                
                >
                    Enviar Documentos
                </button>
            </div>
          </div>
        </div>
      );
    
}

export default Postulacion
