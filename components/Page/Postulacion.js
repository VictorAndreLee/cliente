import React from 'react'
import DropzoneCopia from './DropzoneCopia';
import { useRouter } from 'next/router';

const Postulacion = () => {
    const router = useRouter();

    const redirigirPanel = () => {
        router.push('/postulacion')
    }

    const enviarCopia = () => {
        console.log("Enviando copia...");
    }
    return (
        <div className="md:w-4/5 xl:w-full h-full mx-auto mb-32">
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
                <li>Copia del DNI del estudiante.</li>
                <li>Copia del DNI del padre de familia.</li>
                <li>Copia de la libreta de notas o informe de progreso.</li>
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
                <button className="rounded text-white font-semibold bg-green-600 p-2 mx-2 mt-2 hover:bg-green-700" onClick={enviarCopia}>
                    Enviar Documentos
                </button>
            </div>
          </div>
        </div>
      );
    
}

export default Postulacion
