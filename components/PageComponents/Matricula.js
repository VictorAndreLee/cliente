import React, { useEffect, useState, useContext } from "react";
import Dropzone from './DropzoneMatricula';
import AdmisionContext from '../../context/admision/AdmisionContext';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
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

const NUEVA_MATRICULA = gql`
mutation nuevaMatricula($input: AdmisionInput, $file1: Upload, $file2: Upload, $file3: Upload, $file4: Upload, $file5: Upload, $file6: Upload, $file7: Upload) {
  nuevaMatricula(input: $input, file1: $file1, file2: $file2, file3: $file3, file4: $file4, file5: $file5, file6: $file6, file7: $file7)
}
`;

const Matricula = () => {
  const [ contador, setContador ] = useState(0)
  const router = useRouter();
  const  { loading, error, data, refetch }= useQuery(OBTENER_USUARIO);
  const [nuevaMatricula] = useMutation(NUEVA_MATRICULA);

  const admisionContext = useContext(AdmisionContext);
  const { 
      matriculaFile,
      borrarArchivosMatricula
  } = admisionContext;

  useEffect(() => {
    refetch()
    setContador(matriculaFile.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matriculaFile]);

  const redirigirPanel = () => {
    router.push('/postulacion')
}

const enviarCopia = async () => {
  const {obtenerUsuario} = data
    // console.log(postulacionFile);
    console.log(obtenerUsuario.id); 
     try {
  
       const guardarMatricula = await nuevaMatricula({
         variables: {
           input: {
             idApoderado: obtenerUsuario.id,
             nombreApoderado: obtenerUsuario.nombre,
             apellidoApoderado: obtenerUsuario.apellido,
             estadoMatricula: 'Revisión pendiente'
           },
           file1: matriculaFile[0],
           file2: matriculaFile[1],
           file3: matriculaFile[2],
           file4: matriculaFile[3],
           file5: matriculaFile[4],
           file6: matriculaFile[5],
           file7: matriculaFile[6],
         }
       })
       borrarArchivosMatricula()
       console.log();
       toast.success(guardarMatricula.data.nuevaMatricula, {
         autoClose: 2200,
       });
       setTimeout(() => {
         router.push('/postulacion')
       }, 2200);
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
    <div className="md:w-4/5 xl:w-3/5 h-full mx-auto my-9">
      <ToastContainer />
      <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-14">
        <Dropzone />
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
          <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
            Entrega de documentos{" "}
          </h2>
          <p className="text-lg text-green-500 font-bold">
            Se solicita los siguientes documentos
          </p>
          <ul className="py-0 my-0 font-semibold list-decimal list-inside bg-rose-200">
            <div className="flex">
            <li>Ficha de matricula</li>
            {contador > 0  ? estados("cargado") : estados()}
            </div>
            <div className="flex">
            <li>Constancia</li>
            {contador > 1 ? estados("cargado") : estados()}
            </div>
            <div className="flex">
            <li>Certificado de estudio</li>
            {contador > 2 ? estados("cargado") : estados()}

            </div>
            <div className="flex">
            <li>Constancia de no adeudo</li>
            {contador > 3 ? estados("cargado") : estados()}

            </div>
            <div className="flex">
            <li>Libreta de notas</li>
            {contador > 4 ? estados("cargado") : estados()}

            </div>
            <div className="flex">
            <li>Libreta de comportamiento</li>
            {contador > 5 ? estados("cargado") : estados()}

            </div>
            <div className="flex">
            <li>Constancia de traslado</li>
            {contador > 6 ? estados("cargado") : estados()}

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
                disabled={contador === 7 ? false : true}
                className={contador === 7 ? 
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
};

export default Matricula;
