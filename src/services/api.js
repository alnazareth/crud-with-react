// En este apartado importamos la libreria que vamos a estar utilizando para este proyecto
import axios from 'axios';

//Crea una instancia de Axios con la URL base del servidor donde estan los datos procargado Json
const api = axios.create({
  baseURL: 'http://localhost:5000', // Por defecto elegí el puerto 5000  que es la dirección en donde se habilitará el server donde stan los datos
});

export default api;
