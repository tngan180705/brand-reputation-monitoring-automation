import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

def test_db_connection():
    try:
        # Nếu không đọc được file .env, nó sẽ dùng giá trị mặc định sau dấu phẩy
        uri = os.getenv("DATABASE_URL", "mongodb://localhost:27017/")
        db_name = os.getenv("DB_NAME", "brand_reputation_db")
        
        client = MongoClient(uri)
        db = client[db_name]
        
        # Ngay khi chèn dòng này, Database sẽ thực sự được tạo ra
        test_data = {
            "content": "Data dau tien tu Thien Ngan",
            "is_spam": False
        }
        
        db.mentions.insert_one(test_data)
        print(f"✅ Da tao Database '{db_name}' va chen du lieu thanh cong!")
        
    except Exception as e:
        print(f"❌ Van loi: {e}")

if __name__ == "__main__":
    test_db_connection()