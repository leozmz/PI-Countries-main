import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameCountries } from '../actions';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState();

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        //dispatch(getNameCountries(name));
        console.log(name); // Mostramos por consola el estado local.
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameCountries(name));
        setName(''); // Limpiamos el cuadro de búsqueda.
    }

    return (
        <div>
            <input
                type='text'
                value={name}
                placeholder='Buscar...'
                onChange={(e) => handleInputChange(e)}
            />
            <button
                type='submit'
                onClick={(e) => handleSubmit(e)}>
                Buscar
            </button>
        </div>
    )
}