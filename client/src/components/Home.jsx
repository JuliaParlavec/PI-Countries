import React from "react";
import {useStates, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCountries} from '../actions/actions';
import {Link} from 'react-router-dom';
import Card from "./Card";

export default function Home(){
const dispatch = useDispatch() //es para usar la constante e ir despachando mis acciones
const allCountries = useSelector ((state) => state.countries) // con useSelector traese en la constante allCountries todo lo que esta en el estado de countries

//nos traemos del estado los paises cdo el componente se monta
useEffect(() => {
    dispatch(getCountries()) //despacho el getcountries invocado
},[dispatch]) //este array con dispatch quiere decir que se "monte" siempre y cdo suceda el getCountries (osea q traiga to2 los paises)


function handleClick(event){ //es para poder cargar todos los paises de vuelta cuando suceda un evento -> que aprieten el boton
    event.preventDefault(); //prevenimos que se rompa
    dispatch(getCountries()) //lo que despachamos es todos los paises
}
return (
    <div>
        <Link to = '/activities'>Create activity</Link> {/*creamos un boton que me lleve a crear una actividad */}
        <h1>COUNTRIES</h1> {/*Titulo de la pagina*/}
        <button onClick = {event => {handleClick(event)}}>Reload all countries</button> {/*le pasamos el handdle click*/}
        <div>
            <select>{/*Alphabetical order*/}
                <options>All</options>
                <options value = 'asc'>A-Z</options>
                <options value = 'des'>Z-A</options>
            </select>
            <select>{/*Amount of population*/}
                <options>All</options>
                <options>Ederly</options>
                <options>Minor</options>
            </select>
            <select>{/*continent*/}
                <options>All</options>
                <options>Europe</options>
                <options>Oceania</options>
                <options>Asia</options>
                <options>Africa</options>
                <options>Americas</options>
                <options>Antartic</options>
            </select>
            <select>{/*Activity*/}
                <options>All</options>
            </select>
        {
            allCountries && allCountries.map(x => { //hago el .map para recorrer tod el arreglo e ir renderizando
               return <Card flags = {x.flags} name = {x.name} region = {x.region} />
            }) 
        }
        </div>
    </div>
    
)

}

//aca se una hooks