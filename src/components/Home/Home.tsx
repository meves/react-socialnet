import React, { FC, useState } from 'react';
import { AboutMe } from './AboutMe';
import styles from './Home.module.scss';
import { MySkills } from './MySkills';

export const Home: FC = () => {
    const [isAbout, setAbout] = useState(true);
    return (
        <div className={styles.homePage}>
            <div className={styles.headerGroup}>
                <h2 className={styles.title} onClick={() => setAbout(true)}>About me</h2>
                <h2 className={styles.title} onClick={() => setAbout(false)}>My slills</h2>
            </div>
            {isAbout ? <AboutMe/> : <MySkills/>}
        </div>
    )
}
