import React from "react";

export default function Paginado ({countriesPerPage, allCountries, paginado}){ //me traigo esto cmo propiedades del otro componente
    const pageNumbers = [] //hago una const pagenumbers que sea un arreglo vacio

    for (let i = 1; i < Math.ceil(allCountries/countriesPerPage); i++){ //hago un for q redondea todos los personajes sobre la cant de personajer por pagina
        pageNumbers.push(i) //los agrego al array
    }

        //renderiza los numeros
        return (
            <div>
                {   pageNumbers &&
                    pageNumbers.map(num=>(
                        <span key={num}>
                            <button  onClick={()=>paginado(num)}>{num}</button>
                        </span>
                    ))
                }
            </div>
        )
    
}

