import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './OrderConfirmation.module.css'; 

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const userName = location.state?.name || 'Customer';

  return (
    <div className={styles.container}>
      <h2>Thank you, {userName}!</h2>
      <p>Your order has been placed successfully.</p>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default OrderConfirmation;
