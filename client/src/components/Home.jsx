import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterCountriesByContinent,
  alphabeticalOrder,
  orderByPopulation,
  getActivities,
  filterActivityByName,
  filterActivity,
} from "../actions/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import style from "./Estilos/Home.module.css";
import nav from "./Estilos/NavBar.module.css";

export default function Home() {
  const dispatch = useDispatch(); //es para usar la constante e ir despachando mis acciones
  const allCountries = useSelector((state) => state.countries); // con useSelector traese en la constante allCountries todo lo que esta en el estado de countries

  //-------------------
  // paginado
  const [currentPage, setCurrentPage] = useState(1); //hago un estado local con la pagina actual y el seteo de la pag actual. seteo el use state en 1 -> ya que siempre voy a arrancar en la primer pagina
  const [countriesPerPage, setCountriesPerPage] = useState(10); //hago un estado local con la cantidad de paisess por pagina y otro para setearlo. seteo el state en 10 (como pide el read me) -> pq son los personajes q quiero yo por pagina
  const indexOfLastCountrie = currentPage * countriesPerPage; //indice del ultimo pais -> la pagina actual (el 1) por la cantidad de paises x pagina (ej 10) osea en un rpincipio el indice seria 10
  const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage; //indice del primer pais -> indice del ultimo pais - paises por pagina
  const currentCountries = allCountries.slice(
    indexOfFirstCountrie,
    indexOfLastCountrie
  ); //cantidad de paises -> slice toma una porcion de array depende lo que le paso x parametro

  const paginado = (pageNumber) => {
    //declaro una constante q se llame paginado y le voy a pasar un nro de la pagina
    setCurrentPage(pageNumber); //y voy a setear la pagina en ese nro de pagina
  };

  //---------------------------

  //nos traemos del estado los paises cdo el componente se monta
  useEffect(() => {
    dispatch(getCountries()); //despacho el getcountries invocado
    dispatch(getActivities()); //despacho el getcountries invocado
  }, [dispatch]); //este array con dispatch quiere decir que se "monte" siempre y cdo suceda el getCountries (osea q traiga to2 los paises)


  //-------------------

  function handleClick(event) {
    //es para poder cargar todos los paises de vuelta cuando suceda un evento -> que aprieten el boton
    event.preventDefault(); //prevenimos que se rompa
    dispatch(getCountries()); //lo que despachamos es todos los paises
  }
  //--------------------------
  //estado local para filtro alfabetico
const [orden, setOrden] = useState("");

  //-----------handlers
  function handleFilterContinent(event) {
    //cuando yo eprieto cada opcion ocurre algo -> el evento
    dispatch(filterCountriesByContinent(event.target.value)); //por ende despacho la funcion de filtro x continente y le paso el e target value, que el lo que va dsp al action (el payload!!!!)
  }

  function handleAlphabeticalOrder(event) {
    event.preventDefault(); //prevenimos q se rompa
    if (event.target.value === "all") {
      dispatch(getCountries())
      setCurrentPage(1)
      setOrden(`Ordered ${event.target.value}`) 
    } else {
      dispatch(alphabeticalOrder(event.target.value));
    setCurrentPage(1); //declaramos q cdo haga el ordenamiento setee la pagina en la primera
    setOrden(`Ordered ${event.target.value}`); //para lo unico q me sirve es q cdo yo setee la currentPage, me modifique el estado local y se renderice
    }
    // alert(allCountries);
  }

  function handleOrderByPopulation(event) {
    event.preventDefault(); //prevenimos q se rompa
    if (event.target.value === "all") {
      dispatch(getCountries())
      setCurrentPage(1)
      setOrden(`Ordered ${event.target.value}`) 
    } else {
      dispatch(orderByPopulation(event.target.value));
    setCurrentPage(1); //declaramos q cdo haga el ordenamiento setee la pagina en la primera
    setOrden(`Ordered ${event.target.value}`); //para lo unico q me sirve es q cdo yo setee la currentPage, me modifique el estado local y se renderice
    }
  }
//-----------------------------------------------------------filter 
  //-------------------use selector filtro activities *****************************************************
  const allActivities = useSelector((state) => state.allActivities);

  function handleInputFilterActivity(event) {
    event.preventDefault();
    if (event.target.value === "all") {
      dispatch(getCountries())
      setCurrentPage(1)
      setOrden(`Ordered ${event.target.value}`) 
    } else {
      dispatch(filterActivityByName(event.target.value));
    setCurrentPage(1); //declaramos q cdo haga el ordenamiento setee la pagina en la primera
    setOrden(`Ordered ${event.target.value}`); //para lo unico q me sirve es q cdo yo setee la currentPage, me modifique el estado local y se renderice
    }
  }
  //----------------
  return (

    <div className={style.container}>
      {/* <h1 className={style.title}>COUNTRIES</h1>  */}
      {/* ----------------------
            paginado */}
      <div>
        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />
      </div>
      {/* ----------------------
            paginado */}


      <div className={nav.container}>
      <SearchBar 
      page = {setCurrentPage}
      />
      <div>
        <div>
          {console.log(allCountries)}
        <div className={nav.title}>Alphabetical order</div>
        <select className={nav.input} onChange={(event) => handleAlphabeticalOrder(event)}>
          {/*Alphabetical order*/}
          <option value ="all">All</option>
          <option value="asc">A-Z</option>
          <option value="des">Z-A</option>
        </select>
        </div>

        <div>
        <div className={nav.title}>Order by population</div>
        <select className={nav.input} onChange={(event) => handleOrderByPopulation(event)}>
          {/*Amount of population*/}
          <option value ="all">All</option>
          <option value="Higher">Higher population</option>
          <option value="Lower">Lower population</option>
        </select>
        </div>


        <div>
        <div className={nav.title}>Order by continent</div>
        <select className={nav.input} onChange={(event) => handleFilterContinent(event)}>
          {/*continent*/}
          <option value ="All">All</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Antarctic">Antarctic</option>
        </select>
        </div>

        <div>
        <div className={nav.title}>Filter by activity</div>
        <select className={nav.input} onChange={(event) => handleInputFilterActivity(event)}>
          {/*Activity************************************************/}
          <option value ="all">All</option>
          {allActivities?.map((activity) => (
            <option value={activity.name}> {activity.name} </option>
          ))}
        </select>
        </div>

        <div>
        <button className={nav.button}
          onClick={(event) => {
            handleClick(event);
          }}
        >
          Reload all countries
        </button>{" "}
        </div>

        {/*le pasamos el handdle click*/}
        {/*creamos un boton que me lleve a crear una actividad */}
      <div>
      <Link to="/create"> <button className={nav.button}>CREATE ACTIVITY</button></Link>{" "}
      </div>

        </div>
        <div className={style.cardscontainer}>
          {currentCountries?.map((x) => {
            //renderizamos la card
            return (
              <div>
                {/* que el personaje nos lleve a un link donde se pueda entrar por el id */}
                <Link to={`/home/detail/${x.id}`}>
                  <Card
                    flags={x.flags}
                    name={x.name}
                    region={x.region}
                    key={x.id}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

//aca se una hooks
