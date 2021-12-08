import Layout from '../components/PageComponents/LayoutPage';
import telefono from "../img/telefono.svg";
import Iframe from 'react-iframe'
import formacion from "../img/Formación.PNG";
import inicial from "../img/Inicial.jpg";
import primaria from "../img/Primaria.jpg";
import email from "../img/mail.svg";
import secundaria from "../img/Secundaria.PNG";
import ubicacion from "../img/ubicacion.svg";
import Image from "next/dist/client/image";


const Index = () => (
  <Layout>


    <section className="conte__banner">

     <div className="conte__banner-titu" >
     <h1 className="conte__banner--h1-active">I.E.P COLEGIO </h1>
     <h1 className="conte__banner--h1"> SEÑOR DE  </h1>
     <h1 className="conte__banner--h1">LUREN</h1>
    
     </div>
    </section>

    <section className="conte__bienvenida">
      <div className="conte__bienvenida--titulo">
        <h1 id ="inicio">
          <ins>BIEN</ins>VENIDOS
        </h1>

    
        <p>
        La IEP “Señor de Luren” tiene como proyecto formar individuos integrales, aptos para la vida y sus desafíos, responsables de sí mismos y de contribuir genuinamente con el desarrollo del conocimiento al servicio de la sociedad. En definitiva, sujetos con las competencias para aprender a conocer, a vivir con otros, a hacer y a ser. Nuestro proyecto educativo aborda como gran tarea la formación de individuos capaces de adaptarse al mundo.
        </p>
     
      </div>

      <div className="conte__bienvenida--titulo--img">
       

    
      </div>
    </section>

    <section className="conte__banner2">
      <h1>D</h1>
      <h1>O</h1>
      <h1>C</h1>
      <h1>E</h1>
      <h1>N</h1>
      <h1>T</h1>
      <h1>E</h1>
      <h1>S</h1>
    </section>

    <section className="conte__card">
      <div className="conte__card--h1">
        <h1 id="niveles">
          <ins>NIVE</ins>LES
        </h1>
      </div>

      <div className="conte__card--card">
        <div className="conte__card--div">
          <div className="card--div_img">
            {/* <img src="../img/Inicial.jpg" className="div_img" width="240px" /> */}
            <Image src={inicial} className="div_img" alt="Señordeluren" />
          </div>

          <div className="conte__card--titulo">
            <h1>Inicial</h1>
          </div>
        </div>

        {/* <!-- ----------------segunda carta-- --> */}
        <div className="conte__card--div">
          <div className="card--div_img">
            {/* <img src="../img/Primaria.jpg" className="div_img" width="240px" /> */}
            <Image src={primaria} className="div_img" height="950px" alt="Señordeluren" />
          </div>

          <div className="conte__card--titulo">
            <h1>Primaria</h1>
          </div>
        </div>

        {/* <!-- ---tercercarta-- --> */}

        <div className="conte__card--div">
          <div className="card--div_img">
            {/* <img
              src="../img/Secundaria.PNG"
              className="div_img"
              width="240px"
            /> */}
            <Image src={secundaria} className="div_img" alt="Señordeluren" />
          </div>

          <div className="conte__card--titulo">
            <h1>Secundaria</h1>
          </div>
        </div>
      </div>
    </section>

    <section className="conte__ubicacion">
      <div className="conte__ubicacion--titulo">
        <ins>UBI</ins>CACIÓN
      </div>

      <div className="conte__ubicacion--icono">
        <div className="conte__ubicacion--icono-1">
           <Image src={telefono} className="conte__ubicacion--icono-img" alt="Señordeluren" />
          <p>972 934 806</p>
        </div>

        <div className="conte__ubicacion--icono-1">
          <Image src={email} className="conte__ubicacion--icono-img" alt="Señordeluren" />
          <p>iepsdl@outlook.com</p>
        </div>
        <div className="conte__ubicacion--icono-1">
          <Image src={ubicacion} className="conte__ubicacion--icono-img" alt="Señordeluren" />
          <p>Av. Santa Rosa Mz-C2 Lt-2 Túpac Amaru de Villa Chorrillos</p>
        </div>
      </div>

      <div className="conte__ubicacion--1">
        <div className="conte__ubicacion--1_img"></div>

        <div className="conte__ubicacion--1_maps">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.8177925810032!2d-76.98607265000669!3d-12.19279804791064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b9be57296217%3A0x498ca9fedc88d258!2sColegio%20Se%C3%B1or%20De%20Luren!5e0!3m2!1ses!2spe!4v1636521077327!5m2!1ses!2spe"
            width="450"
            height="480"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>

    
  </Layout>
);

export default Index;
