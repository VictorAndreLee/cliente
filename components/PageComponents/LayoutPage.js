import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/dist/client/image";
import logo from "../../img/logo.jpg";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import AdmisionContext from "../../context/admision/AdmisionContext";


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

const Layout = ({ children }) => {
  const [user, setUser ] = useState(null)
  const  { loading, error, data, refetch }= useQuery(OBTENER_USUARIO);
  const router = useRouter();

  const admisionContext = useContext(AdmisionContext);
  const { usuario, cerrarSesion, guardarUsuario } = admisionContext;

  useEffect(() => {
    refetch();
  }, []);
  
  if(loading) return "Cargando...";

  const token = localStorage.getItem("token")
  const quitSesion = () => {
    localStorage.removeItem('token');
    cerrarSesion();
    router.push('/alumno-nuevo', null, { shallow: true });
  } 

  // if (Object.is(data.obtenerUsuario,undefined) || Object.is(data.obtenerUsuario,null))return 'Cargando...';
  // if(Object.keys(data).length !== 0 ){
    const { obtenerUsuario } = data;
  // }
    
    
  

  const userProfile = () => (
    <div className="flex items-center mx-9 z-30">
      <div className="">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-full" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        {
          obtenerUsuario && (
            <p>{ obtenerUsuario.nombre } {obtenerUsuario.apellido}</p>
          )
        }
      </div>
    <div>
     {/* <Link href="/"> */}
        <button className="p-4 rounded bg-transparent text-white cursor-pointer" onClick={() => quitSesion()}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
        </button>
     {/* </Link> */}
    </div>
    </div>
  )

  return (
    <>
      <Head>
        <title>Señor del Luren</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
          integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
        />
      </Head>
      <div>
        <header className="conte__header py-7">
          <div className="conte__header-p1">
            {/* { Object.keys(usuario).length > 0 && userProfile()} */}
            { token && userProfile()}
          </div>
          <div className="conte__header-p2">
            
            {/* { Object.keys(usuario).length === 0 && */}
            { !token &&
              (
                <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mt-1 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <p>902617118</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mt-1 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path
                    fillRule="evenodd"
                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <Link href="/login" passHref>
                  <p className="cursor-pointer">Administración</p>
                </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mt-1 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <Link href="/alumno-page" passHref>
                    <p className="cursor-pointer">Soy Alumno</p>
                  </Link>
               </>
              
              )
             
            }
            </div>
        </header>
     

        <nav className="conte--nave">
          <div className="nave--img">
            <Image src={logo} height="75" width="75" alt="busqueda" />
          </div>
          <div className="nave--lista">
            <Link href="/">
              <a>INICIO</a>
            </Link>
            {router.asPath === "/" || router.asPath.includes("#") ? (
              
              <Link href="#niveles">
                <a>NIVELES</a>
              </Link>
            ) : null}
            <Link href="/nosotros">
              <a>NOSOTROS</a>
            </Link>
           

            <Link href={token ? '/postulacion' : "/admision"}>
              <a>ADMISIÓN</a>
            </Link>
          </div>
        </nav>
      </div>

      <>{children}</>
      <div>
        <footer className="conte__footer">
          <h3>Señor de Luren © 2021</h3>
        </footer>

        <Link
          href="https://api.whatsapp.com/send?phone=+51972934806"
          target="_blank"
        >
          <svg viewBox="0 0 32 32" className="whatsapp-ico">
            <path
              d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z"
              fillRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </>
  );
};

export default Layout;
