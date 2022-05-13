// Importamos React y los hooks que usaremos de React.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Importamos los hooks de React-Redux (instalar npm i react-redux).
import { useDispatch, useSelector } from 'react-redux';
// Importamos las actions que usaremos en este componente.
import { getCountries, orderCountryByName, orderCountryByPop } from '../actions';
// Importamos los componentes que utilizaremos.
import Card from './Card';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import FilterByContinent from './FilterByContinent';
import FilterByActivity from './FilterByActivity';
import styles from './Home.module.css';

// Inicia el componete.
export default function Home() {
    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.filterCountries); // Trae desde el reducer el estado filterCountries que tiene todos los países.

    /////////////////////////////////////////////
    // Orden
    const [order, setOrder] = useState('');
    /////////////////////////////////////////////

    // Hook para que al cambiar el contenido de allCountries se configure la página actual en 1.
    useEffect(() => {
        setCurrentPage(1)
    }, [allCountries]);
    // Hook para traer desde el estado el país cuando el componente se monta.
    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]);

    /////////////////////////////////////////////
    // Paginado
    // Creamos estados locales, uno con la página actual y otro que la configure.
    const [currentPage, setCurrentPage] = useState(1); // Siempre comienza desde la primer página.
    // Definimos la cantidad de países que queremos ver en la primera página.
    const initialStateCountriesPerPage = 9;
    const [countriesPerPage, setCountriesPerPage] = useState(initialStateCountriesPerPage); // Estado inicial de la cantidad de países mostrados en la 1ra. pág.
    const indexOfLastCountry = currentPage * countriesPerPage; // 9
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 0
    const currentCountries = allCountries?.slice(indexOfFirstCountry, indexOfLastCountry);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);

        // En el siguiente bloque se decide que a partir de la segunda página listar 10 países por página.
        console.log(currentPage);
        if (pageNumber === 1) {
            setCurrentPage(1);
            setCountriesPerPage(initialStateCountriesPerPage);
        } else if (pageNumber > 1) {
            setCountriesPerPage(initialStateCountriesPerPage + 1);
        }
    };

    /////////////////////////////////////////////
    // Handlers
    /////////////////////////////////////////////
    function handleClick(e) {
        e.preventDefault();
        setCurrentPage(1);
        setCountriesPerPage(9)
        dispatch(getCountries());
    };

    function handleCountrySortByName(e) {
        e.preventDefault();
        dispatch(orderCountryByName(e.target.value));
        setCurrentPage(1); // Cuando se configure esta página
        setOrder(`Ordenado ${e.target.value}`) // modifique el estado local y se renderice.
    };

    function handleCountrySortByPop(e) {
        e.preventDefault();
        dispatch(orderCountryByPop(e.target.value));
        setCurrentPage(1); // Cuando se configure esta página
        setOrder(`Ordenado ${e.target.value}`) // modifique el estado local y se renderice.
    };

    /////////////////////////////////////////////
    // Renderizado
    /////////////////////////////////////////////
    return (
        <div>
            <h1>Esta es la SPA de los Países</h1>
            <button onClick={(e) => { handleClick(e) }}>
                Volver a cargar todos los Países
            </button>

            {/*Filtrado y ordenamiento. En actions generamos las acciones para la lógica del filtrado y ordenamiento.*/}
            <div>
                <h5>Ordenar alfabéticamente</h5>
                <select onChange={(e) => handleCountrySortByName(e)}>
                    <option>SELECCIONAR</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                </select>

                <h5>Ordenar por población</h5>
                <select onChange={(e) => handleCountrySortByPop(e)}>
                    <option>SELECCIONAR</option>
                    <option value="asc">Menor a Mayor</option>
                    <option value="desc">Mayor a Menor</option>
                </select>

                <SearchBar />
                <FilterByContinent />
                <FilterByActivity />
                <Pagination
                    countriesPerPage={countriesPerPage}
                    allCountries={allCountries.length}
                    pagination={pagination}
                    currentPage={currentPage}
                />

                <div className={styles.container}>
                    {currentCountries.length ? (
                        <div className={styles.countries}>
                            {
                                currentCountries.map((d) => {
                                    return (
                                        <div key={d.id}>
                                            <Link to={`/detail/${d.id}`}>
                                                <Card
                                                    name={d.name}
                                                    continent={d.continent}
                                                    population={d.population}
                                                    img={d.img}
                                                />
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>) : (<div>País no encontrado</div>)}
                </div>
            </div>
            <Link to={'/post_activity'}>
                Crear Actividad
            </Link>
        </div>
    )
}