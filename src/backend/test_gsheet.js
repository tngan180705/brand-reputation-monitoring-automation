import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Cấu hình đường dẫn để đọc file .env ở thư mục gốc
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
console.log('--- Kiểm tra biến môi trường ---');
console.log('ID:', process.env.GOOGLE_SHEET_ID);
console.log('Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
async function accessSpreadsheet() {
    try {
        // 2. Kiểm tra xem biến môi trường có tồn tại không
        const privateKey = process.env.GOOGLE_PRIVATE_KEY;
        const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        const sheetId = process.env.GOOGLE_SHEET_ID;

        if (!privateKey || !clientEmail || !sheetId) {
            console.error('❌ Lỗi: Thiếu thông tin cấu hình trong file .env (Key, Email hoặc Sheet ID)');
            return; // Ở trong hàm thì dùng return thoải mái
        }

        // 3. Khởi tạo quyền truy cập
        const serviceAccountAuth = new JWT({
            email: clientEmail,
            key: privateKey.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);

        // 4. Kết nối và tải thông tin
        await doc.loadInfo();
        console.log(`✅ Kết nối thành công tới Sheet: ${doc.title}`);
        
        const sheet = doc.sheetsByIndex[0];
        console.log(`📊 Đang đọc tab: "${sheet.title}"`);
        
    } catch (err) {
        console.error('❌ Lỗi kết nối GSheet:', err.message);
        if (err.message.includes('403')) {
            console.log('💡 Gợi ý: Bạn chưa "Share" file Google Sheet cho Email Service Account rồi!');
        }
    }
}

// Gọi hàm để chạy
accessSpreadsheet();