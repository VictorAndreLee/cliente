import React, { useState } from "react";
import { useRouter } from "next/router";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation, useQuery, gql } from "@apollo/client";
import TablaProfesor from "./TablaProfesor";

const NUEVO_PROFESOR = gql`
  mutation nuevoProfesor($input: ProfesorInput) {
    nuevoProfesor(input: $input) {
      id
      nombre
      apellido
      dni
      celular
      correo
      distrito
      nacimiento
      direccion
      creado
    }
  }
`;

const OBTENER_PROFESORES = gql`
  query obtenerProfesores {
    obtenerProfesores {
      id
      nombre
      apellido
      dni
      celular
      correo
      nacimiento
      distrito
      direccion
      creado
    }
  }
`;

const Profesor = () => {
  // Use state
  const [mensaje, setMensaje] = useState(null);

  // Router
  const router = useRouter();

  // Consulta a la bd la primera vez que recarga la pag
  const { data, loading, error } = useQuery(OBTENER_PROFESORES);

  const [nuevoProfesor] = useMutation(NUEVO_PROFESOR, {
    update(cache, { data: { nuevoProfesor } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerProfesores } = cache.readQuery({
        query: OBTENER_PROFESORES,
      });

      // Reescribimos el cache (el cache nunca se debe modificar)
      cache.writeQuery({
        query: OBTENER_PROFESORES,
        data: {
            obtenerProfesores: [...obtenerProfesores, nuevoProfesor],
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
      celular: "",
      correo: "",
      nacimiento: "",
      distrito: "",
      direccion: "",
    },

    validationSchema: Yup.object({
      nombre: Yup.string().required("Nombre del apoderado obligatorio"),
      apellido: Yup.string().required("Apellido del apoderado obligatorio"),
      correo: Yup.string()
        .email("El formato del email es incorrecto")
        .required("Correo del apoderado obligatorio"),
      nacimiento: Yup.string().required("Nacimiento del apoderado obligatorio"),
      distrito: Yup.string().required("Distrito del apoderado obligatorio"),
      direccion: Yup.string().required("Dirección del apoderado obligatorio"),
      dni: Yup.number()

        .typeError("Debe ser un número", NaN)
        .required("Número de documento obligatorio"),
      celular: Yup.number()
        .typeError("Debe ser un número", NaN)
        .required("Número de celular obligatorio"),
    }),
    onSubmit: async (valores) => {
      console.log(valores);

      const {
        nombre,
        apellido,
        dni,
        celular,
        correo,
        nacimiento,
        distrito,
        direccion,
      } = valores;

      try {
        const { data } = await nuevoProfesor({
          variables: {
            input: {
              nombre,
              apellido,
              dni,
              celular,
              correo,
              nacimiento,
              distrito,
              direccion,
            },
          },
        });
        // console.log(data.nuevoApoderado);
        // router.push("/productos");
      } catch (error) {
        setMensaje(error.message);

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
  const { obtenerProfesores } = data;

  return (
    <>
      <h1 className="text-2xl text-gray-800 font-light">Profesor</h1>

      {mensaje && mostrarMensaje()}

      <div className="flex justify-center mt-7">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-7 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                id="nombre"
                type="text"
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
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="apellido"
              >
                Apellidos
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
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
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="correo"
              >
                Correo
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
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
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dni"
              >
                N° de doc
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
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
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="celular"
              >
                N° de Celular
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                id="celular"
                maxLength="9"
                type="text"
                placeholder="Número de celular"
                value={formik.values.celular}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.celular && formik.errors.celular && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.celular}</p>
              </div>
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nacimiento"
              >
                Nacimiento
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                id="nacimiento"
                type="date"
                placeholder="Número de documento de identidad"
                value={formik.values.nacimiento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.nacimiento && formik.errors.nacimiento && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.nacimiento}</p>
              </div>
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="distrito"
              >
                Distrito
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                id="distrito"
                type="text"
                placeholder="Número de documento de identidad"
                value={formik.values.distrito}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.distrito && formik.errors.distrito && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.distrito}</p>
              </div>
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="direccion"
              >
                Dirección
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                id="direccion"
                type="text"
                placeholder="Número de documento de identidad"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.direccion && formik.errors.direccion && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.direccion}</p>
              </div>
            )}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
              value="Guardar Profesor"
            />
          </form>
        </div>
      </div>

      <div className="overflow-x-scroll">
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Apellido</th>
              <th className="w-1/5 py-2">Nacimiento</th>
              <th className="w-1/5 py-2">N° Doc</th>
              <th className="w-1/5 py-2">Celular</th>   
              <th className="w-1/5 py-2">Correo</th>
              <th className="w-1/5 py-2">Distrito</th>
              <th className="w-1/5 py-2">Dirección</th>
              <th className="w-1/5 py-2">Acciones</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {obtenerProfesores.map((item) => (
              <TablaProfesor key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Profesor;
