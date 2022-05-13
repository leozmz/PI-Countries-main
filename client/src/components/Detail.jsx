import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCountryDetails, clean } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Detail() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const countryDetails = useSelector(state => state.countryDetails);
    console.log('countryDetails: ', countryDetails);

    useEffect(() => {
        // Se monta componente.
        dispatch(getCountryDetails(id));
        return dispatch(clean());
    }, [id]);

    return (
        <div>
            <div>
                <h3>Detalle de País</h3>
                <img src={countryDetails.img} alt="img no encontrada" />
                <p>Nombre: {countryDetails.name}</p>
                <p>Capital: {countryDetails.capital}</p>
                <p>Código de País: {countryDetails.id}</p>
                <p>Continente: {countryDetails.continent}</p>
                <p>Subregión: {countryDetails.subregion}</p>
                <p>Área: {countryDetails.area} Km2</p>
                <p>Población: {countryDetails.population}</p>
            </div>

            <div>
                <h3>Actividades Turísticas</h3>
                {countryDetails.activities?.length ? countryDetails.activities.map((activity) => (
                    <div>
                        <h4>
                            {" "}
                            {activity.name.charAt(0).toUpperCase() +
                                activity.name.slice(1).toLowerCase()}
                        </h4>
                        <p>Dificultad: {activity.difficulty}</p>
                        <p>Duración: {activity.duration} horas</p>
                        <p>Temporada: {activity.season}</p>
                    </div>
                )) : <p>Este País aún no tiene actividades turísticas asignadas</p>}
            </div>

            <div>
                <Link to='/home'>
                    <button>VOLVER AL INICIO</button>
                </Link>
            </div>
        </div>
    )

}