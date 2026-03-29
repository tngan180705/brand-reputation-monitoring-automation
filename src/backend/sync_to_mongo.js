import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// 1. Cấu hình Schema khớp với file Excel Sheet1 của bạn
const MentionSchema = new mongoose.Schema({
    platform: String,    // Cột 'Platform'
    author: String,      // Cột 'User'
    content: String,     // Cột 'Content'
    sentiment: String,   // Cột 'Sentiment'
    topic: String,       // Cột 'Topic'
    processedAt: Date    // Cột 'Processed At'
});

const Mention = mongoose.model('Mention', MentionSchema);

async function syncData() {
    try {
        console.log('⏳ Đang kết nối MongoDB...');
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/highlands_db');
        console.log('✅ MongoDB đã sẵn sàng!');

        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();
        
        // Lấy Sheet đầu tiên (Sheet1)
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        console.log(`📊 Tìm thấy ${rows.length} dòng trên Google Sheets.`);

        // Xóa dữ liệu cũ để tránh bị trùng lặp từ lần chạy lỗi trước
        await Mention.deleteMany({});
        console.log('🧹 Đã làm sạch Database để đồng bộ mới...');

        for (const row of rows) {
            // Lấy dữ liệu theo đúng tên cột trong file n8n.xlsx - Sheet1
            const data = {
                platform: row.get('Platform'),
                author: row.get('User'),
                content: row.get('Content'),
                sentiment: row.get('Sentiment'),
                topic: row.get('Topic'),
                processedAt: row.get('Processed At') ? new Date(row.get('Processed At')) : new Date()
            };

            // Lưu trực tiếp vào MongoDB
            await Mention.create(data);
        }

        console.log(`✨ THÀNH CÔNG: Đã đồng bộ ${rows.length} dòng vào MongoDB!`);

    } catch (err) {
        console.error('❌ Lỗi:', err.message);
    } finally {
        mongoose.connection.close();
    }
}

syncData();