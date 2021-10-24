import React from "react";
import Link from "next/link"
import {useRouter} from "next/router";
import Image from "next/image"
import Escudo from "../public/img/escudo.png"
import User from "../public/img/user.png"


const Sidebar = () => {

    //Routing de next
    const router = useRouter();

    return (
        <div className="sidebar close">
            <div className="logo-details">
            <Image src={Escudo} width="45px"/>
            <i className="bx bxl-c-plus-plus"></i>
            <span className="logo_name">Señor de Luren</span>
            </div>
            <ul className="nav-links">
                <li>
                    <a href="#">
                        <i className="bx bx-grid-alt"></i>
                        <span className="link_name">Panel</span>
                    </a>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">Usuario</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="iocn-link">
                        <a href="#">
                            <i className="bx bx-collection"></i>
                            <span className="link_name">Registros</span>
                        </a>
                        <i className="bx bxs-chevron-down arrow"></i>
                    </div>
                    <ul className="sub-menu">
                        <li><a className="link_name" href="#">Registros</a></li>
                        <li><a href="#">Aulas</a></li>
                        <li><a href="#">Alumnos</a></li>
                        <li><a href="#">Apoderados</a></li>
                        <li><a href="#">Docentes</a></li>
                        <li><a href="#">Cursos</a></li>
                    </ul>
                </li>
                <li>
                    <div className="iocn-link">
                        <a href="#">
                            <i className="bx bx-book-alt"></i>
                            <span className="link_name">Requisitos</span>
                        </a>
                        <i className="bx bxs-chevron-down arrow"></i>
                    </div>
                        <ul className="sub-menu">
                        <li><a className="link_name" href="#">Requisitos</a></li>
                        <li><a className="#">Todos</a></li>
                        <li><a className="#">Aprobados</a></li>
                        <li><a className="#">Pendientes</a></li>
                        <li><a className="#">Rechazados</a></li>
                        </ul>
                </li>
                <li>
                    <a href="#">
                    <i className='bx bx-message-square-add' ></i>
                    <span className="link_name">Matrícula</span>
                    </a>
                    <ul className="sub-menu blank">
                    <li><a className="link_name" href="#">Matrícula</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                    <i className='bx bx-line-chart' ></i>
                    <span className="link_name">Ingresos</span>
                    </a>
                    <ul className="sub-menu blank">
                    <li><a className="link_name" href="#">Ingresos</a></li>
                    </ul>
                </li>

                <li>
                    <div className="iocn-link">
                    <a href="#">
                        <i className='bx bx-plug' ></i>
                        <span className="link_name">Plugins</span>
                    </a>
                    <i className='bx bxs-chevron-down arrow' ></i>
                    </div>
                    <ul className="sub-menu">
                    <li><a className="link_name" href="#">Plugins</a></li>
                    <li><a href="#">UI Face</a></li>
                    <li><a href="#">Pigments</a></li>
                    <li><a href="#">Box Icons</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                    <i className='bx bx-compass' ></i>
                    <span className="link_name">Explore</span>
                    </a>
                    <ul className="sub-menu blank">
                    <li><a className="link_name" href="#">Explore</a></li>
                    </ul>
                </li>
                <li>
                    <a className="#">
                    <i className='bx bx-history'></i>
                    <span className="link_name">History</span>
                    </a>
                    <ul className="sub-menu blank">
                    <li><a className="link_name" href="#">History</a></li>
                    </ul>
                </li>

                <li>
                    <a href="#">
                    <i className='bx bx-cog' ></i>
                    <span className="link_name">Configuración</span>
                    </a>
                    <ul className="sub-menu blank">
                    <li><a className="link_name" href="#">Configuración</a></li>
                    </ul>
                </li>
                <li>
                <div className="profile-details">
                <div className="profile-content">
                <Image src={User} width="45px"/>
                </div>
                <div className="name-job">
                    <div className="profile_name">Usuario</div>
                    <div className="job">Administrador</div>
                </div>
                <i className='bx bx-log-out' ></i>
                </div>
            </li>
            </ul>
                <section className="home-section">
                    <div className="home-content">
                    <i className='bx bx-menu' ></i>
                    <span className="text">Pagina de Inicio</span>
                    </div>
                </section>
                
        </div>
        
        
        
    );
}

export default Sidebar;