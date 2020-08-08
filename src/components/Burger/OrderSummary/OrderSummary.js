import React from 'react';
import Aux from '../../../hoc/Auxiliary/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {

    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span> 
          : {props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Continue to Checkout?</p>
        <Button clicked={props.purchaseCancelled} type="Danger">CANCEL</Button>
        <Button clicked={props.purchaseContinued} type="Success">SUCCESS</Button>
      </Aux>
    );

}

export default orderSummary;