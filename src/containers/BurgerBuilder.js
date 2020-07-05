import React, { Component } from 'react';
import Aux from '../hoc/Auxiliary/Aux';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

export class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('ingredients.json').then(
      response => {
        this.setState({ ingredients : {...response.data}}, () => {
          console.log(this.state.ingredients)
        });
      }
    ).catch(error => {
      this.setState({ error: true })
    });
  }

  updatePurchaseState() {
    const ingredients = {
      ...this.state.ingredients
    };

    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((acc, c ) => acc + c, 0)

    this.setState({
      purchasable: sum > 0
    }, console.log(this.state.purchasable))
  }

  addIngredientHandler = (type) => {
    const ingredients = {...this.state.ingredients};
    let totalPrice = this.state.totalPrice;
    ingredients[type] = ingredients[type] + 1;
    totalPrice += INGREDIENT_PRICES[type];

    this.setState({
      ingredients: ingredients,
      totalPrice: totalPrice
    }, () => this.updatePurchaseState());
  }

  removeIngredientHandler = (type) => {
    const ingredients = {...this.state.ingredients};
    // if (ingredients[type] <= 0) {
    //   return;
    // }
    let totalPrice = this.state.totalPrice;
    ingredients[type] = ingredients[type] - 1;
    totalPrice -= INGREDIENT_PRICES[type];

    this.setState({
      ingredients: ingredients,
      totalPrice: totalPrice
    }, () => this.updatePurchaseState());
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
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    }

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }


    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls  
          ingredientAdded={this.addIngredientHandler} 
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary 
          purchaseCancelled={this.purchaseCancelHander} 
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients} 
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



export default withErrorHandler(BurgerBuilder, axios);