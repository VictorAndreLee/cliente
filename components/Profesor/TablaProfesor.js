import React from 'react';
import Swal from 'sweetalert2';

import { useMutation, useQuery, gql } from '@apollo/client';

import Router from 'next/router';

const ELIMINAR_PROFESOR = gql`
    mutation eliminarProfesor($id: ID!) {
    eliminarProfesor(id: $id)
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

const TablaProfesor = ({item}) => {

    // Destructior item
    const { 
        id, 
        nombre,
        apellido,
        dni,
        celular,
        correo,
        nacimiento,
        distrito,
        direccion } = item;

    // Utilizar Mutation
    const [ eliminarProfesor ] = useMutation(ELIMINAR_PROFESOR, {
        update(cache) {
            // Obtener una copia del objeto de cache
            const { obtenerProfesores } = cache.readQuery({ query: OBTENER_PROFESORES });

            // Reescribir el cache
            cache.writeQuery({
                query: OBTENER_PROFESORES,
                data: {
                    obtenerProfesores : obtenerProfesores.filter( obtenerProfesores => obtenerProfesores.id !== id)
                }
            })
        }
    });

    // Eliminar Producto
    const confirmarEliminarProducto = () => {
        Swal.fire({
            title: '¿Deseas eliminar al profesor?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
          }).then(async (result) => {
            if (result.isConfirmed) {
            //   console.log('eliminando', id);
                try {
                    // Eliminar por ID
                    const { data } = await eliminarProfesor({
                        variables:{
                            id: id
                        }
                    })

                    // Mostrar una alerta
                    // console.log(data);
                    Swal.fire(
                        'Eliminado',
                        data.eliminarProfesor,
                        'success'
                    )

                } catch (error) {
                    console.log(error.message); 
                }

            }
          })
    }

    const editarCliente = () => {
        Router.push({
            pathname:'/profesor/[id]',
            query:{ id }
        })
    }

    return (
        <tr>
            <td className="border px-4 py-2">{nombre}</td>
            <td className="border px-4 py-2">{apellido}</td>
            <td className="border px-4 py-2">{nacimiento.substring(0,10)}</td>
            <td className="border px-4 py-2">{dni}</td>
            <td className="border px-4 py-2">{celular}</td>
            <td className="border px-4 py-2">{correo}</td>
            <td className="border px-4 py-2">{distrito}</td>
            <td className="border px-4 py-2">{direccion}</td>
            <td className="border px-4 py-2 ">
                <button
                    type="button"
                    className="flex justify-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold hover:bg-red-900"
                    onClick={ () => confirmarEliminarProducto () }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
                
           
                <button
                    type="button"
                    className="flex justify-center items-center bg-green-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold hover:bg-green-900"
                    onClick={ () => editarCliente () }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                    </svg>
                </button>
                
            </td>
        </tr>
    )
}

export default TablaProfesor
