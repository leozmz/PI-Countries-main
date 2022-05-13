import React from 'react';
import styles from './Card.module.css';
export default function Card({ name, img, continent, population }) {
    return (
        <div className={styles.container}>
            <img src={img} alt="img not found" width="200px" height="125px" />
            <div className={styles.text}>
                <div>{name}</div>
                <div>{continent}</div>
                <div>{population} habitantes</div>
            </div>
        </div>
    )
}