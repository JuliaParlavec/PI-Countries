import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getDetail } from "../actions/actions";
import { useEffect } from "react";

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch();
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getDetail(id)) //accedo al id del countrie q me pasan
    }, [dispatch, id])

    const myCountry = useSelector ((state) => state.detail)
console.log(myCountry)
    return (
        <div>
            {
                myCountry ? //si en my caracter hay algo
                <div>
                    <h1> {myCountry.name} </h1> 
                    {/* directamente .name pq es solo un objeto lo que me trae */}
                    <img src = {myCountry.flags} alt='img not found' />
                    <h2> Continent: {myCountry.region}</h2>
                    <h2> Capital: {myCountry.capital}</h2>
                    <h2> Subregion: {myCountry.subregion}</h2>
                    <h2> Area: {myCountry.area} km2 </h2>
                    <h2> Pupulation: {myCountry.population}</h2>
                    <h2> Continent: {myCountry.region}</h2>
                    <h3> Activities:  {myCountry.activities ? myCountry.activities + " " : "-"} </h3>
                </div> : <p>Loading...</p>
            }
            <Link to = '/home'>
                <button>Go back</button>
            </Link>
        </div>
    )
}