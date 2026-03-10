# Database Schema - Brand Reputation Monitoring System

## 1. Quy định chung
* **Database Engine:** MongoDB (Chạy qua Docker container `mongodb_brand`).
* **Định dạng Ngày tháng:** Luôn sử dụng **ISO 8601** (`YYYY-MM-DDTHH:mm:ssZ`).
* **Quy tắc đặt tên Field:** Sử dụng `snake_case`.

## 2. Cấu trúc bản ghi chính (Collection: `mentions`)

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `source_platform` | String | Có | facebook, twitter, news, tiktok, v.v. |
| `author` | String | Có | Tên người đăng/Tác giả. |
| `content` | String | Có | Nội dung văn bản của bài đăng/bình luận. |
| `url` | String | Có | Link trực tiếp đến bài viết. |
| `created_at` | DateTime | Có | Thời gian tạo (ISO 8601). |
| `flow_type` | String | Có | Phân loại: `spam`, `interaction`, `recommendation`. |
| `analysis` | Object | Có | Chứa kết quả phân tích AI (Sentiment, Score). |
| `metadata` | Object | Không | Các thông tin mở rộng (Likes, Shares, v.v.). |

## 3. Quy định theo từng luồng (flow_type)

### Luồng Spam (Lead đảm nhận)
* `analysis.is_spam`: Boolean (true/false).
* `analysis.tags`: Danh sách lý do (ví dụ: `["link_doc", "quang_cao"]`).

### Luồng Tương tác (Interaction)
* `analysis.sentiment`: String (`positive`, `negative`, `neutral`).
* `analysis.score`: Float (0.0 đến 1.0).

### Mục Metadata (Mở rộng)
Nếu luồng của bạn cần lưu thêm thông tin riêng, hãy cho vào mục `metadata` để không làm hỏng cấu trúc chung. Ví dụ:
```json
"metadata": {
  "likes": 100,
  "location": "Ha Noi"
}
