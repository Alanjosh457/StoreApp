// src/Cart.jsx
import React, { useState } from 'react';
import { placeOrder } from './services';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css'; // Import CSS module

const Cart = ({ cart, setCart }) => {
  const [name, setName] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handlePlaceOrder = async () => {
    if (!name.trim()) {
      alert('Please enter your name before placing the order.');
      return;
    }
    if (cart.length === 0) {
      alert('Cart is empty.');
      return;
    }
  
    setPlacingOrder(true);
  
    try {
      const res = await placeOrder(name, cart, total);
      console.log('Order response:', res); // ✅ Debug API response
  
      if (res && res.order) {  // Checking if 'order' exists in the response
        alert('Order placed successfully!');
        setCart([]);
        setName('');
        navigate('/confirmation', { state: { name } }); // ✅ Passing user name to confirmation page
      } else {
        alert('Failed to place order');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while placing the order.');
    } finally {
      setPlacingOrder(false);
    }
  };
  

  return (
    <div className={styles.cartSidebar}>
      <h2 className={styles.cartTitle}>Cart</h2>

      {cart.length === 0 ? (
        <p className={styles.emptyText}>No items in cart.</p>
      ) : (
        <ul className={styles.cartItems}>
          {cart.map((item, index) => (
            <li key={index} className={styles.cartItem}>
              <div className={styles.itemDetails}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemPrice}>
                  {item.quantity} × ₹{item.price}
                </span>
              </div>
              <button className={styles.removeBtn} onClick={() => removeFromCart(index)}>
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}

      


{cart.length > 0 && (
  <div className={styles.footerWrapper}>
    <div className={styles.total}>Total: ₹{total}</div>
    <input
      type="text"
      placeholder="Your Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className={styles.nameInput}
    />
    <button
      className={styles.placeOrderBtn}
      onClick={handlePlaceOrder}
      disabled={placingOrder}
    >
      {placingOrder ? 'Placing Order...' : 'Place Order'}
    </button>
  </div>
)}

    </div>
  );
};

export default Cart;
