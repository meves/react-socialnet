import React from "react";
import styles from './Home.module.scss';

export const MySkills: React.FC = () => {
    const skills = ["JavaScript", "ES-6+", "TypeScript", "React", "Redux", "REST", "HTTP", "Unit testing",
                    "CSS/SASS", "Webpack", "Git"];
    return (
        <section className={styles.mySkillsWrapper}>
            <h2 className={styles.title}>
                My skills    
            </h2>
            <div className={styles.skills}>
                {skills.map((value, index) => (
                    <div className={styles.skill} key={index}>
                        {value}
                    </div>
                ))}
            </div>
        </section>
    )
}
