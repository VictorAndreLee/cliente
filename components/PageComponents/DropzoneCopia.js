import React, { useState, useCallback, useContext } from 'react'
import AdmisionContext from '../../context/admision/AdmisionContext';
import { useDropzone } from 'react-dropzone'

const DropzoneCopia = () => {
    const [ mostrarAdvertencia, setMostrarAdvertencia ] = useState(null);
    
    const admisionContext = useContext(AdmisionContext);
    const { 
        postulacionFile,
        subirArchivoPostulacion 
    } = admisionContext;
    
    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        // console.log(acceptedFiles);
        if(postulacionFile.length > 2 ) {
            
            setTimeout(() => {
           setMostrarAdvertencia(false) 
        }, 3000); 
        return setMostrarAdvertencia(true);
        }
        if(fileRejections.length > 0) return null

        
        // postulacionFile.map(item => {
        //     console.log("awaasdsadsa");
        //     if(acceptedFiles[0].name === item.name) return setMostrarAdvertencia(true);
        // })
        acceptedFiles.map(item => {
            subirArchivoPostulacion(item)
        })
        
    })

    // Extraer contenido de dropzone 
    const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({onDrop, accept: '.pdf', maxSize:5242880, maxFiles: 3});

    const archivos = postulacionFile.map( archivo => (
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
            
            <ul>
                {archivos}
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
                                { fileRejections.length > 0 && (advertencia())}
                                { mostrarAdvertencia && (advertencia())}
                            </div>
                        )
                    }
            </div>
        </div>
    )
}

export default DropzoneCopia
