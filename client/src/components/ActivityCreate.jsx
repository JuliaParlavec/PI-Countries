import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postActivity, getCountries } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  const [input, setInput] = useState({
    //
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  useEffect(() => {
    //Cada vex q se monta o actualixa el componente qioerp qie traiga todos los paises actualizado
    dispatch(getCountries());
  }, [dispatch]);

  //es para los de opcion de escribir
  function handleChange(e) {
    e.prevent.default();
    //va a ir cambiando cada vez q cambien o se modifiquen mis imputs
    setInput({
      //quiero ir guardando las cosas que e usuarios va escribiedo en el input en mi estado input
      ...input, //trae todo lo que ya tenias
      [e.target.name]: e.target.value, //el e.target.name seteamelo en el e.target.value de lo que este modificando
      //el [e.target.name] va a ir siendo el name de cada uno de los imputs
    });
  }

  //Para los de ocion de check box
  function handleCheck(e) {
    if (e.target.checked) {
      //si checkbox imput esta marcado
      setInput({
        //agarra mi estado, seteamelo
        ...input, //trae lo q ya hay en el input
        status: e.target.value, //y q el estado este en lo q marcamos
      });
    }
  }

  //para los paises desplegables
  function handleSelect(e) {
    setInput({
      ...input,
      countries: [...input.countries, e.target.value], //va agregando en un arreglo todo lo que yo guarde en el select
    });
  }

  //para el submit
  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postActivity(input)); //q cuando ocurra el evento se "despache" la actividad
    alert("Activity creates succesfully!"); //aparece una alerta con el mensaje
    setInput({
      //para que se ponga en 0, agarro todo y lo paso vacio
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
  }

  //ahora renderizamos
  return (
    <div>
      <div>
        <div>Create Activity</div>
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label>Difficulty:</label>
              <label>
                <input
                  type="checkbox"
                  name="1"
                  value="1"
                  onChange={(e) => handleCheck(e)}
                />
                1
              </label>
              <label>{input.difficulty}</label>
              <label>
                <input
                  type="checkbox"
                  name="2"
                  value="2"
                  onChange={(e) => handleCheck(e)}
                />
                2
              </label>
              <label>
                <input
                  type="checkbox"
                  name="3"
                  value="3"
                  onChange={(e) => handleCheck(e)}
                />
                3
              </label>
              <label>
                <input
                  type="checkbox"
                  name="4"
                  value="4"
                  onChange={(e) => handleCheck(e)}
                />
                4
              </label>
              <label>
                <input
                  type="checkbox"
                  name="5"
                  value="5"
                  onChange={(e) => handleCheck(e)}
                />
                5
              </label>
            </div>
            <div>
              <label>Duration(hours):</label>
              <select name="duration" onChange={(e) => handleChange(e)}>
                <option value="1" key="1">
                  1
                </option>
                <option value="2" key="2">
                  2
                </option>
                <option value="3" key="3">
                  3
                </option>
                <option value="4" key="4">
                  4
                </option>
                <option value="5" key="5">
                  5
                </option>
                <option value="6" key="6">
                  6
                </option>
                <option value="7" key="7">
                  7
                </option>
                <option value="8" key="8">
                  8
                </option>
              </select>
            </div>
            <div>
              <label>Season: </label>
              <select name="season" onChange={(e) => handleChange(e)}>
                <option value="spring" key="spring">
                  Spring
                </option>
                <option value="summer" key="summer">
                  Summer
                </option>
                <option value="fall" key="fall">
                  Fall
                </option>
                <option value="winter" key="winter">
                  Winter
                </option>
              </select>
            </div>
            <div>
              <label>Countries:</label>
              <select onChange={(e) => handleSelect(e)}>
                {countries.map((c) => (
                  <option value={c.name}> {c.name}</option>
                ))}
              </select>
              <ul>
                <li>{input.countries.map((el) => el + ", ")} </li>
              </ul>{" "}
              {/* renderiza cada cosa que voy marcando en el select */}
            </div>
            <button type="submit" onClick={(e) => handleSubmit(e)} >Add Activity</button>
          </form>


          <Link to="/home">
            <button>Volver</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
