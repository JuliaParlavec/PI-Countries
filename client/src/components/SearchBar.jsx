import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions/actions";

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
        type="text" // tipo q se ppuede escribir
        placeholder="Search country..."
        onChange={(event) => handleInputChange(event)}
      />
      <button type="submit" onSubmit={(event) => handleSubmit(event)}>
        Search
      </button>
    </div>
  );
}
