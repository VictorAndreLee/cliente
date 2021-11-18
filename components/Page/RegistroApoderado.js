import React, { useState } from "react";
import { useRouter } from "next/router";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation, useQuery, gql } from "@apollo/client";

const NUEVO_APODERADO = gql`
  mutation nuevoRegistro($input: ApoderadoInput, 
$usuario: UsuarioInput) {
    nuevoApoderado(input: $input) {
      id
      nombre
      apellido
      correo
    }
    nuevoUsuario(input: $usuario) {
      id
      nombre
      apellido
      tipoUsuario
      email
    }
  }
`;

const OBTENER_APODERADOS = gql`
  query obtenerApoderados {
    obtenerApoderados {
      id
      nombre
      apellido
    }
  }
`;

const RegistroApoderado = () => {
  // Use state
  const [date, setDate] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  // Consulta a la bd la primera vez que recarga la pag
  const { data, loading, error} = useQuery(OBTENER_APODERADOS)
  const [nuevoRegistro] = useMutation(NUEVO_APODERADO, {
    update(cache, { data: { nuevoApoderado } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerApoderados } = cache.readQuery({
        query: OBTENER_APODERADOS,
      });

      // Reescribimos el cache (el cache nunca se debe modificar)
      cache.writeQuery({
        query: OBTENER_APODERADOS,
        data: {
          obtenerApoderados: [...obtenerApoderados, nuevoApoderado],
        },
      });
    },
  });

  // Usar formik
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      dni: "",
      correo: "",
      celular: "",
      nacimiento: "",
      distrito: "",
      direccion: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("Nombre obligatorio"),
      apellido: Yup.string().required("Apellido obligatorio"),
      correo: Yup.string()
        .required("Email obligatorio")
        .email("El formato del email es incorrecto"),
      nacimiento: Yup.string(),
      distrito: Yup.string(),
      direccion: Yup.string(),
      dni: Yup.string().required("DNI obligatorio"),
      celular: Yup.number().typeError("Debe ser un número", NaN),
    }),
    onSubmit: async (valores) => {
      console.log(valores);

      const {
        nombre,
        apellido,
        dni,
        correo,
        celular,
        nacimiento,
        distrito,
        direccion,
      } = valores;

      try {
        const { data } = await nuevoRegistro({
          variables: {
            input: {
              nombre,
              apellido,
              dni,
              correo,
              celular,
              nacimiento,
              distrito,
              direccion,
            },
            usuario: {
              nombre,
              apellido,
              email: correo,
              tipoUsuario: 'ESTUDIANTE',
              password: dni
            }
          },
        });
        if(error){
          console.log("ero", error);
        }
        console.log("registro", data.nuevoApoderado);
        // router.push("/productos");
        setMensaje("Registro Satisfactorio");
        setTimeout(() => {
          setMensaje(null);
        }, 3000);
      } catch (error) {
        setMensaje(error.message);
        console.log(error);
        setTimeout(() => {
          setMensaje(null);
        }, 3000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="flex justify-center">
        <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
          <p>{mensaje}</p>
        </div>
      </div>
    );
  };

  if (loading) return "Cargando...";

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
      <h1 className="text-2xl text-green-800 font-bold ml-7 ">
        Registro de apoderado
      </h1>

      {mensaje && mostrarMensaje()}

      <div className="flex justify-center mt-7">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-7 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <input
                id="nombre"
                type="text"
                className="w-full border-b-2 py-2 border-green-600 mt-3 text-green-600 outline-none placeholder-green-600 transition duration-700 ease-out transform focus:-translate-y-1"
                placeholder="Nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.nombre && formik.errors.nombre && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.nombre}</p>
              </div>
            )}

            <div className="mb-4">
              <input
                className="w-full border-b-2 py-2 border-green-600 mt-3 text-green-600 outline-none placeholder-green-600 transition duration-700 ease-out transform focus:-translate-y-1"
                id="apellido"
                type="text"
                placeholder="Apellido"
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.apellido && formik.errors.apellido && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.apellido}</p>
              </div>
            )}

            <div className="mb-4">
              <input
                className="w-full border-b-2 py-2 border-green-600 mt-3 text-green-600 outline-none placeholder-green-600 transition duration-700 ease-out transform focus:-translate-y-1"
                id="correo"
                type="email"
                placeholder="ejemplo@correo.com"
                value={formik.values.correo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.correo && formik.errors.correo && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.correo}</p>
              </div>
            )}

            <div className="mb-4">
              <input
                className="w-full border-b-2 py-2 border-green-600 mt-3 text-green-600 outline-none placeholder-green-600 transition duration-700 ease-out transform focus:-translate-y-1"
                id="dni"
                maxLength="8"
                type="text"
                placeholder="Número de documento de identidad"
                value={formik.values.dni}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.dni && formik.errors.dni && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.dni}</p>
              </div>
            )}

            <div className="mb-4">
              <input
                className="w-full border-b-2 py-2 border-green-600 mt-3 text-green-600 outline-none placeholder-green-600 transition duration-700 ease-out transform focus:-translate-y-1"
                id="celular"
                maxLength="9"
                type="text"
                placeholder="Número de celular"
                value={formik.values.celular}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="mb-4">
              <input
                className="w-full border-b-2 py-2 border-green-600 mt-3 text-green-600 outline-none placeholder-green-600 transition duration-700 ease-out transform focus:-translate-y-1"
                id="nacimiento"
                type={`${date == true ? "date" : "text"}`}
                onFocus={() => setDate(true)}
                placeholder="Nacimiento"
                value={formik.values.nacimiento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="mb-4">
              <input
                className="w-full border-b-2 py-2 border-green-600 mt-3 text-green-600 outline-none placeholder-green-600 transition duration-700 ease-out transform focus:-translate-y-1"
                id="distrito"
                type="text"
                placeholder="Distrito"
                value={formik.values.distrito}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="mb-4">
              <input
                className="w-full border-b-2 py-2 border-green-600 mt-3 text-green-600 outline-none placeholder-green-600 transition duration-700 ease-out transform focus:-translate-y-1"
                id="direccion"
                type="text"
                placeholder="Dirección"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <input
              type="submit"
              className="bg-gray-700 w-full mt-5 p-2 text-white uppercase font-bold duration-700 hover:bg-gray-600 cursor-pointer"
              value="Guardar Apoderado"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroApoderado;
