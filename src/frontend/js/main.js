// 1. Khai báo biến toàn cục để Member 2 và 3 có thể truy cập
window.allData = [];

// 2. Hàm lấy dữ liệu từ Backend (API bạn đã chạy ở cổng 5000)
async function fetchData() {
    try {
        const response = await fetch('http://localhost:5000/api/mentions');
        window.allData = await response.json();
        
        console.log("✅ Đã tải dữ liệu:", window.allData.length, "dòng");
        
        // 3. Sau khi có dữ liệu, ra lệnh cho các bộ phận khác hoạt động
        renderStats();
        renderTable(window.allData);
        
        // Gọi hàm của Member 2 (nếu họ đã viết xong)
        if (typeof initCharts === 'function') initCharts(window.allData);
        
        // Gọi hàm của Member 3 (nếu họ đã viết xong)
        if (typeof initFilters === 'function') initFilters();

    } catch (error) {
        console.error("❌ Lỗi kết nối API:", error);
        alert("Không thể kết nối Backend. Hãy chắc chắn server.js đang chạy!");
    }
}

// 4. Hàm render bảng thô (Khung xương)
function renderTable(data) {
    const tableBody = document.getElementById('main-table-body');
    tableBody.innerHTML = data.map(item => `
        <tr class="border-b hover:bg-gray-50">
            <td class="p-3 text-sm font-bold uppercase">${item.platform}</td>
            <td class="p-3 text-sm">${item.author}</td>
            <td class="p-3 text-xs text-gray-600">${item.content}</td>
            <td class="p-3">
                <span class="px-2 py-1 rounded text-xs ${getSentimentClass(item.sentiment)}">
                    ${item.sentiment}
                </span>
            </td>
        </tr>
    `).join('');
}

// Hàm bổ trợ màu sắc
function getSentimentClass(s) {
    if (s === 'positive') return 'bg-green-100 text-green-700';
    if (s === 'negative') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
}

// 5. Hàm render thống kê nhanh
function renderStats() {
    const statsContainer = document.getElementById('stats-summary');
    const total = window.allData.length;
    const pos = window.allData.filter(d => d.sentiment === 'positive').length;
    const neg = window.allData.filter(d => d.sentiment === 'negative').length;

    statsContainer.innerHTML = `
        <div class="bg-white p-4 rounded shadow border-b-4 border-blue-500">
            <p class="text-xs font-bold text-gray-400">TỔNG CỘNG</p>
            <p class="text-2xl font-bold">${total}</p>
        </div>
        <div class="bg-white p-4 rounded shadow border-b-4 border-green-500">
            <p class="text-xs font-bold text-gray-400">TÍCH CỰC</p>
            <p class="text-2xl font-bold text-green-600">${pos}</p>
        </div>
        <div class="bg-white p-4 rounded shadow border-b-4 border-red-500">
            <p class="text-xs font-bold text-gray-400">TIÊU CỰC</p>
            <p class="text-2xl font-bold text-red-600">${neg}</p>
        </div>
    `;
}

// Khởi chạy
fetchData();