
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import StoreList from './StoreList';
import ProductList from './ProductList';
import Cart from './Cart';
import OrderConfirmation from './OrderConfirmation';
import './App.css'; 

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <div className="app-layout">
      <div className="main-content">
        <Routes>
          <Route path="/" element={<StoreList />} />
          <Route path="/store/:storeId" element={<ProductList cart={cart} setCart={setCart} />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
        </Routes>
      </div>
      <Cart cart={cart} setCart={setCart} />
    </div>
  );
};

export default App;
