import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'; // 1. Import thêm CORS
import { fileURLToPath } from 'url';

// Cấu hình đường dẫn
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const N8N_WEBHOOK_URL = "http://localhost:5678/webhook-test/highlands-monitor";


// 2. Kích hoạt CORS (Cho phép Frontend truy cập API)
app.use(cors()); 
app.use(express.json());

// 3. Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/highlands_db')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// 4. Định nghĩa Schema
const Mention = mongoose.model('Mention', new mongoose.Schema({
    platform: String,
    author: String,
    content: String,
    sentiment: String,
    urgency: String,
    ai_reply: String,
    processedAt: { type: Date, default: Date.now }
}));

// 5. API Endpoint: Lấy tất cả dữ liệu
app.get('/api/mentions', async (req, res) => {
    try {
        const data = await Mention.find().sort({ processedAt: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 6. API Endpoint: Thống kê nhanh
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


// API tổng hợp xử lý 3 luồng
app.post('/api/ai/process', async (req, res) => {
    try {
        // Nhận thêm trường 'threadType' từ React gửi lên
        const { platform, author, content, threadType } = req.body; 

        if (!content) return res.status(400).json({ error: "Nội dung không được để trống" });

        console.log(`--- Đang kích hoạt luồng AI: ${threadType || 'Mặc định'} ---`);

        // Bắn dữ liệu sang n8n
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                platform,
                author,
                content,
                threadType: threadType || 'general' // Để Mem 2 dùng Switch phân loại
            })
        });
        if (!response.ok) {
        throw new Error(`n8n trả về lỗi: ${response.status}`);
        }

        // Trả kết quả về cho Mem 3 hiển thị thông báo
        res.status(200).json({ 
            success: true, 
            message: "Dữ liệu đã được n8n tiếp nhận thành công!" 
        });

    } catch (error) {
        console.error("❌ Lỗi Backend Connector:", error.message);
        res.status(500).json({ success: false, error: "Hệ thống AI đang bận hoặc lỗi kết nối" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});