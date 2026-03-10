Quy tắc Viết mã (Coding Rules) - Brand Reputation Monitoring Project
Tài liệu này định nghĩa các tiêu chuẩn viết mã cho toàn bộ dự án. Việc tuân thủ là bắt buộc để đảm bảo code base nhất quán, dễ đọc và dễ bảo trì cho cả 3 thành viên.

1. Quy ước Đặt tên (Naming Convention)
Đối tượng| Quy tắc| Ví dụ
Thư mục & File| snake_case| "social_scraper.py, data_utils.js"
Classes| PascalCase| "SentimentAnalyzer, MongoConnection"
Hàm & Biến (Python)| snake_case| "get_user_mentions(), is_connected"
Hàm & Biến (Node.js)| camelCase| "getUserMentions(), isConnected"
Constants| UPPER_SNAKE_CASE| "MAX_RETRY_COUNT, DB_URL"
React Components| PascalCase| DashboardChart.jsx, Sidebar.js

. Cấu trúc Thư mục (Folder Structure)
src/
├── backend/             # Python (Crawl dữ liệu & AI)
│   ├── scrapers/        # Scripts cào dữ liệu (Twitter, FB, News)
│   ├── analysis/        # Xử lý ngôn ngữ tự nhiên (NLP)
│   └── utils/           # Các hàm bổ trợ xử lý dữ liệu
├── web_api/             # Node.js + MongoDB (Server)
│   ├── config/          # Cấu hình Database, biến môi trường
│   ├── controllers/     # Xử lý logic API (CRUD)
│   ├── models/          # Mongoose Schemas (Định nghĩa DB)
│   └── routes/          # Định nghĩa các Endpoints (/api/v1/...)
├── frontend/            # React.js (Giao diện người dùng)
│   ├── components/      # UI Components tái sử dụng
│   ├── pages/           # Các trang chính (Dashboard, Report)
│   └── services/        # Gọi API từ Web API bằng Axios/Fetch
└── docs/                # Tài liệu kỹ thuật & Sơ đồ hệ thống

3.Định dạng & Quy tắc Lập trình (Format & Coding)
3.1. Quy tắc Chung (General)
KHÔNG hardcode: Tuyệt đối không viết trực tiếp chuỗi kết nối, API Key hay Port vào code. Tất cả phải nằm trong .env.
Localization: Mọi thông báo lỗi hoặc nhãn trên giao diện phải quản lý tập trung (ví dụ: file constants/strings.js).
Port cố định: Web-API chạy port 5000, Frontend chạy port 3000.
3.2. MongoDB & Models
Mongoose: Bắt buộc dùng Schema để quản lý dữ liệu trong Node.js.
Trường bắt buộc: Mọi bản ghi mention phải có: platform, content, sentiment_score, timestamp.
Data Cleaning: Dữ liệu cào về (Python) phải được chuẩn hóa (xóa ký tự thừa, định dạng ngày tháng) trước khi lưu.

4. Xử lý lỗi (Error Handling) & Logging
Python: Sử dụng khối try...except cụ thể (ví dụ: pymongo.errors.ConnectionFailure). Tránh dùng except Exception:.
Node.js: Sử dụng async/await với try...catch. Bắt buộc có Middleware xử lý lỗi tập trung để trả về format JSON thống nhất: { "error": "Message" }.
Logging: In ra lỗi kèm timestamp và vị trí lỗi (Class/Function) để dễ dàng debug.

5. Quy trình làm việc với Git (Git Workflow)
5.1. Phân nhánh (Branching)
main: Nhánh chạy ổn định, chỉ Lead mới có quyền Merge.
develop: Nhánh tích hợp code từ các thành viên để kiểm thử.
feat/<feature-name>: Nhánh làm tính năng mới (VD: feat/crawl-twitter).
fix/<bug-name>: Nhánh sửa lỗi.

5.2. Commit Message (Conventional Commits)
Cấu trúc: <type>: <subject>
feat: Thêm tính năng mới.
fix: Sửa lỗi.
docs: Cập nhật tài liệu.
refactor: Tái cấu trúc code nhưng không đổi tính năng.
Ví dụ: feat: add sentiment analysis using huggingface

6. Quy tắc Pull Request (PR) & Review
Self-Review: Tác giả phải tự soát lỗi, xóa các dòng print() hoặc console.log() dư thừa trước khi tạo PR.
Review: Ít nhất 1 thành viên khác hoặc Lead phải Review và nhấn Approve.
Conflict: Người tạo PR có trách nhiệm tự Resolve Conflict (xử lý xung đột) khi lôi code mới từ main về.
Merge: Sau khi được Approve, chỉ người được phân quyền (Lead) mới được phép Merge vào nhánh chính.

7. Ghi chú & Bình luận (Comments)
Giải thích TẠI SAO (logic nghiệp vụ), đừng giải thích LÀM GÌ (nếu code đã rõ ràng).
Mỗi hàm phức tạp cần có Docstring:
Python: Sử dụng chuẩn Google Docstrings hoặc ReST.
JavaScript: Sử dụng JSDoc (/** ... */).

8. Tự động hóa (Automation) & Bảo mật
GitHub Actions: Các script chạy tự động cào dữ liệu hàng ngày phải đặt trong .github/workflows/.
GitHub Secrets: Các API Key dùng cho Automation phải cấu hình trong mục Settings > Secrets của GitHub, không commit vào file .yml.

9.Quy tắc Docker
Không thay đổi Port trong docker-compose.yml trừ khi được Lead đồng ý.

10. Quy tắc n8n
Mọi workflow mới phải được Export ra file .json và lưu vào thư mục n8n/workflows/ trước khi commit.
