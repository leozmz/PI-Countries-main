import React from "react";
import styles from './Pagination.module.css';

// Con la siguiente función declaramos el paginado.
export default function Pagination({ allCountries, pagination, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allCountries / 10); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className={styles.pagination}>
            {/*Botón Prev*/}
            {
                pageNumbers &&
                    currentPage > 1 ?
                    (
                        <button onClick={() => pagination(currentPage - 1)}>
                            {" "}Prev.{" "}
                        </button>
                    ) : null
            }

            {/*Numeros de página*/}
            <ul className={styles.pagination}>
                {
                    pageNumbers &&
                    pageNumbers.map((number) => (
                        <li className="number">
                            <button onClick={() => pagination(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>

            {/*Botón Sig*/}
            {
                pageNumbers &&
                    currentPage <= pageNumbers.length - 1 ?
                    (
                        <button onClick={() => pagination(currentPage + 1)}>
                            {" "}Sig.{" "}
                        </button>
                    ) : null
            }
        </nav>
    )
};