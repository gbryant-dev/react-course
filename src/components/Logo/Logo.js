import React from 'react';

import styles from './Logo.module.css';
import burgerLogo from '../../assets/images/logo.png';

const logo = props => (
  <div className={styles.Logo}>
    <img alt="MyBurger" src={burgerLogo} />
  </div>
);

export default logo;