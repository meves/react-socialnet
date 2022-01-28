import React from 'react';
import PreloaderGif from './../../../assets/images/preloader.gif';
import styles from './Preloader.module.scss';

const Preloader = props => {    
    return (
        <div className={styles.preloaderWrapper}>
            <img src={PreloaderGif} alt="Preloader"/>
        </div>
    )
}

export default Preloader;
