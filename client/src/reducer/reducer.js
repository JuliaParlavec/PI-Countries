//Inicializamos el estado
const initialState = {
    countries : []
}

function rootReducer (state = initialState, action){
    switch(action.type) { //le pasamos el tipo de accion
        case 'GET_COUNTRIES': //al ser get countries le decimos que 
            return{
                ...state, //guarde el estado
                countries: action.payload //en mi estado countries que al inicio es un estado vacio, manda todo lo que te mande la accion get countries
            }
        default:
            return state;
    }
}

export default rootReducer;