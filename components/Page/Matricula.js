import React from "react";
import Dropzone from './DropzoneMatricula';

const Matricula = () => {
  return (
    <div className="md:w-4/5 xl:w-3/5 h-full mx-auto mb-32">
      <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-14">
        <Dropzone />
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
          <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
            {" "}
            Segundo paso{" "}
          </h2>
          <p className="text-lg text-green-500 font-bold">
            Se solicita los siguientes documentos
          </p>
          <ul className="py-0 my-0 font-semibold list-decimal list-inside bg-rose-200">
            <li>Ficha de matricula</li>
            <li>Constancia</li>
            <li>Certificado de estudio</li>
            <li>Constancia de no adeudo</li>
            <li>Libreta</li>
            <li>Comportamiento</li>
            <li>Copia de DNI</li>
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
          {/* <Link href="/registrar-datos">
                            <a className="text-green-500 font-bold text-lg hover:text-green-700">Registrar datos de apoderado y alumno</a>
                        </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Matricula;
