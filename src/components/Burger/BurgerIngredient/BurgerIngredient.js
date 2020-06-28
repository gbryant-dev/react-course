import React, { Component } from 'react';
import styles from './BurgerIngredient.module.css'
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {

  ingredient = null;

  render() {

    switch (this.props.type) {
      case ('bread-bottom'):
        this.ingredient = <div className={styles.BreadBottom}></div>;
        break;
      case ('bread-top'):
        this.ingredient = (
          <div className={styles.BreadTop}>
            <div className={styles.Seeds1}></div>
            <div className={styles.Seeds2}></div>
          </div>
        );
        break;
      case ('meat'):
        this.ingredient = <div className={styles.Meat}></div>;
        break;
      case ('cheese'):
        this.ingredient = <div className={styles.Cheese}></div>;
        break;
      case ('bacon'):
        this.ingredient = <div className={styles.Bacon}></div>;
        break;
      case ('salad'):
        this.ingredient = <div className={styles.Salad}></div>;
        break;
      default:
        this.ingredient = null; 
    }

    return this.ingredient;
  }

}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default BurgerIngredient;