import React from "react";
import Layout from "../components/PageComponents/LayoutPage";
import Image from "next/dist/client/image";
import hoja from "../img/hoja.svg";

const Admision = () => {
  return (
    <Layout>
      <section className="conte__admi">
        <div className="conte__admi--espacio">
          <div className="conte__admi--espacio--titulo">
            <h1>Admisión 2021</h1>
            <p>Proceso de admisión para ser parte de la Gran Familia LURINA</p>
          </div>

          <div>
            <dl className="preg-resp">
              <dt>Postulación</dt>
              <dd>
                Presenta los siguientes documentos para iniciar el proceso de
                admisión
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

              <dt>Agendaremos una entrevista con el área de psicología.</dt>
              <dd>Lorem ipsum dolor sit amet consectetur.</dd>
              <dt>
                Firma del conocimiento y conformidad del reglamento interno que
                se encuentra en la página web del colegio.
              </dt>
              <dd>Lorem ipsum dolor sit amet.</dd>

              <dt>MATRÍCULA</dt>
              <dd>
                Para dar por efecto la matrícula del estudiante, solicitaremos
                lo siguiente:
              </dd>
              <dd>
                <Image src={hoja} alt="image"/> Ficha única de matrícula de SIAGIE.
                <br />
                <Image src={hoja} alt="image"/>
                Constancia de matrícula de SIAGIE.
                <br />
                <Image src={hoja} alt="image"/>
                Certificado de estudios de años anteriores.
                <br />
                <Image src={hoja} alt="image"/>
                Resolución de traslado.
                <br />
                <Image src={hoja} alt="image"/>
                Dos fotos tamaño carnet.
              </dd>
            </dl>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admision;
