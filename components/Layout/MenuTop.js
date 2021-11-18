import React from "react";
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

const OBTENER_USUARIO = gql`
    query obtenerUsuario {
        obtenerUsuario {
            id
            nombre
            apellido
        }
    }
`;

const MenuTop = (props) => {
  const { menuCollapsed, setMenuCollapsed } = props;

  const { data, loading, error } = useQuery(OBTENER_USUARIO);
  const router = useRouter();
  
  const cerrarSesion = () => {
      localStorage.removeItem('token');
      router.push('/');
  } 

  if(loading) return null;
  const { obtenerUsuario } = data
  const {nombre, apellido} = obtenerUsuario;
  // if (Object.is(obtenerUsuario,undefined) || Object.is(obtenerUsuario,null) || !localStorage.getItem("token")) return (<Login />);

  return (
    <div className="menu-top">
      
      <div className="menu__center">
        <div className="menu-top__left-boton">
        
          <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
            {menuCollapsed ? (
              <MenuUnfoldOutlined></MenuUnfoldOutlined>
            ) : (
              <MenuFoldOutlined></MenuFoldOutlined>
            )}
          </Button>
          
        </div>
          <h2>
            Hola, <span>{nombre} {apellido}</span>
          </h2>
      </div>
      
      <div className="menu-top__right">
        <Button type="link" onClick={() => cerrarSesion()}>
          <PoweroffOutlined></PoweroffOutlined>
        </Button>
      </div>
    </div>
  );
};

export default MenuTop;
