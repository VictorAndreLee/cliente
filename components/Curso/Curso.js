import React, { useState } from "react";
import { useRouter } from "next/router";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation, useQuery, gql } from "@apollo/client";
import TablaCursos from "./TablaCursos";


const NUEVO_CURSO = gql`
    mutation nuevoCurso($input: CursoInput) {
      nuevoCurso(input: $input) {
          id
          nombre
      }
    }
`;

const OBTENER_CURSOS = gql`
  query obtenerCursos {
  obtenerCursos {
    id
    nombre
  }
}
`;

const Curso = () => {
  // Use state
  const [mensaje, setMensaje] = useState(null);

  // Router
  const router = useRouter();

  // Consulta a la bd la primera vez que recarga la pag
  const { data, loading, error } = useQuery(OBTENER_CURSOS);

  const [nuevoCurso] = useMutation(NUEVO_CURSO, {
    update(cache, { data: { nuevoCurso } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerCursos } = cache.readQuery({
        query: OBTENER_CURSOS,
      });

      // Reescribimos el cache (el cache nunca se debe modificar)
      cache.writeQuery({
        query: OBTENER_CURSOS,
        data: {
            obtenerCursos: [...obtenerCursos, nuevoCurso],
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
      nombre: Yup.string().required("Nombre del curso obligatorio"),
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
        const { data } = await nuevoCurso({
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
  const { obtenerCursos } = data;
  return (
    <>
      <h1 className="text-2xl text-gray-800 font-light">Cursos</h1>

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
              value="Guardar Curso"
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
            {obtenerCursos.map((item) => (
              <TablaCursos key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Curso;
