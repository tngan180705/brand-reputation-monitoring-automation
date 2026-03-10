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
```text
brand-reputation-automation/
├── src/
│   ├── backend/             # Python - Xử lý dữ liệu & AI
│   │   ├── scrapers/        # Script thu thập dữ liệu
│   │   └── analysis/        # Model phân tích cảm xúc
│   ├── web-api/             # Node.js - API & Server
│   └── frontend/            # React/Next.js - Dashboard
├── data/                    # Dữ liệu mẫu (JSON/CSV)
├── docs/                    # Tài liệu hệ thống & Sơ đồ DB
├── .github/workflows/       # GitHub Actions Automation
├── .env.example             # File mẫu cấu hình biến môi trường
└── README.md
