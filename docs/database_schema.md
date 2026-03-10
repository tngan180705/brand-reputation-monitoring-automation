JSON
{
  "source_platform": "facebook",      // facebook, twitter, news, tiktok
  "author": "Nguyen Van A",           // Tên người đăng
  "content": "Nội dung bài viết hoặc bình luận ở đây...",
  "url": "https://facebook.com/123",  // Link gốc để đối chiếu
  "created_at": "2024-03-10T10:00:00Z", // Thời gian bài đăng (ISO Format)
  
  "flow_type": "interaction",         // QUAN TRỌNG: spam | interaction | recommendation
  
  "analysis": {                       // Kết quả xử lý AI/Logic
    "is_spam": false,                 // true nếu là luồng Spam xác định
    "sentiment": "positive",          // positive | negative | neutral
    "score": 0.85,                    // Độ tin cậy của AI (0 đến 1)
    "tags": ["khuyến mãi", "than phiền"] 
  },
  
  "metadata": {                       // Các thông số phụ
    "likes": 120,
    "comments": 45,
    "shares": 10
  }
}
