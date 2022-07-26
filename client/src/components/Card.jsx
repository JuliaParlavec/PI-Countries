import React from "react";

export default function Card ({flags, name, region, id}) {
    return (
        <div>
            <img src = {flags} alt = 'Img not found' width='200px' height='250px'/>
            <h3> {name} </h3>
            <h5> {region} </h5>
        </div>
    );
}