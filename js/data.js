// 蜜月旅遊資料 - 瑞士+義大利 16天
const TRIP_DATA = {
  info: {
    startDate: '2026-02-18',
    endDate: '2026-03-05',
    totalDays: 16,
    title: '瑞士+義大利蜜月之旅',
    travelers: ['橘子', '蘋果']
  },

  flights: {
    outbound: [
      {
        date: '2026-02-18',
        day: '三',
        departure: '09:35',
        arrival: '14:30',
        from: 'TPE 桃園 T2',
        to: 'SIN 樟宜 T3',
        flight: 'BR215',
        airline: '長榮',
        duration: '4小時55分'
      },
      {
        date: '2026-02-19',
        day: '四',
        departure: '00:05',
        arrival: '06:15',
        from: 'SIN 樟宜 T2',
        to: 'ZRH 蘇黎世',
        flight: 'LX177',
        airline: '瑞士國航',
        duration: '13小時10分',
        note: '隔夜中轉/不同航廈/行李直掛'
      }
    ],
    return: [
      {
        date: '2026-03-03',
        day: '二',
        departure: '22:40',
        arrival: '18:00 (+1)',
        from: 'ZRH 蘇黎世',
        to: 'SIN 樟宜 T2',
        flight: 'LX176',
        airline: '瑞士國航',
        duration: '12小時20分',
        note: '新加坡過夜住一晚'
      },
      {
        date: '2026-03-05',
        day: '四',
        departure: '11:40',
        arrival: '16:20',
        from: 'SIN 樟宜 T3',
        to: 'TPE 桃園 T2',
        flight: 'SQ878',
        airline: '新加坡航空',
        duration: '4小時40分'
      }
    ],
    totalOutbound: '27小時40分',
    totalReturn: '34小時40分',
    transitNote: '記得保留換洗衣物在登機箱'
  },

  hotels: [
    {
      city: '米蘭',
      country: '義大利',
      name: 'Via Padova 165',
      address: 'Via Padova, 165, 20127 米蘭, 義大利',
      checkIn: '2026-02-19',
      checkOut: '2026-02-20',
      checkInTime: '15:00~00:00',
      checkOutTime: '01:00~10:30',
      price: 2902,
      currency: 'TWD',
      features: ['有廚房'],
      notes: '確認城市稅是否可用信用卡支付',
      honeymoonConfirmed: true
    },
    {
      city: '羅馬',
      country: '義大利',
      name: 'Maison delle Naiadi',
      address: 'Via Modena, 5, 00184 Roma RM, Italy',
      checkIn: '2026-02-20',
      checkOut: '2026-02-22',
      price: 4032,
      currency: 'TWD',
      honeymoonConfirmed: true
    },
    {
      city: '佛羅倫斯',
      country: '義大利',
      name: 'Hotel Ester',
      address: 'Via Faenza, 61, 50123 Firenze FI',
      checkIn: '2026-02-22',
      checkOut: '2026-02-23',
      price: 1975,
      currency: 'TWD',
      honeymoonConfirmed: true
    },
    {
      city: '威尼斯',
      country: '義大利',
      name: "Hotel Ca' Dogaresse",
      address: 'Cannaregio 1018, 30121 Venezia VE',
      checkIn: '2026-02-23',
      checkOut: '2026-02-26',
      honeymoonConfirmed: true
    },
    {
      city: '蘇黎世',
      country: '瑞士',
      name: 'ibis Styles Zurich City Center',
      address: 'Stationsstrasse 7, 8003 Zürich',
      checkIn: '2026-02-26',
      checkOut: '2026-03-03',
      checkInTime: '15:00',
      honeymoonConfirmed: true
    },
    {
      city: '新加坡',
      country: '新加坡',
      name: 'ibis budget Ruby',
      address: '10 Lor 20 Geylang',
      checkIn: '2026-03-04',
      checkOut: '2026-03-05',
      notes: '回程過夜'
    }
  ],

  schedule: [
    {
      day: 1,
      date: '2026-02-18',
      weekday: '三',
      city: '新加坡',
      country: '新加坡',
      title: '出發・新加坡中轉',
      type: 'transit',
      activities: [
        { time: '09:35', activity: '桃園機場起飛', location: 'TPE 桃園 T2', note: 'BR215 長榮航空' },
        { time: '14:30', activity: '抵達樟宜機場 T3', location: 'Airport Blvd, Singapore', note: '下機後依指標前往轉機區' },
        { time: '14:30-15:00', activity: 'Free Singapore Tour 報到', location: 'T3 轉機區導覽櫃台', note: '出示護照＋登機證' },
        { time: '15:00-15:40', activity: '機場散步休息', location: 'T3 蝴蝶園／休息區', note: '不出境，輕鬆走走' },
        { time: '15:40-16:00', activity: '集合並出境', location: 'T3 Arrival Area', note: '依導遊指示辦理入境，靠近A1-A8登機口' },
        { time: '16:00-18:30', activity: 'Free Singapore City Tour', location: '克拉碼頭／新加坡河／濱海灣', note: '官方導覽，含交通' },
        { time: '18:30-19:00', activity: '返回樟宜機場', location: 'Changi Airport T3', note: '導覽結束直送機場' },
        { time: '00:05', activity: '深夜航班起飛', location: 'SIN 樟宜 T2', note: 'LX177 瑞士國航，飛行13小時10分' }
      ],
      reminders: ['SGAC：入境前3天內可填（約2/15–2/18）', '晚上航班前記得好好休息']
    },
    {
      day: 2,
      date: '2026-02-19',
      weekday: '四',
      city: '米蘭',
      country: '義大利',
      title: '入境・米蘭教堂巡禮',
      type: 'arrival',
      activities: [
        { time: '06:15', activity: '抵達蘇黎世機場', location: 'ZRH 蘇黎世', note: '入境瑞士' },
        { time: '06:15-12:50', activity: '蘇黎世→米蘭火車', location: 'Zürich HB → Milano Centrale', note: '記得出示半價卡' },
        { time: '12:50', activity: '抵達米蘭中央車站', location: 'Piazza Duca d\'Aosta, 1, 20124 Milano MI', note: '下車後先放慢節奏' },
        { time: '13:00-13:30', activity: '前往住宿、寄放行李', location: 'Via Padova 165', address: 'Via Padova, 165, 20127 Milano MI, Italy', note: '若可提前入住更好' },
        { time: '13:30-14:15', activity: '午餐', location: 'Panzerotti Luini', address: 'Via Santa Radegonda, 16, 20121 Milano MI', note: '義式炸餡餅，可能排隊' },
        { time: '14:15-14:45', activity: '拱廊咖啡休息', location: 'Galleria Vittorio Emanuele II', address: 'Galleria Vittorio Emanuele II, 20121 Milano MI', note: '關鍵留白，坐下來喝咖啡' },
        { time: '14:45-15:15', activity: 'Campari 發源地', location: 'Camparino in Galleria', address: "P.za del Duomo, 21, 20121 Milano MI", note: '金巴利發源地' },
        { time: '15:15-16:30', activity: '米蘭大教堂登頂＋內部', location: 'Duomo di Milano', address: 'Piazza Duomo, 20122 Milano MI, Italy', note: '預留安檢＋排隊時間，15:00或15:30電梯場次', booked: true }
      ],
      hotel: 'Via Padova 165'
    },
    {
      day: 3,
      date: '2026-02-20',
      weekday: '五',
      city: '羅馬',
      country: '義大利',
      title: '抵達羅馬・浪漫夜景',
      type: 'travel',
      activities: [
        { time: '早上', activity: '米蘭→羅馬高速列車', location: 'Milano Centrale → Roma Termini', note: '高速列車' },
        { time: '14:43', activity: '抵達羅馬', location: 'Roma Termini', address: 'Piazza dei Cinquecento, 00185 Roma RM', note: '下車後先補水' },
        { time: '15:00-15:30', activity: '前往住宿、寄放行李', location: 'Maison delle Naiadi', address: 'Via Modena, 5, 00184 Roma RM, Italy' },
        { time: '15:45-16:30', activity: '下午休息 / 早午茶', location: 'Barnum Café', address: 'Via del Pellegrino, 87, 00186 Roma RM', note: '坐下來調狀態' },
        { time: '16:45-17:30', activity: '聖彼得大教堂＋廣場', location: 'St. Peter\'s Basilica', address: 'Piazza San Pietro, 00120 Vatican City', note: '免費入場，只看教堂' },
        { time: '17:45-18:05', activity: '萬神殿外觀', location: 'Pantheon', address: 'Piazza della Rotonda, 00186 Roma RM', note: '不進館，拍照即可' },
        { time: '18:15-18:45', activity: '許願池', location: 'Fontana di Trevi', address: 'Piazza di Trevi, 00187 Roma RM', note: '投幣許願' },
        { time: '19:00-20:00', activity: '晚餐', location: '周邊餐廳', note: '享受羅馬夜晚' }
      ],
      hotel: 'Maison delle Naiadi'
    },
    {
      day: 4,
      date: '2026-02-21',
      weekday: '六',
      city: '羅馬',
      country: '義大利',
      title: '羅馬深度遊・重點日',
      type: 'sightseeing',
      activities: [
        { time: '09:00-12:00', activity: '梵蒂岡城', location: 'Vatican City', note: '聖彼得大教堂、梵蒂岡博物館' },
        { time: '12:00-13:00', activity: '午餐', location: '梵蒂岡周邊' },
        { time: '14:00-16:00', activity: '羅馬競技場', location: 'Colosseo', address: 'Piazza del Colosseo, 1, 00184 Roma RM', note: '已預訂門票', booked: true },
        { time: '16:00-17:30', activity: '古羅馬廣場', location: 'Roman Forum', address: 'Via della Salara Vecchia, 5/6, 00186 Roma RM', note: '順路參觀' },
        { time: '17:30-18:30', activity: '帕拉蒂尼山', location: 'Palatine Hill', note: '羅馬七丘之一' },
        { time: '19:00-20:30', activity: '晚餐', location: 'Trastevere區', note: '羅馬傳統美食區' }
      ],
      hotel: 'Maison delle Naiadi'
    },
    {
      day: 5,
      date: '2026-02-22',
      weekday: '日',
      city: '佛羅倫斯',
      country: '義大利',
      title: '抵達佛羅倫斯・日落',
      type: 'travel',
      activities: [
        { time: '早上', activity: '羅馬→佛羅倫斯', location: 'Roma Termini → Firenze S.M.N.', note: '高速列車' },
        { time: '14:31', activity: '抵達佛羅倫斯', location: 'Firenze S.M.N.', address: 'Piazza della Stazione, 50123 Firenze FI', note: '小站，步行即可進市區' },
        { time: '14:40-15:00', activity: '前往住宿、寄放行李', location: 'Hotel Ester', address: 'Via Faenza, 61, 50123 Firenze FI' },
        { time: '15:00-15:20', activity: '休息整理', location: '住宿', note: '上洗手間、補水' },
        { time: '15:30-16:00', activity: '教堂外觀', location: 'Santa Maria Novella', address: 'Piazza di Santa Maria Novella, Firenze', note: '不進教堂，拍照即可' },
        { time: '16:15-17:00', activity: '主教堂廣場散步', location: 'Piazza del Duomo', address: 'Piazza del Duomo, Firenze', note: '不登頂、不進館' },
        { time: '17:00-17:20', activity: '圖書館電影院', location: 'Giunti Odeon', address: 'Piazza degli Strozzi, 2, Firenze', note: '進去走15-20分鐘' },
        { time: '17:30-18:30', activity: '老橋日落', location: 'Ponte Vecchio', address: 'Ponte Vecchio, Firenze', note: '佛羅倫斯最浪漫時刻' },
        { time: '19:00-20:30', activity: '晚餐', location: '中央市場附近', note: '托斯卡尼美食' }
      ],
      hotel: 'Hotel Ester'
    },
    {
      day: 6,
      date: '2026-02-23',
      weekday: '一',
      city: '威尼斯',
      country: '義大利',
      title: '威尼斯・水巷夜漫步',
      type: 'travel',
      activities: [
        { time: '早上', activity: '佛羅倫斯深度遊', location: '佛羅倫斯市中心', note: '中央市場、學院美術館（大衛像）' },
        { time: '下午', activity: '佛羅倫斯→威尼斯', location: 'Firenze S.M.N. → Venezia S. Lucia', note: '高速列車' },
        { time: '19:34', activity: '抵達威尼斯', location: 'Venezia Santa Lucia', address: 'Cannaregio, Venezia', note: '一出站即是大運河' },
        { time: '19:45-20:00', activity: '前往飯店', location: "Hotel Ca' Dogaresse", address: 'Cannaregio 1018, 30121 Venezia VE', note: '步行5-10分鐘' },
        { time: '20:00', activity: 'Check-in', location: "Hotel Ca' Dogaresse", note: '先放行李、稍作休息' },
        { time: '20:30-21:45', activity: '晚餐', location: 'Trattoria Bar Pontini', address: 'Cannaregio 1268, 30121 Venezia VE', note: '強烈建議訂位，海鮮拼盤' },
        { time: '21:45-22:30', activity: '夜間散步', location: 'Cannaregio 水巷', note: '人少、安靜、有在地感' },
        { time: '22:30', activity: '回住宿休息', location: "Hotel Ca' Dogaresse" }
      ],
      hotel: "Hotel Ca' Dogaresse"
    },
    {
      day: 7,
      date: '2026-02-24',
      weekday: '二',
      city: '威尼斯',
      country: '義大利',
      title: '威尼斯核心島',
      type: 'sightseeing',
      activities: [
        { time: '09:00-10:30', activity: '聖馬可廣場', location: 'Piazza San Marco', address: 'Piazza San Marco, Venezia', note: '威尼斯心臟地帶' },
        { time: '10:30-12:00', activity: '總督宮', location: 'Palazzo Ducale', address: 'P.za San Marco, 1, 30124 Venezia VE', note: '威尼斯歷史與藝術' },
        { time: '12:00-13:30', activity: '午餐', location: '聖馬可周邊', note: '小心觀光區價格' },
        { time: '14:00-15:30', activity: '嘆息橋 & 里亞托橋', location: 'Ponte di Rialto', address: 'Ponte di Rialto, Venezia', note: '威尼斯地標' },
        { time: '15:30-17:00', activity: '迷失在威尼斯', location: '威尼斯小巷', note: '沒有目的地的散步' },
        { time: '17:00-18:30', activity: '貢多拉體驗', location: '大運河', note: '浪漫水上之旅（可選）' },
        { time: '19:00-21:00', activity: '晚餐', location: '威尼斯本島', note: '最後一晚威尼斯' }
      ],
      hotel: "Hotel Ca' Dogaresse"
    },
    {
      day: 8,
      date: '2026-02-25',
      weekday: '三',
      city: '威尼斯',
      country: '義大利',
      title: '威尼斯離島',
      type: 'sightseeing',
      activities: [
        { time: '09:00-12:00', activity: '布拉諾島', location: 'Burano', note: '彩色房子、蕾絲工藝' },
        { time: '12:00-14:00', activity: '午餐 @ 布拉諾', location: 'Burano', note: '海鮮料理' },
        { time: '14:00-16:00', activity: '穆拉諾島', location: 'Murano', note: '玻璃工藝' },
        { time: '16:00-18:00', activity: '返回本島休息', location: '威尼斯本島' },
        { time: '19:00-21:00', activity: '晚餐', location: '威尼斯' }
      ],
      hotel: "Hotel Ca' Dogaresse"
    },
    {
      day: 9,
      date: '2026-02-26',
      weekday: '四',
      city: '蘇黎世',
      country: '瑞士',
      title: '長程移動日・抵達瑞士',
      type: 'travel',
      activities: [
        { time: '06:45', activity: '起床＆早餐準備', location: "Hotel Ca' Dogaresse", note: '建議簡單吃，留力氣' },
        { time: '07:18', activity: '威尼斯→蘇黎世', location: 'Venezia S. Lucia → Zürich HB', note: '全程約7小時，轉車1次' },
        { time: '12:00', activity: '午餐（火車上）', location: '自備簡餐', note: '轉車時補充水／水果' },
        { time: '14:27', activity: '抵達蘇黎世', location: 'Zürich HB', address: 'Bahnhofplatz, Zürich', note: '抵達時間漂亮' },
        { time: '15:00', activity: 'Check-in', location: 'ibis Styles Zurich City Center', address: 'Stationsstrasse 7, 8003 Zürich' },
        { time: '16:30-17:30', activity: '老城定點散步', location: '林登霍夫山', address: 'Lindenhof, Zürich', note: '俯瞰老城＋河景' },
        { time: '18:00-19:30', activity: '晚餐', location: '蘇黎世老城', note: '瑞士第一餐' }
      ],
      hotel: 'ibis Styles Zurich City Center'
    },
    {
      day: 10,
      date: '2026-02-27',
      weekday: '五',
      city: '蘇黎世/瑞士',
      country: '瑞士',
      title: '瑞士雪山之旅',
      type: 'sightseeing',
      activities: [
        { time: '早上', activity: '前往阿爾卑斯山區', location: '瑞士山區', note: '使用瑞士半價卡' },
        { time: '全天', activity: '雪山觀光', location: '阿爾卑斯山', note: '依天氣決定具體行程' },
        { time: '傍晚', activity: '返回蘇黎世', location: 'Zürich HB' },
        { time: '晚上', activity: '晚餐', location: '蘇黎世' }
      ],
      hotel: 'ibis Styles Zurich City Center'
    },
    {
      day: 11,
      date: '2026-02-28',
      weekday: '六',
      city: '瑞士',
      country: '瑞士',
      title: '瑞士湖光山色',
      type: 'sightseeing',
      activities: [
        { time: '全天', activity: '瑞士景點', location: '瑞士', note: '琉森/因特拉肯/伯恩等' }
      ],
      hotel: 'ibis Styles Zurich City Center'
    },
    {
      day: 12,
      date: '2026-03-01',
      weekday: '日',
      city: '瑞士',
      country: '瑞士',
      title: '瑞士探索',
      type: 'sightseeing',
      activities: [
        { time: '全天', activity: '瑞士景點', location: '瑞士', note: '自由探索' }
      ],
      hotel: 'ibis Styles Zurich City Center'
    },
    {
      day: 13,
      date: '2026-03-02',
      weekday: '一',
      city: '瑞士',
      country: '瑞士',
      title: '瑞士最後一天',
      type: 'sightseeing',
      activities: [
        { time: '全天', activity: '蘇黎世市區 / 購物', location: '蘇黎世', note: '最後採購紀念品' }
      ],
      hotel: 'ibis Styles Zurich City Center'
    },
    {
      day: 14,
      date: '2026-03-03',
      weekday: '二',
      city: '蘇黎世→新加坡',
      country: '瑞士/新加坡',
      title: '告別瑞士・飛往新加坡',
      type: 'departure',
      activities: [
        { time: '白天', activity: '蘇黎世最後半天', location: '蘇黎世', note: '輕鬆逛逛' },
        { time: '下午', activity: '前往機場', location: 'Zürich Airport' },
        { time: '22:40', activity: '起飛', location: 'ZRH 蘇黎世', note: 'LX176 瑞士國航，飛行12小時20分' }
      ],
      reminders: ['記得保留換洗衣物在登機箱']
    },
    {
      day: 15,
      date: '2026-03-04',
      weekday: '三',
      city: '新加坡',
      country: '新加坡',
      title: '新加坡過夜',
      type: 'transit',
      activities: [
        { time: '18:00', activity: '抵達新加坡', location: 'SIN 樟宜機場 T2', note: '班機準時' },
        { time: '18:30-19:15', activity: '入境、提行李', location: '樟宜機場', note: '建議換少量現金' },
        { time: '19:15-20:00', activity: '前往住宿', location: 'Grab / MRT', note: 'Grab約20分鐘；MRT約45分鐘' },
        { time: '20:00-20:30', activity: 'Check-in', location: 'ibis budget Ruby', address: '10 Lor 20 Geylang', note: '快速放行李' },
        { time: '20:30-21:30', activity: '宵夜散步', location: 'Geylang 美食街', note: '新加坡最在地，Lor 9–Lor 25' },
        { time: '21:30', activity: '回飯店休息', location: 'ibis budget Ruby', note: '明天早起返台' }
      ],
      hotel: 'ibis budget Ruby'
    },
    {
      day: 16,
      date: '2026-03-05',
      weekday: '四',
      city: '新加坡→台北',
      country: '新加坡/台灣',
      title: '回家',
      type: 'return',
      activities: [
        { time: '早上', activity: '起床、退房', location: 'ibis budget Ruby' },
        { time: '09:00', activity: '前往機場', location: 'Changi Airport T3' },
        { time: '11:40', activity: '起飛', location: 'SIN 樟宜 T3', note: 'SQ878 新加坡航空，飛行4小時40分' },
        { time: '16:20', activity: '抵達台北', location: 'TPE 桃園 T2', note: '歡迎回家！蜜月旅行圓滿結束' }
      ]
    }
  ],

  packing: {
    documents: [
      { item: '護照', checked: false, note: '效期6個月以上' },
      { item: '機票電子票證', checked: false },
      { item: '飯店訂房確認', checked: false },
      { item: '火車票', checked: false },
      { item: '門票預訂確認', checked: false },
      { item: '旅遊保險', checked: false },
      { item: '信用卡', checked: false, note: 'JCB貴賓室' },
      { item: '現金（歐元/瑞郎）', checked: false },
      { item: '新加坡入境卡SGAC', checked: false, note: '入境前3天內填寫' }
    ],
    electronics: [
      { item: '手機充電器', checked: false },
      { item: '行動電源', checked: false },
      { item: '轉接頭', checked: false, note: '歐規/瑞士' },
      { item: '相機', checked: false },
      { item: '吹風機', checked: false, note: '需要變壓器' }
    ],
    clothing: [
      { item: '冬季外套', checked: false },
      { item: '保暖衣物', checked: false },
      { item: '換洗衣物', checked: false, note: '登機箱放一套' },
      { item: '舒適步行鞋', checked: false },
      { item: '正式服裝', checked: false, note: '高級餐廳用' }
    ],
    toiletries: [
      { item: '盥洗用品', checked: false },
      { item: '個人藥品', checked: false },
      { item: '高山症藥', checked: false },
      { item: '防曬乳', checked: false },
      { item: '保濕用品', checked: false }
    ],
    misc: [
      { item: '環保餐具', checked: false },
      { item: '環保杯', checked: false },
      { item: '眼罩耳塞', checked: false, note: '長途飛機' },
      { item: '頸枕', checked: false }
    ]
  },

  tips: {
    lounges: [
      { name: 'SATS Premier Lounge', location: 'Terminal 1', airport: '新加坡樟宜機場', card: 'JCB' },
      { name: 'SATS Premier Lounge', location: 'Terminal 3', airport: '新加坡樟宜機場', card: 'JCB' },
      { name: 'Blossom Lounge', location: 'Terminal 4', airport: '新加坡樟宜機場', card: 'JCB' },
      { name: 'Plaza Premium Lounge', location: '入境前/出境後皆可', airport: '新加坡樟宜機場', card: 'JCB' }
    ],
    italyDining: [
      { rule: '麵包費與餐具費 (Coperto)', description: '€1-3/人，會自動加在帳單上' },
      { rule: '服務費 (Servizio)', description: '有些餐廳會收10-15%' },
      { rule: '水費', description: '通常需付費，€2-3/瓶' },
      { rule: '站著喝咖啡', description: '比坐著便宜很多' }
    ],
    apps: [
      { name: 'Too Good To Go', purpose: '餐廳打折優惠' },
      { name: 'Maps.me', purpose: '離線地圖' },
      { name: 'THE FORK', purpose: '餐廳訂位優惠' }
    ],
    tickets: [
      { item: '瑞士半價卡', platform: 'KKDAY', note: '火車票半價' },
      { item: '羅馬競技場門票', platform: 'KLOOK', note: '提前預訂' }
    ]
  },

  expenses: [
    { category: '機票', item: '機票/2人', amount: 49678, currency: 'TWD', paidBy: '橘子' },
    { category: '住宿', item: '米蘭', amount: 2941, currency: 'TWD', paidBy: '蘋果', note: '不含稅448' },
    { category: '住宿', item: '羅馬', amount: 4032, currency: 'TWD', paidBy: '蘋果', note: '不含稅500' },
    { category: '住宿', item: '佛羅倫斯', amount: 1975, currency: 'TWD', paidBy: '蘋果', note: '不含稅428' }
  ]
};

// 日期工具函數
const DateUtils = {
  parseDate(dateStr) {
    return new Date(dateStr + 'T00:00:00');
  },

  formatDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  },

  getDaysDiff(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
  },

  getTodayStr() {
    // 支援測試模式：從 localStorage 讀取測試日期
    const testDate = localStorage.getItem('honeymoon_test_date');
    if (testDate) {
      return testDate;
    }
    const now = new Date();
    return now.toISOString().split('T')[0];
  },

  getCurrentDayNumber() {
    const today = this.getTodayStr();
    const startDate = TRIP_DATA.info.startDate;
    const diff = this.getDaysDiff(startDate, today);

    if (diff < 0) return -1; // 還沒開始
    if (diff >= TRIP_DATA.info.totalDays) return -2; // 已結束
    return diff + 1; // Day 1-16
  },

  getCountdown() {
    const today = this.getTodayStr();
    const startDate = TRIP_DATA.info.startDate;
    return this.getDaysDiff(today, startDate);
  }
};

// 獲取當日行程
function getTodaySchedule() {
  const dayNum = DateUtils.getCurrentDayNumber();
  if (dayNum > 0) {
    return TRIP_DATA.schedule.find(s => s.day === dayNum);
  }
  return null;
}

// 獲取當日住宿
function getTodayHotel() {
  const todaySchedule = getTodaySchedule();
  if (todaySchedule && todaySchedule.hotel) {
    return TRIP_DATA.hotels.find(h => h.name === todaySchedule.hotel);
  }
  return null;
}

// 導出給其他模組使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TRIP_DATA, DateUtils, getTodaySchedule, getTodayHotel };
}
