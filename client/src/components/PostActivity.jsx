import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postActivity } from '../actions';
import ValidateActivity from './ValidateActivity';
import { Link } from 'react-router-dom';

export default function PostActivity() {
    const allCountries = useSelector(state => state.countries); // Trae desde el reducer el estado countries que tiene todos los países.
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countryId: []
    });
    // Estado de errores
    const [error, setError] = useState("");

    // Estado para deshabilitar botón de submit.
    const [disabled, setDisabled] = useState(true);

    // Escuchamos los estados (dependencias: input) para activar o desactivar botón de submit.
    useEffect(() => {
        if (!input.name ||
            !/^[A-Z]+$/i.test(input.name) ||
            /\d/.test(input.name) ||
            !input.difficulty ||
            !input.duration ||
            !input.season ||
            input.countryId.length === 0) {
            setDisabled(true);
        } else {
            setDisabled(false);
            setError(''); // Magia
        }
    }, [input])

    function handleDelete(e) {
        setInput({
            ...input,
            countryId: input.countryId.filter(country => country !== e)
        });
    };

    function handleChange(event) {
        setError(
            ValidateActivity(
                {
                    ...input,
                    [event.target.value]: event.target.value
                }
            )
        )
        // Bloque condicional para ir agregando países
        if (event.target.name === "countryId") {
            setInput({
                ...input,
                countryId: [...input.countryId, event.target.value]
            });
        } else {
            setInput({
                ...input,
                [event.target.name]: event.target.value
            });
        }
    };

    function handleSubmit(e) {
        //console.log('evento: ', e);
        e.preventDefault();
        if (!input.name ||
            !/^[A-Z]+$/i.test(input.name) ||
            /\d/.test(input.name) ||
            !input.difficulty ||
            !input.duration ||
            !input.season ||
            input.countryId.length === 0) {
            alert('Completar todos los campos');
        } else {
            dispatch(postActivity(input));
            setInput({
                name: "",
                difficulty: "",
                duration: "",
                season: "",
                countryId: []
            });
        }
    };

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <fieldset>
                    <legend>CREAR ACTIVIDAD TURÍSTICA</legend>

                    <div>
                        <label>Nombre</label>
                        <input
                            name='name'
                            type='text'
                            value={input.name}
                            autoComplete='off'
                            placeholder='Nombre de la Actividad'
                            onChange={(event) => handleChange(event)}
                        />
                        {error.name ? (<p>{error.name}</p>) : ""}
                    </div>

                    <div>
                        <label>Dificultad (1 a 5)</label>
                        <select onChange={(event) => handleChange(event)} name='difficulty'>
                            {["Seleccionar", 1, 2, 3, 4, 5].map(el => (
                                <option key={el} value={el}>{el}</option>
                            ))}
                        </select>
                        {error.difficulty && (<p>{error.difficulty}</p>)}
                    </div>

                    <div>
                        <label>Duración (horas)</label>
                        <select onChange={(event) => handleChange(event)} name='duration'>
                            {["Seleccionar", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(el => (
                                <option key={el} value={el}>{el}</option>
                            ))}
                        </select>
                        {error.duration && (<p>{error.duration}</p>)}
                    </div>

                    <div>
                        <label>Temporada</label>
                        <select onChange={(event) => handleChange(event)} name='season'>
                            {["Seleccionar", "Verano", "Otoño", "Invierno", "Primavera"].map(el => (
                                <option key={el} value={el}>{el}</option>
                            ))}
                        </select>
                        {error.season && (<p>{error.season}</p>)}
                    </div>

                    <div>
                        <label>Países</label>
                        <div>
                            <select name="countryId" onChange={(event) => handleChange(event)}>
                                <option name="Select">Seleccionar</option>
                                {allCountries.map(country => (
                                    <option key={country.id} name={country.name} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>

                            <div>
                                {input.countryId.map(country => (
                                    <div key={country}>
                                        <h5>{country}</h5>
                                        <button onClick={() => handleDelete(country)}>X</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {error.countryId && (<p>{error.countryId}</p>)}
                    </div>

                    <div>
                        <input disabled={disabled} type='submit' value="Crear Actividad" />
                    </div>

                    <Link to='/home'>Home</Link>
                </fieldset>
            </form>
        </div>
    )
}