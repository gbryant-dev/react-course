import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {

  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input', 
      elementConfig: { type: 'email', placeholder: 'Email Address' }, 
      value: '', 
      validation: {
        required: true,
        isEmail: true
      }, 
      valid: false, 
      touched: false
    },
    password: {
      elementType: 'input', 
      elementConfig: { type: 'password', placeholder: 'Password' }, 
      value: '', 
      validation: {
        required: true,
        minLength: 6
      }, 
      valid: false, 
      touched: false
    },
  });

  const [isSignUp, setIsSignUp] = useState(true);

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {

    const updatedControls = updateObject(authForm, {
      [controlName] : updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, authForm[controlName].validation),
        touched: true
      })
    });

    setAuthForm(updatedControls);
  }

  const submitHandler = event => {
    event.preventDefault();
    const { email : { value: email }, password : { value: password } } = authForm;
    props.onAuth(email, password, isSignUp);
  }

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp); 
  }

  const formElements = [];

  for (let key in authForm) {
      formElements.push({
          id: key,
          config: authForm[key]
      })
  }

  let form = formElements.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType} 
      elementConfig={formElement.config.elementConfig} 
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)} 
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />
  }

  return (
    <div className={styles.Auth}>
      {authRedirect}
      <form onSubmit={submitHandler}>
        {form}
        <Button type="Success">SUBMIT</Button>
      </form>
      <Button 
        clicked={switchAuthModeHandler} 
        type="Danger"
      >
        SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP' }
      </Button>
      {errorMessage}
    </div>
  );
}


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);