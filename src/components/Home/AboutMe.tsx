import React from "react";
import styles from './Home.module.scss';
import Author from '../../assets/images/Sergey_Medvedkin.jpg';

const AboutMe: React.FC = (props) => {
    return (
        <section className={styles.aboutMeSection}>
            <h2>
                
            </h2>
            <div className={styles.text}>
                Hello, My name is Sergey Medvedkin. I am a web developer. This site was created by myself as 
                an example of my skills. I specialize in React. I also have practice in JavaScript ES-5, ES-6+,

            </div>
            <figure className={styles.figure}>
                <img src={Author} alt="Sergey Medvedkin. Author of this site" title="Author Sergey Medvedkin"/>
                <figcaption>
                    Author: Medvedkin Sergey
                </figcaption>
            </figure>
        </section>
    )
}

export default AboutMe;
