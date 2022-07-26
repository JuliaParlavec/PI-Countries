import axios from 'axios';

//acciones que voy a necesitar para mi home
//aca vamos a mostrar todos los paises, para eso vamos a hacer una funcion que los traia
export function getCountries(){
    return async function(dispatch){ //vamos a devolver una funcion asincrona dde le pasamos el dispatch
        //creamos una variable donde le paso la ruta del back q me trae todos los personajes
        const json = await axios.get('http://localhost:3001/countries', {
        }) 
        //ACA SUCEDE LA CONECCION DEL BACK CON EL FRONT
        dispatch ({ //aca despachamos la accion
            type: 'GET_COUNTRIES',
            payload: json.data //la data de json osea la info que tenemos en la ruta q hicimos en el back(todos los paises)
        })
   } 
}
//el dispatch funciona de manera que hay que esperar (async) a que se cumpla la funcion (const json = await axios.get('http://localhost:3001/countries') para
//poder retornar el dispatch - la accion - (  type: 'GET_COUNTRIES', payload: json.data)