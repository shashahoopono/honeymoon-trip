// 分享系統 - 針對 GitHub Pages 優化
const Share = {
  // ==================
  // Web Share API
  // ==================

  canShare() {
    return navigator.share !== undefined;
  },

  async shareLink() {
    const shareData = {
      title: '💕 蜜月之旅 - 瑞士+義大利',
      text: '我們的16天蜜月旅行行程 🇨🇭🇮🇹\n2026/2/18 - 3/5',
      url: window.location.href
    };

    if (this.canShare()) {
      try {
        await navigator.share(shareData);
        return { success: true };
      } catch (e) {
        if (e.name !== 'AbortError') {
          return this.copyToClipboard(window.location.href);
        }
      }
    } else {
      return this.copyToClipboard(window.location.href);
    }
  },

  async shareDay(dayNumber) {
    const schedule = TRIP_DATA.schedule.find(s => s.day === dayNumber);
    if (!schedule) return { success: false, error: '找不到行程' };

    const text = `📅 Day ${dayNumber} - ${schedule.title}
📍 ${schedule.city}, ${schedule.country}
🗓️ ${schedule.date}

✨ 行程重點：
${schedule.activities.slice(0, 3).map(a => `• ${a.time} ${a.activity}`).join('\n')}

💕 #蜜月之旅 #瑞士義大利`;

    if (this.canShare()) {
      try {
        await navigator.share({
          title: `蜜月之旅 Day ${dayNumber}`,
          text: text,
          url: window.location.href
        });
        return { success: true };
      } catch (e) {
        if (e.name !== 'AbortError') {
          return this.copyToClipboard(text);
        }
      }
    } else {
      return this.copyToClipboard(text);
    }
  },

  async shareMissionProgress() {
    const progress = MissionSystem.getTotalProgress();
    const text = `🎯 蜜月任務進度

✅ 完成 ${progress.completed}/${progress.total} 個任務
📊 完成率 ${progress.percentage}%
⭐ 累計 ${progress.points} 分

💕 #蜜月之旅 #瑞士義大利`;

    if (this.canShare()) {
      try {
        await navigator.share({ title: '蜜月任務進度', text: text });
        return { success: true };
      } catch (e) {
        if (e.name !== 'AbortError') {
          return this.copyToClipboard(text);
        }
      }
    } else {
      return this.copyToClipboard(text);
    }
  },

  // ==================
  // 複製到剪貼板
  // ==================

  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast('✅ 已複製到剪貼板');
      return { success: true };
    } catch (e) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.showToast('✅ 已複製到剪貼板');
      return { success: true };
    }
  },

  // ==================
  // QR Code 分享
  // ==================

  generateQRCode(text, size = 200) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
  },

  showQRCodeModal(url, title = '掃描 QR Code') {
    const qrUrl = this.generateQRCode(url);

    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
      <div class="share-modal-content">
        <h3>📱 ${title}</h3>
        <img src="${qrUrl}" alt="QR Code" class="qr-code">
        <p class="share-url">${url.length > 50 ? url.substring(0, 50) + '...' : url}</p>
        <div class="share-modal-buttons">
          <button class="btn btn-outline" onclick="Share.copyToClipboard('${url}'); this.closest('.share-modal').remove();">
            📋 複製連結
          </button>
          <button class="btn" onclick="this.closest('.share-modal').remove()">
            關閉
          </button>
        </div>
      </div>
    `;
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
    document.body.appendChild(modal);
  },

  // ==================
  // 分享選單（GitHub Pages 版本）
  // ==================

  showShareMenu() {
    const baseUrl = window.location.href.split('?')[0];
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
      <div class="share-modal-content">
        <h3>📤 分享與同步</h3>

        <div class="share-section">
          <h4>🔗 分享網站</h4>
          <p class="share-hint">讓另一半也能看到行程</p>
          <button class="btn btn-full" onclick="Share.shareLink(); this.closest('.share-modal').remove();">
            📱 分享連結
          </button>
          <button class="btn btn-full btn-outline" onclick="Share.showQRCodeModal('${baseUrl}', '掃描開啟網站')">
            📷 顯示 QR Code
          </button>
        </div>

        <div class="share-section">
          <h4>💾 資料同步</h4>
          <p class="share-hint">同步編輯內容、照片到另一台裝置</p>
          <div class="share-sync-info">
            <span>📦 原始：${(Editor.getDataSize() / 1024).toFixed(0)} KB → 壓縮後約 ${(CompressSync.getCompressedSize() / 1024).toFixed(0)} KB</span>
          </div>

          <p style="font-size:0.8rem;color:var(--primary);margin:12px 0 8px;font-weight:600;">📦 壓縮同步（推薦，含照片）</p>
          <button class="btn btn-full" onclick="CompressSync.showCompressExportModal(); this.closest('.share-modal').remove();">
            📤 壓縮匯出（複製給手機）
          </button>
          <button class="btn btn-full btn-outline" onclick="CompressSync.showCompressImportModal(); this.closest('.share-modal').remove();">
            📥 貼上壓縮資料匯入
          </button>

          <p style="font-size:0.8rem;color:#666;margin:16px 0 8px;">📁 檔案方式</p>
          <button class="btn btn-full btn-outline" onclick="Editor.downloadExport(); Share.showToast('📁 檔案已下載');" style="font-size:0.85rem;">
            ⬇️ 匯出 JSON 檔案
          </button>
          <button class="btn btn-full btn-outline" onclick="Editor.triggerImport()" style="font-size:0.85rem;">
            ⬆️ 匯入 JSON 檔案
          </button>
        </div>

        <div class="share-section">
          <h4>📊 分享進度</h4>
          <button class="btn btn-full btn-outline" onclick="Share.shareMissionProgress(); this.closest('.share-modal').remove();">
            🎯 分享任務進度
          </button>
        </div>

        <button class="btn btn-text" onclick="this.closest('.share-modal').remove()">
          關閉
        </button>
      </div>
    `;
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
    document.body.appendChild(modal);
  },

  // ==================
  // 複製匯出資料
  // ==================

  async copyExportData() {
    try {
      const data = Editor.exportData();
      const sizeKB = (data.length / 1024).toFixed(1);

      await navigator.clipboard.writeText(data);
      this.showToast(`✅ 已複製 ${sizeKB} KB 資料`);
    } catch (e) {
      // 降級方案
      const data = Editor.exportData();
      const textarea = document.createElement('textarea');
      textarea.value = data;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.showToast('✅ 已複製資料');
    }
  },

  // ==================
  // Toast 提示
  // ==================

  showToast(message, duration = 2000) {
    document.querySelector('.toast')?.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};
