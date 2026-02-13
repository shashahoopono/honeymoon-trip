// Service Worker for 蜜月旅遊網站
const CACHE_NAME = 'honeymoon-trip-v49';

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

// 攔截請求 - CSS/JS 優先網路，其他優先快取
self.addEventListener('fetch', event => {
  // 只處理 GET 請求
  if (event.request.method !== 'GET') return;

  // 忽略非同源請求（如 Google Maps）
  if (!event.request.url.startsWith(self.location.origin)) return;

  const url = new URL(event.request.url);
  const isVersionedAsset = url.search.includes('v=') ||
                           url.pathname.endsWith('.css') ||
                           url.pathname.endsWith('.js');

  if (isVersionedAsset) {
    // CSS/JS 檔案：網路優先策略
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // 網路失敗時使用快取
          return caches.match(event.request);
        })
    );
  } else {
    // 其他資源：快取優先策略
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            console.log('[Service Worker] Serving from cache:', event.request.url);
            return cachedResponse;
          }

          console.log('[Service Worker] Fetching:', event.request.url);
          return fetch(event.request)
            .then(response => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            })
            .catch(err => {
              console.error('[Service Worker] Fetch failed:', err);
              return caches.match('./index.html');
            });
        })
    );
  }
});

// 接收來自頁面的訊息
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
