import {
    SUBIR_COPIA_POSTULACION,
    SUBIR_ARCHIVO_MATRICULA,
    BORRAR_ARCHIVOS_POSTULACION,
    BORRAR_ARCHIVOS_MATRICULA,
    GUARDAR_USUARIO,
    CERRAR_SESION
} from "../../types";

  const AdmisionState = (state, action) => {
    switch (action.type) {
    case SUBIR_COPIA_POSTULACION:
      return {
        ...state,
        postulacionFile: [...state.postulacionFile, action.payload],
      }; 
    case BORRAR_ARCHIVOS_POSTULACION:
      return {
        ...state,
        postulacionFile: [],
      }; 
    case BORRAR_ARCHIVOS_MATRICULA:
      return {
        ...state,
        matriculaFile: [],
      }; 
    case GUARDAR_USUARIO:
      return {
        ...state,
        usuario: action.payload,
      }; 
    case CERRAR_SESION:
      return {
        ...state,
        usuario: {},
      }; 
    case SUBIR_ARCHIVO_MATRICULA:
      return {
        ...state,
        matriculaFile: [...state.matriculaFile, action.payload],
      }; 
    default:
        return state;
    }
  };
  
  export default AdmisionState