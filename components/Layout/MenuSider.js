import React from "react";
import { Menu, Layout } from "antd";
import {
  DollarCircleOutlined,
  FileTextOutlined,
  AuditOutlined,
  HomeOutlined,
  QrcodeOutlined,
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
        
          <Menu.Item key="c"><Link href="/alumno">Alumnos</Link></Menu.Item>
          
          <Menu.Item key="b"><Link href="/apoderados">Apoderados</Link></Menu.Item>

          <Menu.Item key="d"><Link href="/cursos">Cursos</Link></Menu.Item>

          <Menu.Item key="e"><Link href="/grados">Grados</Link></Menu.Item>
          
          <Menu.Item key="l"><Link href="/profesor">Profesores</Link></Menu.Item>

          <Menu.Item key=","><Link href="/periodos">Periodo Academico</Link></Menu.Item>

        </SubMenu>

        

        <SubMenu icon={<QrcodeOutlined />} title="Asignacion" key="g">
        
          <Menu.Item key="1"><Link href="">Salones</Link></Menu.Item>
        
          <Menu.Item key="2"><Link href="">Profesores por Curso</Link></Menu.Item>

        </SubMenu>


        

        <Menu.Item key="h">
          <UserOutlined />
          <span className="nav-text"><Link href="#"><a>Matrícula</a></Link></span>
        </Menu.Item>

        <Menu.Item key="z">
          <AuditOutlined />
          <span className="nav-text"><Link href="/postulacion/revision-admision"><a>Postulaciones</a></Link></span>
        </Menu.Item>

        <Menu.Item key="n">
          <AuditOutlined />
          <span className="nav-text"><Link href="/postulacion/revision-matricula"><a>Solicitud Matrícula</a></Link></span>
        </Menu.Item>

        <Menu.Item key="m">
          <AuditOutlined />
          <span className="nav-text"><Link href="/reunion"><a>Reuniones</a></Link></span>
        </Menu.Item>

        <Menu.Item key="i">
          <DollarCircleOutlined />
          <span className="nav-text"><Link href="#"><a>Usuarios</a></Link></span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MenuSider;
