import React from "react";
import Layout from "../../components/Layout/Layout";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useQuery, gql, useMutation } from "@apollo/client";
import * as Yup from 'yup';


const OBTENER_APODERADO = gql`
query obtenerApoderado($id: ID!) {
    obtenerApoderado(id: $id) {
      id
      nombre
      apellido
      correo 
      dni
      celular 
      nacimiento 
      distrito 
      direccion 
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
        }
    }
`;

const ACTUALIZAR_APODERADO = gql`
 mutation actualizarApoderado($id: ID!, $input: ApoderadoInput) {
    actualizarApoderado(id: $id, input: $input) {
        id
        nombre
        apellido
        dni
        correo
        celular
        nacimiento
        distrito
        direccion
    }
  }
`;


const EditarApoderado = () => {
    //obtener el ID actual
    const router = useRouter();
    const { query : { id } } = router;
    //console.log(id)

    //Consultar para obtener el apoderado
    const {data , loading, error } = useQuery(OBTENER_APODERADO, {
        variables: {
            id
        }
    });

    //Actualizar el Apoderado
    const [actualizarApoderado] = useMutation(ACTUALIZAR_APODERADO);



    //Schema de validacion 
    const schemaValidacion = Yup.object({
        nombre: Yup.string().required("Nombre del apoderado obligatorio"),
        apellido: Yup.string().required("Apellido del apoderado obligatorio"),
        correo: Yup.string()
          .email("El formato del email es incorrecto")
          .required("Correo del apoderado obligatorio"),
        nacimiento: Yup.string(),
        distrito: Yup.string(),
        direccion: Yup.string(),
        dni: Yup.number()
        .typeError("Debe ser un número", NaN),
      celular: Yup.number()
        .typeError("Debe ser un número", NaN),
      });



    if(loading) return 'Cargando...';

    //console.log(data.obtenerApoderado)

    const { obtenerApoderado } = data;

    //Modificar el Apoderado en la bd
      const actualizarInfoApoderado = async valores => {
            const { nombre, apellido, dni, correo, celular, nacimiento, distrito, direccion } = valores;

            try{
                const { data } = await actualizarApoderado({
                    variables: {
                        id,
                        input: {
                            nombre, 
                            apellido, 
                            dni, 
                            correo, 
                            celular, 
                            nacimiento, 
                            distrito, 
                            direccion 
                        } 
                    }
                });

                //console.log(data);

                //Mostrar Alerta
                
                Swal.fire(
                    'Actualizado',
                    'El Apoderado se actualizo completamente',
                    'success'
                )

                //Redireccionar
                router.push('/apoderados');

            } catch(error){
                console.log(error);
            }
      }


    return ( 
        <Layout>

            <h1 className="text-2xl text-gray-800 font-light">Editar Apoderado</h1>

            <div className="flex justify-center mt-7">

            <div className="w-full max-w-lg">

            <Formik
                validationSchema = { schemaValidacion }
                enableReinitialize
                initialValues = { obtenerApoderado }
                onSubmit = { (valores) => {
                    actualizarInfoApoderado(valores)
                }}
            >

                {props => {
                    //console.log(props);
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
                    htmlFor="apellido"
                >
                    Apellidos
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                    id="apellido"
                    type="text"
                    placeholder="Apellido"
                    value={props.values.apellido}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                />
                </div>

                {props.touched.apellido && props.errors.apellido && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.apellido}</p>
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
                    value={props.values.correo}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                />
                </div>

                {props.touched.correo && props.errors.correo && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.correo}</p>
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
                    value={props.values.dni}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                />
                </div>

                {props.touched.dni && props.errors.dni && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.dni}</p>
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
                    value={props.values.celular}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                />
                </div>

                {props.touched.celular && props.errors.celular && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.celular}</p>
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
                    value={props.values.nacimiento}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                />
                </div>

                {props.touched.nacimiento && props.errors.nacimiento && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.nacimiento}</p>
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
                    value={props.values.distrito}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                />
                </div>

                {props.touched.distrito && props.errors.distrito && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.distrito}</p>
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
                    value={props.values.direccion}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                />
                </div>

                {props.touched.direccion && props.errors.direccion && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.direccion}</p>
                </div>
                )}

                <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                value="Guardar Apoderado"
                />
            </form>

                )
                }}

            </Formik>
            </div>
        </div>
        </Layout>
    );


}
export default EditarApoderado;