import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  
  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerToggleHander = () => {
    console.log('Toggling side drawer', this.state.showSideDrawer);
    this.setState(prevState => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHander}/>
        <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);