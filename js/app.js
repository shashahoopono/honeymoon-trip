// 主程式邏輯
const App = {
  // 測試模式：設定此值可模擬特定日期（格式：'2026-02-20' 或 null 表示使用真實日期）
  // 在瀏覽器 console 輸入：App.setTestDate('2026-02-20') 來測試第 3 天
  // 輸入：App.clearTestDate() 來恢復正常
  TEST_DATE_KEY: 'honeymoon_test_date',

  // 初始化
  init() {
    this.setupNavigation();
    this.initPage();
    this.registerServiceWorker();
    this.showTestModeIndicator();
  },

  // 設定測試日期
  setTestDate(dateStr) {
    localStorage.setItem(this.TEST_DATE_KEY, dateStr);
    console.log(`✅ 測試模式啟用：模擬日期 ${dateStr}`);
    location.reload();
  },

  // 清除測試日期
  clearTestDate() {
    localStorage.removeItem(this.TEST_DATE_KEY);
    console.log('✅ 測試模式已關閉');
    location.reload();
  },

  // 取得測試日期
  getTestDate() {
    return localStorage.getItem(this.TEST_DATE_KEY);
  },

  // 顯示測試模式指示器
  showTestModeIndicator() {
    const testDate = this.getTestDate();
    if (testDate) {
      const indicator = document.createElement('div');
      indicator.className = 'test-mode-indicator';
      indicator.innerHTML = `🧪 測試模式：${testDate} <button onclick="App.clearTestDate()">✕</button>`;
      document.body.appendChild(indicator);
    }
  },

  // 設置底部導航
  setupNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        item.classList.add('active');
      }
    });
  },

  // 根據頁面初始化
  initPage() {
    const page = window.location.pathname.split('/').pop() || 'index.html';

    switch (page) {
      case 'index.html':
      case '':
        this.initHomePage();
        break;
      case 'schedule.html':
        this.initSchedulePage();
        break;
      case 'flights.html':
        this.initFlightsPage();
        break;
      case 'hotels.html':
        this.initHotelsPage();
        break;
      case 'packing.html':
        this.initPackingPage();
        break;
      case 'tips.html':
        this.initTipsPage();
        break;
      case 'missions.html':
        this.initMissionsPage();
        break;
      case 'tickets.html':
        this.initTicketsPage();
        break;
    }

    // 如果是 day-X.html 頁面
    if (page.startsWith('day-')) {
      const dayNum = parseInt(page.replace('day-', '').replace('.html', ''));
      this.initDayPage(dayNum);
    }
  },

  // 首頁初始化
  initHomePage() {
    const dayNum = DateUtils.getCurrentDayNumber();
    const countdown = DateUtils.getCountdown();

    // 封面照片區域 - 直接使用 Cover.png
    const coverEl = document.getElementById('cover-section');
    if (coverEl) {
      coverEl.innerHTML = `
        <div class="cover-photo" style="background-image: url('images/Cover.png')"></div>
        <div style="
          margin: 16px 0;
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
        ">
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
            <span style="font-size: 20px;">🍊🍎</span>
            <span style="font-size: 17px; font-weight: 600; color: #333;">瑞士·義大利蜜月之旅</span>
          </div>
          <div style="width: 40px; height: 1px; background: #ddd; margin: 10px auto;"></div>
          <div style="font-size: 13px; color: #888;">2026/2/18 - 3/5 · 16 Days</div>
        </div>
      `;
    }

    // 狀態區塊
    const statusEl = document.getElementById('trip-status');
    if (statusEl) {
      if (dayNum === -1) {
        // 還沒開始 - 顯示倒數
        statusEl.innerHTML = `
          <div class="countdown-box">
            <div class="countdown-label">蜜月倒數</div>
            <div class="countdown-number">${countdown}</div>
            <div class="countdown-unit">天</div>
          </div>
          <p class="countdown-date">出發日：2026年2月18日</p>
        `;
      } else if (dayNum === -2) {
        // 已結束
        statusEl.innerHTML = `
          <div class="trip-ended">
            <span class="ended-icon">🏠</span>
            <h2>蜜月旅行圓滿結束</h2>
            <p>感謝這16天的美好回憶</p>
          </div>
        `;
      } else {
        // 旅途中 - 顯示第幾天 + 跳轉按鈕
        const todaySchedule = getTodaySchedule();
        statusEl.innerHTML = `
          <div class="trip-header-banner" style="width:100%;max-width:100%;overflow:hidden;">
            <img src="images/header.gif" alt="" style="width:100%;max-width:100%;height:auto;display:block;">
          </div>
          <div class="trip-day-counter">
            <div class="day-counter-badge">旅行第 <span class="day-num-large">${dayNum}</span> 天</div>
            <p class="day-counter-date">${todaySchedule.date} (${todaySchedule.weekday})</p>
          </div>
          <h2 class="today-title">${todaySchedule.title}</h2>
          <p class="today-city">📍 ${todaySchedule.city}, ${todaySchedule.country}</p>
          <a href="day-${dayNum}.html" class="btn btn-full" style="margin-top:12px;">
            📅 查看今日完整行程
          </a>
        `;
      }
    }

    // 天氣與當地時間
    const weatherEl = document.getElementById('weather-time');
    if (weatherEl) {
      this.renderWeatherTime(weatherEl, dayNum);
    }

    // 今日行程
    const todayActivitiesEl = document.getElementById('today-activities');
    if (todayActivitiesEl && dayNum > 0) {
      const schedule = getTodaySchedule();
      if (schedule && schedule.activities) {
        let html = '<h3>今日行程</h3><ul class="activity-list">';
        schedule.activities.slice(0, 5).forEach(act => {
          html += `
            <li class="activity-item">
              <span class="activity-time">${act.time}</span>
              <span class="activity-name">${act.activity}</span>
            </li>
          `;
        });
        if (schedule.activities.length > 5) {
          html += `<li class="activity-more"><a href="day-${dayNum}.html">查看完整行程 →</a></li>`;
        }
        html += '</ul>';
        todayActivitiesEl.innerHTML = html;
      }
    }

    // 今日住宿
    const hotelEl = document.getElementById('today-hotel');
    if (hotelEl && dayNum > 0) {
      const hotel = getTodayHotel();
      if (hotel) {
        hotelEl.innerHTML = `
          <h3>今晚住宿</h3>
          <div class="hotel-card">
            <h4>${hotel.name}</h4>
            <p class="hotel-address">${hotel.address}</p>
            <a href="https://maps.google.com/?q=${encodeURIComponent(hotel.address)}" target="_blank" class="btn btn-small">
              📍 導航
            </a>
          </div>
        `;
      }
    }

    // 貼心提醒
    const reminderEl = document.getElementById('reminder');
    if (reminderEl) {
      const schedule = getTodaySchedule();
      const city = schedule ? schedule.city : null;
      const context = schedule ? schedule.type : null;
      const reminder = ReminderSystem.getTodayReminder(dayNum, city, context);

      if (reminder) {
        reminderEl.innerHTML = `
          <div class="reminder-card ${reminder.type}">
            <span class="reminder-icon">💕</span>
            <p class="reminder-text">${reminder.text}</p>
          </div>
        `;
      }
    }

    // 今日花費預覽
    const expensePreviewEl = document.getElementById('expense-preview');
    if (expensePreviewEl) {
      const total = Expenses.getTotal();
      const byDay = Expenses.getByDay();
      const todayExpenses = byDay[dayNum] || { items: [], subtotal: 0 };

      let html = `
        <h3>💰 旅行花費</h3>
        <div class="expense-preview-stats">
          <div class="preview-stat">
            <span class="preview-label">累計總花費</span>
            <span class="preview-amount">NT$ ${total.toLocaleString()}</span>
          </div>
      `;

      if (dayNum > 0 && todayExpenses.items.length > 0) {
        html += `
          <div class="preview-stat">
            <span class="preview-label">今日花費</span>
            <span class="preview-amount-small">NT$ ${todayExpenses.subtotal.toLocaleString()}</span>
          </div>
        `;
      }

      html += `
        </div>
        <a href="expenses.html" class="btn btn-outline btn-full" style="margin-top:12px">
          <img src="images/nav-expense.svg" alt="" style="width:20px;height:20px;margin-right:8px;vertical-align:middle;filter:invert(24%) sepia(83%) saturate(3134%) hue-rotate(323deg) brightness(94%) contrast(93%);">
          記錄花費
        </a>
      `;
      expensePreviewEl.innerHTML = html;
    }
  },

  // 行程總覽頁面
  initSchedulePage() {
    const listEl = document.getElementById('schedule-list');
    if (!listEl) return;

    const currentDay = DateUtils.getCurrentDayNumber();
    let html = '';

    TRIP_DATA.schedule.forEach(day => {
      const isToday = day.day === currentDay;
      const isPast = currentDay > 0 && day.day < currentDay;

      html += `
        <a href="day-${day.day}.html" class="schedule-card ${isToday ? 'today' : ''} ${isPast ? 'past' : ''}">
          <div class="schedule-day">Day ${day.day}</div>
          <div class="schedule-info">
            <div class="schedule-date">${day.date.substring(5)} (${day.weekday})</div>
            <div class="schedule-title">${day.title}</div>
            <div class="schedule-city">📍 ${day.city}</div>
          </div>
          <div class="schedule-arrow">→</div>
        </a>
      `;
    });

    listEl.innerHTML = html;
  },

  // 單日行程頁面
  initDayPage(dayNum) {
    const schedule = TRIP_DATA.schedule.find(s => s.day === dayNum);
    if (!schedule) return;

    // 頁面標題
    const headerEl = document.getElementById('day-header');
    if (headerEl) {
      headerEl.innerHTML = `
        <div class="day-badge">Day ${dayNum}</div>
        <h1 data-editable="day${dayNum}_title">${schedule.title}</h1>
        <p class="day-meta">${schedule.date} (${schedule.weekday}) | ${schedule.city}, ${schedule.country}</p>
        <button class="btn btn-small" style="margin-top:12px; background:rgba(255,255,255,0.2);" onclick="Share.shareDay(${dayNum})">
          📤 分享此日行程
        </button>
      `;
    }

    // 行程時間軸
    const timelineEl = document.getElementById('day-timeline');
    if (timelineEl && schedule.activities) {
      let html = '<div class="timeline">';
      schedule.activities.forEach(act => {
        const hasAddress = act.address || act.location;
        const mapUrl = act.address
          ? `https://maps.google.com/?q=${encodeURIComponent(act.address)}`
          : `https://maps.google.com/?q=${encodeURIComponent(act.location)}`;

        html += `
          <div class="timeline-item">
            <div class="timeline-time">${act.time}</div>
            <div class="timeline-content">
              <h3>${act.activity}</h3>
              <p class="timeline-location">${act.location}</p>
              ${act.note ? `<p class="timeline-note">${act.note}</p>` : ''}
              ${hasAddress ? `<a href="${mapUrl}" target="_blank" class="btn btn-small btn-map">📍 導航</a>` : ''}
            </div>
          </div>
        `;
      });
      html += '</div>';
      timelineEl.innerHTML = html;
    }

    // 當日住宿
    if (schedule.hotel) {
      const hotel = TRIP_DATA.hotels.find(h => h.name === schedule.hotel);
      const hotelEl = document.getElementById('day-hotel');
      if (hotelEl && hotel) {
        hotelEl.innerHTML = `
          <div class="hotel-info-card">
            <h3>🏨 今晚住宿</h3>
            <h4>${hotel.name}</h4>
            <p>${hotel.address}</p>
            ${hotel.checkInTime ? `<p>入住時間：${hotel.checkInTime}</p>` : ''}
            <a href="https://maps.google.com/?q=${encodeURIComponent(hotel.address)}" target="_blank" class="btn">
              📍 導航至飯店
            </a>
          </div>
        `;
      }
    }

    // 當日花費
    const expensesEl = document.getElementById('day-expenses');
    if (expensesEl) {
      const byDay = Expenses.getByDay();
      const dayExpenses = byDay[dayNum] || { items: [], subtotal: 0 };

      let html = `<h3>💰 當日花費 <span style="color:var(--primary);font-weight:600;">NT$ ${dayExpenses.subtotal.toLocaleString()}</span></h3>`;

      if (dayExpenses.items.length > 0) {
        html += '<div class="day-expense-list">';
        dayExpenses.items.forEach(item => {
          const cat = Expenses.categories[item.category] || Expenses.categories.other;
          html += `
            <div class="expense-item-mini">
              <span class="expense-icon-mini" style="color:${cat.color}">${cat.icon}</span>
              <span class="expense-name-mini">${item.name}</span>
              <span class="expense-amount-mini">${Expenses.formatAmount(item.amount, item.currency)}</span>
            </div>
          `;
        });
        html += '</div>';
      } else {
        html += '<p style="color:var(--text-muted);text-align:center;padding:16px 0;">今日尚無花費紀錄</p>';
      }

      html += `
        <button class="btn btn-small btn-outline" style="width:100%;margin-top:12px;" onclick="Expenses.showAddModal(${dayNum})">
          ➕ 新增今日花費
        </button>
      `;
      expensesEl.innerHTML = html;
    }

    // 今日小提醒（使用彈窗編輯）
    const reminderEl = document.getElementById('day-reminder');
    if (reminderEl) {
      this.renderDayReminderCard(reminderEl, dayNum);
    }

    // 照片畫廊
    const photosEl = document.getElementById('day-photos');
    if (photosEl) {
      photosEl.innerHTML = `
        <h3>📷 今日照片</h3>
        <div id="photo-gallery-${dayNum}"></div>
      `;
      Editor.renderPhotoGallery(dayNum, 'general', `photo-gallery-${dayNum}`);
    }

    // 今日筆記（使用彈窗編輯）
    const notesEl = document.getElementById('day-notes');
    if (notesEl) {
      this.renderDayNotesCard(notesEl, dayNum);
    }

    // 當日票券
    this.renderDayTickets();

    // 導航按鈕
    const navEl = document.getElementById('day-nav');
    if (navEl) {
      let html = '<div class="day-nav-buttons">';
      if (dayNum > 1) {
        html += `<a href="day-${dayNum - 1}.html" class="btn btn-outline">← Day ${dayNum - 1}</a>`;
      } else {
        html += '<span></span>';
      }
      html += '<a href="schedule.html" class="btn">總覽</a>';
      if (dayNum < 16) {
        html += `<a href="day-${dayNum + 1}.html" class="btn btn-outline">Day ${dayNum + 1} →</a>`;
      } else {
        html += '<span></span>';
      }
      html += '</div>';
      navEl.innerHTML = html;
    }
  },

  // 刷新照片（用於上傳後更新）
  refreshPhotos(dayNum) {
    const galleryEl = document.getElementById(`photo-gallery-${dayNum}`);
    if (galleryEl) {
      Editor.renderPhotoGallery(dayNum, 'general', `photo-gallery-${dayNum}`);
    }
  },

  // 渲染今日小提醒卡片
  renderDayReminderCard(el, dayNum) {
    const savedReminder = Editor.getDayReminder(dayNum);

    let contentHtml = '';
    if (savedReminder) {
      contentHtml = `<p class="card-text-content">${savedReminder.replace(/\n/g, '<br>')}</p>`;
    } else {
      contentHtml = `<p class="card-empty-hint">尚無提醒事項</p>`;
    }

    el.innerHTML = `
      <h3>📌 今日小提醒</h3>
      ${contentHtml}
      <button class="btn btn-small btn-outline" style="width:100%;margin-top:12px;" onclick="App.showEditReminderModal(${dayNum})">
        ✏️ 編輯提醒
      </button>
    `;
  },

  // 渲染今日筆記卡片
  renderDayNotesCard(el, dayNum) {
    const savedNote = Editor.getDayNote(dayNum);

    let contentHtml = '';
    if (savedNote) {
      contentHtml = `<p class="card-text-content">${savedNote.replace(/\n/g, '<br>')}</p>`;
    } else {
      contentHtml = `<p class="card-empty-hint">尚無筆記</p>`;
    }

    el.innerHTML = `
      <h3>📝 今日筆記</h3>
      ${contentHtml}
      <button class="btn btn-small btn-outline" style="width:100%;margin-top:12px;" onclick="App.showEditNoteModal(${dayNum})">
        ✏️ 編輯筆記
      </button>
    `;
  },

  // 顯示編輯提醒彈窗
  showEditReminderModal(dayNum) {
    const savedReminder = Editor.getDayReminder(dayNum);
    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
      <div class="edit-modal-content">
        <h3>📌 編輯今日小提醒</h3>
        <textarea id="edit-reminder-textarea" rows="5" placeholder="輸入今天要注意的事項..."></textarea>
        <div class="edit-modal-buttons">
          <button class="btn btn-outline" onclick="this.closest('.edit-modal').remove()">取消</button>
          <button class="btn" onclick="App.saveReminderFromModal(${dayNum})">💾 儲存</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    const textarea = document.getElementById('edit-reminder-textarea');
    textarea.value = savedReminder;
    textarea.focus();
  },

  // 從彈窗儲存提醒
  saveReminderFromModal(dayNum) {
    const textarea = document.getElementById('edit-reminder-textarea');
    if (textarea) {
      Editor.setDayReminder(dayNum, textarea.value);
      document.querySelector('.edit-modal').remove();
      const reminderEl = document.getElementById('day-reminder');
      if (reminderEl) {
        this.renderDayReminderCard(reminderEl, dayNum);
      }
      Share.showToast('✅ 小提醒已儲存');
    }
  },

  // 顯示編輯筆記彈窗
  showEditNoteModal(dayNum) {
    const savedNote = Editor.getDayNote(dayNum);
    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
      <div class="edit-modal-content">
        <h3>📝 編輯今日筆記</h3>
        <textarea id="edit-note-textarea" rows="6" placeholder="記錄今天的心情、趣事..."></textarea>
        <div class="edit-modal-buttons">
          <button class="btn btn-outline" onclick="this.closest('.edit-modal').remove()">取消</button>
          <button class="btn" onclick="App.saveNoteFromModal(${dayNum})">💾 儲存</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    const textarea = document.getElementById('edit-note-textarea');
    textarea.value = savedNote;
    textarea.focus();
  },

  // 從彈窗儲存筆記
  saveNoteFromModal(dayNum) {
    const textarea = document.getElementById('edit-note-textarea');
    if (textarea) {
      Editor.setDayNote(dayNum, textarea.value);
      document.querySelector('.edit-modal').remove();
      const notesEl = document.getElementById('day-notes');
      if (notesEl) {
        this.renderDayNotesCard(notesEl, dayNum);
      }
      Share.showToast('✅ 筆記已儲存');
    }
  },

  // 渲染天氣與當地時間
  renderWeatherTime(el, dayNum) {
    const schedule = dayNum > 0 ? getTodaySchedule() : null;
    let city = schedule ? schedule.city : null;
    let country = schedule ? schedule.country : null;

    // 城市時區對照
    const timezones = {
      '台北': 'Asia/Taipei',
      '新加坡': 'Asia/Singapore',
      '蘇黎世': 'Europe/Zurich',
      '蘇黎世/瑞士': 'Europe/Zurich',
      '瑞士': 'Europe/Zurich',
      '蘇黎世→新加坡': 'Europe/Zurich',
      '新加坡→台北': 'Asia/Singapore',
      '乘車一日': 'Europe/Zurich',
      '乘車中': 'Europe/Zurich',
      '盧森': 'Europe/Zurich',
      '琉森': 'Europe/Zurich',
      '乘車': 'Europe/Zurich',
      '策馬特': 'Europe/Zurich',
      '因特拉肯': 'Europe/Zurich',
      '因特拉肯/少女峰': 'Europe/Zurich',
      '因特拉肯→琉森→蘇黎世': 'Europe/Zurich',
      '米蘭': 'Europe/Rome',
      '米蘭→羅馬': 'Europe/Rome',
      '威尼斯': 'Europe/Rome',
      '佛羅倫斯': 'Europe/Rome',
      '佛羅倫斯→威尼斯': 'Europe/Rome',
      '羅馬': 'Europe/Rome',
      '羅馬→佛羅倫斯': 'Europe/Rome'
    };

    // 如果還沒出發或已結束，顯示台北天氣
    if (!city) {
      city = '台北';
      country = '台灣';
    }

    const timezone = timezones[city] || 'Asia/Taipei';

    // 取得當地時間
    const getLocalTime = () => {
      const now = new Date();
      return now.toLocaleString('zh-TW', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    };

    const updateTime = () => {
      const timeSpan = document.getElementById('local-time');
      if (timeSpan) {
        timeSpan.textContent = getLocalTime();
      }
    };

    el.innerHTML = `
      <div class="weather-time-card">
        <div class="weather-info">
          <span class="city-name">📍 ${city}${country ? ', ' + country : ''}</span>
          <span class="local-time-label">當地時間</span>
          <span class="local-time" id="local-time">${getLocalTime()}</span>
        </div>
        <div class="weather-icon">
          <span id="weather-icon">🌤️</span>
          <span class="weather-desc" id="weather-desc">載入中...</span>
        </div>
      </div>
    `;

    // 每分鐘更新時間
    setInterval(updateTime, 60000);

    // 取得天氣（使用 Open-Meteo API，免費且不需 API key）
    this.fetchWeather(city, country);
  },

  // 取得天氣資訊
  async fetchWeather(city, country) {
    // 城市座標
    const coords = {
      '台北': { lat: 25.03, lon: 121.57 },
      '新加坡': { lat: 1.35, lon: 103.82 },
      '蘇黎世': { lat: 47.37, lon: 8.54 },
      '蘇黎世/瑞士': { lat: 47.37, lon: 8.54 },
      '蘇黎世→新加坡': { lat: 47.37, lon: 8.54 },
      '新加坡→台北': { lat: 1.35, lon: 103.82 },
      '瑞士': { lat: 47.37, lon: 8.54 },
      '盧森': { lat: 47.05, lon: 8.31 },
      '琉森': { lat: 47.05, lon: 8.31 },
      '策馬特': { lat: 46.02, lon: 7.75 },
      '因特拉肯': { lat: 46.69, lon: 7.85 },
      '因特拉肯/少女峰': { lat: 46.69, lon: 7.85 },
      '因特拉肯→琉森→蘇黎世': { lat: 47.05, lon: 8.31 },
      '伯恩': { lat: 46.95, lon: 7.45 },
      '米蘭': { lat: 45.46, lon: 9.19 },
      '米蘭→羅馬': { lat: 41.90, lon: 12.50 },
      '威尼斯': { lat: 45.44, lon: 12.32 },
      '佛羅倫斯': { lat: 43.77, lon: 11.25 },
      '佛羅倫斯→威尼斯': { lat: 45.44, lon: 12.32 },
      '羅馬': { lat: 41.90, lon: 12.50 },
      '羅馬→佛羅倫斯': { lat: 43.77, lon: 11.25 }
    };

    const coord = coords[city];
    if (!coord) return;

    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coord.lat}&longitude=${coord.lon}&current_weather=true`);
      const data = await res.json();

      if (data.current_weather) {
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;

        // 天氣代碼對應圖示
        const weatherIcons = {
          0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
          45: '🌫️', 48: '🌫️',
          51: '🌦️', 53: '🌦️', 55: '🌧️',
          61: '🌧️', 63: '🌧️', 65: '🌧️',
          71: '🌨️', 73: '🌨️', 75: '❄️',
          80: '🌦️', 81: '🌧️', 82: '⛈️',
          95: '⛈️', 96: '⛈️', 99: '⛈️'
        };

        const weatherDescs = {
          0: '晴朗', 1: '大致晴朗', 2: '多雲', 3: '陰天',
          45: '霧', 48: '濃霧',
          51: '小雨', 53: '中雨', 55: '大雨',
          61: '小雨', 63: '中雨', 65: '大雨',
          71: '小雪', 73: '中雪', 75: '大雪',
          80: '陣雨', 81: '陣雨', 82: '大陣雨',
          95: '雷雨', 96: '冰雹', 99: '冰雹'
        };

        const iconEl = document.getElementById('weather-icon');
        const descEl = document.getElementById('weather-desc');
        if (iconEl) iconEl.textContent = weatherIcons[code] || '🌡️';
        if (descEl) descEl.textContent = `${temp}°C ${weatherDescs[code] || ''}`;
      }
    } catch (e) {
      console.log('Weather fetch failed:', e);
      const descEl = document.getElementById('weather-desc');
      if (descEl) descEl.textContent = '無法取得';
    }
  },

  // 航班頁面
  initFlightsPage() {
    const outboundEl = document.getElementById('flights-outbound');
    const returnEl = document.getElementById('flights-return');

    if (outboundEl) {
      let html = `<h3>去程 <span class="flight-total">${TRIP_DATA.flights.totalOutbound}</span></h3>`;
      TRIP_DATA.flights.outbound.forEach(f => {
        html += this.renderFlightCard(f);
      });
      outboundEl.innerHTML = html;
    }

    if (returnEl) {
      let html = `<h3>回程 <span class="flight-total">${TRIP_DATA.flights.totalReturn}</span></h3>`;
      TRIP_DATA.flights.return.forEach(f => {
        html += this.renderFlightCard(f);
      });
      if (TRIP_DATA.flights.transitNote) {
        html += `<div class="flight-note">💡 ${TRIP_DATA.flights.transitNote}</div>`;
      }
      returnEl.innerHTML = html;
    }
  },

  renderFlightCard(flight) {
    return `
      <div class="flight-card">
        <div class="flight-header">
          <span class="flight-date">${flight.date} (${flight.day})</span>
          <span class="flight-number">${flight.flight} ${flight.airline}</span>
        </div>
        <div class="flight-route">
          <div class="flight-point">
            <div class="flight-time">${flight.departure}</div>
            <div class="flight-airport">${flight.from}</div>
          </div>
          <div class="flight-arrow">✈️</div>
          <div class="flight-point">
            <div class="flight-time">${flight.arrival}</div>
            <div class="flight-airport">${flight.to}</div>
          </div>
        </div>
        <div class="flight-duration">飛行時間：${flight.duration}</div>
        ${flight.note ? `<div class="flight-note">${flight.note}</div>` : ''}
      </div>
    `;
  },

  // 住宿頁面（可編輯版）
  initHotelsPage() {
    const listEl = document.getElementById('hotels-list');
    if (!listEl) return;

    const customHotels = Editor.getCustomHotels();

    let html = '';
    TRIP_DATA.hotels.forEach((hotel, idx) => {
      const customNote = Editor.getHotelNote(hotel.name);
      const hotelImages = Editor.getHotelImages(hotel.name);
      const hotelLinks = Editor.getHotelLinks(hotel.name);
      const hotelKey = hotel.name.replace(/[^a-zA-Z0-9]/g, '_');

      html += `
        <div class="hotel-card" id="hotel-${idx}">
          <div class="hotel-header">
            <span class="hotel-city">${hotel.city}, ${hotel.country}</span>
            ${hotel.honeymoonConfirmed ? '<span class="badge">💑 蜜月確認</span>' : ''}
          </div>
          <h3>${hotel.name}</h3>
          <p class="hotel-address">${hotel.address}</p>
          <div class="hotel-dates">
            <span>📅 入住：${hotel.checkIn}</span>
            <span>📅 退房：${hotel.checkOut}</span>
          </div>
          ${hotel.checkInTime ? `<p class="hotel-time">🕐 入住時間：${hotel.checkInTime}</p>` : ''}
          ${hotel.features ? `<p class="hotel-features">✨ ${hotel.features.join('、')}</p>` : ''}
          ${hotel.notes ? `<p class="hotel-notes">💡 ${hotel.notes}</p>` : ''}

          <!-- 住宿圖片 -->
          <div class="hotel-images-section">
            <h4>📷 住宿照片</h4>
            <div class="photo-gallery" id="hotel-gallery-${idx}">
              ${hotelImages.map(img => `
                <div class="photo-item">
                  <img src="${img.data}" alt="住宿照片" onclick="App.viewHotelImage('${hotel.name.replace(/'/g, "\\'")}', ${img.id})">
                  <div class="photo-actions">
                    <button onclick="App.deleteHotelImage('${hotel.name.replace(/'/g, "\\'")}', ${img.id}, ${idx})">🗑️</button>
                  </div>
                </div>
              `).join('')}
              <div class="photo-add" onclick="App.uploadHotelImage('${hotel.name.replace(/'/g, "\\'")}', ${idx})">
                <span>➕</span>
                <span>新增</span>
              </div>
            </div>
          </div>

          <!-- 相關連結 -->
          <div class="hotel-links-section">
            <div class="card-header-row">
              <span class="section-label">🔗 相關連結</span>
              <button class="add-btn" onclick="App.showAddHotelLinkModal('${hotel.name.replace(/'/g, "\\'")}', ${idx})">+ 新增</button>
            </div>
            <div class="hotel-links" id="hotel-links-${idx}">
              ${hotelLinks.length > 0 ? hotelLinks.map(link => `
                <div class="hotel-link-item">
                  <a href="${link.url}" target="_blank" rel="noopener">${link.title || link.url}</a>
                  <button class="link-delete" onclick="App.deleteHotelLink('${hotel.name.replace(/'/g, "\\'")}', ${link.id}, ${idx})">✕</button>
                </div>
              `).join('') : '<p class="no-links">尚無連結</p>'}
            </div>
          </div>

          <!-- 我的備註 -->
          <div class="hotel-custom-note">
            <label>📝 我的備註</label>
            <textarea class="note-textarea-small" id="hotel-note-${idx}" placeholder="記錄訂房編號、聯絡方式等...">${customNote}</textarea>
            <button class="btn btn-small" onclick="App.saveHotelNote('${hotel.name}', ${idx})">💾 儲存備註</button>
          </div>

          <div class="hotel-actions">
            <a href="https://maps.google.com/?q=${encodeURIComponent(hotel.address)}" target="_blank" class="btn btn-small">
              📍 導航
            </a>
          </div>
        </div>
      `;
    });

    // 自訂額外住宿
    if (customHotels.extras && customHotels.extras.length > 0) {
      html += '<h3 class="section-title">✨ 額外住宿</h3>';
      customHotels.extras.forEach(hotel => {
        html += `
          <div class="hotel-card custom-hotel">
            <button class="card-delete" onclick="App.removeExtraHotel(${hotel.id})">✕</button>
            <div class="hotel-header">
              <span class="hotel-city">${hotel.city || ''}${hotel.country ? ', ' + hotel.country : ''}</span>
            </div>
            <h3>${hotel.name}</h3>
            ${hotel.address ? `<p class="hotel-address">${hotel.address}</p>` : ''}
            ${hotel.dates ? `<p class="hotel-dates">${hotel.dates}</p>` : ''}
            ${hotel.note ? `<p class="hotel-notes">📝 ${hotel.note}</p>` : ''}
            ${hotel.address ? `
              <a href="https://maps.google.com/?q=${encodeURIComponent(hotel.address)}" target="_blank" class="btn btn-small">
                📍 導航
              </a>
            ` : ''}
          </div>
        `;
      });
    }

    // 新增按鈕
    html += `
      <div class="hotel-add">
        <button class="btn btn-full" onclick="App.showAddHotelModal()">
          ➕ 新增住宿資訊
        </button>
      </div>
    `;

    listEl.innerHTML = html;
  },

  showAddHotelModal() {
    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
      <div class="edit-modal-content">
        <h3>➕ 新增住宿資訊</h3>
        <div class="form-group"><label>住宿名稱 *</label><input type="text" id="hotel-name" placeholder="例：Airbnb 公寓"></div>
        <div class="form-group"><label>城市</label><input type="text" id="hotel-city" placeholder="例：佛羅倫斯"></div>
        <div class="form-group"><label>國家</label><input type="text" id="hotel-country" placeholder="例：義大利"></div>
        <div class="form-group"><label>地址</label><input type="text" id="hotel-address" placeholder="完整地址"></div>
        <div class="form-group"><label>日期</label><input type="text" id="hotel-dates" placeholder="例：2/22 - 2/23"></div>
        <div class="form-group"><label>備註</label><textarea id="hotel-note" rows="2" placeholder="訂房編號、聯絡方式等"></textarea></div>
        <div class="edit-modal-buttons">
          <button class="btn btn-outline" onclick="this.closest('.edit-modal').remove()">取消</button>
          <button class="btn" onclick="App.addExtraHotel()">新增</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  },

  addExtraHotel() {
    const name = document.getElementById('hotel-name').value.trim();
    if (!name) { alert('請輸入住宿名稱'); return; }

    Editor.addExtraHotel({
      name: name,
      city: document.getElementById('hotel-city').value.trim(),
      country: document.getElementById('hotel-country').value.trim(),
      address: document.getElementById('hotel-address').value.trim(),
      dates: document.getElementById('hotel-dates').value.trim(),
      note: document.getElementById('hotel-note').value.trim()
    });

    document.querySelector('.edit-modal').remove();
    this.initHotelsPage();
    Share.showToast('✅ 已新增住宿');
  },

  removeExtraHotel(hotelId) {
    if (confirm('確定要刪除此住宿嗎？')) {
      Editor.removeExtraHotel(hotelId);
      this.initHotelsPage();
    }
  },

  // 儲存住宿備註
  saveHotelNote(hotelName, idx) {
    const textarea = document.getElementById(`hotel-note-${idx}`);
    if (textarea) {
      Editor.setHotelNote(hotelName, textarea.value);
      Share.showToast('✅ 備註已儲存');
    }
  },

  // 檢視住宿圖片（全螢幕）
  viewHotelImage(hotelName, imageId) {
    const images = Editor.getHotelImages(hotelName);
    const img = images.find(i => i.id === imageId);
    if (img) {
      Editor.viewPhoto(img.data);
    }
  },

  // 上傳住宿圖片
  uploadHotelImage(hotelName, idx) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    input.onchange = (e) => {
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          Editor.compressImage(event.target.result, 600, 0.7, (compressed) => {
            Editor.addHotelImage(hotelName, compressed);
            this.initHotelsPage();
            Share.showToast('✅ 圖片已新增');
          });
        };
        reader.readAsDataURL(file);
      });
    };

    input.click();
  },

  // 刪除住宿圖片
  deleteHotelImage(hotelName, imageId, idx) {
    if (confirm('確定要刪除此圖片嗎？')) {
      Editor.deleteHotelImage(hotelName, imageId);
      this.initHotelsPage();
    }
  },

  // 顯示新增連結彈窗
  showAddHotelLinkModal(hotelName, idx) {
    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
      <div class="edit-modal-content">
        <h3>🔗 新增連結</h3>
        <div class="form-group">
          <label>連結標題</label>
          <input type="text" id="link-title" placeholder="例：訂房確認信">
        </div>
        <div class="form-group">
          <label>連結網址 *</label>
          <input type="url" id="link-url" placeholder="https://...">
        </div>
        <div class="edit-modal-buttons">
          <button class="btn btn-outline" onclick="this.closest('.edit-modal').remove()">取消</button>
          <button class="btn" onclick="App.addHotelLink('${hotelName}', ${idx})">新增</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  },

  // 新增住宿連結
  addHotelLink(hotelName, idx) {
    const url = document.getElementById('link-url').value.trim();
    if (!url) { alert('請輸入連結網址'); return; }

    Editor.addHotelLink(hotelName, {
      title: document.getElementById('link-title').value.trim() || url,
      url: url
    });

    document.querySelector('.edit-modal').remove();
    this.initHotelsPage();
    Share.showToast('✅ 連結已新增');
  },

  // 刪除住宿連結
  deleteHotelLink(hotelName, linkId, idx) {
    if (confirm('確定要刪除此連結嗎？')) {
      Editor.deleteHotelLink(hotelName, linkId);
      this.initHotelsPage();
    }
  },

  // 打包清單頁面（可編輯版）
  initPackingPage() {
    const STORAGE_KEY = 'honeymoon_packing';
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const customData = Editor.getCustomPacking();

    const categories = {
      documents: '📄 證件文件',
      electronics: '🔌 電子用品',
      clothing: '👕 衣物',
      toiletries: '🧴 盥洗用品',
      misc: '📦 其他'
    };

    const listEl = document.getElementById('packing-list');
    if (!listEl) return;

    let totalItems = 0;
    let checkedItems = 0;
    let html = '';

    // 渲染各類別（包含原始項目 + 該類別的自訂項目）
    for (const [key, title] of Object.entries(categories)) {
      const originalItems = TRIP_DATA.packing[key] || [];
      const customItemsInCategory = customData.items.filter(i => i.category === key);

      // 如果該類別沒有任何項目，跳過
      const hasOriginalItems = originalItems.some((item, idx) => !customData.removed.includes(`${key}-${idx}`));
      if (!hasOriginalItems && customItemsInCategory.length === 0) continue;

      html += `<div class="packing-category"><h3>${title}</h3><ul class="packing-items">`;

      // 原始項目
      originalItems.forEach((item, idx) => {
        const itemId = `${key}-${idx}`;
        if (customData.removed.includes(itemId)) return;

        const checked = saved[itemId] || false;
        totalItems++;
        if (checked) checkedItems++;

        html += `
          <li class="packing-item ${checked ? 'checked' : ''}">
            <label>
              <input type="checkbox" ${checked ? 'checked' : ''} data-id="${itemId}" onchange="App.togglePacking('${itemId}')">
              <span class="item-name">${item.item}</span>
              ${item.note ? `<span class="item-note">${item.note}</span>` : ''}
            </label>
            <button class="item-delete" onclick="App.hidePackingItem('${key}', ${idx})">✕</button>
          </li>
        `;
      });

      // 該類別的自訂項目
      customItemsInCategory.forEach(item => {
        const itemId = `custom-${item.id}`;
        const checked = saved[itemId] || false;
        totalItems++;
        if (checked) checkedItems++;

        html += `
          <li class="packing-item ${checked ? 'checked' : ''}">
            <label>
              <input type="checkbox" ${checked ? 'checked' : ''} data-id="${itemId}" onchange="App.togglePacking('${itemId}')">
              <span class="item-name">${item.item}</span>
              ${item.note ? `<span class="item-note">${item.note}</span>` : ''}
            </label>
            <button class="item-edit" onclick="App.showEditPackingModal(${item.id})">✏️</button>
            <button class="item-delete" onclick="App.removeCustomPackingItem(${item.id})">✕</button>
          </li>
        `;
      });

      html += '</ul></div>';
    }

    // 新增項目按鈕
    html += `
      <div class="packing-add">
        <button class="btn btn-full" onclick="App.showAddPackingModal()">
          ➕ 新增打包項目
        </button>
      </div>
    `;

    // 進度條
    const progress = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

    html = `
      <div class="packing-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        <span class="progress-text">${checkedItems}/${totalItems} 已打包 (${progress}%)</span>
      </div>
    ` + html;

    listEl.innerHTML = html;
  },

  togglePacking(itemId) {
    const STORAGE_KEY = 'honeymoon_packing';
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    saved[itemId] = !saved[itemId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    this.initPackingPage();
  },

  hidePackingItem(category, index) {
    if (confirm('確定要隱藏此項目嗎？')) {
      Editor.hideOriginalPackingItem(category, index);
      this.initPackingPage();
    }
  },

  removeCustomPackingItem(itemId) {
    if (confirm('確定要刪除此項目嗎？')) {
      Editor.removePackingItem(itemId);
      this.initPackingPage();
    }
  },

  showAddPackingModal() {
    const categories = ['documents', 'electronics', 'clothing', 'toiletries', 'misc'];
    const categoryNames = {
      documents: '📄 證件文件',
      electronics: '🔌 電子用品',
      clothing: '👕 衣物',
      toiletries: '🧴 盥洗用品',
      misc: '📦 其他'
    };

    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
      <div class="edit-modal-content">
        <h3>➕ 新增打包項目</h3>
        <div class="form-group">
          <label>類別</label>
          <select id="packing-category">
            ${categories.map(c => `<option value="${c}">${categoryNames[c]}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>項目名稱</label>
          <input type="text" id="packing-item" placeholder="例：護唇膏">
        </div>
        <div class="form-group">
          <label>備註（選填）</label>
          <input type="text" id="packing-note" placeholder="例：冬天必備">
        </div>
        <div class="edit-modal-buttons">
          <button class="btn btn-outline" onclick="this.closest('.edit-modal').remove()">取消</button>
          <button class="btn" onclick="App.addPackingItem()">新增</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  },

  addPackingItem() {
    const category = document.getElementById('packing-category').value;
    const item = document.getElementById('packing-item').value.trim();
    const note = document.getElementById('packing-note').value.trim();

    if (!item) {
      alert('請輸入項目名稱');
      return;
    }

    Editor.addPackingItem(category, item, note);
    document.querySelector('.edit-modal').remove();
    this.initPackingPage();
    Share.showToast('✅ 已新增項目');
  },

  // 編輯打包項目彈窗
  showEditPackingModal(itemId) {
    const customData = Editor.getCustomPacking();
    const item = customData.items.find(i => i.id === itemId);
    if (!item) return;

    const categories = ['documents', 'electronics', 'clothing', 'toiletries', 'misc'];
    const categoryNames = {
      documents: '📄 證件文件',
      electronics: '🔌 電子用品',
      clothing: '👕 衣物',
      toiletries: '🧴 盥洗用品',
      misc: '📦 其他'
    };

    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
      <div class="edit-modal-content">
        <h3>✏️ 編輯打包項目</h3>
        <div class="form-group">
          <label>類別</label>
          <select id="edit-packing-category">
            ${categories.map(c => `<option value="${c}" ${c === item.category ? 'selected' : ''}>${categoryNames[c]}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>項目名稱</label>
          <input type="text" id="edit-packing-item" value="">
        </div>
        <div class="form-group">
          <label>備註（選填）</label>
          <input type="text" id="edit-packing-note" value="">
        </div>
        <div class="edit-modal-buttons">
          <button class="btn btn-outline" onclick="this.closest('.edit-modal').remove()">取消</button>
          <button class="btn" onclick="App.updatePackingItem(${itemId})">💾 儲存</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('edit-packing-item').value = item.item;
    document.getElementById('edit-packing-note').value = item.note || '';
  },

  // 更新打包項目
  updatePackingItem(itemId) {
    const category = document.getElementById('edit-packing-category').value;
    const item = document.getElementById('edit-packing-item').value.trim();
    const note = document.getElementById('edit-packing-note').value.trim();

    if (!item) {
      alert('請輸入項目名稱');
      return;
    }

    Editor.updatePackingItem(itemId, category, item, note);
    document.querySelector('.edit-modal').remove();
    this.initPackingPage();
    Share.showToast('✅ 已更新項目');
  },

  // 旅遊須知頁面（可編輯版 + 可拖曳排序）
  initTipsPage() {
    const customTips = Editor.getCustomTips();
    const cardOrder = Editor.getCardOrder();

    // 根據順序重新排列卡片
    const container = document.querySelector('.container');
    if (container) {
      const cards = {
        'lounges': document.getElementById('tips-lounges'),
        'dining': document.getElementById('tips-dining'),
        'apps': document.getElementById('tips-apps'),
        'tickets': document.getElementById('tips-tickets'),
        'important-tickets': document.getElementById('tips-important-tickets'),
        'notes': document.getElementById('tips-notes')
      };

      // 按順序重新插入卡片
      const pageHeader = container.querySelector('.page-header');
      cardOrder.forEach(cardId => {
        if (cards[cardId]) {
          cards[cardId].classList.add('draggable-card');
          cards[cardId].setAttribute('data-card-id', cardId);
          container.appendChild(cards[cardId]);
        }
      });

      // 初始化拖曳功能
      this.initDragAndDrop();
    }

    // 貴賓室
    const loungesEl = document.getElementById('tips-lounges');
    if (loungesEl) {
      const hiddenLounges = this.getHiddenItems('lounges');
      let html = `
        <div class="card-header-row">
          <span class="drag-handle" title="按住拖曳可調整順序">⋮⋮</span>
          <h3 style="flex:1;">✈️ JCB貴賓室</h3>
          <div class="card-header-btns">
            <button class="tips-edit-btn" onclick="App.toggleEditMode('lounges', this)">編輯</button>
            <button class="add-btn" onclick="App.showAddTipModal('lounges')">+ 新增</button>
          </div>
        </div>
        <ul class="tips-list" id="tips-list-lounges">
      `;
      TRIP_DATA.tips.lounges.forEach((l, idx) => {
        if (hiddenLounges.includes(`original-${idx}`)) return;
        html += `<li class="tips-item" data-item-id="original-${idx}">
          <div class="tips-item-content"><strong>${l.name}</strong><br><span class="tips-sub">${l.location} - ${l.airport}</span></div>
          <button class="item-delete-small" onclick="App.hideOriginalItem('lounges', 'original-${idx}')">✕</button>
        </li>`;
      });
      (customTips.lounges || []).forEach(l => {
        html += `<li class="tips-item" data-item-id="custom-${l.id}">
          <div class="tips-item-content"><strong>${l.name}</strong><br><span class="tips-sub">${l.location} - ${l.airport}</span></div>
          <button class="item-delete-small" onclick="App.removeCustomTip('lounges', ${l.id})">✕</button>
        </li>`;
      });
      html += '</ul>';
      loungesEl.innerHTML = html;
    }

    // 義大利餐廳規則
    const diningEl = document.getElementById('tips-dining');
    if (diningEl) {
      const hiddenDining = this.getHiddenItems('dining');
      let html = `
        <div class="card-header-row">
          <span class="drag-handle" title="按住拖曳可調整順序">⋮⋮</span>
          <h3 style="flex:1;">🍝 義大利餐廳收費</h3>
          <div class="card-header-btns">
            <button class="tips-edit-btn" onclick="App.toggleEditMode('dining', this)">編輯</button>
            <button class="add-btn" onclick="App.showAddTipModal('dining')">+ 新增</button>
          </div>
        </div>
        <ul class="tips-list" id="tips-list-dining">
      `;
      TRIP_DATA.tips.italyDining.forEach((r, idx) => {
        if (hiddenDining.includes(`original-${idx}`)) return;
        html += `<li class="tips-item" data-item-id="original-${idx}">
          <div class="tips-item-content"><strong>${r.rule}</strong><br><span class="tips-sub">${r.description}</span></div>
          <button class="item-delete-small" onclick="App.hideOriginalItem('dining', 'original-${idx}')">✕</button>
        </li>`;
      });
      (customTips.dining || []).forEach(r => {
        html += `<li class="tips-item" data-item-id="custom-${r.id}">
          <div class="tips-item-content"><strong>${r.rule}</strong><br><span class="tips-sub">${r.description}</span></div>
          <button class="item-delete-small" onclick="App.removeCustomTip('dining', ${r.id})">✕</button>
        </li>`;
      });
      html += '</ul>';
      diningEl.innerHTML = html;
    }

    // 推薦App
    const appsEl = document.getElementById('tips-apps');
    if (appsEl) {
      const hiddenApps = this.getHiddenItems('apps');
      let html = `
        <div class="card-header-row">
          <span class="drag-handle" title="按住拖曳可調整順序">⋮⋮</span>
          <h3 style="flex:1;">📱 推薦App</h3>
          <div class="card-header-btns">
            <button class="tips-edit-btn" onclick="App.toggleEditMode('apps', this)">編輯</button>
            <button class="add-btn" onclick="App.showAddTipModal('apps')">+ 新增</button>
          </div>
        </div>
        <ul class="tips-list" id="tips-list-apps">
      `;
      TRIP_DATA.tips.apps.forEach((a, idx) => {
        if (hiddenApps.includes(`original-${idx}`)) return;
        html += `<li class="tips-item" data-item-id="original-${idx}">
          <div class="tips-item-content"><strong>${a.name}</strong><span class="tips-dash"> - </span><span class="tips-sub">${a.purpose}</span></div>
          <button class="item-delete-small" onclick="App.hideOriginalItem('apps', 'original-${idx}')">✕</button>
        </li>`;
      });
      (customTips.apps || []).forEach(a => {
        html += `<li class="tips-item" data-item-id="custom-${a.id}">
          <div class="tips-item-content"><strong>${a.name}</strong><span class="tips-dash"> - </span><span class="tips-sub">${a.purpose}</span></div>
          <button class="item-delete-small" onclick="App.removeCustomTip('apps', ${a.id})">✕</button>
        </li>`;
      });
      html += '</ul>';
      appsEl.innerHTML = html;
    }

    // 預訂項目
    const ticketsEl = document.getElementById('tips-tickets');
    if (ticketsEl) {
      const hiddenTickets = this.getHiddenItems('tickets');
      let html = `
        <div class="card-header-row">
          <span class="drag-handle" title="按住拖曳可調整順序">⋮⋮</span>
          <h3 style="flex:1;">🎫 預訂項目</h3>
          <div class="card-header-btns">
            <button class="tips-edit-btn" onclick="App.toggleEditMode('tickets', this)">編輯</button>
            <button class="add-btn" onclick="App.showAddTipModal('tickets')">+ 新增</button>
          </div>
        </div>
        <ul class="tips-list" id="tips-list-tickets">
      `;
      TRIP_DATA.tips.tickets.forEach((t, idx) => {
        if (hiddenTickets.includes(`original-${idx}`)) return;
        html += `<li class="tips-item" data-item-id="original-${idx}">
          <div class="tips-item-content"><strong>${t.item}</strong><span class="tips-dash"> - </span><span class="tips-sub">${t.platform}${t.note ? ` (${t.note})` : ''}</span></div>
          <button class="item-delete-small" onclick="App.hideOriginalItem('tickets', 'original-${idx}')">✕</button>
        </li>`;
      });
      (customTips.tickets || []).forEach(t => {
        html += `<li class="tips-item" data-item-id="custom-${t.id}">
          <div class="tips-item-content"><strong>${t.item}</strong><span class="tips-dash"> - </span><span class="tips-sub">${t.platform}${t.note ? ` (${t.note})` : ''}</span></div>
          <button class="item-delete-small" onclick="App.removeCustomTip('tickets', ${t.id})">✕</button>
        </li>`;
      });
      html += '</ul>';
      ticketsEl.innerHTML = html;
    }

    // 重要票券（仿伴手禮設計，按類型分類）
    const importantTicketsEl = document.getElementById('tips-important-tickets');
    if (importantTicketsEl) {
      this.renderImportantTickets(importantTicketsEl);
    }

    // 自訂筆記
    const notesEl = document.getElementById('tips-notes');
    if (notesEl) {
      const noteCount = customTips.notes ? customTips.notes.length : 0;
      let html = `
        <div class="card-header-row">
          <span class="drag-handle" title="按住拖曳可調整順序">⋮⋮</span>
          <h3 style="flex:1;">📝 我的筆記 ${noteCount > 0 ? `<span class="note-count">(${noteCount})</span>` : ''}</h3>
          <div class="card-header-btns">
            <button class="tips-edit-btn" onclick="App.toggleEditMode('notes', this)">編輯</button>
            <button class="add-btn" onclick="App.showAddTipModal('notes')">+ 新增</button>
          </div>
        </div>
        ${noteCount >= 3 ? `
        <div class="note-search-bar">
          <input type="text" id="note-search-input" placeholder="🔍 搜尋筆記..." oninput="App.filterNotes()" value="${this.noteSearchQuery || ''}">
          ${this.noteSearchQuery ? '<button class="note-search-clear" onclick="App.clearNoteSearch()">✕</button>' : ''}
        </div>
        ` : ''}
      `;

      if (customTips.notes && customTips.notes.length > 0) {
        // 篩選筆記
        const query = (this.noteSearchQuery || '').toLowerCase();
        const filteredNotes = query
          ? customTips.notes.filter(n =>
              (n.title || '').toLowerCase().includes(query) ||
              (n.content || '').toLowerCase().includes(query)
            )
          : customTips.notes;

        if (filteredNotes.length > 0) {
          html += '<ul class="tips-list" id="tips-list-notes">';
          filteredNotes.forEach(n => {
            // 處理換行顯示
            let displayContent = (n.content || '').replace(/\n/g, '<br>');
            let displayTitle = n.title || '';

            // 高亮搜尋關鍵字
            if (query) {
              const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
              displayContent = displayContent.replace(regex, '<mark>$1</mark>');
              displayTitle = displayTitle.replace(regex, '<mark>$1</mark>');
            }

            // 格式化建立時間
            const createdDate = n.createdAt ? new Date(n.createdAt).toLocaleDateString('zh-TW', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
            html += `<li class="tips-item note-item" data-item-id="custom-${n.id}">
              <div class="tips-item-content">
                ${displayTitle ? `<div class="note-title">${displayTitle}</div>` : ''}
                <div class="note-content">${displayContent}</div>
                ${createdDate ? `<div class="note-time">${createdDate}</div>` : ''}
              </div>
              <div class="note-actions">
                <button class="item-edit-small" onclick="App.showEditCustomNote(${n.id})" title="編輯">✏️</button>
                <button class="item-delete-small" onclick="App.removeCustomTip('notes', ${n.id})">✕</button>
              </div>
            </li>`;
          });
          html += '</ul>';
        } else {
          html += `<p class="tips-empty">找不到符合「${query}」的筆記</p>`;
        }
      } else {
        html += '<p class="tips-empty">還沒有筆記，點擊「+ 新增」記錄重要事項</p>';
      }
      notesEl.innerHTML = html;
    }
  },

  // 筆記搜尋狀態
  noteSearchQuery: '',

  // 搜尋筆記
  filterNotes() {
    const input = document.getElementById('note-search-input');
    this.noteSearchQuery = input ? input.value.trim() : '';
    this.renderNotesCard();
  },

  // 清除搜尋
  clearNoteSearch() {
    this.noteSearchQuery = '';
    this.renderNotesCard();
  },

  // 單獨渲染筆記卡片（不重新渲染整個頁面）
  renderNotesCard() {
    const customTips = Editor.getCustomTips();
    const notesEl = document.getElementById('tips-notes');
    if (!notesEl) return;

    const noteCount = customTips.notes ? customTips.notes.length : 0;
    let html = `
      <div class="card-header-row">
        <span class="drag-handle" title="按住拖曳可調整順序">⋮⋮</span>
        <h3 style="flex:1;">📝 我的筆記 ${noteCount > 0 ? `<span class="note-count">(${noteCount})</span>` : ''}</h3>
        <div class="card-header-btns">
          <button class="tips-edit-btn" onclick="App.toggleEditMode('notes', this)">編輯</button>
          <button class="add-btn" onclick="App.showAddTipModal('notes')">+ 新增</button>
        </div>
      </div>
      ${noteCount >= 3 ? `
      <div class="note-search-bar">
        <input type="text" id="note-search-input" placeholder="🔍 搜尋筆記..." oninput="App.filterNotes()" value="${this.noteSearchQuery || ''}">
        ${this.noteSearchQuery ? '<button class="note-search-clear" onclick="App.clearNoteSearch()">✕</button>' : ''}
      </div>
      ` : ''}
    `;

    if (customTips.notes && customTips.notes.length > 0) {
      const query = (this.noteSearchQuery || '').toLowerCase();
      const filteredNotes = query
        ? customTips.notes.filter(n =>
            (n.title || '').toLowerCase().includes(query) ||
            (n.content || '').toLowerCase().includes(query)
          )
        : customTips.notes;

      if (filteredNotes.length > 0) {
        html += '<ul class="tips-list" id="tips-list-notes">';
        filteredNotes.forEach(n => {
          let displayContent = (n.content || '').replace(/\n/g, '<br>');
          let displayTitle = n.title || '';

          if (query) {
            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            displayContent = displayContent.replace(regex, '<mark>$1</mark>');
            displayTitle = displayTitle.replace(regex, '<mark>$1</mark>');
          }

          const createdDate = n.createdAt ? new Date(n.createdAt).toLocaleDateString('zh-TW', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
          html += `<li class="tips-item note-item" data-item-id="custom-${n.id}">
            <div class="tips-item-content">
              ${displayTitle ? `<div class="note-title">${displayTitle}</div>` : ''}
              <div class="note-content">${displayContent}</div>
              ${createdDate ? `<div class="note-time">${createdDate}</div>` : ''}
            </div>
            <div class="note-actions">
              <button class="item-edit-small" onclick="App.showEditCustomNote(${n.id})" title="編輯">✏️</button>
              <button class="item-delete-small" onclick="App.removeCustomTip('notes', ${n.id})">✕</button>
            </div>
          </li>`;
        });
        html += '</ul>';
      } else {
        html += `<p class="tips-empty">找不到符合「${query}」的筆記</p>`;
      }
    } else {
      html += '<p class="tips-empty">還沒有筆記，點擊「+ 新增」記錄重要事項</p>';
    }
    notesEl.innerHTML = html;

    // 保持搜尋框焦點
    if (this.noteSearchQuery) {
      const input = document.getElementById('note-search-input');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }
  },

  // 票券頁面狀態
  ticketViewMode: 'date',
  ticketSearchQuery: '',

  // 重要票券獨立頁面
  initTicketsPage() {
    // 讀取上次的檢視模式
    this.ticketViewMode = localStorage.getItem('ticket_view_mode') || 'date';
    this.ticketSearchQuery = '';

    // 設定 tab 狀態
    document.querySelectorAll('.view-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === this.ticketViewMode);
    });

    // 渲染日期快捷列
    this.renderTicketDateShortcuts();

    // 渲染票券列表
    this.renderTicketsList();
  },

  // 刷新票券相關頁面（判斷當前頁面）
  refreshTicketsDisplay() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    if (page === 'tickets.html') {
      this.renderTicketsList();
    } else if (page === 'tips.html') {
      this.initTipsPage();
    } else if (page.startsWith('day-')) {
      // 刷新 Day 頁面的票券區塊
      this.renderDayTickets();
    }
  },

  // 切換檢視模式
  switchTicketView(mode) {
    this.ticketViewMode = mode;
    localStorage.setItem('ticket_view_mode', mode);

    // 更新 tab 狀態
    document.querySelectorAll('.view-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === mode);
    });

    // 顯示/隱藏日期快捷列
    const shortcuts = document.getElementById('ticket-date-shortcuts');
    if (shortcuts) {
      shortcuts.style.display = mode === 'date' ? 'flex' : 'none';
    }

    this.renderTicketsList();
  },

  // 搜尋票券
  filterTickets() {
    const input = document.getElementById('ticket-search-input');
    this.ticketSearchQuery = input ? input.value.trim().toLowerCase() : '';
    this.renderTicketsList();
  },

  // 渲染日期快捷列
  renderTicketDateShortcuts() {
    const container = document.getElementById('ticket-date-shortcuts');
    if (!container) return;

    const tickets = Editor.getTickets();
    const today = DateUtils.getTodayStr();
    const currentDay = DateUtils.getCurrentDayNumber();

    // 收集所有有票券的日期
    const datesWithTickets = new Set();
    tickets.forEach(t => {
      if (t.date) datesWithTickets.add(t.date);
    });

    // 生成日期按鈕
    let html = '<button class="date-shortcut active" data-date="all" onclick="App.scrollToDate(\'all\')">全部</button>';

    TRIP_DATA.schedule.forEach(day => {
      const dateStr = day.date;
      const hasTickets = datesWithTickets.has(dateStr);
      const isToday = dateStr === today;
      const dayLabel = `D${day.day}`;
      const dateLabel = dateStr.substring(5).replace('-', '/');

      if (hasTickets || isToday) {
        html += `
          <button class="date-shortcut ${isToday ? 'today' : ''}" data-date="${dateStr}" onclick="App.scrollToDate('${dateStr}')">
            <span class="date-shortcut-day">${dayLabel}</span>
            <span class="date-shortcut-date">${dateLabel}</span>
          </button>
        `;
      }
    });

    container.innerHTML = html;
    container.style.display = this.ticketViewMode === 'date' ? 'flex' : 'none';
  },

  // 滾動到指定日期
  scrollToDate(date) {
    // 更新快捷按鈕狀態
    document.querySelectorAll('.date-shortcut').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.date === date);
    });

    if (date === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(`[data-group-date="${date}"]`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  // 渲染票券列表
  renderTicketsList() {
    const container = document.getElementById('tickets-list');
    if (!container) return;

    let tickets = Editor.getTickets();
    const types = Editor.TICKET_TYPES;
    const today = DateUtils.getTodayStr();

    // 搜尋過濾
    if (this.ticketSearchQuery) {
      tickets = tickets.filter(t =>
        t.name.toLowerCase().includes(this.ticketSearchQuery) ||
        (t.location && t.location.toLowerCase().includes(this.ticketSearchQuery)) ||
        (t.note && t.note.toLowerCase().includes(this.ticketSearchQuery))
      );
    }

    if (tickets.length === 0) {
      container.innerHTML = `
        <div class="ticket-empty-state">
          <div class="empty-icon">🎫</div>
          <p>${this.ticketSearchQuery ? '找不到符合的票券' : '尚無票券資料'}</p>
          ${!this.ticketSearchQuery ? '<button class="btn" onclick="App.showAddTicketModal()">新增票券</button>' : ''}
        </div>
      `;
      return;
    }

    let html = '';

    if (this.ticketViewMode === 'date') {
      html = this.renderTicketsByDate(tickets, types, today);
    } else if (this.ticketViewMode === 'type') {
      html = this.renderTicketsByType(tickets, types, today);
    } else if (this.ticketViewMode === 'city') {
      html = this.renderTicketsByCity(tickets, types, today);
    }

    container.innerHTML = html;
  },

  // 依日期渲染
  renderTicketsByDate(tickets, types, today) {
    // 按日期分組
    const grouped = {};
    const noDate = [];

    tickets.forEach(ticket => {
      if (ticket.date) {
        if (!grouped[ticket.date]) grouped[ticket.date] = [];
        grouped[ticket.date].push(ticket);
      } else {
        noDate.push(ticket);
      }
    });

    // 排序日期
    const sortedDates = Object.keys(grouped).sort();

    let html = '';

    sortedDates.forEach(date => {
      const dayTickets = grouped[date];
      const isToday = date === today;
      const dayInfo = TRIP_DATA.schedule.find(d => d.date === date);
      const dayLabel = dayInfo ? `Day ${dayInfo.day}` : '';
      const dateLabel = date.substring(5).replace('-', '/');
      const weekday = dayInfo ? dayInfo.weekday : '';

      html += `
        <div class="ticket-group" data-group-date="${date}">
          <div class="ticket-group-header ${isToday ? 'today' : ''}">
            <span class="ticket-group-icon">📅</span>
            <span class="ticket-group-title">${dayLabel} ${dateLabel} (${weekday})${isToday ? ' - 今天' : ''}</span>
            <span class="ticket-group-count">${dayTickets.length}</span>
          </div>
          ${dayTickets.map(t => this.renderTicketCard(t, types)).join('')}
        </div>
      `;
    });

    // 無日期的票券
    if (noDate.length > 0) {
      html += `
        <div class="ticket-group" data-group-date="none">
          <div class="ticket-group-header">
            <span class="ticket-group-icon">📋</span>
            <span class="ticket-group-title">未指定日期</span>
            <span class="ticket-group-count">${noDate.length}</span>
          </div>
          ${noDate.map(t => this.renderTicketCard(t, types)).join('')}
        </div>
      `;
    }

    return html;
  },

  // 依類型渲染
  renderTicketsByType(tickets, types, today) {
    const grouped = {};

    tickets.forEach(ticket => {
      const type = ticket.type || 'other';
      if (!grouped[type]) grouped[type] = [];
      grouped[type].push(ticket);
    });

    let html = '';

    Object.keys(types).forEach(typeKey => {
      const typeTickets = grouped[typeKey];
      if (!typeTickets || typeTickets.length === 0) return;

      // 按日期排序
      typeTickets.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date) - new Date(b.date);
      });

      const typeInfo = types[typeKey];

      html += `
        <div class="ticket-group">
          <div class="ticket-group-header">
            <span class="ticket-group-icon">${typeInfo.icon}</span>
            <span class="ticket-group-title">${typeInfo.label}</span>
            <span class="ticket-group-count">${typeTickets.length}</span>
          </div>
          ${typeTickets.map(t => this.renderTicketCard(t, types, today)).join('')}
        </div>
      `;
    });

    return html;
  },

  // 依城市渲染
  renderTicketsByCity(tickets, types, today) {
    const grouped = {};
    const noCity = [];

    tickets.forEach(ticket => {
      if (ticket.location) {
        if (!grouped[ticket.location]) grouped[ticket.location] = [];
        grouped[ticket.location].push(ticket);
      } else {
        noCity.push(ticket);
      }
    });

    // 按城市名稱排序
    const sortedCities = Object.keys(grouped).sort();

    let html = '';

    sortedCities.forEach(city => {
      const cityTickets = grouped[city];

      // 按日期排序
      cityTickets.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date) - new Date(b.date);
      });

      html += `
        <div class="ticket-group">
          <div class="ticket-group-header">
            <span class="ticket-group-icon">📍</span>
            <span class="ticket-group-title">${city}</span>
            <span class="ticket-group-count">${cityTickets.length}</span>
          </div>
          ${cityTickets.map(t => this.renderTicketCard(t, types, today)).join('')}
        </div>
      `;
    });

    // 無城市的票券
    if (noCity.length > 0) {
      html += `
        <div class="ticket-group">
          <div class="ticket-group-header">
            <span class="ticket-group-icon">📋</span>
            <span class="ticket-group-title">未指定城市</span>
            <span class="ticket-group-count">${noCity.length}</span>
          </div>
          ${noCity.map(t => this.renderTicketCard(t, types, today)).join('')}
        </div>
      `;
    }

    return html;
  },

  // 渲染單張票券卡片
  renderTicketCard(ticket, types, today) {
    const typeInfo = types[ticket.type] || types.other;
    const images = ticket.images || [];
    const hasImages = images.length > 0;
    const thumbSrc = hasImages ? images[0].data : null;
    const isUsed = ticket.used || false;
    const isToday = ticket.date === today;

    const dateLabel = ticket.date ? ticket.date.substring(5).replace('-', '/') : '';

    return `
      <div class="ticket-card ${isUsed ? 'used' : ''}" data-ticket-id="${ticket.id}">
        <div class="ticket-card-main" onclick="App.toggleTicketCard(${ticket.id})">
          <div class="ticket-card-thumb">
            ${thumbSrc ? `<img src="${thumbSrc}" alt="">` : typeInfo.icon}
          </div>
          <div class="ticket-card-info">
            <div class="ticket-card-name">${ticket.name}</div>
            <div class="ticket-card-meta">
              ${ticket.date ? `<span>📅 ${dateLabel}</span>` : ''}
              ${ticket.location ? `<span>📍 ${ticket.location}</span>` : ''}
            </div>
          </div>
          <div class="ticket-card-status">
            ${isUsed ? '<span class="ticket-used-badge">已使用</span>' : ''}
            <span class="ticket-card-arrow">›</span>
          </div>
        </div>
        <div class="ticket-card-details">
          ${ticket.note ? `<div class="ticket-detail-note">${ticket.note}</div>` : ''}
          ${hasImages ? `
            <div class="photo-gallery">
              ${images.map(img => `
                <div class="photo-item">
                  <img src="${img.data}" alt="票券截圖" onclick="Editor.viewPhoto('${img.data.replace(/'/g, "\\'")}'); event.stopPropagation();">
                </div>
              `).join('')}
              <div class="photo-add" onclick="App.uploadTicketImageFor(${ticket.id}); event.stopPropagation();">
                <span>➕</span>
                <span>新增</span>
              </div>
            </div>
          ` : ''}
          <div class="ticket-card-actions">
            <button class="btn btn-small ${isUsed ? 'btn-outline' : ''}" style="${isUsed ? '' : 'background:var(--success);color:white;'}" onclick="App.toggleTicketUsed(${ticket.id}); event.stopPropagation();">
              ${isUsed ? '標為未使用' : '✓ 已使用'}
            </button>
            <button class="btn btn-small btn-outline" onclick="App.editTicket(${ticket.id}); event.stopPropagation();">✏️ 編輯</button>
            <button class="btn btn-small btn-outline" onclick="App.uploadTicketImageFor(${ticket.id}); event.stopPropagation();">📷</button>
          </div>
        </div>
      </div>
    `;
  },

  // 展開/收合票券卡片
  toggleTicketCard(ticketId) {
    const card = document.querySelector(`.ticket-card[data-ticket-id="${ticketId}"]`);
    if (card) {
      card.classList.toggle('expanded');
    }
  },

  // 標記票券已使用/未使用
  toggleTicketUsed(ticketId) {
    const tickets = Editor.getTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      ticket.used = !ticket.used;
      Editor.saveTickets(tickets);
      this.renderTicketsList();
    }
  },

  // 取得指定日期的票券
  getTicketsByDate(dateStr) {
    return Editor.getTickets().filter(t => t.date === dateStr);
  },

  // 渲染 Day 頁面的票券區塊
  renderDayTickets() {
    const container = document.getElementById('day-tickets');
    if (!container) return;

    const page = window.location.pathname.split('/').pop();
    const dayNum = parseInt(page.replace('day-', '').replace('.html', ''));
    const dayInfo = TRIP_DATA.schedule.find(d => d.day === dayNum);

    if (!dayInfo) return;

    const tickets = this.getTicketsByDate(dayInfo.date);
    const types = Editor.TICKET_TYPES;

    if (tickets.length === 0) {
      container.innerHTML = `
        <h3>🎫 今日票券</h3>
        <div class="photo-empty">
          <p>📋 今日無票券</p>
          <button class="btn btn-small" onclick="window.location.href='tickets.html'">
            ➕ 新增票券
          </button>
        </div>
      `;
      return;
    }

    let html = `<h3>🎫 今日票券</h3>`;

    tickets.forEach(ticket => {
      const typeInfo = types[ticket.type] || types.other;
      const images = ticket.images || [];
      const hasImages = images.length > 0;

      html += `
        <div class="day-ticket-item" onclick="App.showTicketQuickView(${ticket.id})">
          <div class="day-ticket-header">
            <div class="day-ticket-icon">${typeInfo.icon}</div>
            <div class="day-ticket-info">
              <div class="day-ticket-name">${ticket.name}</div>
              ${ticket.location ? `<div class="day-ticket-meta">📍 ${ticket.location}</div>` : ''}
            </div>
          </div>
          ${hasImages ? `
            <div class="day-ticket-gallery" onclick="event.stopPropagation();">
              ${images.map(img => `
                <div class="photo-item">
                  <img src="${img.data}" alt="票券截圖" onclick="Editor.viewPhoto('${img.data.replace(/'/g, "\\'")}')">
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `;
    });

    html += `
      <button class="btn btn-small btn-outline" style="width:100%;margin-top:12px;" onclick="window.location.href='tickets.html'">
        📋 查看所有票券
      </button>
    `;

    container.innerHTML = html;
  },

  // 票券快速檢視
  showTicketQuickView(ticketId) {
    const tickets = Editor.getTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const types = Editor.TICKET_TYPES;
    const typeInfo = types[ticket.type] || types.other;
    const images = ticket.images || [];
    const hasImages = images.length > 0;

    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

    modal.innerHTML = `
      <div class="edit-modal-content" style="max-height: 80vh; overflow-y: auto;">
        <h3>${typeInfo.icon} ${ticket.name}</h3>
        <div class="ticket-quickview-info">
          ${ticket.date ? `<p>📅 ${ticket.date.substring(5).replace('-', '/')}</p>` : ''}
          ${ticket.location ? `<p>📍 ${ticket.location}</p>` : ''}
          ${ticket.note ? `<p class="ticket-quickview-note">${ticket.note}</p>` : ''}
        </div>
        ${hasImages ? `
          <div class="photo-gallery ticket-quickview-gallery">
            ${images.map(img => `
              <div class="photo-item">
                <img src="${img.data}" alt="票券截圖" onclick="Editor.viewPhoto('${img.data.replace(/'/g, "\\'")}')">
              </div>
            `).join('')}
          </div>
        ` : ''}
        <div class="edit-modal-buttons">
          <button class="btn btn-outline" onclick="this.closest('.edit-modal').remove()">關閉</button>
          <button class="btn" onclick="this.closest('.edit-modal').remove(); window.location.href='tickets.html';">查看全部票券</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  },

  // 隱藏項目管理
  HIDDEN_ITEMS_KEY: 'honeymoon_hidden_tips',

  getHiddenItems(category) {
    const saved = localStorage.getItem(this.HIDDEN_ITEMS_KEY);
    const hidden = saved ? JSON.parse(saved) : {};
    return hidden[category] || [];
  },

  hideOriginalItem(category, itemId) {
    const saved = localStorage.getItem(this.HIDDEN_ITEMS_KEY);
    const hidden = saved ? JSON.parse(saved) : {};
    if (!hidden[category]) hidden[category] = [];
    if (!hidden[category].includes(itemId)) {
      hidden[category].push(itemId);
    }
    localStorage.setItem(this.HIDDEN_ITEMS_KEY, JSON.stringify(hidden));
    this.initTipsPage();
    Share.showToast('✅ 項目已隱藏');
  },

  // 切換編輯模式（顯示/隱藏刪除按鈕）
  toggleEditMode(category, btn) {
    const list = document.getElementById(`tips-list-${category}`);
    if (!list) return;

    const isEditing = list.classList.toggle('editing');
    btn.textContent = isEditing ? '完成' : '編輯';
    btn.classList.toggle('editing', isEditing);
  },

  showAddTipModal(category) {
    const titles = {
      lounges: '新增貴賓室',
      dining: '新增餐廳規則',
      apps: '新增推薦App',
      tickets: '新增預訂項目',
      notes: '新增筆記'
    };

    const fields = {
      lounges: `
        <div class="form-group"><label>貴賓室名稱</label><input type="text" id="tip-name" placeholder="例：Plaza Premium Lounge"></div>
        <div class="form-group"><label>位置</label><input type="text" id="tip-location" placeholder="例：Terminal 3"></div>
        <div class="form-group"><label>機場</label><input type="text" id="tip-airport" placeholder="例：樟宜機場"></div>
      `,
      dining: `
        <div class="form-group"><label>規則名稱</label><input type="text" id="tip-rule" placeholder="例：小費"></div>
        <div class="form-group"><label>說明</label><input type="text" id="tip-description" placeholder="例：通常不需要給小費"></div>
      `,
      apps: `
        <div class="form-group"><label>App名稱</label><input type="text" id="tip-name" placeholder="例：Google Maps"></div>
        <div class="form-group"><label>用途</label><input type="text" id="tip-purpose" placeholder="例：導航必備"></div>
      `,
      tickets: `
        <div class="form-group"><label>項目名稱</label><input type="text" id="tip-item" placeholder="例：烏菲茲美術館"></div>
        <div class="form-group"><label>購買平台</label><input type="text" id="tip-platform" placeholder="例：官網"></div>
        <div class="form-group"><label>備註</label><input type="text" id="tip-note" placeholder="例：需提前預約"></div>
      `,
      notes: `
        <div class="form-group"><label>標題（選填）</label><input type="text" id="tip-title" placeholder="例：重要提醒"></div>
        <div class="form-group"><label>筆記內容</label><textarea id="tip-content" rows="8" placeholder="記下重要的事...&#10;&#10;支持多行文字，可以直接貼上長文字" style="min-height:150px;resize:vertical;"></textarea></div>
      `
    };

    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
      <div class="edit-modal-content">
        <h3>➕ ${titles[category]}</h3>
        ${fields[category]}
        <div class="edit-modal-buttons">
          <button class="btn btn-outline" onclick="this.closest('.edit-modal').remove()">取消</button>
          <button class="btn" onclick="App.addCustomTip('${category}')">新增</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  },

  addCustomTip(category) {
    let content = {};

    switch (category) {
      case 'lounges':
        content = {
          name: document.getElementById('tip-name').value.trim(),
          location: document.getElementById('tip-location').value.trim(),
          airport: document.getElementById('tip-airport').value.trim()
        };
        if (!content.name) { alert('請輸入貴賓室名稱'); return; }
        break;
      case 'dining':
        content = {
          rule: document.getElementById('tip-rule').value.trim(),
          description: document.getElementById('tip-description').value.trim()
        };
        if (!content.rule) { alert('請輸入規則名稱'); return; }
        break;
      case 'apps':
        content = {
          name: document.getElementById('tip-name').value.trim(),
          purpose: document.getElementById('tip-purpose').value.trim()
        };
        if (!content.name) { alert('請輸入App名稱'); return; }
        break;
      case 'tickets':
        content = {
          item: document.getElementById('tip-item').value.trim(),
          platform: document.getElementById('tip-platform').value.trim(),
          note: document.getElementById('tip-note').value.trim()
        };
        if (!content.item) { alert('請輸入項目名稱'); return; }
        break;
      case 'notes':
        content = {
          title: document.getElementById('tip-title').value.trim(),
          content: document.getElementById('tip-content').value.trim()
        };
        if (!content.content) { alert('請輸入筆記內容'); return; }
        break;
    }

    Editor.addCustomTip(category, content);
    document.querySelector('.edit-modal').remove();
    this.initTipsPage();
    Share.showToast('✅ 已新增');
  },

  removeCustomTip(category, tipId) {
    if (confirm('確定要刪除嗎？')) {
      Editor.removeCustomTip(category, tipId);
      this.initTipsPage();
    }
  },

  // 編輯筆記彈窗
  showEditCustomNote(noteId) {
    const customTips = Editor.getCustomTips();
    const note = customTips.notes.find(n => n.id === noteId);
    if (!note) return;

    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
      <div class="edit-modal-content">
        <h3>✏️ 編輯筆記</h3>
        <div class="form-group"><label>標題（選填）</label><input type="text" id="edit-note-title" value="${note.title || ''}" placeholder="例：重要提醒"></div>
        <div class="form-group"><label>筆記內容</label><textarea id="edit-note-content" rows="8" placeholder="記下重要的事..." style="min-height:150px;resize:vertical;"></textarea></div>
        <div class="edit-modal-buttons">
          <button class="btn btn-outline" onclick="this.closest('.edit-modal').remove()">取消</button>
          <button class="btn" onclick="App.saveEditedNote(${noteId})">💾 儲存</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // 設定內容（需要在 append 後設定，避免 XSS）
    document.getElementById('edit-note-content').value = note.content || '';
    document.getElementById('edit-note-content').focus();
  },

  // 儲存編輯後的筆記
  saveEditedNote(noteId) {
    const title = document.getElementById('edit-note-title').value.trim();
    const content = document.getElementById('edit-note-content').value.trim();

    if (!content) {
      alert('請輸入筆記內容');
      return;
    }

    Editor.updateCustomTip('notes', noteId, { title, content });
    document.querySelector('.edit-modal').remove();
    this.initTipsPage();
    Share.showToast('✅ 筆記已更新');
  },

  // ==================
  // 拖曳排序功能
  // ==================

  initDragAndDrop() {
    const cards = document.querySelectorAll('.draggable-card');
    let draggedCard = null;
    let canDrag = false;

    cards.forEach(card => {
      card.setAttribute('draggable', 'true');

      // 只有從 drag-handle 開始拖曳才允許
      card.addEventListener('mousedown', (e) => {
        const handle = e.target.closest('.drag-handle');
        canDrag = !!handle;
      });

      // 桌面端拖曳
      card.addEventListener('dragstart', (e) => {
        // 防止從 input/textarea/button 開始拖曳
        const tag = e.target.tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea' || tag === 'button' || !canDrag) {
          e.preventDefault();
          return;
        }
        draggedCard = card;
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        cards.forEach(c => c.classList.remove('drag-over'));
        draggedCard = null;
        this.saveCardOrder();
      });

      card.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (draggedCard !== card) {
          card.classList.add('drag-over');
        }
      });

      card.addEventListener('dragleave', () => {
        card.classList.remove('drag-over');
      });

      card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('drag-over');

        if (draggedCard !== card) {
          const container = card.parentNode;
          const allCards = [...container.querySelectorAll('.draggable-card')];
          const draggedIdx = allCards.indexOf(draggedCard);
          const dropIdx = allCards.indexOf(card);

          if (draggedIdx < dropIdx) {
            card.after(draggedCard);
          } else {
            card.before(draggedCard);
          }
        }
      });

      // 手機端觸控拖曳
      const handle = card.querySelector('.drag-handle');
      if (handle) {
        this.initTouchDrag(handle, card, cards);
      }
    });
  },

  // 手機端觸控拖曳支援
  initTouchDrag(handle, card, allCards) {
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let placeholder = null;

    handle.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      isDragging = true;
      card.classList.add('dragging');

      // 建立佔位元素
      placeholder = document.createElement('div');
      placeholder.className = 'drag-placeholder';
      placeholder.style.height = card.offsetHeight + 'px';

      // 設定拖曳中卡片的樣式
      card.style.position = 'fixed';
      card.style.width = card.offsetWidth + 'px';
      card.style.left = card.getBoundingClientRect().left + 'px';
      card.style.top = card.getBoundingClientRect().top + 'px';
      card.style.zIndex = '1000';
      card.parentNode.insertBefore(placeholder, card);
    }, { passive: true });

    handle.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();

      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      card.style.transform = `translateY(${deltaY}px)`;

      // 找到要交換的目標卡片
      const cardsColl = [...card.parentNode.querySelectorAll('.draggable-card:not(.dragging)')];
      cardsColl.forEach(otherCard => {
        const rect = otherCard.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;

        if (currentY > midY && placeholder.nextElementSibling !== otherCard) {
          otherCard.after(placeholder);
        } else if (currentY < midY && placeholder.previousElementSibling !== otherCard) {
          otherCard.before(placeholder);
        }
      });
    }, { passive: false });

    handle.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;

      // 將卡片放到佔位元素的位置
      card.style.position = '';
      card.style.width = '';
      card.style.left = '';
      card.style.top = '';
      card.style.zIndex = '';
      card.style.transform = '';
      card.classList.remove('dragging');

      if (placeholder && placeholder.parentNode) {
        placeholder.parentNode.insertBefore(card, placeholder);
        placeholder.remove();
      }

      this.saveCardOrder();
    });
  },

  saveCardOrder() {
    const cards = document.querySelectorAll('.draggable-card');
    const order = [];
    cards.forEach(card => {
      const cardId = card.getAttribute('data-card-id');
      if (cardId) order.push(cardId);
    });
    Editor.saveCardOrder(order);
  },

  // ==================
  // 重要票券功能（仿伴手禮設計）
  // ==================

  renderImportantTickets(el) {
    const tickets = Editor.getTickets();
    const types = Editor.TICKET_TYPES;
    const totalCount = tickets.length;

    let html = `
      <div class="card-header-row">
        <span class="drag-handle" title="按住拖曳可調整順序">⋮⋮</span>
        <h3 style="flex:1;">🎫 重要票券</h3>
        <button class="add-btn" onclick="App.showAddTicketModal()">+ 新增</button>
      </div>
    `;

    if (totalCount > 0) {
      // 按類型分組
      const grouped = {};
      tickets.forEach(ticket => {
        const type = ticket.type || 'other';
        if (!grouped[type]) grouped[type] = [];
        grouped[type].push(ticket);
      });

      // 渲染各類型（可收合）
      html += `<div class="ticket-categories">`;
      Object.keys(types).forEach(typeKey => {
        const typeTickets = grouped[typeKey] || [];
        if (typeTickets.length === 0) return;

        // 按日期排序（從早到晚）
        typeTickets.sort((a, b) => {
          if (!a.date && !b.date) return 0;
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(a.date) - new Date(b.date);
        });

        const typeInfo = types[typeKey];
        const isExpanded = localStorage.getItem(`ticket_cat_${typeKey}`) !== 'collapsed';

        html += `
          <div class="ticket-category ${isExpanded ? 'expanded' : 'collapsed'}">
            <div class="ticket-category-header" onclick="App.toggleTicketCategory('${typeKey}', this)">
              <span class="category-icon">${typeInfo.icon}</span>
              <span class="category-title">${typeInfo.label}</span>
              <span class="category-count">${typeTickets.length} 張</span>
              <span class="category-arrow">${isExpanded ? '▼' : '▶'}</span>
            </div>
            <div class="ticket-category-content" style="${isExpanded ? '' : 'display:none'}">
        `;

        typeTickets.forEach((ticket, idx) => {
          html += this.renderTicketItem(ticket, typeInfo, idx + 1);
        });

        html += `
            </div>
          </div>
        `;
      });
      html += `</div>`;
    } else {
      html += `
        <div class="ticket-empty">
          <span class="ticket-empty-icon">🎫</span>
          <p>尚無票券資料</p>
          <p class="ticket-empty-hint">點擊「+ 新增」上傳登機證、門票、車票截圖</p>
        </div>
      `;
    }

    el.innerHTML = html;
  },

  // 格式化票券日期
  formatTicketDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },

  // 切換票券類型收合
  toggleTicketCategory(typeKey, header) {
    const category = header.closest('.ticket-category');
    const content = category.querySelector('.ticket-category-content');
    const arrow = header.querySelector('.category-arrow');
    const isExpanded = category.classList.toggle('expanded');
    category.classList.toggle('collapsed', !isExpanded);

    content.style.display = isExpanded ? '' : 'none';
    arrow.textContent = isExpanded ? '▼' : '▶';

    // 記住狀態
    localStorage.setItem(`ticket_cat_${typeKey}`, isExpanded ? 'expanded' : 'collapsed');
  },

  renderTicketItem(ticket, typeInfo, seqNum) {
    const images = ticket.images || [];
    const hasImages = images.length > 0;

    // 票券項目（含序號）
    let html = `
      <div class="ticket-item" data-ticket-id="${ticket.id}">
        <div class="ticket-item-header">
          <span class="ticket-name"><span class="ticket-seq">${seqNum}.</span> ${ticket.name}</span>
          <button class="btn btn-small btn-outline" onclick="App.editTicket(${ticket.id})">✏️ 編輯</button>
        </div>
        <div class="ticket-info-row">
          ${ticket.date ? `<span class="ticket-date">📅 ${this.formatTicketDate(ticket.date)}</span>` : ''}
          ${ticket.location ? `<span class="ticket-location">📍 ${ticket.location}</span>` : ''}
        </div>
        ${ticket.note ? `<p class="ticket-note">${ticket.note}</p>` : ''}
    `;

    // 圖片區域（比照今日照片風格）
    if (hasImages) {
      html += `<div class="photo-gallery ticket-photo-gallery">`;
      images.forEach(img => {
        html += `
          <div class="photo-item" data-id="${img.id}">
            <img src="${img.data}" alt="票券截圖" onclick="Editor.viewPhoto('${img.data.replace(/'/g, "\\'")}')">
            <div class="photo-actions">
              <button onclick="App.deleteTicketImage(${ticket.id}, ${img.id})" title="刪除">🗑️</button>
            </div>
          </div>
        `;
      });
      html += `
          <div class="photo-add" onclick="App.uploadTicketImageFor(${ticket.id})">
            <span>➕</span>
            <span>新增</span>
          </div>
        </div>
      `;
    } else {
      html += `
        <button class="btn btn-small btn-outline" style="width:100%;margin-top:8px;" onclick="App.uploadTicketImageFor(${ticket.id})">
          📷 上傳票券截圖
        </button>
      `;
    }

    html += `</div>`;
    return html;
  },

  // 精簡的票券地點選項
  TICKET_LOCATIONS: ['新加坡', '米蘭', '羅馬', '佛羅倫斯', '威尼斯', '瑞士'],

  showAddTicketModal() {
    const types = Editor.TICKET_TYPES;
    const cities = this.TICKET_LOCATIONS;

    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
      <div class="edit-modal-content ticket-modal">
        <h3>🎫 新增重要票券</h3>

        <!-- 票券類型 -->
        <div class="form-group">
          <label>票券類型 *</label>
          <div class="category-picker">
            ${Object.keys(types).map((key, idx) => `
              <button type="button" class="cat-btn ${idx === 0 ? 'selected' : ''}" data-type="${key}" onclick="App.selectTicketType(this, '${key}')">
                <span>${types[key].icon}</span>
                <span>${types[key].label}</span>
              </button>
            `).join('')}
          </div>
          <input type="hidden" id="ticket-type" value="admission">
        </div>

        <!-- 票券資訊 -->
        <div class="form-group">
          <label>票券名稱 *</label>
          <input type="text" id="ticket-name" placeholder="例：羅馬競技場門票">
        </div>

        <div class="form-row">
          <div class="form-group" style="flex:1;">
            <label>地點/城市</label>
            <select id="ticket-location">
              <option value="">選擇城市</option>
              ${cities.map(city => `<option value="${city}">${city}</option>`).join('')}
            </select>
          </div>
          <div class="form-group" style="flex:1;">
            <label>使用日期</label>
            <input type="date" id="ticket-date" min="2026-02-18" max="2026-03-05">
          </div>
        </div>

        <div class="form-group">
          <label>備註/注意事項</label>
          <textarea id="ticket-note" rows="2" placeholder="預約編號、取票方式、注意事項..."></textarea>
        </div>

        <!-- 票券截圖上傳（比照今日照片風格） -->
        <div class="form-group">
          <label>票券截圖（可選）</label>
          <div class="photo-gallery" id="ticket-photo-preview">
            <div class="photo-add" onclick="App.selectTicketImages()">
              <span>📷</span>
              <span>新增截圖</span>
            </div>
          </div>
        </div>

        <!-- 按鈕 -->
        <div class="edit-modal-buttons">
          <button class="btn btn-outline" onclick="this.closest('.edit-modal').remove()">取消</button>
          <button class="btn" onclick="App.saveTicketWithImages()">
            ➕ 新增票券
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // 初始化暫存圖片陣列
    window._ticketTempImages = [];
  },

  // 選擇票券圖片
  selectTicketImages() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    input.onchange = (e) => {
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          Editor.compressImage(event.target.result, 800, 0.8, (compressed) => {
            window._ticketTempImages.push(compressed);
            this.updateTicketPreview();
          });
        };
        reader.readAsDataURL(file);
      });
    };

    input.click();
  },

  // 更新圖片預覽（比照今日照片風格）
  updateTicketPreview() {
    const container = document.getElementById('ticket-photo-preview');
    if (!container) return;

    let html = '';
    if (window._ticketTempImages && window._ticketTempImages.length > 0) {
      window._ticketTempImages.forEach((img, idx) => {
        html += `
          <div class="photo-item">
            <img src="${img}" alt="預覽" onclick="Editor.viewPhoto('${img.replace(/'/g, "\\'")}')">
            <div class="photo-actions">
              <button onclick="App.removeTicketPreview(${idx})" title="移除">🗑️</button>
            </div>
          </div>
        `;
      });
    }
    html += `
      <div class="photo-add" onclick="App.selectTicketImages()">
        <span>📷</span>
        <span>新增截圖</span>
      </div>
    `;
    container.innerHTML = html;
  },

  // 移除預覽圖片
  removeTicketPreview(idx) {
    window._ticketTempImages.splice(idx, 1);
    this.updateTicketPreview();
  },

  // 儲存票券（含圖片）
  saveTicketWithImages() {
    const name = document.getElementById('ticket-name').value.trim();
    if (!name) {
      alert('請輸入票券名稱');
      return;
    }

    const ticketData = {
      name: name,
      type: document.getElementById('ticket-type').value,
      location: document.getElementById('ticket-location').value.trim(),
      date: document.getElementById('ticket-date').value.trim(),
      note: document.getElementById('ticket-note').value.trim()
    };

    // 新增票券
    const tickets = Editor.addTicket(ticketData);
    const newTicket = tickets[tickets.length - 1];

    // 新增圖片
    if (window._ticketTempImages && window._ticketTempImages.length > 0) {
      window._ticketTempImages.forEach(imgData => {
        Editor.addTicketImage(newTicket.id, imgData);
      });
    }

    // 清理
    window._ticketTempImages = [];
    document.querySelector('.edit-modal').remove();
    this.refreshTicketsDisplay();
    Share.showToast('✅ 票券已新增');
  },

  selectTicketType(btn, type) {
    // 使用與費用類別相同的 .cat-btn 選擇器
    btn.closest('.category-picker').querySelectorAll('.cat-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('ticket-type').value = type;
  },

  saveTicket(ticketId = null) {
    const name = document.getElementById('ticket-name').value.trim();
    if (!name) { alert('請輸入票券名稱'); return; }

    const ticketData = {
      name: name,
      type: document.getElementById('ticket-type').value,
      location: document.getElementById('ticket-location').value.trim(),
      date: document.getElementById('ticket-date').value.trim(),
      note: document.getElementById('ticket-note').value.trim()
    };

    if (ticketId) {
      Editor.updateTicket(ticketId, ticketData);
    } else {
      Editor.addTicket(ticketData);
    }

    document.querySelector('.edit-modal').remove();
    this.refreshTicketsDisplay();
    Share.showToast('✅ 票券已儲存');
  },

  editTicket(ticketId) {
    const tickets = Editor.getTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const types = Editor.TICKET_TYPES;
    const cities = this.TICKET_LOCATIONS;

    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
      <div class="edit-modal-content ticket-modal">
        <h3>✏️ 編輯票券</h3>

        <!-- 票券類型 -->
        <div class="form-group">
          <label>票券類型</label>
          <div class="category-picker">
            ${Object.keys(types).map(key => `
              <button type="button" class="cat-btn ${ticket.type === key ? 'selected' : ''}" data-type="${key}" onclick="App.selectTicketType(this, '${key}')">
                <span>${types[key].icon}</span>
                <span>${types[key].label}</span>
              </button>
            `).join('')}
          </div>
          <input type="hidden" id="ticket-type" value="${ticket.type || 'admission'}">
        </div>

        <!-- 票券資訊 -->
        <div class="form-group">
          <label>票券名稱 *</label>
          <input type="text" id="ticket-name" value="${ticket.name || ''}" placeholder="例：羅馬競技場門票">
        </div>

        <div class="form-row">
          <div class="form-group" style="flex:1;">
            <label>地點/城市</label>
            <select id="ticket-location">
              <option value="">選擇城市</option>
              ${cities.map(city => `<option value="${city}" ${ticket.location === city ? 'selected' : ''}>${city}</option>`).join('')}
            </select>
          </div>
          <div class="form-group" style="flex:1;">
            <label>使用日期</label>
            <input type="date" id="ticket-date" value="${ticket.date || ''}" min="2026-02-18" max="2026-03-05">
          </div>
        </div>

        <div class="form-group">
          <label>備註/注意事項</label>
          <textarea id="ticket-note" rows="2" placeholder="預約編號、取票方式、注意事項...">${ticket.note || ''}</textarea>
        </div>

        <!-- 按鈕 -->
        <div class="edit-modal-buttons">
          <button class="btn btn-outline" onclick="this.closest('.edit-modal').remove()">取消</button>
          <button class="btn" onclick="App.updateTicketInfo(${ticketId})">
            💾 儲存變更
          </button>
        </div>

        <!-- 刪除區域 -->
        <div class="ticket-delete-zone">
          <button class="ticket-delete-btn" onclick="App.confirmDeleteTicket(${ticketId})">
            🗑️ 刪除此票券
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  },

  // 更新票券資訊
  updateTicketInfo(ticketId) {
    const name = document.getElementById('ticket-name').value.trim();
    if (!name) {
      alert('請輸入票券名稱');
      return;
    }

    Editor.updateTicket(ticketId, {
      name: name,
      type: document.getElementById('ticket-type').value,
      location: document.getElementById('ticket-location').value.trim(),
      date: document.getElementById('ticket-date').value.trim(),
      note: document.getElementById('ticket-note').value.trim()
    });

    document.querySelector('.edit-modal').remove();
    this.refreshTicketsDisplay();
    Share.showToast('✅ 票券已更新');
  },

  deleteTicket(ticketId) {
    Editor.deleteTicket(ticketId);
    document.querySelector('.edit-modal')?.remove();
    this.refreshTicketsDisplay();
    Share.showToast('✅ 票券已刪除');
  },

  // 確認刪除票券（優化版對話框）
  confirmDeleteTicket(ticketId) {
    const tickets = Editor.getTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    // 建立確認對話框
    const confirmModal = document.createElement('div');
    confirmModal.className = 'confirm-modal-overlay';
    confirmModal.innerHTML = `
      <div class="confirm-modal">
        <div class="confirm-modal-icon">🗑️</div>
        <h3>確定要刪除嗎？</h3>
        <p class="confirm-modal-desc">將刪除「${ticket.name}」及其所有截圖</p>
        <div class="confirm-modal-buttons">
          <button class="btn btn-outline" onclick="this.closest('.confirm-modal-overlay').remove()">取消</button>
          <button class="btn btn-danger" onclick="App.deleteTicket(${ticketId}); this.closest('.confirm-modal-overlay').remove();">確定刪除</button>
        </div>
      </div>
    `;
    document.body.appendChild(confirmModal);
  },

  // 上傳票券圖片（新增到現有票券）
  uploadTicketImageFor(ticketId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    input.onchange = (e) => {
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          Editor.compressImage(event.target.result, 600, 0.7, (compressed) => {
            Editor.addTicketImage(ticketId, compressed);
            this.refreshTicketsDisplay();
            Share.showToast('✅ 圖片已新增');
          });
        };
        reader.readAsDataURL(file);
      });
    };

    input.click();
  },

  deleteTicketImage(ticketId, imageId) {
    Editor.deleteTicketImage(ticketId, imageId);
    this.refreshTicketsDisplay();
    Share.showToast('✅ 圖片已刪除');
  },

  // 任務頁面（可編輯版）
  initMissionsPage() {
    const currentDay = DateUtils.getCurrentDayNumber();
    const listEl = document.getElementById('missions-list');
    const progressEl = document.getElementById('missions-progress');

    // 總體進度（含自訂任務）
    if (progressEl) {
      const progress = MissionSystem.getTotalProgress();
      const customMissions = Editor.getCustomMissions();
      const customCompleted = customMissions.filter(m => MissionSystem.isMissionCompleted(m.id)).length;

      const totalMissions = progress.total + customMissions.length;
      const totalCompleted = progress.completed + customCompleted;
      const totalPercentage = totalMissions > 0 ? Math.round((totalCompleted / totalMissions) * 100) : 0;

      progressEl.innerHTML = `
        <div class="total-progress">
          <div class="progress-circle" style="--progress: ${totalPercentage}%">
            <span class="progress-percent">${totalPercentage}%</span>
          </div>
          <div class="progress-stats">
            <p>✅ 完成 ${totalCompleted}/${totalMissions} 個任務</p>
            <p>⭐ 累計 ${progress.points} 分</p>
          </div>
        </div>
      `;
    }

    // 每日任務列表
    if (listEl) {
      let html = '';
      for (let day = 1; day <= 16; day++) {
        const dayMissions = MissionSystem.getDayMissions(day);
        const customMissions = Editor.getCustomMissionsForDay(day);
        if (!dayMissions && customMissions.length === 0) continue;

        const allMissions = dayMissions ? [...dayMissions.missions, ...customMissions] : customMissions;
        const completedCount = allMissions.filter(m => MissionSystem.isMissionCompleted(m.id)).length;

        const isLocked = currentDay > 0 && day > currentDay;
        const isToday = day === currentDay;
        const isPast = currentDay > 0 && day < currentDay;

        html += `
          <div class="mission-day ${isToday ? 'today' : ''} ${isPast ? 'past' : ''} ${isLocked ? 'locked' : ''}">
            <div class="mission-day-header" onclick="App.toggleMissionDay(${day})">
              <div class="mission-day-title">
                <span class="day-badge">Day ${day}</span>
                <span class="mission-title">${dayMissions ? dayMissions.title : '自訂任務'}</span>
              </div>
              <div class="mission-day-progress">
                ${completedCount}/${allMissions.length}
              </div>
            </div>
            <div class="mission-day-content" id="mission-day-${day}" style="display: ${isToday ? 'block' : 'none'}">
              <ul class="mission-list">
        `;

        // 原始任務
        if (dayMissions) {
          dayMissions.missions.forEach(m => {
            const completed = MissionSystem.isMissionCompleted(m.id);
            html += `
              <li class="mission-item ${completed ? 'completed' : ''}">
                <span class="mission-icon">${m.icon}</span>
                <span class="mission-text">${m.text}</span>
                <span class="mission-points">+${m.points}</span>
                <button class="mission-toggle" onclick="App.toggleMission('${m.id}')" ${isLocked ? 'disabled' : ''}>
                  ${completed ? '✓' : '○'}
                </button>
              </li>
            `;
          });
        }

        // 自訂任務
        customMissions.forEach(m => {
          const completed = MissionSystem.isMissionCompleted(m.id);
          html += `
            <li class="mission-item custom-mission ${completed ? 'completed' : ''}">
              <span class="mission-icon">${m.icon}</span>
              <span class="mission-text">${m.text}</span>
              <span class="mission-points">+${m.points}</span>
              <button class="mission-toggle" onclick="App.toggleMission('${m.id}')">
                ${completed ? '✓' : '○'}
              </button>
              <button class="mission-delete" onclick="App.removeCustomMission('${m.id}')">✕</button>
            </li>
          `;
        });

        // 新增任務按鈕
        html += `
              </ul>
              <button class="btn btn-small btn-outline mission-add-btn" onclick="App.showAddMissionModal(${day})">
                ➕ 新增任務
              </button>
            </div>
          </div>
        `;
      }
      listEl.innerHTML = html;
    }

    // 成就
    const achievementsEl = document.getElementById('achievements-list');
    if (achievementsEl) {
      const achievements = MissionSystem.getAllAchievements();
      let html = '<h3>🏆 成就</h3><div class="achievements-grid">';
      achievements.forEach(a => {
        html += `
          <div class="achievement-card ${a.unlocked ? 'unlocked' : 'locked'}">
            <span class="achievement-icon">${a.icon}</span>
            <span class="achievement-title">${a.title}</span>
            <span class="achievement-desc">${a.description}</span>
          </div>
        `;
      });
      html += '</div>';
      achievementsEl.innerHTML = html;
    }
  },

  showAddMissionModal(dayNumber) {
    const icons = ['⭐', '💕', '📸', '🍽️', '🎭', '🛍️', '🚶', '🎵', '🌅', '🎁'];

    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
      <div class="edit-modal-content">
        <h3>➕ 新增 Day ${dayNumber} 任務</h3>
        <div class="form-group">
          <label>選擇圖示</label>
          <div class="icon-picker">
            ${icons.map(icon => `<button type="button" class="icon-btn" onclick="App.selectMissionIcon(this, '${icon}')">${icon}</button>`).join('')}
          </div>
          <input type="hidden" id="mission-icon" value="⭐">
        </div>
        <div class="form-group">
          <label>任務內容</label>
          <input type="text" id="mission-text" placeholder="例：在老橋上拍一張合照">
        </div>
        <div class="edit-modal-buttons">
          <button class="btn btn-outline" onclick="this.closest('.edit-modal').remove()">取消</button>
          <button class="btn" onclick="App.addCustomMission(${dayNumber})">新增</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // 預設選中第一個
    modal.querySelector('.icon-btn').classList.add('selected');
  },

  selectMissionIcon(btn, icon) {
    document.querySelectorAll('.icon-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('mission-icon').value = icon;
  },

  addCustomMission(dayNumber) {
    const icon = document.getElementById('mission-icon').value;
    const text = document.getElementById('mission-text').value.trim();

    if (!text) { alert('請輸入任務內容'); return; }

    Editor.addCustomMission(dayNumber, text, icon);
    document.querySelector('.edit-modal').remove();
    this.initMissionsPage();
    Share.showToast('✅ 已新增任務');
  },

  removeCustomMission(missionId) {
    if (confirm('確定要刪除此任務嗎？')) {
      Editor.removeCustomMission(missionId);
      // 同時從完成記錄中移除
      MissionSystem.uncompleteMission(missionId);
      this.initMissionsPage();
    }
  },

  toggleMissionDay(day) {
    const el = document.getElementById(`mission-day-${day}`);
    if (el) {
      el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }
  },

  toggleMission(missionId) {
    MissionSystem.toggleMission(missionId);
    // 重新渲染
    const page = window.location.pathname.split('/').pop() || 'index.html';
    if (page === 'missions.html') {
      this.initMissionsPage();
    } else if (page.startsWith('day-')) {
      const dayNum = parseInt(page.replace('day-', '').replace('.html', ''));
      this.initDayPage(dayNum);
    } else if (page === 'index.html' || page === '') {
      this.initHomePage();
    }
  },

  // 註冊 Service Worker
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('Service Worker registered'))
          .catch(err => console.log('Service Worker registration failed:', err));
      });
    }
  }
};

// 頁面載入後初始化
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});