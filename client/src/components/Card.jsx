import React from "react";
import style from './Estilos/Card.module.css'

export default function Card ({flags, name, region, id}) {
    return (
        <div>
            <div className = {style.container}>
            <div className = {style.container2}>
            <img className = {style.flag} src = {flags} alt = 'Img not found' />
            <div className = {style.details1}> {name} </div>
            <div className = {style.details}> {region} </div>
            </div>
            </div>
        </div>
    );
}