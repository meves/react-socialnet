import React, { FC } from 'react';
import PreloaderGif from './../../../assets/images/preloader.gif';
import styles from './Preloader.module.scss';

export const Preloader: FC = () => {    
    return (
        <div className={styles.preloaderWrapper}>
            <img src={PreloaderGif} alt="Preloader"/>
        </div>
    )
}
