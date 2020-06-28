import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css'
import axios from '../../../axios-orders';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const order = {};

        axios.post('orders.json', order).then(
            response => {
                this.setState({loading: false});
            }
        ).catch(error => {
            this.setState({loading: false});
        });

    }

    render() {
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type="text" name="email" placeholder="Your Email" />
                    <input type="text" name="name" placeholder="Your name" />
                    <input type="text" name="street" placeholder="Street" />
                    <input type="text" name="postcode" placeholder="Postcode" />
                    <Button clicked={this.orderHandler} type="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;