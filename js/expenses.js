// 旅行花費紀錄系統
const Expenses = {
  STORAGE_KEY: 'honeymoon_expenses',

  // 花費類別
  categories: {
    food: { name: '餐飲', icon: '🍽️', color: '#FF9800' },
    transport: { name: '交通', icon: '🚃', color: '#2196F3' },
    ticket: { name: '門票', icon: '🎫', color: '#9C27B0' },
    shopping: { name: '購物', icon: '🛍️', color: '#E91E63' },
    hotel: { name: '住宿', icon: '🏨', color: '#4CAF50' },
    other: { name: '其他', icon: '📦', color: '#607D8B' }
  },

  // 幣別與換算（預設匯率，可調整）
  currencies: {
    TWD: { name: '台幣', symbol: 'NT$', rate: 1 },
    EUR: { name: '歐元', symbol: '€', rate: 34.5 },
    CHF: { name: '瑞郎', symbol: 'CHF', rate: 36 },
    SGD: { name: '新幣', symbol: 'S$', rate: 24 }
  },

  // 讀取資料
  load() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : { items: [], settings: { baseCurrency: 'TWD' } };
  },

  // 儲存資料
  save(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  },

  // 新增花費
  addExpense(expense) {
    const data = this.load();
    data.items.push({
      id: Date.now(),
      ...expense,
      createdAt: new Date().toISOString()
    });
    this.save(data);
    return data;
  },

  // 更新花費
  updateExpense(id, updates) {
    const data = this.load();
    const item = data.items.find(i => i.id === id);
    if (item) {
      Object.assign(item, updates, { updatedAt: new Date().toISOString() });
      this.save(data);
    }
    return data;
  },

  // 刪除花費
  deleteExpense(id) {
    const data = this.load();
    data.items = data.items.filter(i => i.id !== id);
    this.save(data);
    return data;
  },

  // 轉換為台幣
  convertToTWD(amount, currency) {
    const rate = this.currencies[currency]?.rate || 1;
    return Math.round(amount * rate);
  },

  // 計算總計
  getTotal() {
    const data = this.load();
    let total = 0;
    data.items.forEach(item => {
      total += this.convertToTWD(item.amount, item.currency);
    });
    return total;
  },

  // 按天分組並計算小計
  getByDay() {
    const data = this.load();
    const grouped = {};

    data.items.forEach(item => {
      const day = item.day || 0;
      if (!grouped[day]) {
        grouped[day] = { items: [], subtotal: 0 };
      }
      grouped[day].items.push(item);
      grouped[day].subtotal += this.convertToTWD(item.amount, item.currency);
    });

    // 排序每天的項目（按時間）
    Object.keys(grouped).forEach(day => {
      grouped[day].items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    });

    return grouped;
  },

  // 按類別統計
  getByCategory() {
    const data = this.load();
    const stats = {};

    Object.keys(this.categories).forEach(cat => {
      stats[cat] = { count: 0, total: 0 };
    });

    data.items.forEach(item => {
      const cat = item.category || 'other';
      if (stats[cat]) {
        stats[cat].count++;
        stats[cat].total += this.convertToTWD(item.amount, item.currency);
      }
    });

    return stats;
  },

  // 格式化金額
  formatAmount(amount, currency = 'TWD') {
    const curr = this.currencies[currency];
    if (!curr) return `${amount}`;
    return `${curr.symbol} ${amount.toLocaleString()}`;
  },

  // 渲染頁面
  render() {
    this.renderSummary();
    this.renderList();
    this.renderAddButton();
  },

  // 渲染總計區塊
  renderSummary() {
    const el = document.getElementById('expenses-summary');
    if (!el) return;

    const total = this.getTotal();
    const byCategory = this.getByCategory();
    const data = this.load();

    let html = `
      <div class="expense-total-card card">
        <div class="total-header">
          <span class="total-label">💰 旅行總花費</span>
          <span class="total-count">${data.items.length} 筆</span>
        </div>
        <div class="total-amount">NT$ ${total.toLocaleString()}</div>
        <div class="total-avg">平均每天 NT$ ${data.items.length > 0 ? Math.round(total / 16).toLocaleString() : 0}</div>
      </div>

      <div class="expense-categories card">
        <h3>📊 分類統計</h3>
        <div class="category-stats">
    `;

    Object.entries(this.categories).forEach(([key, cat]) => {
      const stat = byCategory[key];
      const percentage = total > 0 ? Math.round((stat.total / total) * 100) : 0;
      html += `
        <div class="category-stat-item">
          <div class="cat-icon" style="background: ${cat.color}20; color: ${cat.color}">${cat.icon}</div>
          <div class="cat-info">
            <span class="cat-name">${cat.name}</span>
            <span class="cat-amount">NT$ ${stat.total.toLocaleString()}</span>
          </div>
          <div class="cat-bar">
            <div class="cat-bar-fill" style="width: ${percentage}%; background: ${cat.color}"></div>
          </div>
          <span class="cat-percent">${percentage}%</span>
        </div>
      `;
    });

    html += `</div></div>`;
    el.innerHTML = html;
  },

  // 渲染花費列表（按天分組）
  renderList() {
    const el = document.getElementById('expenses-list');
    if (!el) return;

    const byDay = this.getByDay();
    const days = Object.keys(byDay).sort((a, b) => Number(a) - Number(b));

    if (days.length === 0) {
      el.innerHTML = `
        <div class="expense-empty card">
          <span class="empty-icon">📝</span>
          <p>還沒有花費紀錄</p>
          <p class="empty-hint">點擊下方按鈕新增第一筆</p>
        </div>
      `;
      return;
    }

    let html = '';

    days.forEach(day => {
      const dayData = byDay[day];
      const dayNum = Number(day);
      const schedule = dayNum > 0 ? TRIP_DATA.schedule.find(s => s.day === dayNum) : null;
      const dayTitle = dayNum === 0 ? '出發前' : `Day ${dayNum}`;
      const dayInfo = schedule ? `${schedule.date} · ${schedule.city}` : '';

      html += `
        <div class="expense-day card">
          <div class="day-header" onclick="Expenses.toggleDay(${day})">
            <div class="day-title">
              <span class="day-badge">${dayTitle}</span>
              <span class="day-info">${dayInfo}</span>
            </div>
            <div class="day-subtotal">
              <span class="subtotal-amount">NT$ ${dayData.subtotal.toLocaleString()}</span>
              <span class="subtotal-count">${dayData.items.length} 筆</span>
            </div>
          </div>
          <div class="day-content" id="expense-day-${day}">
      `;

      dayData.items.forEach(item => {
        const cat = this.categories[item.category] || this.categories.other;
        const twdAmount = this.convertToTWD(item.amount, item.currency);

        html += `
          <div class="expense-item" data-id="${item.id}">
            <div class="expense-icon" style="background: ${cat.color}20; color: ${cat.color}">${cat.icon}</div>
            <div class="expense-info">
              <span class="expense-name">${item.name}</span>
              ${item.note ? `<span class="expense-note">${item.note}</span>` : ''}
              ${item.paidBy ? `<span class="expense-paid">💳 ${item.paidBy}</span>` : ''}
            </div>
            <div class="expense-amount-box">
              <span class="expense-amount">${this.formatAmount(item.amount, item.currency)}</span>
              ${item.currency !== 'TWD' ? `<span class="expense-twd">≈ NT$ ${twdAmount.toLocaleString()}</span>` : ''}
            </div>
            <div class="expense-actions">
              <button onclick="Expenses.showEditModal(${item.id})">✏️</button>
              <button onclick="Expenses.confirmDelete(${item.id})">🗑️</button>
            </div>
          </div>
        `;
      });

      html += `</div></div>`;
    });

    el.innerHTML = html;
  },

  // 渲染新增按鈕
  renderAddButton() {
    const el = document.getElementById('expenses-add');
    if (!el) return;

    el.innerHTML = `
      <button class="btn btn-full expense-add-btn" onclick="Expenses.showAddModal()">
        ➕ 新增花費紀錄
      </button>
    `;
  },

  // 切換天展開
  toggleDay(day) {
    const el = document.getElementById(`expense-day-${day}`);
    if (el) {
      el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }
  },

  // 顯示新增彈窗
  showAddModal(presetDay) {
    const currentDay = DateUtils.getCurrentDayNumber();
    const defaultDay = presetDay || (currentDay > 0 ? currentDay : 1);

    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
      <div class="edit-modal-content">
        <h3>➕ 新增花費</h3>

        <div class="form-group">
          <label>哪一天</label>
          <select id="exp-day">
            <option value="0">出發前</option>
            ${Array.from({length: 16}, (_, i) => {
              const d = i + 1;
              const sch = TRIP_DATA.schedule.find(s => s.day === d);
              return `<option value="${d}" ${d === defaultDay ? 'selected' : ''}>Day ${d} - ${sch ? sch.city : ''}</option>`;
            }).join('')}
          </select>
        </div>

        <div class="form-group">
          <label>類別</label>
          <div class="category-picker">
            ${Object.entries(this.categories).map(([key, cat]) => `
              <button type="button" class="cat-btn ${key === 'food' ? 'selected' : ''}" data-cat="${key}" onclick="Expenses.selectCategory(this, '${key}')">
                <span>${cat.icon}</span>
                <span>${cat.name}</span>
              </button>
            `).join('')}
          </div>
          <input type="hidden" id="exp-category" value="food">
        </div>

        <div class="form-group">
          <label>品項名稱 *</label>
          <input type="text" id="exp-name" placeholder="例：午餐 / 火車票 / 門票">
        </div>

        <div class="form-row">
          <div class="form-group" style="flex: 2">
            <label>金額 *</label>
            <input type="number" id="exp-amount" placeholder="0" step="0.01">
          </div>
          <div class="form-group" style="flex: 1">
            <label>幣別</label>
            <select id="exp-currency">
              ${Object.entries(this.currencies).map(([key, curr]) => `
                <option value="${key}" ${key === 'EUR' ? 'selected' : ''}>${curr.symbol} ${curr.name}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>誰付的</label>
          <div class="payer-picker">
            <button type="button" class="payer-btn selected" onclick="Expenses.selectPayer(this, '橘子')">🍊 橘子</button>
            <button type="button" class="payer-btn" onclick="Expenses.selectPayer(this, '蘋果')">🍎 蘋果</button>
            <button type="button" class="payer-btn" onclick="Expenses.selectPayer(this, '共同')">💑 共同</button>
          </div>
          <input type="hidden" id="exp-paidby" value="橘子">
        </div>

        <div class="form-group">
          <label>備註</label>
          <input type="text" id="exp-note" placeholder="選填">
        </div>

        <div class="edit-modal-buttons">
          <button class="btn btn-outline" onclick="this.closest('.edit-modal').remove()">取消</button>
          <button class="btn" onclick="Expenses.addFromModal()">新增</button>
        </div>
      </div>
    `;
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
  },

  // 選擇類別
  selectCategory(btn, category) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('exp-category').value = category;
  },

  // 選擇付款人
  selectPayer(btn, payer) {
    document.querySelectorAll('.payer-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('exp-paidby').value = payer;
  },

  // 從彈窗新增
  addFromModal() {
    const name = document.getElementById('exp-name').value.trim();
    const amount = parseFloat(document.getElementById('exp-amount').value);

    if (!name) { alert('請輸入品項名稱'); return; }
    if (!amount || amount <= 0) { alert('請輸入有效金額'); return; }

    this.addExpense({
      day: parseInt(document.getElementById('exp-day').value),
      category: document.getElementById('exp-category').value,
      name: name,
      amount: amount,
      currency: document.getElementById('exp-currency').value,
      paidBy: document.getElementById('exp-paidby').value,
      note: document.getElementById('exp-note').value.trim()
    });

    document.querySelector('.edit-modal').remove();
    this.render();
    Share.showToast('✅ 已新增');
  },

  // 顯示編輯彈窗
  showEditModal(id) {
    const data = this.load();
    const item = data.items.find(i => i.id === id);
    if (!item) return;

    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
      <div class="edit-modal-content">
        <h3>✏️ 編輯花費</h3>

        <div class="form-group">
          <label>哪一天</label>
          <select id="exp-day">
            <option value="0" ${item.day === 0 ? 'selected' : ''}>出發前</option>
            ${Array.from({length: 16}, (_, i) => {
              const d = i + 1;
              const sch = TRIP_DATA.schedule.find(s => s.day === d);
              return `<option value="${d}" ${item.day === d ? 'selected' : ''}>Day ${d} - ${sch ? sch.city : ''}</option>`;
            }).join('')}
          </select>
        </div>

        <div class="form-group">
          <label>類別</label>
          <div class="category-picker">
            ${Object.entries(this.categories).map(([key, cat]) => `
              <button type="button" class="cat-btn ${key === item.category ? 'selected' : ''}" data-cat="${key}" onclick="Expenses.selectCategory(this, '${key}')">
                <span>${cat.icon}</span>
                <span>${cat.name}</span>
              </button>
            `).join('')}
          </div>
          <input type="hidden" id="exp-category" value="${item.category}">
        </div>

        <div class="form-group">
          <label>品項名稱 *</label>
          <input type="text" id="exp-name" value="${item.name}">
        </div>

        <div class="form-row">
          <div class="form-group" style="flex: 2">
            <label>金額 *</label>
            <input type="number" id="exp-amount" value="${item.amount}" step="0.01">
          </div>
          <div class="form-group" style="flex: 1">
            <label>幣別</label>
            <select id="exp-currency">
              ${Object.entries(this.currencies).map(([key, curr]) => `
                <option value="${key}" ${key === item.currency ? 'selected' : ''}>${curr.symbol} ${curr.name}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>誰付的</label>
          <div class="payer-picker">
            <button type="button" class="payer-btn ${item.paidBy === '橘子' ? 'selected' : ''}" onclick="Expenses.selectPayer(this, '橘子')">🍊 橘子</button>
            <button type="button" class="payer-btn ${item.paidBy === '蘋果' ? 'selected' : ''}" onclick="Expenses.selectPayer(this, '蘋果')">🍎 蘋果</button>
            <button type="button" class="payer-btn ${item.paidBy === '共同' ? 'selected' : ''}" onclick="Expenses.selectPayer(this, '共同')">💑 共同</button>
          </div>
          <input type="hidden" id="exp-paidby" value="${item.paidBy || ''}">
        </div>

        <div class="form-group">
          <label>備註</label>
          <input type="text" id="exp-note" value="${item.note || ''}">
        </div>

        <div class="edit-modal-buttons">
          <button class="btn btn-outline" onclick="this.closest('.edit-modal').remove()">取消</button>
          <button class="btn" onclick="Expenses.updateFromModal(${id})">儲存</button>
        </div>
      </div>
    `;
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
  },

  // 從彈窗更新
  updateFromModal(id) {
    const name = document.getElementById('exp-name').value.trim();
    const amount = parseFloat(document.getElementById('exp-amount').value);

    if (!name) { alert('請輸入品項名稱'); return; }
    if (!amount || amount <= 0) { alert('請輸入有效金額'); return; }

    this.updateExpense(id, {
      day: parseInt(document.getElementById('exp-day').value),
      category: document.getElementById('exp-category').value,
      name: name,
      amount: amount,
      currency: document.getElementById('exp-currency').value,
      paidBy: document.getElementById('exp-paidby').value,
      note: document.getElementById('exp-note').value.trim()
    });

    document.querySelector('.edit-modal').remove();
    this.render();
    Share.showToast('✅ 已更新');
  },

  // 確認刪除
  confirmDelete(id) {
    if (confirm('確定要刪除此筆花費嗎？')) {
      this.deleteExpense(id);
      this.render();
      Share.showToast('🗑️ 已刪除');
    }
  }
};

// 頁面載入時渲染
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('expenses-list')) {
    Expenses.render();
  }
});
