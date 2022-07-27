//Inicializamos el estado
const initialState = {
    countries : [], //arreglo dde se dejan los q se renderizan
    allCountries: [], //hace una copia del estado que siempre tenga todos los peronajes
    allActivities: [] //hace una compia de todas las actividades
}

function rootReducer (state = initialState, action){
    switch(action.type) { //le pasamos el tipo de accion
        case 'GET_COUNTRIES': //al ser get countries le decimos que 
            return{
                ...state, //guarde el estado
                countries: action.payload, //en mi estado countries que al inicio es un estado vacio, manda todo lo que te mande la accion get countries
                allCountries: action.payload //mete todos los personajes en allCountries tb
            }
        
        case 'FILTER_BY_CONTINENT':
            const allCountries = state.allCountries //para acceder a todos los paises desde el reducer, uso el arreglo que tiene todo, para que si cambio el filtro se haga sobre todos, no sobre el arreglo que deja los q renderiza!
            //el valor del select va a ser lo que va a llegar desde el e targuet value y va a llegar a la accion por payload
            const continentFiltered = action.payload === 'All' ? allCountries : allCountries.filter(x => x.region === action.payload) //si el value es all, que devuelva todos, sino q filtre aquel que la region (continente) sea igual a la action pasada por payload
            return {
                ...state, //siempre se concatena todo el estado anterior
                countries: continentFiltered //a continent le devuelvo la constante de los filtrados
            }
        
        // case 'GET_ACTIVITIES':
        //     return {
        //         ...state,
        //         allActivities: action.payload,
        //     }


        default:
            return state;
    }
}

export default rootReducer;