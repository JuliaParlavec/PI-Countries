import React from 'react';
import {Link} from 'react-router-dom';
import style from './Estilos/LandingPage.module.css'

export default function LandingPage(){
    return (
        <div className={style.container}>
            <div className={style.title}>COUNTRIES</div>
            <Link to = '/home'>
                <button className={style.enter}>START</button>
            </Link>
        </div>
    )
}