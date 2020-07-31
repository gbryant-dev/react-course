import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  render() {

    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span> 
          : {this.props.ingredients[igKey]}
        </li>
      );
    })

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.purchaseCancelled} type="Danger">CANCEL</Button>
        <Button clicked={this.props.purchaseContinued} type="Success">SUCCESS</Button>
      </Aux>
    );
  }

  
}

export default OrderSummary;