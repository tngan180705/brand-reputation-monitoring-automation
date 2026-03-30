// 1. Khai báo biến toàn cục
window.allData = [];
let sentimentChart, platformChart; // Đổi tên cho khớp với HTML mới

// Hàm bổ trợ: Tìm giá trị bất kể tên cột viết hoa hay thường (Tránh lỗi do MongoDB/n8n format khác nhau)
function getVal(obj, keyName) {
    if (!obj) return "";
    const actualKey = Object.keys(obj).find(k => k.toLowerCase().replace(/\s/g, '') === keyName.toLowerCase());
    return actualKey ? String(obj[actualKey]).trim() : "";
}

// 2. Hàm lấy dữ liệu từ API
async function fetchData() {
    try {
        const response = await fetch('http://localhost:5000/api/mentions');
        window.allData = await response.json();
        
        console.log("✅ Dữ liệu Highlands AI:", window.allData);
        
        renderKPI();
        renderTable();
        renderCharts(window.allData);
        
        // Re-render các icon của Lucide sau khi dữ liệu mới đổ vào
        if (window.lucide) lucide.createIcons();

    } catch (error) {
        console.error("❌ Lỗi kết nối Backend:", error);
    }
}

// 3. Render 3 thẻ KPI chính
function renderKPI() {
    const data = window.allData;
    const total = data.length;
    const pos = data.filter(d => getVal(d, 'sentiment').toLowerCase().includes('pos')).length;
    const neg = data.filter(d => getVal(d, 'sentiment').toLowerCase().includes('neg')).length;

    const kpiContainer = document.getElementById('kpi-container');
    if (!kpiContainer) return;

    kpiContainer.innerHTML = `
        <div class="bg-white p-6 rounded-xl border-b-4 border-blue-500 card-shadow">
            <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Tổng cộng</p>
            <h2 class="text-4xl font-bold mt-2 text-gray-800">${total}</h2>
        </div>
        <div class="bg-white p-6 rounded-xl border-b-4 border-green-500 card-shadow">
            <p class="text-[11px] font-bold text-green-600 uppercase tracking-widest">Tích cực</p>
            <h2 class="text-4xl font-bold mt-2 text-green-600">${pos}</h2>
        </div>
        <div class="bg-white p-6 rounded-xl border-b-4 border-red-500 card-shadow">
            <p class="text-[11px] font-bold text-red-600 uppercase tracking-widest">Tiêu cực</p>
            <h2 class="text-4xl font-bold mt-2 text-red-600">${neg}</h2>
        </div>
    `;
}

// 4. Render Bảng dữ liệu chi tiết (Dưới biểu đồ)
function renderTable() {
    const tbody = document.getElementById('data-table');
    if (!tbody) return;

    // Lấy 5 bản ghi mới nhất
    const latest = [...window.allData].reverse().slice(0, 5);
    
    tbody.innerHTML = latest.map(item => {
        const sentiment = getVal(item, 'sentiment').toLowerCase();
        const sentimentClass = sentiment.includes('neg') ? 'bg-red-100 text-red-600' : 
                              (sentiment.includes('pos') ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600');
        
        return `
            <tr class="hover:bg-gray-50 transition">
                <td class="px-8 py-4 font-bold text-blue-600 uppercase text-xs">${getVal(item, 'platform')}</td>
                <td class="px-8 py-4 text-gray-700">${item.author || item.user || item.User || 'Ẩn danh'}</td>
                <td class="px-8 py-4 text-gray-600 text-xs leading-relaxed">${getVal(item, 'content')}</td>
                <td class="px-8 py-4">
                    <span class="px-2 py-1 rounded text-[10px] font-bold uppercase ${sentimentClass}">
                        ${sentiment || 'Neutral'}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

// 5. Vẽ Biểu đồ (Cảm xúc & Nền tảng)
function renderCharts(data) {
    const ctxSentiment = document.getElementById('sentimentChart');
    const ctxPlatform = document.getElementById('platformChart');
    if(!ctxSentiment || !ctxPlatform) return;

    // Xử lý dữ liệu Nền tảng
    const platformCounts = {};
    data.forEach(item => {
        const p = getVal(item, 'platform') || 'Other';
        platformCounts[p] = (platformCounts[p] || 0) + 1;
    });

    // Cập nhật Platform Chart (Cột đứng màu Đỏ Highlands)
    if (platformChart) platformChart.destroy();
    platformChart = new Chart(ctxPlatform, {
        type: 'bar',
        data: {
            labels: Object.keys(platformCounts),
            datasets: [{
                label: 'Số lượng',
                data: Object.values(platformCounts),
                backgroundColor: '#B22830',
                borderRadius: 4
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false, 
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
    });

    // Xử lý dữ liệu Cảm xúc
    const pos = data.filter(d => getVal(d, 'sentiment').toLowerCase().includes('pos')).length;
    const neg = data.filter(d => getVal(d, 'sentiment').toLowerCase().includes('neg')).length;
    const neu = data.length - pos - neg;

    // Cập nhật Sentiment Chart (Tròn)
    if (sentimentChart) sentimentChart.destroy();
    sentimentChart = new Chart(ctxSentiment, {
        type: 'pie',
        data: {
            labels: ['Tích cực', 'Tiêu cực', 'Trung lập'],
            datasets: [{
                data: [pos, neg, neu],
                backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
                borderWidth: 0
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false, 
            plugins: { legend: { position: 'bottom' } } 
        }
    });
}

// Khởi chạy khi tải trang
window.onload = () => {
    fetchData();
};