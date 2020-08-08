import React from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Aux';

const modal = props => {

  return (
    <Aux>
      <Backdrop clicked={props.modalClosed} show={props.show} />
      <div 
      className={styles.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? 1 : 0
        }}>
        {props.children}
      </div>
    </Aux>
  );

};

export default React.memo(modal, (prevProps, nextProps) => prevProps.show === nextProps.show && prevProps.children === nextProps.children);