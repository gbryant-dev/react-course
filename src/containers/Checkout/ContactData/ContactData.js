import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css'
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';


const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        customer: {
        name: {elementType: 'input', elementConfig: { type: 'text', placeholder: 'Your Name' }, value: '', validation: {required: true}, valid: false, touched: false},
        email: {elementType: 'input', elementConfig: { type: 'text', placeholder: 'Your Email' }, value: '', validation: {required: true}, valid: false, touched: false},
        address: {elementType: 'input', elementConfig: { type: 'text', placeholder: 'Your Address' }, value: '', validation: {required: true}, valid: false, touched: false},
        deliveryMethod: {elementType: 'select', elementConfig: { options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'cheapest', displayValue: 'Cheapest'}] }, value: 'fastest', validation: {}, valid: true}
        }
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        
        const formData = {};
        for (const formEl in orderForm.customer) {
            formData[formEl] = orderForm.customer[formEl].value;
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };

        props.onOrderBurger(order, props.token);

    }

    const inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(orderForm.customer[inputIdentifier], {
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, orderForm.customer[inputIdentifier].validation)
        });

        const updatedOrderForm = updateObject(orderForm.customer, {
            [inputIdentifier]: updatedFormElement 
        });
        
        let formIsValid = true;

        for (let input in updatedOrderForm) {
            formIsValid = updatedOrderForm[input].valid && formIsValid;
        }

        setOrderForm({customer: updatedOrderForm});
        setFormIsValid(formIsValid);
    }

    const formElements = [];

    for (let key in orderForm.customer) {
        formElements.push({
            id: key,
            config: orderForm.customer[key]
        })
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElements.map(el => (
                <Input 
                    changed={(event) => inputChangedHandler(event, el.id)} 
                    key={el.id} 
                    elementType={el.config.elementType} 
                    elementConfig={el.config.elementConfig} 
                    value={el.config.value}
                    invalid={!el.config.valid}
                    shouldValidate={el.config.validation}
                    touched={el.config.touched}
                />
            ))}
            <Button clicked={orderHandler} type="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />;
    }

    return (
        <div className={styles.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
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