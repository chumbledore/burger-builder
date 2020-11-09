import React from 'react';
import styles from './Logo.css';

import burgerLogo from '../../assets/img/burger-logo.png';

const logo = () => (
        <div className={styles.Logo}>
            <img src={burgerLogo} alt="TheBurg"/>
        </div>
)


export default logo;