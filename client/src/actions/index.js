import axios from 'axios';
import {
    GET_COUNTRIES,
    GET_NAME_COUNTRIES,
    GET_ACTIVITIES,
    ORDER_COUNTRY_BY_NAME,
    ORDER_COUNTRY_BY_POP,
    FILTER_BY_ACTIVITY,
    FILTER_BY_CONTINENT,
    GET_COUNTRY_DETAILS,
    CLEAN,
} from './types';

// Con las acciones despachamos types.
// Conexión con el servidor
export function getCountries() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/countries");
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data
        })
    }
};

// Acción search
export function getNameCountries(name) { // El arg name es el payload que llega desde la barra de búsqueda.
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/countries?name=${name}`);
            return dispatch({
                type: GET_NAME_COUNTRIES,
                payload: json.data // Es lo que devuelve la ruta.
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export function postActivity(input) {
    //console.log("input EN ACTION POST:", input);
    return async function () {
        try {
            let res = await axios.post("http://localhost:3001/activity", input);
            console.log("SOY res.data EN postActivity:", res.data);
            if (res) alert(res.data);
        } catch (error) { console.log(error) }
    }
};

export function getActivities() {
    return async function (dispatch) {
        try {
            var info = await axios.get("http://localhost:3001/activity");
            return dispatch({
                type: GET_ACTIVITIES,
                payload: info.data
            });
        } catch (error) { console.log(error) }
    };
};

// Acción de ordenamiento
export function orderCountryByName(payload) {
    return {
        type: ORDER_COUNTRY_BY_NAME,
        payload
    }
};

export function orderCountryByPop(payload) {
    return {
        type: ORDER_COUNTRY_BY_POP,
        payload
    }
};

// Acciones de filtrado
export function filterByActivity(payload) {
    console.log(payload, "estoy en actions de filter activity");
    return {
        type: FILTER_BY_ACTIVITY,
        payload
    }
};

export function filterByContinent(payload) {
    //console.log(payload);
    return {
        type: FILTER_BY_CONTINENT,
        payload
    }
};

export function getCountryDetails(id) {
    console.log(id);
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/countries/${id}`);
            return dispatch({
                type: GET_COUNTRY_DETAILS,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export function clean() {
    return {
        type: CLEAN,
    }
}