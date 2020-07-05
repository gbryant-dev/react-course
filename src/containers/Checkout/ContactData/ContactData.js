import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css'
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        orderForm: {
            customer: {
            name: {elementType: 'input', elementConfig: { type: 'text', placeholder: 'Your Name' }, value: ''},
            email: {elementType: 'input', elementConfig: { type: 'text', placeholder: 'Your Email' }, value: ''},
            address: {elementType: 'input', elementConfig: { type: 'text', placeholder: 'Your Address' }, value: ''},
            deliveryMethod: {elementType: 'select', elementConfig: { options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'cheapest', displayValue: 'Cheapest'}] }, value: ''}
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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

    render() {

        const formElements = [];

        for (let key in this.state.orderForm.customer) {
            formElements.push({
                id: key,
                config: this.state.orderForm.customer[key]
            })
        }

        let form = (
            <form>
                {formElements.map(el => (
                    <Input key={el.id} elementType={el.config.elementType} elementConfig={el.config.elementConfig} value={el.config.value} />
                ))}
                <Button clicked={this.orderHandler} type="Success">ORDER</Button>
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

export default ContactData;