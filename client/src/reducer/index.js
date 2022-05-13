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
} from '../actions/types';

const initialState = {
    countries: [],
    filterCountries: [],
    activities: [],
    countryDetails: []
}

function rootReducer(state = initialState, action) {
    console.log(action.payload, action.type, "estoy en el reducer")
    switch (action.type) {

        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload, // En el estado countries que inicialmente está definido como un arreglo vacío mandar todo lo que envíe la acción GET_CONTRIES.
                filterCountries: action.payload
            }

        case GET_NAME_COUNTRIES:
            return {
                ...state,
                filterCountries: action.payload,
            }

        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }

        case ORDER_COUNTRY_BY_NAME:
            console.log(state.countries);
            let sortArray = action.payload === 'a-z' ?
                state.filterCountries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.filterCountries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                filterCountries: sortArray // Le pasamos al estado la const con su lógica
            }

        case ORDER_COUNTRY_BY_POP:
            let sortArrayPop = action.payload === 'asc' ?
                state.filterCountries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return 1;
                    }
                    if (b.population > a.population) {
                        return -1;
                    }
                    return 0;
                }) :
                state.filterCountries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return -1;
                    }
                    if (b.population > a.population) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                filterCountries: sortArrayPop // Le pasamos al estado la const con su lógica
            }

        case FILTER_BY_ACTIVITY:
            console.log("REDUCER FILTER_BY_ACTIVITY", action.payload);
            console.log("REDUCER state.countries", state.countries);
            return {
                ...state,
                filterCountries: state.countries.filter((el) =>
                    el.activities.map((e) => e.name).includes(action.payload)
                )
            }

        case FILTER_BY_CONTINENT:
            console.log('countries', state.filterCountries);
            if (action.payload === 'All') {
                return {
                    ...state,
                    filterCountries: state.countries
                }
            } else {
                return {
                    ...state,
                    filterCountries: state.countries.filter(el => action.payload.includes(el.continent))
                }
            }

        case GET_COUNTRY_DETAILS:
            return {
                ...state,
                countryDetails: action.payload
            }

        case CLEAN:
            return {
                ...state,
                countryDetails: []
            }

        default:
            return state;
    }
};

export default rootReducer;