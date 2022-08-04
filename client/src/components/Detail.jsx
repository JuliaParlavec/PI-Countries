import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/actions";
import { useEffect } from "react";
import style from "./Estilos/Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getDetail(id)); //accedo al id del countrie q me pasan
  }, [dispatch, id]);

  const myCountry = useSelector((state) => state.detail);

  return (
    <div className={style.container}>
      <div className={style.cardcontainer}>
        <div className={style.countrycontainer}>
          <div className={style.card}>
            {/* directamente .name pq es solo un objeto lo que me trae */}
            <img
              className={style.flag}
              src={myCountry.flags}
              alt="img not found"
            />
            <div className={style.name}>{myCountry.name} </div>
            <div className={style.info}> Continent: {myCountry.region}</div>
            <div className={style.info}>Capital: {myCountry.capital}</div>
            <div className={style.info}> Subregion: {myCountry.subregion}</div>
            <div className={style.info}>Area: {myCountry.area} km2 </div>
            <div className={style.info}>
              {" "}
              Pupulation: {myCountry.population}
            </div>
          </div>

          <div>
            <div>
              <div className={style.name}>Country Activities: </div>
            </div>
            {myCountry.activities?.map((e) => {
              return (
                <div key={e.id + 1000} className={style.actcard}>
                  <div key={e.name} className={style.name}>
                    Activity: {e.name}{" "}
                  </div>
                  <div key={e.difficulty + 2000} className={style.info}>
                    Difficulty: {e.difficulty}{" "}
                  </div>
                  <div key={e.season} className={style.info}>
                    Season: {e.season}{" "}
                  </div>
                  <div key={e.duration} className={style.info}>
                    Duration: {e.duration} h
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Link to="/home">
          <button className={style.button}>Back</button>
        </Link>
      </div>
    </div>
  );
}
