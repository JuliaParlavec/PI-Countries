import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCountries} from '../actions/actions';
import {Link} from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home(){
const dispatch = useDispatch() //es para usar la constante e ir despachando mis acciones
const allCountries = useSelector ((state) => state.countries) // con useSelector traese en la constante allCountries todo lo que esta en el estado de countries

//---------------------------
// paginado
const [currentPage, setCurrentPage] = useState(1) //hago un estado local con la pagina actual y el seteo de la pag actual. seteo el use state en 1 -> ya que siempre voy a arrancar en la primer pagina
const [countriesPerPage, setCountriesPerPage] = useState(10) //hago un estado local con la cantidad de paisess por pagina y otro para setearlo. seteo el state en 10 (como pide el read me) -> pq son los personajes q quiero yo por pagina
const indexOfLastCountrie = currentPage * countriesPerPage //indice del ultimo pais -> la pagina actual (el 1) por la cantidad de paises x pagina (ej 10) osea en un rpincipio el indice seria 10
const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage //indice del primer pais -> indice del ultimo pais - paises por pagina
const currentCountries = allCountries.slice(indexOfFirstCountrie, indexOfLastCountrie) //cantidad de paises -> slice toma una porcion de array depende lo que le paso x parametro

const paginado = (pageNumber) => { //declaro una constante q se llame paginado y le voy a pasar un nro de la pagina
    setCurrentPage(pageNumber) //y voy a setear la pagina en ese nro de pagina
}

//---------------------------


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
                <option>All</option>
                <option value = 'asc'>A-Z</option>
                <option value = 'des'>Z-A</option>
            </select>
            <select>{/*Amount of population*/}
                <option>All</option>
                <option>Ederly</option>
                <option>Minor</option>
            </select>
            <select>{/*continent*/}
                <option>All</option>
                <option>Europe</option>
                <option>Oceania</option>
                <option>Asia</option>
                <option>Africa</option>
                <option>Americas</option>
                <option>Antartic</option>
            </select>
            <select>{/*Activity*/}
                <option>All</option>
            </select>
            {/* ----------------------
            paginado */}
            <Paginado
            countriesPerPage = {countriesPerPage}
            allCountries = {allCountries.length}
            paginado = {paginado}
            />
             {/* ----------------------
            paginado */}
        {currentCountries?.map((x) => { //renderizamos la card
            return (
                <div>
                    {/* que el personaje nos lleve a un link donde se pueda entrar por el id */}
                    <Link to = {"/home/" + x.id}>
                    <Card flags = {x.flags} name = {x.name} region = {x.region} key = {x.id} />
                    </Link>
                </div>
            )
        })
        }
        </div>
    </div> 
)
}

//aca se una hooks