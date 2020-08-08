import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
  
  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  }

  const sideDrawerToggleHander = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  }

  return (
    <Aux>
      <Toolbar isAuth={props.isAuthenticated} drawerToggleClicked={sideDrawerToggleHander}/>
      <SideDrawer isAuth={props.isAuthenticated} open={sideDrawerIsVisible} closed={sideDrawerClosedHandler} />
      <main className={styles.Content}>
        {props.children}
      </main>
    </Aux>
  );

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);