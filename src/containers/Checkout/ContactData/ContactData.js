import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css'
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';


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
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (const formEl in this.state.orderForm.customer) {
            formData[formEl] = this.state.orderForm.customer[formEl].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };

        axios.post('orders.json', order).then(
            response => {
                this.setState({loading: false});
                this.props.history.push('/');
            }
        ).catch(error => {
            this.setState({loading: false});
        });

    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;

    }

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedOrderForm = {
            ...this.state.orderForm.customer
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier] 
        }


        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;

        updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation);

        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;

        for (let input in updatedOrderForm) {
            formIsValid = updatedOrderForm[input].valid && formIsValid;
        }

        console.log(formIsValid);

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

        if (this.state.loading) {
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
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);