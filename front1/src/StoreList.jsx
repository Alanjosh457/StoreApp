import React, { useEffect, useState } from 'react';
import styles from './StoreList.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchStores } from './services'; // Import the fetchStores function

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  // Fetching store data from the backend using the services function
  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await fetchStores();  // Fetch stores using the service function
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

  return (
    <div className={styles.container}>
      <h1>Hyperlocal Stores</h1>
      <ul className={styles.storeList}>
        {stores.map((store) => (
          <li key={store._id} onClick={() => handleStoreClick(store._id)} className={styles.storeItem}>
            <strong>{store.name}</strong> <span>({store.location})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
