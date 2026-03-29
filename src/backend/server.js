import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Cấu hình
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/highlands_db')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// 3. Định nghĩa Schema (Dùng lại cái cũ)
const Mention = mongoose.model('Mention', new mongoose.Schema({
    platform: String,
    author: String,
    content: String,
    sentiment: String,
    topic: String,
    processedAt: Date
}));

// 4. API Endpoint: Lấy tất cả dữ liệu
app.get('/api/mentions', async (req, res) => {
    try {
        const data = await Mention.find().sort({ processedAt: -1 }); // Mới nhất lên đầu
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 5. API Endpoint: Thống kê nhanh (Cho Dashboard)
app.get('/api/stats', async (req, res) => {
    try {
        const total = await Mention.countDocuments();
        const positive = await Mention.countDocuments({ sentiment: 'positive' });
        const negative = await Mention.countDocuments({ sentiment: 'negative' });
        
        res.json({ total, positive, negative, neutral: total - positive - negative });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});