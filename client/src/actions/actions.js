import axios from "axios";

//acciones que voy a necesitar para mi home -> CADA UNA DE ESTAS ES UNA ACCION

//------------------------ GETS
//aca vamos a mostrar todos los paises, para eso vamos a hacer una funcion que los traia
export function getCountries() {
  return async function (dispatch) {
    //vamos a devolver una funcion asincrona dde le pasamos el dispatch
    //creamos una variable donde le paso la ruta del back q me trae todos los personajes
    const json = await axios.get("http://localhost:3001/countries", {});
    //ACA SUCEDE LA CONECCION DEL BACK CON EL FRONT
    dispatch({
      //aca despachamos la accion
      type: "GET_COUNTRIES",
      payload: json.data, //la data de json osea la info que tenemos en la ruta q hicimos en el back(todos los paises)
    });
  };
}
//el dispatch funciona de manera que hay que esperar (async) a que se cumpla la funcion (const json = await axios.get('http://localhost:3001/countries') para
//poder retornar el dispatch - la accion - (  type: 'GET_COUNTRIES', payload: json.data)

//ACCION QUE TRAIGA TODAS LAS ACTIVIDADES
export function getActivities() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/allActivities", {});

    dispatch({
      type: "GET_ACTIVITIES",
      payload: json.data,
    });
  };
}

export function getNameCountries(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      ); //para que a la ruta le pegue lo que le lega por payload
      return dispatch({
        type: "GET_NAME_COUNTRIES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
//------------------------------------------
//FILTRADOS : Botones/Opciones para filtrar por continente y por tipo de actividad turística

//en las acciones no ponemos logica, solo despachamos timpos, la logica la hacemos en el reducer
export function filterCountriesByContinent(payload) {
  //le paso un payload que va a ser el value que me va a llegar
  return {
    type: "FILTER_BY_CONTINENT",
    payload,
  };
}

export function filterActivityByName(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `http://localhost:3001/allActivities?name=${name}`
      ); //para que a la ruta le pegue lo que le lega por payload
      return dispatch({
        type: "FILTER_BY_ACTIVITY",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//-------------------------------------------
//ORDENAMIENTOS: Botones/Opciones para ordenar tanto ascendentemente como descendentemente los países por orden alfabético y por cantidad de población
export function alphabeticalOrder(payload) {
  return {
    type: "ALPHABETICAL_ORDER",
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: "ORDER_BY_POPULATION",
    payload,
  };
}

//-------------------------------------------
//POST
export function postActivity(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/activities",
      payload
    );
    console.log(response);
    return response;
  };
}

//-----------------------------------------------
//detail
export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
