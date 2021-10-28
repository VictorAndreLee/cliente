import React from "react";
import Layout from "../../components/Layout/Layout";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useQuery, gql, useMutation } from "@apollo/client";

import * as Yup from "yup";

const OBTENER_CURSO = gql`
  query obtenerCurso($id: ID!) {
    obtenerCurso(id: $id) {
      id
      creado
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

const ACTUALIZAR_CURSO = gql`
  mutation actualizarCurso($id: ID!, $input: CursoInput) {
    actualizarCurso(id: $id, input: $input) {
      id
      nombre
    }
  }
`;


const EditarCurso = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // Consultar producto por ID
  const { data, loading, error } = useQuery(OBTENER_CURSO, {
    variables: {
      id,
    },
  });

  // Editar producto
  const [actualizarCurso] = useMutation(ACTUALIZAR_CURSO, {
    update(cache, { data: { actualizarCurso } }) {
      // Actualizar Producto
      const { obtenerCursos } = cache.readQuery({
        query: OBTENER_CURSOS,
      });

      const cursosActualizados = obtenerCursos.map((producto) =>
        producto.id === id ? actualizarCurso : producto
      );

      // Actualizar Producto Actual
      cache.writeQuery({
        query: OBTENER_CURSOS,
        variables: { id },
        data: {
            obtenerCursos: cursosActualizados,
        },
      });
    },
  });
  if (loading) return null;
  // Validar Formulario
  const schemaValidacion = Yup.object({
    nombre: Yup.string().required("Nombre del curso obligatorio"),
  });

  const { obtenerCurso } = data;

  const editarProducto = async (valores) => {
    const {
      nombre
    } = valores;

    try {
      const { data } = await actualizarCurso({
        variables: {
          id,
          input: {
            nombre,
          },
        },
      });
      // console.log(data);

      // Swal
      Swal.fire({
        position: "center",
        icon: "success",
        title: "El curso fue actualizado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });

      // Redireccionar
      router.push("/cursos");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Curso</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidacion}
            enableReinitialize
            initialValues={obtenerCurso}
            onSubmit={(valores) => editarProducto(valores)}
          >
            {(props) => {
              return (
                <form
                  className="bg-white shadow-md px-8 pt-7 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
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
                      value={props.values.nombre}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.nombre && props.errors.nombre && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.nombre}</p>
                    </div>
                  )}

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                    value="Editar Curso"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditarCurso;
