import React, { useState } from "react";
import Layout from "../components/Page/LayoutPage";
import { gql, useQuery } from "@apollo/client";
import hoja from "../img/hoja.svg";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";

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

const PostulacionScreen = () => {
  const { data, loading, erro } = useQuery(OBTENER_USUARIO);
  const [estado1, setEstado1] = useState("Pendiente");
  const [estado2, setEstado2] = useState("Bloqueado");
  const [estado3, setEstado3] = useState("Rechazado");
  const [estado4, setEstado4] = useState("Aprobado");
  const [estado5, setEstado5] = useState("Pendiente a revisión");
  const [estado6, setEstado7] = useState("Pendiente a programación");

  if (loading) return "Cargando...";
  const { obtenerUsuario } = data;
  const { nombre, apellido, email } = obtenerUsuario;

  const icons = (estado) => {
    if (estado === "Pendiente") {
      return (
        <div className="flex justify-between ml-20 text-left text-yellow-500">
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
    if (estado === "Pendiente a revisión") {
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
    if (estado === "Pendiente a programación") {
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

  return (
    <Layout>
      {/* <div className="md:w-4/5 xl:w-3/5 h-full mx-auto mb-32 bg-opacity-20">
        <div className="lg:flex p-5 lg:flex-col text-gray-700 rounded-lg py-14"> */}
      {/* subir copias                     */}
      <section className="conte__admi">
        <div className="conte__admi--espacio">
          <div className="conte__admi--espacio--titulo">
            <h1 className="mb-10 text-3xl text-black font-semibold mt-32 border-b-2 pb-3">
              Bienvenido{" "}
              <span className="text-green-500">
                {nombre} {apellido}
              </span>
            </h1>
            <p>Proceso de admisión para ser parte de la Gran Familia LURINA</p>
          </div>

          <div>
            <dl className="preg-resp">
              <dt>Postulación</dt>
              <div className="flex justify-between">
                {icons(estado1)}
                <div className="flex text-green-600 font-bold transition-all ease-out delay-75 duration-500 transform hover:-translate-y-1">
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
                </div>
              </div>
              <dd>
                Presenta los siguientes documentos para iniciar el proceso de
                admisión
              </dd>

              <dd>
                <Image src={hoja} />
                Copia del DNI del estudiante.
                <br />
                <Image src={hoja} />
                Copia del DNI del padre de familia.
                <br />
                <Image src={hoja} />
                Copia de la libreta de notas o informe de progreso.
              </dd>

              <dt>Agendaremos una entrevista con el área de psicología.</dt>
              {icons(estado2)}
              <dd>Lorem ipsum dolor sit amet consectetur.</dd>
              <dt>
                Firma del conocimiento y conformidad del reglamento interno que
                se encuentra en la página web del colegio.
              </dt>
              {icons(estado3)}
              <dd>Lorem ipsum dolor sit amet.</dd>

              <dt>MATRÍCULA</dt>
              <div className="flex justify-between">
                {icons(estado1)}
                <div className="flex text-green-600 font-bold transition-all ease-out delay-75 duration-500 transform hover:-translate-y-1">
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
                </div>
              </div>
              <dd>
                Para dar por efecto la matrícula del estudiante, solicitaremos
                lo siguiente:
              </dd>
              <dd>
                <Image src={hoja} /> Ficha única de matrícula de SIAGIE.
                <br />
                <Image src={hoja} />
                Constancia de matrícula de SIAGIE.
                <br />
                <Image src={hoja} />
                Certificado de estudios de años anteriores.
                <br />
                <Image src={hoja} />
                Resolución de traslado.
                <br />
                <Image src={hoja} />
                Dos fotos tamaño carnet.
              </dd>
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
