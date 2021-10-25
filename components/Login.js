import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Candado from "../public/img/dni.svg";
import Candado1 from "../public/img/Candado.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const Login = () => {
  //routing
  const router = useRouter();

  const [mensaje, guardarMensaje] = useState(null);

  //Mutation para crear nuevos usuarios en apollo
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email no puede ir vacio"),
      password: Yup.string().required("El password es obligatorio"),
    }),
    onSubmit: async (valores) => {
      //console.log(valores);
      const { email, password } = valores;

      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });
        console.log(data);
        guardarMensaje("Autenticando...");

        //Guardar el token en localstorage
        const { token } = data.autenticarUsuario;
        localStorage.setItem("token", token);
        //Redireccionar hacia clientes
        setTimeout(() => {
          guardarMensaje(null);
          router.push("/cursos");
        }, 2000);
      } catch (error) {
        guardarMensaje(error.message.replace("GraphQL error: ", ""));
        //console.log(error);

        setTimeout(() => {
          guardarMensaje(null);
        }, 2000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <>
      {/* <Layout> */}
      <section className="contenido--login">
        <div className="login--banner"></div>
        <div className="login--form">
          <h1 className="login--form__h1">Bienvenido(a)</h1>
          <h5 className="login--form__h5">
            Ingresa y conoce nuestra experiencia<br></br>web
          </h5>
          {mensaje && mostrarMensaje()}
          <form action="" onSubmit={formik.handleSubmit}>
            <Image src={Candado} className="login--form__icon" />
            <input
              required
              placeholder="Ingresar Email Usuario"
              className="login--form__input "
              id="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            ></input>
            <br></br>
            {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}
            <Image src={Candado1} className="login--form__icon" />
            <input
              id="password"
              type="password"
              required
              placeholder="Ingresar Contraseña Usuario"
              className="login--form__input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            ></input>
            <br></br>
            {formik.touched.password && formik.errors.password ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.password}</p>
              </div>
            ) : null}
            <button className="boton tres" type="submit">
              <span>Ingresar</span>
            </button>
          </form>
        </div>
      </section>
      {/* </Layout>     */}
    </>
  );
};

export default Login;