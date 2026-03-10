# 🛡️ Brand Reputation Monitoring Automation System
**Hệ thống tự động hóa theo dõi và phân tích danh tiếng thương hiệu**

Dự án này tập trung vào việc tự động thu thập dữ liệu từ các nền tảng mạng xã hội, phân tích cảm xúc (Sentiment Analysis) bằng AI và trực quan hóa sức khỏe thương hiệu qua Dashboard thời gian thực.

---

## 🏗️ Kiến trúc hệ thống (Architecture)
Hệ thống được thiết kế theo mô hình Microservices phân tách rõ ràng:
- **Data Crawler (Python):** Sử dụng Scrapy/Selenium để thu thập dữ liệu từ Twitter, Facebook, News.
- **AI Engine (Python):** Sử dụng các mô hình NLP (HuggingFace/VADER) để phân tích cảm xúc.
- **Database (MongoDB):** Lưu trữ dữ liệu phi cấu trúc từ mạng xã hội một cách linh hoạt.
- **Backend API (Node.js/Express):** Cung cấp dữ liệu cho giao diện người dùng.
- **Frontend Dashboard (React/Next.js):** Trực quan hóa dữ liệu bằng biểu đồ (Chart.js/Recharts).

---

## 🛠️ Công nghệ sử dụng (Tech Stack)
- **Languages:** Python 3.9+, Node.js 18+
- **Database:** MongoDB (NoSQL)
- **Libraries chính:**
  - Python: `pymongo`, `pandas`, `transformers`, `selenium`
  - Node.js: `express`, `mongoose`, `cors`, `dotenv`
- **Automation:** GitHub Actions (Tự động hóa lịch trình cào dữ liệu)

---

## 📂 Cấu trúc thư mục (Folder Structure)
brand-reputation-monitoring/
├── .github/                # GitHub Actions (Tự động hóa CI/CD)
│   └── workflows/          # Các file .yml chạy tự động
├── data/                   # Dữ liệu mẫu & Dữ liệu thô
│   └── sample_mention.json # File JSON mẫu đã chốt
├── docs/                   # Tài liệu dự án
│   ├── database_schema.md  # Quy định cấu trúc MongoDB
│   └── system_architecture.png
├── n8n/                    # Quản lý Workflow n8n
│   └── workflows/          # Lưu các file .json export từ n8n
├── src/                    # MÃ NGUỒN CHÍNH
│   ├── backend/            # Luồng Python (Spam & Tương tác)
│   │   ├── analysis/       # Code AI Phân tích cảm xúc (Bạn B)
│   │   ├── scrapers/       # Code Cào dữ liệu & Lọc Spam (Bạn A - Lead)
│   │   │   └── spam_detector.py
│   │   └── utils/          # Hàm dùng chung (Kết nối DB)
│   │       └── db_connection.py
│   ├── web_api/            # Luồng Node.js (Server API - Bạn C)
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   └── frontend/           # Luồng React.js (Giao diện - Bạn C)
│       ├── src/components/
│       └── src/pages/
├── .env                    # Biến môi trường (Local - KHÔNG PUSH)
├── .env.example            # Bản mẫu biến môi trường (CẦN PUSH)
├── .gitignore              # Khai báo các file Git cần bỏ qua
├── docker-compose.yml      # Cấu hình Docker (Mongo, n8n)
├── README.md               # Giới thiệu tổng quan dự án
└── requirements.txt        # Thư viện Python cần cài đặt
