import React from "react";
import Layout from "../../components/Layout/Layout";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useQuery, gql, useMutation } from "@apollo/client";

import * as Yup from "yup";

const OBTENER_GRADO = gql`
    query obtenerGrado($id: ID!) {
    obtenerGrado(id: $id) {
        id
        nombre
        nivel
        aforo
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

const ACTUALIZAR_GRADO = gql`
    mutation actualizarGrado($id: ID!, $input: GradoInput) {
        actualizarGrado(id: $id, input: $input) {
        id
        nombre
        nivel
        aforo
        creado
        }
    }
`;



const EditarGrado = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // Consultar producto por ID
  const { data, loading, error } = useQuery(OBTENER_GRADO, {
    variables: {
      id,
    },
  });

  // Editar producto
  const [actualizarGrado] = useMutation(ACTUALIZAR_GRADO, {
    update(cache, { data: { actualizarGrado } }) {
      // Actualizar Producto
      const { obtenerGrados } = cache.readQuery({
        query: OBTENER_GRADOS,
      });

      const cursosActualizados = obtenerGrados.map((producto) =>
        producto.id === id ? actualizarGrado : producto
      );

      // Actualizar Producto Actual
      cache.writeQuery({
        query: OBTENER_GRADOS,
        variables: { id },
        data: {
            obtenerGrados: cursosActualizados,
        },
      });
    },
  });
  if (loading) return null;
  // Validar Formulario
  const schemaValidacion = Yup.object({
    nombre: Yup.string().required("Nombre del grado obligatorio"),
    nivel: Yup.string().required("Nivel del grado obligatorio"),
    aforo: Yup.number()
    .typeError("Debe ser un número", NaN)
    .required("Número de aforo obligatorio"),
  });

  const { obtenerGrado } = data;

  const editarProducto = async (valores) => {
    const { 
        nombre,
        nivel,
        aforo
    } = valores;

    try {
      const { data } = await actualizarGrado({
        variables: {
          id,
          input: {
            nombre,
            nivel,
            aforo: Number(aforo)
          },
        },
      });
      // console.log(data);

      // Swal
      Swal.fire({
        position: "center",
        icon: "success",
        title: "El grado fue actualizado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });

      // Redireccionar
      router.push("/grados");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Grado</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidacion}
            enableReinitialize
            initialValues={obtenerGrado}
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
                      placeholder="Ej:Inicial, Primaria o Secundaria"
                      value={props.values.nivel}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.nivel && props.errors.nivel && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.nivel}</p>
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
                      value={props.values.aforo}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.aforo && props.errors.aforo && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.aforo}</p>
                    </div>
                  )}

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                    value="Editar Grado"
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

export default EditarGrado;
