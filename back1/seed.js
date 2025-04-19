const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Store = require('./Schemas/Store');
const Product = require('./Schemas/Product');

dotenv.config();

const stores = [
  { name: 'Fresh Mart', location: 'MG Road' },
  { name: 'Organic Hub', location: 'Indiranagar' },
  { name: 'Local Greens', location: 'Koramangala' },
];

const productsByStore = {
  'Fresh Mart': [
    { name: 'Tomato', price: 20 },
    { name: 'Potato', price: 15 }
  ],
  'Organic Hub': [
    { name: 'Organic Rice', price: 80 },
    { name: 'Olive Oil', price: 250 }
  ],
  'Local Greens': [
    { name: 'Spinach', price: 30 },
    { name: 'Lettuce', price: 25 }
  ]
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Store.deleteMany();
    await Product.deleteMany();

    for (const storeData of stores) {
      const store = await Store.create(storeData);
      const products = productsByStore[store.name].map(p => ({ ...p, storeId: store._id }));
      await Product.insertMany(products);
    }

    console.log('Sample data inserted!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
