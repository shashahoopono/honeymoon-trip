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
      checkOut: '2026-02-27',
      checkInTime: '15:00',
      honeymoonConfirmed: true
    },
    {
      city: '因特拉肯',
      country: '瑞士',
      name: 'ARNOLDS Bed & Breakfast',
      address: 'Parkstrasse 3, 3800 Interlaken',
      checkIn: '2026-02-27',
      checkOut: '2026-03-01',
      checkInTime: '14:00',
      honeymoonConfirmed: true
    },
    {
      city: '蘇黎世',
      country: '瑞士',
      name: 'Numa Zurich Turi',
      address: 'Zürich',
      checkIn: '2026-03-01',
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
        { time: '14:30-15:00', activity: 'Free Singapore Tour 報到', location: 'T3 轉機區導覽櫃台', note: '出示護照＋登機證', booked: true },
        { time: '15:00-15:40', activity: '機場散步休息', location: 'T3 蝴蝶園／休息區', note: '不出境，輕鬆走走' },
        { time: '15:40-16:00', activity: '集合並出境', location: 'T3 Arrival Area', note: '依導遊指示辦理入境，靠近A1-A8登機口' },
        { time: '16:00-18:30', activity: 'Free Singapore City Tour', location: '克拉碼頭／新加坡河／濱海灣', note: '官方導覽，含交通' },
        { time: '18:30-19:00', activity: '返回樟宜機場', location: 'Changi Airport T3', note: '導覽結束直送機場' },
        { time: '19:00-21:00', activity: '貴賓室洗澡＋晚餐', location: 'SATS Premier Lounge', address: 'T3（或 T1）Airside', note: '可視動線改 T1' },
        { time: '21:00-21:30', activity: '前往 T2 航廈', location: 'Skytrain（T3 → T2）', note: '機場內免費電車' },
        { time: '00:05', activity: '深夜航班起飛', location: 'SIN 樟宜 T2', note: 'LX177 瑞士國航，飛行13小時10分' }
      ],
      reminders: ['SGAC：入境前3天內可填（約2/15–2/18）', '晚上航班前記得好好休息', '貴賓室可淋浴，準備乾淨衣物']
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
        { time: '12:50', activity: '抵達米蘭中央車站', location: 'Milano Centrale', address: "Piazza Duca d'Aosta, 1, 20124 Milano MI", note: '下車後先放慢節奏' },
        { time: '13:00-13:30', activity: '前往住宿、寄放行李', location: 'Via Padova 165', address: 'Via Padova, 165, 20127 Milano MI, Italy', note: '若可提前入住更好' },
        { time: '13:30-14:15', activity: '午餐', location: 'Panzerotti Luini', address: 'Via Santa Radegonda, 16, 20121 Milano MI', note: '義式炸餡餅，可能排隊' },
        { time: '14:15-14:45', activity: '拱廊咖啡休息（關鍵留白）', location: 'Galleria Vittorio Emanuele II', address: 'Galleria Vittorio Emanuele II, 20121 Milano MI', note: '坐下來喝咖啡、回體力' },
        { time: '14:45-15:15', activity: 'Campari 發源地', location: 'Camparino in Galleria', address: "P.za del Duomo, 21, 20121 Milano MI", note: '金巴利發源地' },
        { time: '15:15-16:30', activity: '米蘭大教堂登頂＋內部', location: 'Duomo di Milano', address: 'Piazza Duomo, 20122 Milano MI, Italy', note: '預留安檢＋排隊時間，15:00或15:30電梯場次', booked: true },
        { time: '16:30-17:15', activity: '大教堂廣場散步拍照', location: 'Piazza Duomo', address: 'Piazza Duomo, 20122 Milano MI', note: '不再排新點，留彈性' },
        { time: '17:30-18:10', activity: '下午甜點', location: 'Marchesi 1824（拱廊店）', address: 'Galleria Vittorio Emanuele II, 20121 Milano MI', note: '30-40分鐘即可' },
        { time: '18:10-19:00', activity: '斯卡拉歌劇院外圍散步', location: 'Piazza della Scala', address: 'Piazza della Scala, 20121 Milano MI', note: '傍晚光線最好' },
        { time: '19:30-21:00', activity: '晚餐（第一晚儀式感）', location: 'Ristorante El Barbapedana', address: 'Corso Cristoforo Colombo, 7, 20144 Milano MI', note: '傳統米蘭菜，建議提前訂位', booked: true },
        { time: '21:00', activity: '回住宿、洗澡休息', location: 'Via Padova 165', note: '夜航後早睡很重要' }
      ],
      hotel: 'Via Padova 165'
    },
    {
      day: 3,
      date: '2026-02-20',
      weekday: '五',
      city: '米蘭→羅馬',
      country: '義大利',
      title: '米蘭到羅馬・浪漫夜景',
      type: 'travel',
      activities: [
        { time: '07:30', activity: '從住宿出發', location: 'Via Padova 165', note: '帶全部行李' },
        { time: '08:00-08:45', activity: '早餐（站內）', location: 'Milano Centrale', note: '免移動' },
        { time: '08:45-09:30', activity: '車站內逛/休息', location: 'Milano Centrale', note: '不寄行李' },
        { time: '09:30-10:30', activity: '車站周邊輕鬆散步', location: 'Milano Centrale 周邊', note: '可選' },
        { time: '10:30-11:10', activity: '回到候車區', location: 'Milano Centrale', note: '確認月台資訊' },
        { time: '11:25', activity: '高鐵出發→羅馬', location: 'Milano Centrale → Roma Termini', note: '高速列車', booked: true },
        { time: '14:43', activity: '抵達羅馬', location: 'Roma Termini', address: 'Piazza dei Cinquecento, 00185 Roma RM', note: '下車後先補水' },
        { time: '15:00-15:30', activity: '前往住宿、寄放行李', location: 'Maison delle Naiadi', address: 'Via Modena, 5, 00184 Roma RM, Italy', note: '可入住就放' },
        { time: '15:45-16:30', activity: '下午休息 / 早午茶', location: 'Barnum Café', address: 'Via del Pellegrino, 87, 00186 Roma RM', note: '坐下來調狀態' },
        { time: '16:45-17:30', activity: '聖彼得大教堂＋廣場', location: "St. Peter's Basilica", address: 'Piazza San Pietro, 00120 Vatican City', note: '免費入場，只看教堂' },
        { time: '17:45-18:05', activity: '萬神殿外觀', location: 'Pantheon', address: 'Piazza della Rotonda, 00186 Roma RM', note: '不進館，拍照即可' },
        { time: '18:10-18:40', activity: '廣場散步', location: 'Piazza Navona', address: 'Piazza Navona, 00186 Roma RM', note: '接著走很順' },
        { time: '19:30-21:00', activity: '晚餐', location: 'Armando al Pantheon', address: "Salita de' Crescenzi, 31, 00186 Roma RM", note: '建議訂位', booked: true },
        { time: '21:15-21:45', activity: '許願池夜景', location: 'Fontana di Trevi', address: 'Piazza di Trevi, 00187 Roma RM', note: '晚上氣氛最好' },
        { time: '22:00', activity: '返回住宿', location: 'Maison delle Naiadi', note: '早睡' }
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
        { time: '07:30-08:30', activity: '早餐', location: '住宿附近 Bar', note: '吃簡單即可，避免太飽' },
        { time: '08:30-09:00', activity: '前往競技場', location: 'Colosseo 地鐵站', note: '建議提早15-20分鐘到' },
        { time: '09:00-10:15', activity: '競技場內參觀', location: 'Colosseum', address: 'Piazza del Colosseo, 1, 00184 Roma RM', note: '依指定時段入場，慢慢看', booked: true },
        { time: '10:15-10:30', activity: '休息＋拍外觀', location: 'Colosseum 外圍', note: '補水、上洗手間' },
        { time: '10:30-12:00', activity: '古羅馬廣場', location: 'Roman Forum', address: 'Via della Salara Vecchia, 5/6, 00186 Roma RM', note: '廣闊、慢慢走，不用全看完' },
        { time: '12:00-13:00', activity: '午餐（坐下來）', location: 'La Taverna dei Fori Imperiali', address: 'Via della Madonna dei Monti, 9', note: '一定要訂位，離出口近', booked: true },
        { time: '13:00-14:00', activity: '帕拉丁山', location: 'Palatine Hill', address: 'Via di San Gregorio, 30', note: '下午慢慢走，視體力調整' },
        { time: '14:15-15:00', activity: '回住宿休息', location: 'Maison delle Naiadi', note: '洗手間＋短休息' },
        { time: '15:30-16:30', activity: '下午散步', location: "Trajan's Market（外觀）", address: 'Via Quattro Novembre, 94', note: '不進館，當復原行程' },
        { time: '17:00-18:00', activity: '下午茶 / Gelato', location: 'Giolitti', address: 'Via degli Uffici del Vicario, 40', note: '坐下來休息' },
        { time: '19:30-21:00', activity: '晚餐', location: 'Roscioli Salumeria con Cucina', address: 'Via dei Giubbonari, 21', note: '強烈建議訂位', booked: true },
        { time: '21:15-21:45', activity: '夜景散步', location: "Campo de' Fiori", note: '第二晚氣氛最放鬆' }
      ],
      hotel: 'Maison delle Naiadi'
    },
    {
      day: 5,
      date: '2026-02-22',
      weekday: '日',
      city: '羅馬→佛羅倫斯',
      country: '義大利',
      title: '羅馬尾聲・抵達佛羅倫斯',
      type: 'travel',
      activities: [
        { time: '08:30', activity: '起床', location: 'Maison delle Naiadi', note: '住宿' },
        { time: '09:00-10:00', activity: '早餐', location: '住宿附近 Bar / Café', note: '輕鬆吃' },
        { time: '10:00-10:45', activity: '回房收行李', location: 'Maison delle Naiadi', note: '整理行李' },
        { time: '10:45-11:00', activity: '退房', location: 'Maison delle Naiadi', address: 'Via Modena, 5, 00184 Roma RM' },
        { time: '11:00-11:20', activity: '前往車站', location: 'Roma Termini', note: '步行約15分鐘' },
        { time: '11:20-12:20', activity: '午餐（快速）', location: 'Mercato Centrale Roma', address: 'Roma Termini', note: '車站內美食街' },
        { time: '12:20-12:55', activity: '進站候車', location: 'Roma Termini', note: '確認月台' },
        { time: '12:55-14:31', activity: '羅馬→佛羅倫斯', location: 'Italo 高速列車 8916', note: 'Italo 高速列車', booked: true },
        { time: '14:31', activity: '抵達佛羅倫斯', location: 'Firenze S.M.N.', address: 'Piazza della Stazione, 50123 Firenze FI', note: '小站，步行即可進市區' },
        { time: '14:40-15:00', activity: '前往住宿、寄放行李', location: 'Hotel Ester', address: 'Via Faenza, 61, 50123 Firenze FI', note: '可入住就放，不行就寄放' },
        { time: '15:00-15:20', activity: '休息整理', location: '住宿', note: '上洗手間、補水' },
        { time: '15:30-16:00', activity: '教堂外觀', location: 'Santa Maria Novella', address: 'Piazza di Santa Maria Novella, Firenze', note: '不進教堂，拍照即可' },
        { time: '16:15-17:00', activity: '主教堂廣場散步', location: 'Piazza del Duomo', address: 'Piazza del Duomo, Firenze', note: '不登頂、不進館' },
        { time: '17:00-17:20', activity: '圖書館電影院', location: 'Giunti Odeon', address: 'Piazza degli Strozzi, 2, Firenze', note: '進去走15-20分鐘' },
        { time: '17:40-18:20', activity: '黃昏河畔散步', location: 'Ponte Vecchio', address: 'Ponte Vecchio, Firenze', note: '第一眼佛羅倫斯' },
        { time: '19:00-20:30', activity: '晚餐', location: 'Trattoria ZaZa', address: 'Piazza del Mercato Centrale, 26R', note: '觀光客多，建議訂位', booked: true },
        { time: '20:45-21:15', activity: '夜景散步', location: 'Duomo 夜景', address: 'Piazza del Duomo', note: '不久留' },
        { time: '21:30', activity: '回住宿休息', location: 'Hotel Ester', note: '隔天完整一天' }
      ],
      hotel: 'Hotel Ester'
    },
    {
      day: 6,
      date: '2026-02-23',
      weekday: '一',
      city: '佛羅倫斯→威尼斯',
      country: '義大利',
      title: '文藝復興與水都初見',
      type: 'travel',
      activities: [
        { time: '08:30', activity: '起床', location: 'Hotel Ester', note: '不趕車' },
        { time: '09:00-10:00', activity: '早餐', location: 'La Ménagère', address: 'Via de\' Ginori, 8r, Firenze', note: '可久坐' },
        { time: '10:15-11:15', activity: '市中心散步', location: 'Duomo 周邊', address: 'Piazza del Duomo', note: '不進館' },
        { time: '11:30-11:50', activity: '市集逛街', location: 'Mercato Centrale', address: 'Piazza del Mercato Centrale', note: '輕鬆逛' },
        { time: '12:30-14:00', activity: '午餐', location: "Trattoria dall'Oste", address: 'Via dei Cerretani, 33R', note: 'Chianina 牛排', booked: true },
        { time: '14:15-15:15', activity: 'Oltrarno 散步', location: 'Santo Spirito 區', address: 'Piazza Santo Spirito', note: '在地生活感' },
        { time: '15:15-15:30', activity: '紅酒洞', location: 'La Buchetta del vino', address: 'Via dello Strozzino, 18R', note: '停留10-15分' },
        { time: '15:45-16:15', activity: '冰淇淋', location: 'Gelateria La Carraia', address: 'Piazza Nazario Sauro, 25r', note: '休息' },
        { time: '16:30', activity: '返回住宿取行李', location: 'Hotel Ester', note: '務必準時' },
        { time: '16:45', activity: '前往車站', location: 'Firenze S.M.N.', note: '步行8-10分鐘' },
        { time: '17:20-19:34', activity: '佛羅倫斯→威尼斯', location: 'Frecciarossa 9426', note: '已訂指定座位', booked: true },
        { time: '19:34', activity: '抵達威尼斯', location: 'Venezia Santa Lucia', address: 'Cannaregio, Venezia', note: '一出站即是大運河' },
        { time: '19:45-20:00', activity: '前往飯店', location: "Hotel Ca' Dogaresse", address: 'Cannaregio 1018, 30121 Venezia VE', note: '步行5-10分鐘' },
        { time: '20:00', activity: 'Check-in', location: "Hotel Ca' Dogaresse", note: '先放行李、稍作休息' },
        { time: '20:30-21:45', activity: '晚餐', location: 'Trattoria Bar Pontini', address: 'Cannaregio 1268, 30121 Venezia VE', note: '強烈建議訂位，海鮮拼盤', booked: true },
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
      title: '威尼斯經典主島・貢多拉體驗',
      type: 'sightseeing',
      activities: [
        { time: '09:30', activity: '聖馬可廣場', location: 'Piazza San Marco', address: 'Piazza San Marco, 30124 Venezia VE', note: '早到人少、好拍照' },
        { time: '10:00-12:00', activity: '總督宮', location: 'Palazzo Ducale', address: 'Piazza San Marco, 1, 30124 Venezia VE', note: '務必提前訂免排隊票', booked: true },
        { time: '12:15-12:45', activity: '嘆息橋（外觀）', location: 'Ponte dei Sospiri', address: '30124 Venezia VE', note: '外觀拍照即可' },
        { time: '13:00-14:00', activity: '午餐（快速）', location: "Dal Moro's Fresh Pasta To Go", address: 'Castello 5255, 30122 Venezia VE', note: '外帶義大利麵' },
        { time: '14:30-15:30', activity: '市區漫步', location: '里阿爾托橋 → 小巷', address: 'Ponte di Rialto', note: '迷路是精華' },
        { time: '16:00-16:30', activity: '貢多拉體驗', location: 'Gondola Accademia', address: 'Campo della Carità, 30123 Venezia VE', note: '€90 / 30分鐘' },
        { time: '17:00-18:00', activity: '日落', location: "Ponte dell'Accademia", note: '欣賞大運河日落' },
        { time: '20:00-21:30', activity: '晚餐', location: 'Trattoria ai Cugnai dal 1911', address: "Calle Nuova Sant'Agnese, 857, 30123 Venezia VE", note: '墨魚義麵，建議訂位', booked: true }
      ],
      hotel: "Hotel Ca' Dogaresse"
    },
    {
      day: 8,
      date: '2026-02-25',
      weekday: '三',
      city: '威尼斯',
      country: '義大利',
      title: '彩色島嶼慢旅行（Burano＋Murano）',
      type: 'sightseeing',
      activities: [
        { time: '09:30', activity: '搭船前往彩色島', location: 'Vaporetto', note: '建議早出發' },
        { time: '10:30-13:00', activity: '彩色島散步', location: 'Burano', note: '拍照、自由走' },
        { time: '13:00-14:30', activity: '午餐', location: 'In Riva bistrò', address: 'Fondamenta di Cavanella, 19, 30142 Venezia VE', note: '可以在河邊看風景' },
        { time: '14:30-16:00', activity: '玻璃島', location: 'Murano', note: '玻璃工藝參觀' },
        { time: '16:30', activity: '返回主島', location: 'Vaporetto', note: '4.1/4.2/12線' },
        { time: '18:00', activity: '甜點', location: 'Suso Gelatoteca', address: 'San Marco 5453', note: '義式冰淇淋' },
        { time: '20:00-21:30', activity: '晚餐', location: 'Il Paradiso Perduto', address: 'Cannaregio 2540', note: 'Cicchetti 體驗' }
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
        { time: '07:18', activity: '威尼斯→蘇黎世', location: 'Venezia S. Lucia → Zürich HB', note: '全程約7小時，轉車1次', booked: true },
        { time: '12:00', activity: '午餐（火車上）', location: '自備簡餐', note: '轉車時補充水／水果' },
        { time: '14:27', activity: '抵達蘇黎世', location: 'Zürich HB', address: 'Bahnhofplatz, Zürich', note: '抵達時間漂亮' },
        { time: '15:00', activity: 'Check-in', location: 'ibis Styles Zurich City Center', address: 'Stationsstrasse 7, 8003 Zürich' },
        { time: '16:30-17:30', activity: '老城定點散步', location: '林登霍夫山（Lindenhof）', address: 'Lindenhof, Zürich', note: '俯瞰老城＋河景' },
        { time: '17:30-18:15', activity: '舊城區定點走走', location: '蘇黎世老城（Altstadt）', address: 'Altstadt, Zürich', note: '不走遠、不趕行程' },
        { time: '19:30-21:00', activity: '晚餐（瑞士菜）', location: 'Zeughauskeller', address: 'Bahnhofstrasse 28A, Zürich', note: 'Zürcher Geschnetzeltes', booked: true }
      ],
      reminders: ['瑞士火車準時到分鐘：提早5-10分鐘月台等候', '行李多：盡量選車廂中段上下', '超市 Migros / Coop 是補給神隊友', '第一天先「不排高山」，讓身體適應'],
      hotel: 'ibis Styles Zurich City Center'
    },
    {
      day: 10,
      date: '2026-02-27',
      weekday: '五',
      city: '因特拉肯',
      country: '瑞士',
      title: '蘇黎世→因特拉肯（阿爾卑斯前奏日）',
      type: 'travel',
      activities: [
        { time: '08:30', activity: '早餐', location: '蘇黎世住宿或附近咖啡廳', note: '不趕時間，簡單即可' },
        { time: '09:00', activity: '退房、前往車站', location: 'Zürich HB', address: 'Bahnhofplatz, 8001 Zürich', note: '瑞士火車準時，提早到月台' },
        { time: '09:32', activity: '蘇黎世→因特拉肯', location: 'Zürich HB → Interlaken Ost', note: '車程約1小時56分，轉乘1次', booked: true },
        { time: '11:28', activity: '抵達因特拉肯', location: 'Interlaken Ost', note: '出站即可看到雪山' },
        { time: '11:40', activity: '前往住宿／寄放行李', location: 'ARNOLDS Bed & Breakfast', address: 'Parkstrasse 3, 3800 Interlaken', note: '寄放行李' },
        { time: '13:00', activity: '午餐', location: '因特拉肯東站附近餐廳', note: '輕食為主，留體力' },
        { time: '14:00', activity: 'Check-in', location: 'ARNOLDS Bed & Breakfast', note: '入住時間14:00', booked: true },
        { time: '15:00', activity: '湖畔散步', location: '布里恩茨湖 Brienz 或 圖恩湖 Thun', note: '不趕行程，純放空' },
        { time: '18:30', activity: '晚餐', location: '因特拉肯當地餐廳', note: '早吃早睡，為隔天上山' }
      ],
      hotel: 'ARNOLDS Bed & Breakfast'
    },
    {
      day: 11,
      date: '2026-02-28',
      weekday: '六',
      city: '因特拉肯/少女峰',
      country: '瑞士',
      title: '少女峰一日（瑞士高光日）',
      type: 'sightseeing',
      activities: [
        { time: '07:30', activity: '早餐', location: '住宿內或東站附近', address: 'Untere Bönigstrasse 3a, Interlaken', note: '務必吃一點熱的' },
        { time: '08:30', activity: '出發前往少女峰', location: 'Interlaken Ost', note: '早出發天氣穩定度較高' },
        { time: '08:30-11:00', activity: '登山列車', location: 'Interlaken → Grindelwald Terminal → Eiger Express → Jungfraujoch', note: '搭乘纜車＋齒軌火車', booked: true },
        { time: '11:00-13:00', activity: '少女峰山頂', location: 'Sphinx Observatory', address: 'Jungfraujoch', note: '冰宮、觀景台、拍照' },
        { time: '13:00', activity: '午餐', location: 'Jungfraujoch 餐廳', note: '價格高，吃簡單即可' },
        { time: '14:00', activity: '下山途中停留', location: 'Grindelwald 或 Lauterbrunnen', note: '視體力彈性調整' },
        { time: '17:00', activity: '返回因特拉肯', location: 'Interlaken Ost', note: '傍晚前回到平地' },
        { time: '19:30', activity: '晚餐', location: 'Restaurant Taverne（瑞士起司鍋）', address: 'Höheweg 74, 3800 Interlaken', note: '慶祝成功上少女峰', booked: true }
      ],
      reminders: ['少女峰早上天氣成功率最高', '不用貪景點，「看到雪山＋走一段」就很美', '起司鍋吃不完很正常，不用硬撐', '若天氣不好：直接把山頂時間縮短，留力氣'],
      hotel: 'ARNOLDS Bed & Breakfast'
    },
    {
      day: 12,
      date: '2026-03-01',
      weekday: '日',
      city: '因特拉肯→琉森→蘇黎世',
      country: '瑞士',
      title: '黃金列車・琉森老城',
      type: 'travel',
      activities: [
        { time: '08:30', activity: '早餐', location: '住宿或 Interlaken Ost 附近', note: '輕食即可，避免太撐' },
        { time: '09:04', activity: '因特拉肯→琉森', location: 'Luzern–Interlaken Express', note: '黃金列車段，務必坐窗邊', booked: true },
        { time: '10:00', activity: '退房', location: '因特拉肯住宿', note: '退房時間通常10:00' },
        { time: '11:00', activity: '抵達琉森、寄放行李', location: 'Luzern Bahnhof', note: '車站有寄物櫃' },
        { time: '11:30', activity: '琉森舊城漫步', location: 'Altstadt', note: '木橋＋彩繪牆' },
        { time: '12:30', activity: '午餐', location: 'Rathaus Brauerei', address: 'Kornmarkt 2, Luzern', note: '在地啤酒屋' },
        { time: '14:00', activity: '卡貝爾橋＋湖畔', location: 'Kapellbrücke', note: '瑞士代表畫面' },
        { time: '15:00', activity: '琉森→蘇黎世', location: 'SBB 火車', note: '車程約45分', booked: true },
        { time: '16:00', activity: '抵達蘇黎世、Check-in', location: 'Numa Zurich Turi', note: '15:00後可入住' },
        { time: '18:30', activity: '晚餐', location: 'Sternen Grill / Zeughauskeller', note: '輕鬆收尾' }
      ],
      hotel: 'Numa Zurich Turi'
    },
    {
      day: 13,
      date: '2026-03-02',
      weekday: '一',
      city: '瑞士',
      country: '瑞士',
      title: '冰河列車體驗日（Chur→Andermatt）',
      type: 'sightseeing',
      activities: [
        { time: '07:30', activity: '起床、早餐', location: '住宿附近 / 車站簡單早餐', note: '建議輕食，方便移動' },
        { time: '08:00', activity: '蘇黎世→庫爾', location: 'Zürich HB → Chur', note: '車程約1小時15分' },
        { time: '09:00', activity: 'Chur → Disentis', location: 'RhB 普通列車', note: '冰河列車同一路線，雪山＋萊茵河景' },
        { time: '10:05', activity: '抵達 Disentis', location: 'Disentis/Mustér', address: 'Bahnhofstrasse, Disentis', note: '月台轉車' },
        { time: '10:20', activity: 'Disentis → Andermatt', location: 'MGB 普通列車', note: '山谷雪景、小村落' },
        { time: '11:30', activity: '抵達 Andermatt', location: 'Andermatt 車站', address: 'Gotthardstrasse', note: '不趕行程' },
        { time: '12:00', activity: '午餐', location: 'Andermatt 鎮上餐廳', note: '瑞士小鎮暖胃午餐' },
        { time: '下午', activity: 'Andermatt 小鎮休息 / 咖啡', location: 'Andermatt', note: '調整體力' },
        { time: '15:30', activity: 'Andermatt → 蘇黎世', location: 'SBB 火車', note: '經 Göschenen 轉車' },
        { time: '17:30', activity: '返回蘇黎世', location: 'Zürich HB', note: '最後採購紀念品' },
        { time: '19:00', activity: '晚餐', location: '蘇黎世市區', note: '瑞士最後一晚' }
      ],
      hotel: 'Numa Zurich Turi'
    },
    {
      day: 14,
      date: '2026-03-03',
      weekday: '二',
      city: '蘇黎世→新加坡',
      country: '瑞士/新加坡',
      title: '蘇黎世市區＋返程準備',
      type: 'departure',
      activities: [
        { time: '09:00', activity: '早餐', location: '住宿附近', note: '輕鬆吃' },
        { time: '10:00', activity: '退房', location: 'Numa Zurich Turi', note: '行李可寄放' },
        { time: '11:00', activity: '班霍夫大街', location: 'Bahnhofstrasse', note: '瑞士最繁華購物街' },
        { time: '12:30', activity: '午餐', location: 'Sprüngli Café', note: '瑞士百年甜點名店' },
        { time: '14:00', activity: '利馬特河散步', location: 'Limmat River', note: '最後的蘇黎世風景' },
        { time: '17:00', activity: '回住宿取行李', location: 'Numa Zurich Turi', note: '準備前往機場' },
        { time: '18:30', activity: '前往機場', location: 'Zürich HB → ZRH', note: '火車約10分鐘' },
        { time: '22:40', activity: '搭乘 LX176 航班', location: 'ZRH 蘇黎世 → SIN 樟宜 T2', note: 'LX176 瑞士國航，飛行12小時20分' }
      ],
      reminders: ['記得保留換洗衣物在登機箱', '機場可退稅', 'Sprüngli 可買伴手禮']
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
        { time: '07:45', activity: 'Check-out', location: 'ibis budget Ruby', note: '行李直接帶走' },
        { time: '08:00', activity: '前往機場', location: 'Grab / MRT', note: '建議 Grab，省力' },
        { time: '08:25', activity: '抵達 T3', location: '樟宜機場 T3', note: '時間非常充裕' },
        { time: '09:00-11:00', activity: '貴賓室休息', location: 'SATS Premier Lounge', address: 'T3管制區', note: '早餐＋淋浴＋充電' },
        { time: '11:40', activity: 'SQ878 起飛', location: 'SIN → TPE', note: '完美收尾' },
        { time: '16:20', activity: '抵達台北', location: 'TPE 桃園 T2', note: '恭喜蘋果與橘子，圓滿完成美好旅程！' }
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
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
