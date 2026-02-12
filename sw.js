// Service Worker for 蜜月旅遊網站
const CACHE_NAME = 'honeymoon-trip-v36';

// 需要快取的資源列表
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './schedule.html',
  './flights.html',
  './hotels.html',
  './packing.html',
  './tips.html',
  './tickets.html',
  './expenses.html',
  './day-1.html',
  './day-2.html',
  './day-3.html',
  './day-4.html',
  './day-5.html',
  './day-6.html',
  './day-7.html',
  './day-8.html',
  './day-9.html',
  './day-10.html',
  './day-11.html',
  './day-12.html',
  './day-13.html',
  './day-14.html',
  './day-15.html',
  './day-16.html',
  './css/style.css',
  './js/app.js',
  './js/data.js',
  './js/reminders.js',
  './js/missions.js',
  './js/editor.js',
  './js/share.js',
  './js/expenses.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './images/nav-home.svg',
  './images/nav-schedule.svg',
  './images/nav-expense.svg',
  './images/nav-ticket.svg',
  './images/nav-more.svg',
  './images/hero-pattern.svg',
  './images/bg-pattern.svg',
  './images/card-deco.svg',
  './images/travel-plane.svg',
  './images/travel-heart.svg',
  './images/Cover.png',
  './images/header.gif'
];

// 安裝事件 - 快取所有資源
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log('[Service Worker] All assets cached');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('[Service Worker] Cache failed:', err);
      })
  );
});

// 啟動事件 - 清理舊快取
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');

  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => {
              console.log('[Service Worker] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activated');
        return self.clients.claim();
      })
  );
});

// 攔截請求 - 優先使用快取
self.addEventListener('fetch', event => {
  // 只處理 GET 請求
  if (event.request.method !== 'GET') return;

  // 忽略非同源請求（如 Google Maps）
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // 快取命中，返回快取
          console.log('[Service Worker] Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // 快取未命中，發送網路請求
        console.log('[Service Worker] Fetching:', event.request.url);
        return fetch(event.request)
          .then(response => {
            // 檢查是否為有效響應
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 複製響應（因為響應只能使用一次）
            const responseToCache = response.clone();

            // 將新資源加入快取
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(err => {
            console.error('[Service Worker] Fetch failed:', err);
            // 離線時返回首頁
            return caches.match('./index.html');
          });
      })
  );
});

// 接收來自頁面的訊息
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
