import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postActivity, getCountries, getActivities } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "./Validations"; //importo la funcion
import style from "./Estilos/ActivityCreate.module.css";

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries); //me traigo todos los paises

  const [input, setInput] = useState({
    //tengo que hacer un estado donde le paso todos los imput q se ponen eb el formularioq necesita el post
    //creamos un objeto
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [], //lo tenemos que ir guardando en countries
  });
  const [errors, setErrors] = useState({}); //me genero un estado local que va a ser un objeto vacio

  useEffect(() => {
    //Cada vex q se monta o actualixa el componente qioerp qie traiga todos los paises actualizado
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  //Para el nombre
  function handleName(e) {
    // e.prevent.default();
    //va a ir cambiando cada vez q cambien o se modifiquen mis imputs
    setInput({
      //quiero ir guardando las cosas que e usuarios va escribiedo en el input en mi estado input
      ...input, //trae todo lo que ya tenias
      name: e.target.value, //el e.target.name seteamelo en el e.target.value de lo que este modificando
      //el [e.target.name] va a ir siendo el name de cada uno de los imputs
    });
    setErrors(
      validate({
        //seteame mi estado errores pasandole la funcion validate que yo hice
        ...input, //con el estado imput
        name: e.target.value, //y el estado name en el e.target.value
      })
    );
  }
  function handleDifficulty(e) {
    setInput({
      ...input,
      difficulty: e.target.value,
    });
    setErrors(
      validate({
        //seteame mi estado errores pasandole la funcion validate que yo hice
        ...input, //con el estado imput
        difficulty: e.target.value, //y el estado name en el e.target.value
      })
    );
  }
  function handleDuration(e) {
    setInput({
      ...input,
      duration: e.target.value,
    });
    setErrors(
      validate({
        //seteame mi estado errores pasandole la funcion validate que yo hice
        ...input, //con el estado imput
        duration: e.target.value, //y el estado name en el e.target.value
      })
    );
  }
  function handleSeason(e) {
    setInput({
      ...input,
      season: e.target.value,
    });
    setErrors(
      validate({
        //seteame mi estado errores pasandole la funcion validate que yo hice
        ...input, //con el estado imput
        season: e.target.value, //y el estado name en el e.target.value
      })
    );
  }
  //para los paises
  function handleCountry(e) {
    //es el estado donde voy a guardar todo
    setInput({
      ...input,
      countries: [...input.countries, e.target.value], //traeme todo lo que ya tenia y concatenale el target value, va guardando todo  o que guardo en el select
    });
    setErrors(
      validate({
        //seteame mi estado errores pasandole la funcion validate que yo hice
        ...input, //con el estado imput
        countries: e.target.value, //y el estado name en el e.target.value
      })
    );
  }

  //para el submit
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postActivity(input)); //q cuando ocurra el evento se "despache" la actividad
    alert("Activity created succesfully!");
    //aparece una alerta con el mensaje
    setInput({
      //para que se ponga en 0, agarro todo y lo paso vacio
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
  }

  function handleDelete(el) {
    setInput({
      ...input,
      countries: input.countries.filter((o) => o !== el),
    });
    if (input.countries.length < 1) {
      setErrors(
        validate({
          //seteame mi estado errores pasandole la funcion validate que yo hice
          ...input, //con el estado imput
          countries: [], //y el estado name en el e.target.value
        })
      );
    }
  }

  //ahora renderizamos
  return (
    <div className={style.container}>
      <div className={style.cardcontainer}>
        <div className={style.title}>Create Activity</div>
        <div>
          <form>
            <div>
              <label className={style.atribute}>Name:</label>
              <input
                placeholder="Enter an activity..."
                required={true}
                pattern="[a-zA-Z ]{3,254}"
                className={style.input}
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleName(e)}
              />
              {errors.name && ( //si esta mi estado de errors.name
                <p className={style.pdanger}> {errors.name} </p> //entonces renderizame el error
              )}
            </div>
            <div>
              <label className={style.atribute}>Difficulty:</label>
              <select
                className={style.input}
                onChange={(e) => handleDifficulty(e)}
              >
                <option></option>
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
              </select>
              {errors.difficulty && (
                <p className={style.pdanger}>{errors.difficulty}</p>
              )}
            </div>
            <div>
              <label className={style.atribute}>Duration(hours):</label>
              <select
                className={style.input}
                onChange={(e) => handleDuration(e)}
              >
                <option></option>
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
              {errors.duration && (
                <p className={style.pdanger}>{errors.duration}</p>
              )}
            </div>
            <div>
              <label className={style.atribute}>Season: </label>
              <select className={style.input} onChange={(e) => handleSeason(e)}>
                <option></option>
                <option value="spring" key="spring">
                  Spring
                </option>
                <option value="summer" key="summer">
                  Summer
                </option>
                <option value="autumn" key="autumn">
                  Autumn
                </option>
                <option value="winter" key="winter">
                  Winter
                </option>
              </select>
              {errors.season && (
                <p className={style.pdanger}>{errors.season}</p>
              )}
            </div>

            <label className={style.atribute}>Countries:</label>
            <select
              placeholder="find your country..."
              className={style.input}
              onChange={(e) => handleCountry(e)}
            >
              {countries.map((c) => (
                <option value={c.name}> {c.name}</option>
              ))}
            </select>
            {errors.countries && (
              <p className={style.pdanger}>{errors.countries}</p>
            )}
          </form>

          <div className={style.buttonscontainer}>
            <Link to="/home">
              <button className={style.button}>Back</button>
            </Link>
            <button
              className={style.button}
              type="submit"
              onClick={(e) => handleSubmit(e)}
              disabled={
                !input.name ||
                !input.duration ||
                !input.season ||
                !input.difficulty ||
                !input.countries.length > 0
                  ? true
                  : false
              }
            >
              Add Activity
            </button>
          </div>

          <div className={style.countrycontainer}>
            {input.countries.map((el) => (
              <div className={style.country}>
                <div> {el} </div>
                <button
                  className={style.close}
                  onClick={() => handleDelete(el)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
