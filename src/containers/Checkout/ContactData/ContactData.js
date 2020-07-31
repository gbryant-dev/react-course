import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css'
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';


class ContactData extends Component {
    state = {
        orderForm: {
            customer: {
            name: {elementType: 'input', elementConfig: { type: 'text', placeholder: 'Your Name' }, value: '', validation: {required: true}, valid: false, touched: false},
            email: {elementType: 'input', elementConfig: { type: 'text', placeholder: 'Your Email' }, value: '', validation: {required: true}, valid: false, touched: false},
            address: {elementType: 'input', elementConfig: { type: 'text', placeholder: 'Your Address' }, value: '', validation: {required: true}, valid: false, touched: false},
            deliveryMethod: {elementType: 'select', elementConfig: { options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'cheapest', displayValue: 'Cheapest'}] }, value: 'fastest', validation: {}, valid: true}
            }
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        const formData = {};
        for (const formEl in this.state.orderForm.customer) {
            formData[formEl] = this.state.orderForm.customer[formEl].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        };

        this.props.onOrderBurger(order, this.props.token);

    }

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(this.state.orderForm.customer[inputIdentifier], {
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, this.state.orderForm.customer[inputIdentifier].validation)
        });

        const updatedOrderForm = updateObject(this.state.orderForm.customer, {
            [inputIdentifier]: updatedFormElement 
        });
        
        let formIsValid = true;

        for (let input in updatedOrderForm) {
            formIsValid = updatedOrderForm[input].valid && formIsValid;
        }

        this.setState({orderForm: {customer: updatedOrderForm}, formIsValid: formIsValid});
    }

    render() {

        const formElements = [];

        for (let key in this.state.orderForm.customer) {
            formElements.push({
                id: key,
                config: this.state.orderForm.customer[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(el => (
                    <Input 
                        changed={(event) => this.inputChangedHandler(event, el.id)} 
                        key={el.id} 
                        elementType={el.config.elementType} 
                        elementConfig={el.config.elementConfig} 
                        value={el.config.value}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                    />
                ))}
                <Button clicked={this.orderHandler} type="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));