import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';

dotenv.config({ path: 'config/config.env' });

const clear = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to DB');
        const result = await Product.deleteMany({});
        console.log(`Successfully deleted ${result.deletedCount} products.`);
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

clear();
