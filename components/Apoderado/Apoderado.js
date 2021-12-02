import React, { useState } from "react";
import { useRouter } from "next/router";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation, useQuery, gql } from "@apollo/client";
import TablaApoderado from "./TablaApoderado";

const NUEVO_APODERADO = gql`
  mutation nuevoApoderado($input: ApoderadoInput) {
    nuevoApoderado(input: $input) {
      id
      nombre
      apellido
      dni
      correo
      celular
      distrito
      nacimiento
      direccion
      creado
    }
  }
`;



const OBTENER_APODERADOS = gql`
  query obtenerApoderados {
    obtenerApoderados {
      id
      nombre
      apellido
      dni
      correo
      celular
      nacimiento
      distrito
      direccion
      creado
    }
  }
`;

const Apoderado = () => {
  // Use state
  const [mensaje, setMensaje] = useState(null);

  // Router
  const router = useRouter();

  // Consulta a la bd la primera vez que recarga la pag
  const { data, loading, error } = useQuery(OBTENER_APODERADOS);

  const [nuevoApoderado] = useMutation(NUEVO_APODERADO, {
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
      nombre: Yup.string().required("Nombre del apoderado obligatorio"),
      apellido: Yup.string().required("Apellido del apoderado obligatorio"),
      correo: Yup.string().email("El formato del email es incorrecto"),
      nacimiento: Yup.string(),
      distrito: Yup.string(),
      direccion: Yup.string(),
      dni: Yup.number().typeError("Debe ser un número", NaN),
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
        const { data } = await nuevoApoderado({
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
  const { obtenerApoderados } = data;

  return (
    <>
      <h1 className="text-2xl text-gray-800 font-light">Apoderado</h1>

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


            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
              value="Guardar Apoderado"
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
              <th className="w-1/5 py-2">Correo</th>
              <th className="w-1/5 py-2">Celular</th>
              <th className="w-1/5 py-2">Distrito</th>
              <th className="w-1/5 py-2">Dirección</th>
              <th className="w-1/5 py-2">Acciones</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {obtenerApoderados.map((item) => (
              <TablaApoderado key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Apoderado;
