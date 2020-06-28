import React, { Component } from 'react';

import Burger from '../../Burger/Burger';
// import Button from '../../UI/Button/Button.module.css';
import styles from './CheckoutSummary.module.css';

class CheckoutSummary extends Component {

  render() {
    return (
      <div className={styles.CheckoutSummary}>
        <h1>We hope you like it!</h1>
        <div style={{width: '100%', height: '300px', margin: 'auto'}}>
          <Burger ingredients={this.props.ingredients} />
        </div>
        {/* <Button type="Danger" clicked>CANCEL</Button> */}
        <button onClick={this.props.checkoutCancelled}>CANCEL</button>
        <button onClick={this.props.checkoutContinued}>CONTINUE</button>
      </div>
    );
  }

};

export default CheckoutSummary;