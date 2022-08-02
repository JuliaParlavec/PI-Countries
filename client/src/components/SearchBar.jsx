import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions/actions";
import style from "./Estilos/SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(event) {
    event.preventDefault();
    setName(event.target.value); //seteamos el name con el value del imput!
    console.log(name); //esto es para ver ahora como se va modificando
  }

  function handleSubmit(event) {
    //esta es para cdo apretamos el boton
    event.preventDefault();
    dispatch(getNameCountries(name)); //despachamos la accion con el nombre como parametro! el cual se va a convertir en el estado local, que es lo que esta tipeando mi usuario
  }

  return (
    <div>
      <input // se puede escribir
      className={style.input}
        type="text" // tipo q se ppuede escribir
        placeholder="Search country..."
        onChange={(event) => handleInputChange(event)}
      />
      <button className={style.button} type="submit" onClick={(event) => handleSubmit(event)}>
        Search
      </button>
    </div>
  );
}
