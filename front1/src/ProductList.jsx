import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductList.module.css';
import { fetchProducts } from './services';  

import res4 from './images/gr4.webp';  

const ProductList = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const { storeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(storeId);
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
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${res4})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        transition: 'background-image 0.6s ease-in-out',
      }}
    >
      <button className={styles.backButton} onClick={() => navigate(-1)}>
  ⬅ Back
</button>

      <div className={styles.overlay}>
        <h1 className={styles.heading}>Our Products</h1>

        <div className={styles.storeList}>
          {products.map((product) => (
            <div key={product._id} className={styles.storeItem}>
              <strong>{product.name}</strong>
              <span>₹{product.price}</span>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
