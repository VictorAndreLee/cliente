import React from "react";
import Layout from "../../components/Layout/Layout";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useQuery, gql, useMutation } from "@apollo/client";
import * as Yup from 'yup';

const OBTENER_PERIODO = gql`
  query obtenerPeriodo($id: ID!) {
    obtenerPeriodo(id: $id) {
      id
      creado
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

const ACTUALIZAR_PERIODO = gql`
  mutation actualizarPeriodo($id: ID!, $input: PeriodoInput) {
    actualizarPeriodo(id: $id, input: $input) {
      id
      nombre
    }
  }
`;


const EditarPeriodo = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // Consultar producto por ID
  const { data, loading, error } = useQuery(OBTENER_PERIODO, {
    variables: {
      id,
    },
  });

  // Editar producto
  const [actualizarPeriodo] = useMutation(ACTUALIZAR_PERIODO, {
    update(cache, { data: { actualizarPeriodo } }) {
      // Actualizar Producto
      const { obtenerPeriodos } = cache.readQuery({
        query: OBTENER_PERIODOS,
      });

      const periodosActualizados = obtenerPeriodos.map((producto) =>
        producto.id === id ? actualizarPeriodo : producto
      );

      // Actualizar Producto Actual
      cache.writeQuery({
        query: OBTENER_PERIODOS,
        variables: { id },
        data: {
            obtenerPeriodos: periodosActualizados,
        },
      });
    },
  });
  if (loading) return null;
  // Validar Formulario
  const schemaValidacion = Yup.object({
    nombre: Yup.string().required("Nombre del periodo obligatorio"),
  });

  const { obtenerPeriodo } = data;

  const editarPeriodo = async (valores) => {
    const {
      nombre
    } = valores;

    try {
      const { data } = await actualizarPeriodo({
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
        title: "El periodo fue actualizado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });

      // Redireccionar
      router.push("/periodo");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Periodo</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidacion}
            enableReinitialize
            initialValues={obtenerPeriodo}
            onSubmit={(valores) => editarPeriodo(valores)}
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
                    value="Editar Periodo"
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

export default EditarPeriodo;