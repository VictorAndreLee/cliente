import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
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

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const ApoderadoLogin = () => {
  const router = useRouter();

  const [mensaje, guardarMensaje] = useState(null);
  const admisionContext = useContext(AdmisionContext);
  const { guardarUsuario } = admisionContext;
  const [getUser, { loading, error, data }] = useLazyQuery(OBTENER_USUARIO);
  //Mutation para crear nuevos usuarios en apollo
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  useEffect(() => {
    if (!data) return null
    localStorage.setItem("user", data);
    guardarUsuario(data);
  }, [data]);

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
         
        // Consultar obtener usuario
        getUser() 
        //Redireccionar hacia clientes
        // setTimeout(() => {
          guardarMensaje(null);
          router.push("/postulacion");
        // }, 2000);
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
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
      <h1 className="text-2xl text-green-800 font-bold ml-7">
        Registro de apoderado
      </h1>
      <div className="w-full max-w-lg">
        {mensaje && mostrarMensaje()}
        <form className="bg-white shadow-md px-8 pt-7 pb-8 mb-4" onSubmit={formik.handleSubmit}>
 
          <input
            required
            placeholder="Ingresar Email Usuario"
            className="w-full border-b-2 py-2 border-green-600 text-green-600 outline-none placeholder-green-600 transition duration-700 ease-out transform focus:-translate-y-1 my-9"
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

          <input
            id="password"
            type="password"
            autoComplete="true"
            required
            placeholder="Ingresar Contraseña Usuario"
            className="w-full border-b-2 py-2 border-green-600 text-green-600 outline-none placeholder-green-600 transition duration-700 ease-out transform focus:-translate-y-1 my-9"
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
          <button 
          className="bg-gray-700 w-full mt-5 p-2 text-white uppercase font-bold duration-700 hover:bg-gray-600 cursor-pointer"
          type="submit"
          >
            <span>Ingresar</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApoderadoLogin;
