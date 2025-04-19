import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './OrderConfirmation.module.css';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2>Thank you, {state?.name || 'Customer'}!</h2>
      <p>Your order has been placed successfully.</p>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default OrderConfirmation;