// 編輯系統 - 允許使用者編輯文字和圖片
const Editor = {
  STORAGE_KEY: 'honeymoon_user_edits',
  PHOTOS_KEY: 'honeymoon_user_photos',
  NOTES_KEY: 'honeymoon_user_notes',
  COVER_KEY: 'honeymoon_cover_photo',
  CUSTOM_PACKING_KEY: 'honeymoon_custom_packing',
  CUSTOM_MISSIONS_KEY: 'honeymoon_custom_missions',
  CUSTOM_TIPS_KEY: 'honeymoon_custom_tips',
  CUSTOM_HOTELS_KEY: 'honeymoon_custom_hotels',
  DAY_REMINDERS_KEY: 'honeymoon_day_reminders',
  HOTEL_IMAGES_KEY: 'honeymoon_hotel_images',
  HOTEL_LINKS_KEY: 'honeymoon_hotel_links',
  TICKETS_KEY: 'honeymoon_important_tickets',

  // 初始化編輯模式
  init() {
    this.loadEdits();
  },

  // ==================
  // 基本編輯功能
  // ==================

  loadEdits() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  },

  saveEdits(edits) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(edits));
  },

  getEdit(key) {
    const edits = this.loadEdits();
    return edits[key] || null;
  },

  setEdit(key, value) {
    const edits = this.loadEdits();
    edits[key] = { value: value, updatedAt: new Date().toISOString() };
    this.saveEdits(edits);
    return edits[key];
  },

  removeEdit(key) {
    const edits = this.loadEdits();
    delete edits[key];
    this.saveEdits(edits);
  },

  // ==================
  // 封面照片
  // ==================

  getCoverPhoto() {
    return localStorage.getItem(this.COVER_KEY) || null;
  },

  setCoverPhoto(dataUrl) {
    localStorage.setItem(this.COVER_KEY, dataUrl);
  },

  removeCoverPhoto() {
    localStorage.removeItem(this.COVER_KEY);
  },

  // 上傳封面照片
  uploadCoverPhoto(callback) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.compressImage(event.target.result, 800, 0.8, (compressed) => {
            this.setCoverPhoto(compressed);
            if (callback) callback(compressed);
          });
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  },

  // ==================
  // 照片管理
  // ==================

  loadPhotos() {
    const saved = localStorage.getItem(this.PHOTOS_KEY);
    return saved ? JSON.parse(saved) : {};
  },

  savePhotos(photos) {
    localStorage.setItem(this.PHOTOS_KEY, JSON.stringify(photos));
  },

  addPhoto(dayNumber, locationId, photoData, caption = '') {
    const photos = this.loadPhotos();
    const key = `day${dayNumber}_${locationId}`;

    if (!photos[key]) photos[key] = [];

    photos[key].push({
      id: Date.now(),
      data: photoData,
      caption: caption,
      createdAt: new Date().toISOString()
    });

    this.savePhotos(photos);
    return photos[key];
  },

  getPhotos(dayNumber, locationId) {
    const photos = this.loadPhotos();
    const key = `day${dayNumber}_${locationId}`;
    return photos[key] || [];
  },

  getDayPhotos(dayNumber) {
    const photos = this.loadPhotos();
    const dayPhotos = [];

    for (const key in photos) {
      if (key.startsWith(`day${dayNumber}_`)) {
        photos[key].forEach(p => {
          dayPhotos.push({ ...p, locationId: key.replace(`day${dayNumber}_`, '') });
        });
      }
    }

    return dayPhotos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  },

  deletePhoto(dayNumber, locationId, photoId) {
    const photos = this.loadPhotos();
    const key = `day${dayNumber}_${locationId}`;

    if (photos[key]) {
      photos[key] = photos[key].filter(p => p.id !== photoId);
      if (photos[key].length === 0) delete photos[key];
      this.savePhotos(photos);
    }
  },

  updatePhotoCaption(dayNumber, locationId, photoId, caption) {
    const photos = this.loadPhotos();
    const key = `day${dayNumber}_${locationId}`;

    if (photos[key]) {
      const photo = photos[key].find(p => p.id === photoId);
      if (photo) {
        photo.caption = caption;
        this.savePhotos(photos);
      }
    }
  },

  // ==================
  // 筆記管理
  // ==================

  loadNotes() {
    const saved = localStorage.getItem(this.NOTES_KEY);
    return saved ? JSON.parse(saved) : {};
  },

  saveNotes(notes) {
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
  },

  getDayNote(dayNumber) {
    const notes = this.loadNotes();
    return notes[`day${dayNumber}`] || '';
  },

  setDayNote(dayNumber, note) {
    const notes = this.loadNotes();
    notes[`day${dayNumber}`] = note;
    this.saveNotes(notes);
  },

  // ==================
  // 每日小提醒
  // ==================

  loadDayReminders() {
    const saved = localStorage.getItem(this.DAY_REMINDERS_KEY);
    return saved ? JSON.parse(saved) : {};
  },

  saveDayReminders(reminders) {
    localStorage.setItem(this.DAY_REMINDERS_KEY, JSON.stringify(reminders));
  },

  getDayReminder(dayNumber) {
    const reminders = this.loadDayReminders();
    return reminders[`day${dayNumber}`] || '';
  },

  setDayReminder(dayNumber, reminder) {
    const reminders = this.loadDayReminders();
    reminders[`day${dayNumber}`] = reminder;
    this.saveDayReminders(reminders);
  },

  // ==================
  // 住宿圖片
  // ==================

  loadHotelImages() {
    const saved = localStorage.getItem(this.HOTEL_IMAGES_KEY);
    return saved ? JSON.parse(saved) : {};
  },

  saveHotelImages(images) {
    localStorage.setItem(this.HOTEL_IMAGES_KEY, JSON.stringify(images));
  },

  getHotelImages(hotelName) {
    const images = this.loadHotelImages();
    return images[hotelName] || [];
  },

  addHotelImage(hotelName, imageData) {
    const images = this.loadHotelImages();
    if (!images[hotelName]) images[hotelName] = [];
    images[hotelName].push({
      id: Date.now(),
      data: imageData,
      createdAt: new Date().toISOString()
    });
    this.saveHotelImages(images);
    return images[hotelName];
  },

  deleteHotelImage(hotelName, imageId) {
    const images = this.loadHotelImages();
    if (images[hotelName]) {
      images[hotelName] = images[hotelName].filter(img => img.id !== imageId);
      this.saveHotelImages(images);
    }
  },

  // ==================
  // 住宿連結
  // ==================

  loadHotelLinks() {
    const saved = localStorage.getItem(this.HOTEL_LINKS_KEY);
    return saved ? JSON.parse(saved) : {};
  },

  saveHotelLinks(links) {
    localStorage.setItem(this.HOTEL_LINKS_KEY, JSON.stringify(links));
  },

  getHotelLinks(hotelName) {
    const links = this.loadHotelLinks();
    return links[hotelName] || [];
  },

  addHotelLink(hotelName, linkData) {
    const links = this.loadHotelLinks();
    if (!links[hotelName]) links[hotelName] = [];
    links[hotelName].push({
      id: Date.now(),
      ...linkData,
      createdAt: new Date().toISOString()
    });
    this.saveHotelLinks(links);
    return links[hotelName];
  },

  deleteHotelLink(hotelName, linkId) {
    const links = this.loadHotelLinks();
    if (links[hotelName]) {
      links[hotelName] = links[hotelName].filter(l => l.id !== linkId);
      this.saveHotelLinks(links);
    }
  },

  // ==================
  // 自訂打包清單
  // ==================

  getCustomPacking() {
    const saved = localStorage.getItem(this.CUSTOM_PACKING_KEY);
    return saved ? JSON.parse(saved) : { items: [], removed: [] };
  },

  saveCustomPacking(data) {
    localStorage.setItem(this.CUSTOM_PACKING_KEY, JSON.stringify(data));
  },

  addPackingItem(category, item, note = '') {
    const data = this.getCustomPacking();
    data.items.push({
      id: Date.now(),
      category: category,
      item: item,
      note: note,
      checked: false
    });
    this.saveCustomPacking(data);
    return data;
  },

  removePackingItem(itemId) {
    const data = this.getCustomPacking();
    data.items = data.items.filter(i => i.id !== itemId);
    this.saveCustomPacking(data);
    return data;
  },

  hideOriginalPackingItem(category, index) {
    const data = this.getCustomPacking();
    const key = `${category}-${index}`;
    if (!data.removed.includes(key)) {
      data.removed.push(key);
    }
    this.saveCustomPacking(data);
    return data;
  },

  // ==================
  // 自訂靈感任務
  // ==================

  getCustomMissions() {
    const saved = localStorage.getItem(this.CUSTOM_MISSIONS_KEY);
    return saved ? JSON.parse(saved) : [];
  },

  saveCustomMissions(missions) {
    localStorage.setItem(this.CUSTOM_MISSIONS_KEY, JSON.stringify(missions));
  },

  addCustomMission(dayNumber, text, icon = '⭐') {
    const missions = this.getCustomMissions();
    missions.push({
      id: `custom_${Date.now()}`,
      day: dayNumber,
      text: text,
      icon: icon,
      points: 10,
      createdAt: new Date().toISOString()
    });
    this.saveCustomMissions(missions);
    return missions;
  },

  removeCustomMission(missionId) {
    let missions = this.getCustomMissions();
    missions = missions.filter(m => m.id !== missionId);
    this.saveCustomMissions(missions);
    return missions;
  },

  getCustomMissionsForDay(dayNumber) {
    return this.getCustomMissions().filter(m => m.day === dayNumber);
  },

  // ==================
  // 自訂旅遊須知
  // ==================

  getCustomTips() {
    const saved = localStorage.getItem(this.CUSTOM_TIPS_KEY);
    return saved ? JSON.parse(saved) : { lounges: [], dining: [], apps: [], tickets: [], notes: [] };
  },

  saveCustomTips(tips) {
    localStorage.setItem(this.CUSTOM_TIPS_KEY, JSON.stringify(tips));
  },

  addCustomTip(category, content) {
    const tips = this.getCustomTips();
    if (!tips[category]) tips[category] = [];
    tips[category].push({
      id: Date.now(),
      ...content,
      createdAt: new Date().toISOString()
    });
    this.saveCustomTips(tips);
    return tips;
  },

  removeCustomTip(category, tipId) {
    const tips = this.getCustomTips();
    if (tips[category]) {
      tips[category] = tips[category].filter(t => t.id !== tipId);
      this.saveCustomTips(tips);
    }
    return tips;
  },

  // ==================
  // 自訂住宿備註
  // ==================

  getCustomHotels() {
    const saved = localStorage.getItem(this.CUSTOM_HOTELS_KEY);
    return saved ? JSON.parse(saved) : { notes: {}, extras: [] };
  },

  saveCustomHotels(hotels) {
    localStorage.setItem(this.CUSTOM_HOTELS_KEY, JSON.stringify(hotels));
  },

  setHotelNote(hotelName, note) {
    const hotels = this.getCustomHotels();
    hotels.notes[hotelName] = note;
    this.saveCustomHotels(hotels);
  },

  getHotelNote(hotelName) {
    const hotels = this.getCustomHotels();
    return hotels.notes[hotelName] || '';
  },

  addExtraHotel(hotelData) {
    const hotels = this.getCustomHotels();
    hotels.extras.push({
      id: Date.now(),
      ...hotelData,
      createdAt: new Date().toISOString()
    });
    this.saveCustomHotels(hotels);
    return hotels;
  },

  removeExtraHotel(hotelId) {
    const hotels = this.getCustomHotels();
    hotels.extras = hotels.extras.filter(h => h.id !== hotelId);
    this.saveCustomHotels(hotels);
    return hotels;
  },

  // ==================
  // 重要票券（仿伴手禮設計）
  // ==================

  // 票券類型定義
  TICKET_TYPES: {
    admission: { icon: '🎫', label: '門票' },
    flight: { icon: '✈️', label: '機票' },
    train: { icon: '🚄', label: '火車票' },
    bus: { icon: '🚌', label: '巴士票' },
    boat: { icon: '🚢', label: '船票' },
    other: { icon: '📄', label: '其他' }
  },

  loadTickets() {
    const saved = localStorage.getItem(this.TICKETS_KEY);
    return saved ? JSON.parse(saved) : [];
  },

  saveTickets(tickets) {
    localStorage.setItem(this.TICKETS_KEY, JSON.stringify(tickets));
  },

  getTickets() {
    return this.loadTickets();
  },

  getTicketsByType(type) {
    return this.loadTickets().filter(t => t.type === type);
  },

  getTicketsByLocation(location) {
    return this.loadTickets().filter(t => t.location === location);
  },

  addTicket(ticketData) {
    const tickets = this.loadTickets();
    tickets.push({
      id: Date.now(),
      images: [],
      ...ticketData,
      createdAt: new Date().toISOString()
    });
    this.saveTickets(tickets);
    return tickets;
  },

  updateTicket(ticketId, ticketData) {
    const tickets = this.loadTickets();
    const idx = tickets.findIndex(t => t.id === ticketId);
    if (idx !== -1) {
      tickets[idx] = { ...tickets[idx], ...ticketData };
      this.saveTickets(tickets);
    }
    return tickets;
  },

  deleteTicket(ticketId) {
    let tickets = this.loadTickets();
    tickets = tickets.filter(t => t.id !== ticketId);
    this.saveTickets(tickets);
    return tickets;
  },

  // 票券圖片管理
  addTicketImage(ticketId, imageData) {
    const tickets = this.loadTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      if (!ticket.images) ticket.images = [];
      ticket.images.push({
        id: Date.now(),
        data: imageData,
        createdAt: new Date().toISOString()
      });
      this.saveTickets(tickets);
    }
    return tickets;
  },

  deleteTicketImage(ticketId, imageId) {
    const tickets = this.loadTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket && ticket.images) {
      ticket.images = ticket.images.filter(img => img.id !== imageId);
      this.saveTickets(tickets);
    }
    return tickets;
  },

  // ==================
  // 卡片順序管理
  // ==================
  CARD_ORDER_KEY: 'honeymoon_tips_card_order',

  getCardOrder() {
    const saved = localStorage.getItem(this.CARD_ORDER_KEY);
    return saved ? JSON.parse(saved) : ['lounges', 'dining', 'apps', 'tickets', 'important-tickets', 'notes'];
  },

  saveCardOrder(order) {
    localStorage.setItem(this.CARD_ORDER_KEY, JSON.stringify(order));
  },

  // ==================
  // UI 輔助函數
  // ==================

  compressImage(dataUrl, maxWidth, quality, callback) {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      callback(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = dataUrl;
  },

  openPhotoUpload(dayNumber, locationId, callback) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    input.onchange = (e) => {
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.compressImage(event.target.result, 800, 0.8, (compressed) => {
            this.addPhoto(dayNumber, locationId, compressed, '');
            if (callback) callback();
          });
        };
        reader.readAsDataURL(file);
      });
    };

    input.click();
  },

  renderPhotoGallery(dayNumber, locationId, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const photos = locationId
      ? this.getPhotos(dayNumber, locationId)
      : this.getDayPhotos(dayNumber);

    if (photos.length === 0) {
      container.innerHTML = `
        <div class="photo-empty">
          <p>📷 還沒有照片</p>
          <button class="btn btn-small" onclick="Editor.openPhotoUpload(${dayNumber}, '${locationId || 'general'}', () => Editor.renderPhotoGallery(${dayNumber}, '${locationId || 'general'}', '${containerId}'))">
            ➕ 新增照片
          </button>
        </div>
      `;
      return;
    }

    let html = '<div class="photo-gallery">';
    photos.forEach(photo => {
      html += `
        <div class="photo-item" data-id="${photo.id}">
          <img src="${photo.data}" alt="${photo.caption || '旅行照片'}" onclick="Editor.viewPhoto('${photo.data.replace(/'/g, "\\'")}')">
          ${photo.caption ? `<p class="photo-caption">${photo.caption}</p>` : ''}
          <div class="photo-actions">
            <button onclick="Editor.promptPhotoCaption(${dayNumber}, '${locationId}', ${photo.id}, '${containerId}')">✏️</button>
            <button onclick="Editor.deletePhoto(${dayNumber}, '${locationId}', ${photo.id}); Editor.renderPhotoGallery(${dayNumber}, '${locationId}', '${containerId}')">🗑️</button>
          </div>
        </div>
      `;
    });
    html += `
      <div class="photo-add" onclick="Editor.openPhotoUpload(${dayNumber}, '${locationId || 'general'}', () => Editor.renderPhotoGallery(${dayNumber}, '${locationId || 'general'}', '${containerId}'))">
        <span>➕</span>
        <span>新增</span>
      </div>
    </div>`;

    container.innerHTML = html;
  },

  promptPhotoCaption(dayNumber, locationId, photoId, containerId) {
    const photos = this.getPhotos(dayNumber, locationId);
    const photo = photos.find(p => p.id === photoId);
    const currentCaption = photo ? photo.caption : '';

    const caption = prompt('📝 輸入照片說明：', currentCaption);
    if (caption !== null) {
      this.updatePhotoCaption(dayNumber, locationId, photoId, caption);
      this.renderPhotoGallery(dayNumber, locationId, containerId);
    }
  },

  viewPhoto(dataUrl) {
    const viewer = document.createElement('div');
    viewer.className = 'photo-viewer';
    viewer.innerHTML = `
      <img src="${dataUrl}" alt="照片">
      <button class="close-btn" onclick="this.parentElement.remove()">✕</button>
    `;
    viewer.onclick = (e) => {
      if (e.target === viewer) viewer.remove();
    };
    document.body.appendChild(viewer);
  },

  // ==================
  // 匯出/匯入（GitHub Pages 同步）
  // ==================

  exportData() {
    const data = {
      edits: this.loadEdits(),
      photos: this.loadPhotos(),
      notes: this.loadNotes(),
      dayReminders: this.loadDayReminders(),
      customPacking: this.getCustomPacking(),
      customTips: this.getCustomTips(),
      customHotels: this.getCustomHotels(),
      hotelImages: this.loadHotelImages(),
      hotelLinks: this.loadHotelLinks(),
      tickets: this.loadTickets(),
      cardOrder: this.getCardOrder(),
      expenses: localStorage.getItem('honeymoon_expenses'),
      packing: localStorage.getItem('honeymoon_packing'),
      exportedAt: new Date().toISOString(),
      version: '3.2'
    };

    return JSON.stringify(data);
  },

  importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);

      if (data.edits) localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data.edits));
      if (data.photos) localStorage.setItem(this.PHOTOS_KEY, JSON.stringify(data.photos));
      if (data.notes) localStorage.setItem(this.NOTES_KEY, JSON.stringify(data.notes));
      if (data.dayReminders) localStorage.setItem(this.DAY_REMINDERS_KEY, JSON.stringify(data.dayReminders));
      if (data.customPacking) localStorage.setItem(this.CUSTOM_PACKING_KEY, JSON.stringify(data.customPacking));
      if (data.customTips) localStorage.setItem(this.CUSTOM_TIPS_KEY, JSON.stringify(data.customTips));
      if (data.customHotels) localStorage.setItem(this.CUSTOM_HOTELS_KEY, JSON.stringify(data.customHotels));
      if (data.hotelImages) localStorage.setItem(this.HOTEL_IMAGES_KEY, JSON.stringify(data.hotelImages));
      if (data.hotelLinks) localStorage.setItem(this.HOTEL_LINKS_KEY, JSON.stringify(data.hotelLinks));
      if (data.tickets) localStorage.setItem(this.TICKETS_KEY, JSON.stringify(data.tickets));
      if (data.cardOrder) localStorage.setItem(this.CARD_ORDER_KEY, JSON.stringify(data.cardOrder));
      if (data.expenses) localStorage.setItem('honeymoon_expenses', data.expenses);
      if (data.packing) localStorage.setItem('honeymoon_packing', data.packing);

      return { success: true, message: '✅ 資料匯入成功！' };
    } catch (e) {
      return { success: false, message: '❌ 資料格式錯誤' };
    }
  },

  downloadExport() {
    const data = this.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `honeymoon-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();

    URL.revokeObjectURL(url);
  },

  triggerImport(callback) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = this.importData(event.target.result);
          alert(result.message);
          if (result.success && callback) {
            callback();
          } else if (result.success) {
            location.reload();
          }
        };
        reader.readAsText(file);
      }
    };

    input.click();
  },

  // 計算資料大小（用於判斷是否可用 URL 同步）
  getDataSize() {
    const data = this.exportData();
    return new Blob([data]).size;
  }
};

// 頁面載入後初始化
document.addEventListener('DOMContentLoaded', () => {
  Editor.init();
});
