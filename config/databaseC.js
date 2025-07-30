const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Database connected successfully')
    } catch (error) {
        console.error('MongoDB Connection Failed:', error.message);
        process.exit(1); // Optional: stop the server if DB not connected
    }
}

module.exports = dbConnect