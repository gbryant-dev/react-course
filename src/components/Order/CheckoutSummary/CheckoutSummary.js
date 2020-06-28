import React, { Component } from 'react';

import Burger from '../../Burger/Burger';
// import Button from '../../UI/Button/Button.module.css';
import styles from './CheckoutSummary.module.css';
import Button from '../../UI/Button/Button';

class CheckoutSummary extends Component {

  render() {
    return (
      <div className={styles.CheckoutSummary}>
        <h1>We hope you like it!</h1>
        <div style={{width: '100%', height: '300px', margin: 'auto'}}>
          <Burger ingredients={this.props.ingredients} />
        </div>
        {/* <Button type="Danger" clicked>CANCEL</Button> */}
        <Button type="Danger" clicked={this.props.checkoutCancelled}>CANCEL</Button>
        <Button type="Success" clicked={this.props.checkoutContinued}>CONTINUE</Button>
      </div>
    );
  }

};

export default CheckoutSummary;