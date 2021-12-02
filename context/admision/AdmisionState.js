import React, { useReducer } from "react";
import AdmisionContext from "./AdmisionContext";
import AdmisionReducer from "./AdmisionReducer";

import {
    SUBIR_COPIA_POSTULACION,
    SUBIR_ARCHIVO_MATRICULA,
    GUARDAR_USUARIO,
    CERRAR_SESION
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