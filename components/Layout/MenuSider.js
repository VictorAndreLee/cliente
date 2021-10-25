import React from "react";
import { Menu, Layout } from "antd";
import {
  FileTextOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from 'next/link';


const MenuSider = (props) => {
  const { menuCollapsed } = props;
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <div className="admin-sider__container-logo">
        <div className="admin-sider-logo">
          
        </div>
        
        
      </div>
      <Menu theme="light" mode="inline">
        <Menu.Item key="a">
          <HomeOutlined/>
          <span className="nav-text">Inicio</span>
        </Menu.Item>
        <SubMenu icon={<FileTextOutlined />} title="Registros" key="x">
        
          <Menu.Item key="b"><Link href="/pacientes">Alumnos</Link></Menu.Item>
        
          <Menu.Item key="c"><Link href="/usuarios">Apoderados</Link></Menu.Item>
        
          <Menu.Item key="d"><Link href="/categorias">Profesores</Link></Menu.Item>

          <Menu.Item key="e"><Link href="/tratamiento">Cursos</Link></Menu.Item>
          
        </SubMenu>
       
        <Menu.Item key="g">
          <MedicineBoxOutlined />
          <span className="nav-text"><Link href="/historial"><a href="#">Historial</a></Link></span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MenuSider;
