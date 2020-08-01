import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const navigationItems = props => (
  <ul className={styles.NavigationItems}>
    <NavigationItem exact link="/">BurgerBuilder</NavigationItem>
    {props.isAuthenticated && <NavigationItem link="/orders">Orders</NavigationItem>}
    {!props.isAuthenticated && <NavigationItem link="/auth">Authenticate</NavigationItem>}
    {props.isAuthenticated && <NavigationItem link="/logout">Logout</NavigationItem>}
  </ul>
);

export default navigationItems;