const form = document.getElementById('stockForm');
const logTableBody = document.getElementById('logTableBody');

// ดึงข้อมูลเก่าที่เคยบันทึกไว้ในเบราว์เซอร์
let stockLogs = JSON.parse(localStorage.getItem('ppe_logs')) || [];

// ฟังก์ชันสำหรับดึงรายการมาแสดงในตาราง
function renderLogs() {
  logTableBody.innerHTML = '';
  stockLogs.slice(-10).reverse().forEach(log => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${log.date}</td>
      <td>${log.item}</td>
      <td style="font-weight:bold; color: ${log.type === 'IN' ? 'green' : 'red'};">${log.type}</td>
      <td>${log.qty}</td>
      <td>${log.user}</td>
    `;
    logTableBody.appendChild(row);
  });
}

// เมื่อกดปุ่ม "บันทึกข้อมูล"
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const newLog = {
    date: new Date().toLocaleString('th-TH'),
    item: document.getElementById('item').value,
    type: document.getElementById('type').value,
    qty: document.getElementById('qty').value,
    user: document.getElementById('user').value
  };

  stockLogs.push(newLog);
  localStorage.setItem('ppe_logs', JSON.stringify(stockLogs));

  form.reset();
  renderLogs();
});

// โหลดข้อมูลขึ้นตารางทันทีที่เปิดเว็บ
renderLogs();
