const express = require('express');
const dotenv = require('dotenv');

// Load biến môi trường
dotenv.config({ path: '../../.env' });

const app = express();

app.get('/', (req, res) => {
    res.send('API Highlands Monitoring đang chạy...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại port ${PORT}`);
});