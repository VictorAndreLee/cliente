import React, { useState } from "react";
import { useRouter } from "next/router";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation, useQuery, gql } from "@apollo/client";
import TablaPeriodos from "./TablaPeriodos";


const NUEVO_PERIODO = gql`
    mutation nuevoPeriodo($input: PeriodoInput) {
      nuevoPeriodo(input: $input) {
          id
          nombre
      }
    }
`;

const OBTENER_PERIODOS = gql`
  query obtenerPeriodos {
  obtenerPeriodos {
    id
    nombre
  }
}
`;

const Periodo = () => {
  // Use state
  const [mensaje, setMensaje] = useState(null);

  // Router
  const router = useRouter();

  // Consulta a la bd la primera vez que recarga la pag
  const { data, loading, error } = useQuery(OBTENER_PERIODOS);

  const [nuevoPeriodo] = useMutation(NUEVO_PERIODO, {
    update(cache, { data: { nuevoPeriodo } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerPeriodos } = cache.readQuery({
        query: OBTENER_PERIODOS,
      });

      // Reescribimos el cache (el cache nunca se debe modificar)
      cache.writeQuery({
        query: OBTENER_PERIODOS,
        data: {
            obtenerPeriodos: [...obtenerPeriodos, nuevoPeriodo],
        },
      });
    },
  });

  // Usar formik
  const formik = useFormik({
    initialValues: {
      nombre: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("Nombre del Periodo obligatorio"),
    }),
    onSubmit: async (valores) => {
      console.log(valores);

      const {
        nombre,
      } = valores;

      try {
        const { data } = await nuevoPeriodo({
          variables: {
            input: {
              nombre,
            },
          },
        });
        // console.log(data.nuevoCurso);
        // router.push("/curso");
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
  const { obtenerPeriodos } = data;
  return (
    <>
      <h1 className="text-2xl text-gray-800 font-light">Periodo Academico</h1>

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

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
              value="Guardar Periodo Academico"
            />
          </form>
        </div>
      </div>

      <div className="overflow-x-scroll">
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Acciones</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {obtenerPeriodos.map((item) => (
              <TablaPeriodos key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Periodo;