import React, { useState } from "react";
import { useRouter } from "next/router";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation, useQuery, gql } from "@apollo/client";
import TablaGrado from "./TablaGrado";

const NUEVO_GRADO = gql`
    mutation nuevoGrado($input: GradoInput) {
    nuevoGrado(input: $input) {
        id
        nombre
        nivel
        aforo
        creado
    }

    }
`;

const OBTENER_GRADOS = gql`
    query obtenerGrados {
    obtenerGrados {
        id
        nombre
        nivel
        aforo
    }
    }
`;

const Grado = () => {
  // Use state
  const [mensaje, setMensaje] = useState(null);

  // Router
  const router = useRouter();

  // Consulta a la bd la primera vez que recarga la pag
  const { data, loading, error } = useQuery(OBTENER_GRADOS);

  const [nuevoGrado] = useMutation(NUEVO_GRADO, {
    update(cache, { data: { nuevoGrado } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerGrados } = cache.readQuery({
        query: OBTENER_GRADOS,
      });

      // Reescribimos el cache (el cache nunca se debe modificar)
      cache.writeQuery({
        query: OBTENER_GRADOS,
        data: {
          obtenerGrados: [...obtenerGrados, nuevoGrado],
        },
      });
    },
  });

  // Usar formik
  const formik = useFormik({
    initialValues: {
        nombre: '',
        nivel: '',
        aforo: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("Nombre del grado obligatorio"),
      nivel: Yup.string().required("Nivel del grado obligatorio"),
      aforo: Yup.number()
      .typeError("Debe ser un número", NaN)
      .required("Número de aforo obligatorio"),
    }),
    onSubmit: async (valores) => {
      console.log(valores);

      const {
        nombre,
        nivel,
        aforo
      } = valores;



      try {
        const { data } = await nuevoGrado({
          variables: {
            input: {
              nombre,
              nivel,
              aforo: Number(aforo)
            },
          },
        });
        // console.log(data.nuevoGrado);
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
  const { obtenerGrados } = data;

  return (
    <>
      <h1 className="text-2xl text-gray-800 font-light">Grado</h1>

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
                placeholder="Ej: Primer grado"
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
                htmlFor="nivel"
              >
                Nivel
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                id="nivel"
                type="text"
                placeholder="Inicial, Primaria o Secundaria"
                value={formik.values.nivel}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.nivel && formik.errors.nivel && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.nivel}</p>
              </div>
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="aforo"
              >
                Aforo
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                id="aforo"
                type="text"
                placeholder="Ej: 23"
                value={formik.values.aforo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.aforo && formik.errors.aforo && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.aforo}</p>
              </div>
            )}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
              value="Guardar Grado"
            />
          </form>
        </div>
      </div>

      <div className="overflow-x-scroll">
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Nivel</th>
              <th className="w-1/5 py-2">Aforo</th>
              <th className="w-1/5 py-2">Acciones</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {obtenerGrados.map((item) => (
              <TablaGrado key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Grado;