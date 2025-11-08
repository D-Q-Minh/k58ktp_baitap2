// duongquangminh.js: xử lý form và gọi API Node-RED
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const q = document.getElementById('q').value.trim();

        if (!q) {
            resultDiv.innerHTML = '<p style="color:red;">Vui lòng nhập tên sinh viên!</p>';
            return;
        }

        resultDiv.innerHTML = '<p>Đang tìm kiếm...</p>';

        try {
            const response = await fetch(`http://localhost:1880/timkiem?q=${encodeURIComponent(q)}`);
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            const data = await response.json();

            if (data.success && data.count > 0) {
                // Hiển thị danh sách sinh viên
                let html = `<p>🔎 Tìm thấy ${data.count} sinh viên:</p><ul>`;
                data.data.forEach(item => {
                    html += `<li>ID: ${item.id}, Tên: ${item.ten}</li>`;
                });
                html += '</ul>';
                resultDiv.innerHTML = html;
            } else {
                resultDiv.innerHTML = `<p>Không tìm thấy sinh viên nào với tên "${q}".</p>`;
            }
        } catch (err) {
            console.error(err);
            resultDiv.innerHTML = `<p style="color:red;">Lỗi khi gọi API: ${err.message}</p>`;
        }
    });
});
