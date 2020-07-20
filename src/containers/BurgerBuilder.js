import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../hoc/Auxiliary/Aux';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../store/actions';

export class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get('ingredients.json').then(
    //   response => {
    //     this.setState({ ingredients : {...response.data}}, () => {
    //       console.log(this.props.ings)
    //     });
    //   }
    // ).catch(error => {
    //   this.setState({ error: true })
    // });
  }

  updatePurchaseState(ingredients) {

    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((acc, c ) => acc + c, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    // const purchasing = this.state.purchasing;
    this.setState({
      purchasing: true
    })
  }

  purchaseCancelHander = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // this.setState({ loading: true });
    
    // const { ingredients, totalPrice: price } = this.state;

    // const order = {
    //   ingredients: ingredients, 
    //   price: price, 
    //   customer: {
    //     name: 'George', 
    //     address: {
    //       street: 'Teststreet1', 
    //       zipCode: '41351', 
    //       country: 'Austria'
    //     }, 
    //     email: 'test@test.com'
    //   },
    //   deliveryMethod: 'fast'
    // }

    // axios.post('orders.json', order).then(
    //   response => {
    //     this.setState({ loading: false, purchasing: false });
    //   }
    // ).catch(error => {
    //   this.setState({ loading: false, purchasing: false });
    // })

    const queryParams = [];
    for (let i in this.props.ings) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
    }
    queryParams.push('price=' + this.props.price);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render() {

    const disabledInfo = {
      ...this.props.ings
    }

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }


    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls  
          ingredientAdded={this.props.onIngredientAdded} 
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          price={this.props.price}
          purchasable={this.updatePurchaseState(this.props.ings)}
          ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary 
          purchaseCancelled={this.purchaseCancelHander} 
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ings} 
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal modalClosed={this.purchaseCancelHander} show={this.state.purchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }

}


const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName:  ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName:  ingName})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));