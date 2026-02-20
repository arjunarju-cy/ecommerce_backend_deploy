import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';

dotenv.config({ path: 'config/config.env' });

const email = 'arjuni5acer12@gmail.com';

const makeAdmin = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to MongoDB...');

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`\n❌ User with email "${email}" not found.`);
            console.log('Please make sure you have REGISTERED this email on the website first.\n');
            process.exit(1);
        }

        user.role = 'admin';
        await user.save();

        console.log(`\n✅ Success! User "${user.name}" (${email}) is now an ADMIN.`);
        console.log('You can now log in and access the Admin Dashboard at /admin/dashboard\n');

        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

makeAdmin();
