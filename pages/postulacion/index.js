import React, { useState, useContext, useEffect } from "react";
import Layout from "../../components/PageComponents/LayoutPage";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import hoja from "../../img/hoja.svg";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import Pago from "../../components/Pago";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OBTENER_APODERADO_ESTADO = gql`
   query obtenerApoderadoEstado {
    obtenerApoderadoEstado {
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
    }
  }
`;

const PostulacionScreen = () => {

  const [Admision, setAdmision] = useState('Pendiente')
  const [Programacion, setProgramacion] = useState('Bloqueado')
  const [Matricula, setMatricula] = useState('Bloqueado')
  const [Firma, setFirma] = useState('Bloqueado')
  const { data, loading, error, refetch } = useQuery(OBTENER_APODERADO_ESTADO);
  
  
  useEffect(() => {
    if(data) {
      refetch()
      const { obtenerApoderadoEstado } = data;
      const { 
        estadoAdmision,
        estadoProgramacion,
        estadoMatricula,
        estadoFirma 
      } = obtenerApoderadoEstado
      setAdmision(estadoAdmision)
      setProgramacion(estadoProgramacion)
      setMatricula(estadoMatricula)
      setFirma(estadoFirma)
      console.log(obtenerApoderadoEstado);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  
  if (loading) return "Cargando...";

  const icons = (estado) => {
    if (estado === "Pendiente") {
      return (
        <div className="flex justify-between ml-20 text-left text-yellow-500">
          <ToastContainer />
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-bold ">{estado}</p>
          </div>
        </div>
      );
    }
    if (estado === "Revisi??n pendiente") {
      return (
        <div
          className="flex justify-start ml-20 text-left text-blue-500"
          fill="currentColor"
        >
          <svg className="animate-spin h-5 w-5" viewBox="-10 -10 140 140">
            <circle fillRule="evenodd" cx="60" cy="10" r="7" opacity="0.2" />
            <circle fillRule="evenodd" cx="95" cy="25" r="8" opacity="0.3" />
            <circle fillRule="evenodd" cx="110" cy="60" r="9" opacity="0.4" />
            <circle fillRule="evenodd" cx="95" cy="95" r="10" opacity="0.5" />
            <circle fillRule="evenodd" cx="60" cy="110" r="11" opacity="0.6" />
            <circle fillRule="evenodd" cx="25" cy="95" r="12" opacity="0.7" />
            <circle fillRule="evenodd" cx="10" cy="60" r="13" opacity="0.8" />
            <circle fillRule="evenodd" cx="25" cy="25" r="15" opacity="1.0" />
          </svg>
          <p className="font-bold ">{estado}</p>
        </div>
      );
    }
    if (estado === "Bloqueado") {
      return (
        <div className="flex justify-start ml-20 text-left text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <p className="font-bold ">{estado}</p>
        </div>
      );
    }
    if (estado === "Rechazado") {
      return (
        <div className="flex justify-start ml-20 text-left text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <p className="font-bold ">{estado}</p>
        </div>
      );
    }
    if (estado === "Aprobado") {
      return (
        <div className="flex justify-start ml-20 text-left text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <p className="font-bold ">{estado}</p>
        </div>
      );
    }
    if (estado === "Programacion pendiente") {
      return (
        <div className="flex justify-start ml-20 text-left text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <p className="font-bold ">{estado}</p>
        </div>
      );
    }
  };

  // console.log(Admision);
  // console.log(Programacion);
  // console.log("asdsada", Matricula);
  return (
    <Layout>
      {/* <div className="md:w-4/5 xl:w-3/5 h-full mx-auto mb-32 bg-opacity-20">
        <div className="lg:flex p-5 lg:flex-col text-gray-700 rounded-lg py-14"> */}
      {/* subir copias                     */}
      <section className="conte__admi">
        <div className="conte__admi--espacio">
          <div className="conte__admi--espacio--titulo">
            {/* <h1 className="mb-10 text-3xl text-black font-semibold mt-32 border-b-2 pb-3">
              Bienvenido{" "}
              <span className="text-green-500">
                {nombre} {apellido}
              </span>
            </h1> */}
            <p>Proceso de admisi??n para ser parte de la Gran Familia LURINA</p>
          </div>

          <div>
            <dl className="preg-resp">
              <dt>Postulaci??n</dt>
              <div className="flex justify-between">
                {icons(Admision)}
                <div className="flex text-green-600 font-bold transition-all ease-out delay-75 duration-500 transform hover:-translate-y-1">
                  
                  {
                    Admision === 'Pendiente' 
                    ? 
                    (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      <Link href="/entrega-copias">
                        <a className="hover:text-green-600">Entregar documentos</a>
                      </Link>
                    </>
                    )
                    :
                    (
                      <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                       <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <Link href="/postulacion/estado-postulacion">
                        <a className="hover:text-green-600">Ver estado de revisi??n</a>
                      </Link>
                      </>
                    )
                  }
                  
                </div>
              </div>
              <dd>
                Presenta los siguientes documentos para iniciar el proceso de
                admisi??n
              </dd>

              <dd>
                <Image src={hoja} alt="image"/>
                Copia del DNI del estudiante.
                <br />
                <Image src={hoja} alt="image"/>
                Copia del DNI del padre de familia.
                <br />
                <Image src={hoja} alt="image"/>
                Copia de la libreta de notas o informe de progreso.
              </dd>

              <dt>Agendaremos una entrevista con el ??rea de psicolog??a.</dt>
              {icons(Programacion)}
              <dd>Se contactar?? con usted en un plazo menos de 48 horas para agendar una entrevista</dd>
              {/* <dt>
                Firma del conocimiento y conformidad del reglamento interno que
                se encuentra en la p??gina web del colegio.
              </dt>
              {icons(Firma)}
              <dd>Lorem ipsum dolor sit amet.</dd> */}

              <dt>MATR??CULA</dt>
              <div className="flex justify-between">
                {icons(Matricula)}
                <div className="flex text-green-600 font-bold transition-all ease-out delay-75 duration-500 transform hover:-translate-y-1">
                  { Programacion === 'Aprobado' && (
                      
                      `${Matricula}` === 'Pendiente' 
                        ? 
                        (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          <Link href="/matricula-copias">
                            <a className="hover:text-green-600">Entregar documentos</a>
                          </Link>
                        </>
                        )
                        :
                        (
                          <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          <Link href="/postulacion/estado-matricula">
                            <a className="hover:text-green-600">Ver estado de revisi??n</a>
                          </Link>
                          </>
                        )
                  )
                  }
                </div>
              </div>
              <dd>
                Para dar por efecto la matr??cula del estudiante, solicitaremos
                lo siguiente:
              </dd>
              <dd>
                <Image src={hoja} alt="image" /> Ficha ??nica de matr??cula de SIAGIE.
                <br />
                <Image src={hoja} alt="image"/>
                Constancia de matr??cula de SIAGIE.
                <br />
                <Image src={hoja} alt="image" />
                Certificado de estudios de a??os anteriores.
                <br />
                <Image src={hoja} alt="image"/>
                Constancia de no adeudo
                <br />
                <Image src={hoja} alt="image"/>
                Libreta de estudios
                <br />
                <Image src={hoja} alt="image"/>
                Libreta de Comportamiento
                <br />
                <Image src={hoja} alt="image"/>
                Constancia de traslado
              </dd>
              
              { Matricula === "Aprobado" && 
                (
                  <dt>
                      <Pago 
                        data={data}
                      />
                  </dt> 
                )
              }
            </dl>

            
          </div>
        </div>
      </section>

      {/* <Postulacion /> */}
      {/* </div>
      </div> */}
    </Layout>
  );
};

export default PostulacionScreen;
