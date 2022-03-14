import React from "react";
import styles from './Home.module.scss';

const MySkills: React.FC = (props) => {
    return (
        <section className={styles.mySkillsSection}>
            <h2>
                
            </h2>
            <div className={styles.skill}>JavaScript</div>
            <div className={styles.skill}>ES-6+</div>
            <div className={styles.skill}>TypeScript</div>                    
            <div className={styles.skill}>React</div>
            <div className={styles.skill}>Redux</div>
            <div className={styles.skill}>REST</div>
            <div className={styles.skill}>HTTP</div>
            <div className={styles.skill}>Unit testing</div>
            <div className={styles.skill}>CSS/SASS</div>
            <div className={styles.skill}>Webpack</div>
            <div className={styles.skill}>Git</div>                                
        </section>
    )
}

export default MySkills;
