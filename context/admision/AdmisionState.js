import React, { useReducer } from "react";
import AdmisionContext from "./AdmisionContext";
import AdmisionReducer from "./AdmisionReducer";
import { useRouter } from "next/router";

import {
    SUBIR_COPIA_POSTULACION,
    SUBIR_ARCHIVO_MATRICULA,
    GUARDAR_USUARIO,
    CERRAR_SESION,
    BORRAR_ARCHIVOS_POSTULACION,
    BORRAR_ARCHIVOS_MATRICULA
} from "../../types";

const AdmisionState = ({ children }) => {
    // State de paciente
    const initialState = {
        postulacionFile: [],
        matriculaFile: [],
        usuario: {},
    };
    
    const [state, dispatch] = useReducer(AdmisionReducer, initialState);

    const guardarUsuario = data => {
        dispatch({
          type: GUARDAR_USUARIO,
          payload: data
        });
    };
    const cerrarSesion = () => {
      
        dispatch({
          type: CERRAR_SESION,
        });
    };
    
    const subirArchivoPostulacion = data => {
      // console.log("perfil",data);
        dispatch({
          type: SUBIR_COPIA_POSTULACION,
          payload: data
        });
      };
    const borrarArchivosPostulacion = () => {
      // console.log("perfil",data);
        dispatch({
          type: BORRAR_ARCHIVOS_POSTULACION,
        });
      };
    const borrarArchivosMatricula = () => {
      // console.log("perfil",data);
        dispatch({
          type: BORRAR_ARCHIVOS_MATRICULA,
        });
      };

    const subirArchivoMatricula = data => {
      dispatch({
        type: SUBIR_ARCHIVO_MATRICULA,
        payload: data
      })
    }

    return (
        <AdmisionContext.Provider
          value={{
            postulacionFile: state.postulacionFile,
            matriculaFile: state.matriculaFile,
            usuario: state.usuario,
            borrarArchivosMatricula,
            borrarArchivosPostulacion,
            subirArchivoPostulacion,
            subirArchivoMatricula,
            guardarUsuario,
            cerrarSesion
          }}
        >
          {children}
        </AdmisionContext.Provider>
      );
  };
  
  export default AdmisionState;