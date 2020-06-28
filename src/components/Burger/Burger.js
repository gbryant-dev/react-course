import React from 'react';
import styles from './Burger.module.css';
      import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';


const burger = props => {

  let ingredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map(
    (_, i) => {return <BurgerIngredient key={igKey + i} type={igKey} /> }
    )
  }).reduce((arr, c) => {return arr.concat(c)}, []);

  console.log(ingredients);
  if (!ingredients.length) {
    ingredients = <p>Please start adding ingredients</p>
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>

  );
}

export default withRouter(burger);