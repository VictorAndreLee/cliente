import React, { useState, useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import AdmisionContext from '../../context/admision/AdmisionContext';

const Dropzone = () => {
    const [ mostrarAdvertencia, setMostrarAdvertencia ] = useState(null);

    const admisionContext = useContext(AdmisionContext);
    const { 
        subirArchivoMatricula,
        matriculaFile 
    } = admisionContext;
    const onDrop = useCallback((acceptedFiles, fileRejections) => {


        if(matriculaFile.length > 6 ) {
            setTimeout(() => {
           setMostrarAdvertencia(false) 
        }, 3000); 
        return setMostrarAdvertencia(true);
        }
        if(fileRejections.length > 0) return null
        acceptedFiles.map(item => {
            subirArchivoMatricula(item)
        })
        
    })

    // Extraer contenido de dropzone 
    const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({onDrop, accept: '.pdf', maxSize:5242880, maxFiles: 7});

    const archivos = matriculaFile.map( archivo => (
        <li key={archivo.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="font-bold text-xl">{archivo.path}</p>
            <p className="text-sm text-gray-500">{(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
        </li>
    ))

    const advertencia = () => (
        <div className="border-4 border-dashed border-yellow-500 text-yellow-600 w-full py-5">
            <h1 className="font-bold text-yellow-600 text-lg">Aviso</h1>
            <p className="font-semibold">Algunos de los archivos no se pudieron subir.</p>
            <p className="font-semibold">Asegúrese en cumplir con los <span className="font-bold">requisitos de archivos</span></p>
        </div>
    )

    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-4 border-dashed border-gray-300 bg-gray-100 px-4">
            
            <ul className='w-8/12'>
                <p className='text-ellipsis overflow-hidden'>{archivos}</p>
            </ul>

            <div {...getRootProps({ className:"dropzone w-full py-32"})}>
                <input type="file" className="h-full " {...getInputProps()}/>
                   
                    {
                        isDragActive ? 
                        <p className="text-2xl text-center text-gray-600">Suelta el archivo</p> 
                        :
                        (
                            <div className="text-center">
                                <p>Selecciona un archivo o arrastra hacia aquí</p>
                                <button 
                                className="bg-blue-500 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-600"
                                >
                                    Selecciona un archivo para subir
                                </button>
                                {/* { fileRejections.length > 0 && (advertencia())} */}
                                { mostrarAdvertencia && (advertencia())}
                            </div>
                        )
                    }
            </div>
        </div>
    )
}

export default Dropzone
