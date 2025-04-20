import React, { useEffect, useState } from 'react';
import styles from './StoreList.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchStores } from './services';

import res1 from './images/gr1.jpg';
import res2 from './images/gr2.jpg';
import res3 from './images/gr3.png';
import res4 from './images/gr4.webp';

const storeImages = [res1, res2, res3,res4]; 

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await fetchStores();
        setStores(data);
      } catch (err) {
        console.error('Error fetching stores:', err);
      }
    };

    loadStores();
  }, []);

  const handleStoreClick = (storeId) => {
    navigate(`/store/${storeId}`);
  };

  const backgroundImage =
    hoveredIndex !== null && storeImages[hoveredIndex % storeImages.length]
      ? `url(${storeImages[hoveredIndex % storeImages.length]})`
      : `url(${res4})`;

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage,
        transition: 'background-image 0.6s ease-in-out',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={styles.overlay}>
        <h1>Hyperlocal Stores</h1>
        <ul className={styles.storeList}>
          {stores.map((store, index) => (
            <li
              key={store._id}
              onClick={() => handleStoreClick(store._id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={styles.storeItem}
            >
              <strong>{store.name}</strong>
              <span>({store.location})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StoreList;
