import React from "react";
import Layout from "../../components/Layout/Layout";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useQuery, gql, useMutation } from "@apollo/client";
import * as Yup from 'yup';


const OBTENER_ALUMNO = gql`
query obtenerAlumno($id: ID!) {
    obtenerAlumno(id: $id) {
      id
      nombre
      apellido
      apoderado
      nacimiento    
      docNum  
    }
  }
`;

const OBTENER_ALUMNOS = gql`
  query obtenerAlumnos {
    obtenerAlumnos {
      id
      nombre
      apellido
      apoderado
      nacimiento    
      docNum
      creado
    }
  }
`;

const ACTUALIZAR_ALUMNO = gql`
 mutation actualizarAlumno($id: ID!, $input: AlumnoInput) {
    actualizarAlumno(id: $id, input: $input) {
        id
        nombre
        apellido
        apoderado
        nacimiento    
        docNum
    }
  }
`;


const EditarAlumno = () => {
    //obtener el ID actual
    const router = useRouter();
    const { query : { id } } = router;
    //console.log(id)

    //Consultar para obtener el apoderado
    const {data , loading, error } = useQuery(OBTENER_ALUMNO, {
        variables: {
            id
        }
    });

    //Actualizar el Apoderado
    const [actualizarAlumno] = useMutation(ACTUALIZAR_ALUMNO);



    //Schema de validacion 
    const schemaValidacion = Yup.object({
        nombre: Yup.string().required("Nombre del apoderado obligatorio"),
        apellido: Yup.string().required("Apellido del apoderado obligatorio"),
        apoderado: Yup.string().required("Apoderado del alumno obligatorio"),
        nacimiento: Yup.string().required("Nacimiento del alumno obligatorio"),
        docNum: Yup.number()
        .typeError("Debe ser un número", NaN)
        .required("Número de documento obligatorio"),
      });



    if(loading) return 'Cargando...';

    //console.log(data.obtenerApoderado)

    const { obtenerAlumno } = data;

    //Modificar el Apoderado en la bd
      const actualizarInfoApoderado = async valores => {
            const { nombre, apellido, apoderado, nacimiento, docNum } = valores;

            try{
                const { data } = await actualizarAlumno({
                    variables: {
                        id,
                        input: {
                            nombre, 
                            apellido, 
                            apoderado,  
                            nacimiento, 
                            docNum
                        } 
                    }
                });

                //console.log(data);

                //Mostrar Alerta
                
                Swal.fire(
                    'Actualizado',
                    'El Alumno se actualizo completamente',
                    'success'
                )

                //Redireccionar
                router.push('/alumno');

            } catch(error){
                console.log(error);
            }
      }


    return ( 
        <Layout>

            <h1 className="text-2xl text-gray-800 font-light">Editar Alumno</h1>

            <div className="flex justify-center mt-7">

            <div className="w-full max-w-lg">

            <Formik
                validationSchema = { schemaValidacion }
                enableReinitialize
                initialValues = { obtenerAlumno }
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
                    htmlFor="apoderado"
                >
                    Apoderado
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                    id="apoderado"
                    type="text"
                    placeholder="Apoderado"
                    value={props.values.apoderado}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                />
                </div>

                {props.touched.apoderado && props.errors.apoderado && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.apoderado}</p>
                </div>
                )}

                <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="docNum"
                >
                    N° de doc
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                    id="docNum"
                    maxLength="8"
                    type="text"
                    placeholder="Número de documento de identidad"
                    value={props.values.docNum}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                />
                </div>

                {props.touched.docNum && props.errors.docNum && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.docNum}</p>
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

                <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                value="Guardar Alumno"
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
export default EditarAlumno;