import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
  state = {
    ingredients: {},
    price: 0
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (const param of query.entries()) {
      const [key, value] = param;
      if (key === 'price') {
        price = value;
      } else {
        ingredients[key] = +value;
      }
    }
    console.log(query, ingredients);
    this.setState({ingredients: ingredients, totalPrice: price});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
    
  }

  render () {
    return (
      <div>
        <CheckoutSummary 
        ingredients={this.state.ingredients}
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinuedHandler} 
        />
        <Route path={this.props.match.path + '/contact-data'} render={props => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}  />} />
      </div>
    );
  }
}

export default Checkout;