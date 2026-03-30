// File: js/charts.js

// Lưu trữ instance của biểu đồ để có thể xóa khi cập nhật dữ liệu mới
let sentimentChartInstance = null;
let platformChartInstance = null;

function processSentiment(data) {
    return {
        positive: data.filter(i => i.sentiment === 'positive').length,
        negative: data.filter(i => i.sentiment === 'negative').length,
        neutral: data.filter(i => i.sentiment === 'neutral').length
    };
}

function processPlatform(data) {
    const result = {};
    data.forEach(item => {
        const p = item.platform || 'Khác';
        if (!result[p]) result[p] = 0;
        result[p]++;
    });
    return result;
}

// 🎯 HÀM CHÍNH - Gọi hàm này trong fetchData()
function initCharts(data) {
    renderSentimentChart(data);
    renderPlatformChart(data);
}

function renderSentimentChart(data) {
    const ctx = document.getElementById('sentimentChart');
    if (!ctx) return;
    
    const s = processSentiment(data);

    // Xóa biểu đồ cũ nếu đã tồn tại
    if (sentimentChartInstance) {
        sentimentChartInstance.destroy();
    }

    sentimentChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Tích cực', 'Tiêu cực', 'Trung lập'],
            datasets: [{
                data: [s.positive, s.negative, s.neutral],
                backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
                borderWidth: 0
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: { 
                legend: { position: 'bottom' }
            } 
        }
    });
}

function renderPlatformChart(data) {
    // Đổi ID thành 'platformChart' cho khớp với file index.html mới
    const ctx = document.getElementById('platformChart'); 
    if (!ctx) return;

    const p = processPlatform(data);

    // Xóa biểu đồ cũ nếu đã tồn tại
    if (platformChartInstance) {
        platformChartInstance.destroy();
    }

    platformChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(p),
            datasets: [{
                label: 'Số lượng bài đăng',
                data: Object.values(p),
                backgroundColor: '#B22830', // Màu đỏ Highlands chính xác
                borderRadius: 4
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false } 
            },
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
        }
    });
}