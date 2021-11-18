import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { gql, useQuery } from '@apollo/client';
import { Layout } from "antd";
import MenuSider from "./MenuSider";
import MenuTop from "./MenuTop";
import Login from "../Login";
// import DoctorContext from "../../context/doctor/DoctorContext";
// import MenuSiderDoct from "./MenuSiderDoct";

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

const LayoutA = ({ children }) => {
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;
  const { data, loading, error, refetch } = useQuery(OBTENER_USUARIO);
  const [ token, setToken ] = useState(null);
  // const doctorContext = useContext(DoctorContext);
  // const { obtenerDataDoctor, doctor } = doctorContext;
  const router = useRouter();

  useEffect(() => {
    refetch();
    setToken(localStorage.getItem("token"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if(tipo === "ADMIN" ) {
  //     setAdmin(true);
  //   } else {
  //     setAdmin(null);
  //   }
  // }, [tipo]);

  const redirigir = () => {
    router.push('/');
  }

  if(loading) return null;
  if (error) return `Error! ${error}`;
  const { obtenerUsuario } = data;
  
  if (Object.is(obtenerUsuario,undefined) || Object.is(obtenerUsuario,null) || !localStorage.getItem("token")) return (<Login />)
  
  // const { tipoUsuario } = obtenerUsuario
  // if(Object.keys(doctor).length === 0) {
  //   obtenerDataDoctor(obtenerUsuario)
  // }
  return (
    <>
        <Head>
          <title>Señor del Luren</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <link rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"/>
        </Head>

      {!token ? (
        <div>
          <p>Iniciar Sesión <a onClick={() => redirigir()}> </a></p>
        </div>
      ) : (
        
          <div>
          <div>
            <main>
            <Layout>
              <MenuSider menuCollapsed={menuCollapsed}></MenuSider>
              <Layout
                className="layout-admin"
                style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
              >
                <Header className="layout-admin__header">
                  <MenuTop
                    menuCollapsed={menuCollapsed}
                    setMenuCollapsed={setMenuCollapsed}
                  />
                </Header>
                <Content className="layout-admin__content">
                  { children }
                </Content>
                <Footer className="layout-admin__footer">
                  Copyright&copy; Señor del Luren
                </Footer>
              </Layout>
            </Layout>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutA;
