import React from "react";
import { Menu, Layout } from "antd";
import {
  FileTextOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import Link from 'next/link';


const MenuSiderDoct = (props) => {
  const { menuCollapsed } = props;
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu theme="light" mode="inline">
        <Menu.Item key="a">
          <HomeOutlined/>
          <span className="nav-text">Inicio</span>
        </Menu.Item>
        <SubMenu icon={<FileTextOutlined />} title="Registros" key="z"> 
        
          <Menu.Item key="b"><Link href="/pacientes">Pacientes</Link></Menu.Item>
        
          <Menu.Item key="c"><Link href="/categorias">Categorias</Link></Menu.Item>

          <Menu.Item key="d"><Link href="/tratamiento">Tratamientos</Link></Menu.Item>

          <Menu.Item key="e"><Link href="/presupuesto">Presupuesto</Link></Menu.Item>
          
        </SubMenu>
       
        <Menu.Item key="f">
            <MedicineBoxOutlined />
            <span className="nav-text"><Link href="/historial">Historial</Link></span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MenuSiderDoct;
