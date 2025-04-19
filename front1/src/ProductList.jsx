import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductList.module.css';
import { fetchProducts } from './services';  // Import the fetchProducts function

const ProductList = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const { storeId } = useParams();
  const navigate = useNavigate();

  // Fetching products based on storeId from the backend using the services function
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(storeId);  // Fetch products using the service function
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    loadProducts();
  }, [storeId]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product._id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId: product._id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  return (
    <div className={styles.container}>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product._id} className={styles.productCard}>
          <span>{product.name} - ₹{product.price}</span>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
      <button onClick={() => navigate('/cart')}>View Cart</button>
    </div>
  );
};

export default ProductList;
