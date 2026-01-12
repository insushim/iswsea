// 숲속의바다 펜션 데이터
export const pensionInfo = {
  name: "숲속의바다",
  nameEn: "SEA IN THE FOREST",
  tagline: "서해의 노을과 소나무 향이 머무는 곳",
  description: "태안 안면도의 소나무 숲과 서해 바다가 만나는 곳. 전 객실 오션뷰, 개별 바베큐 테라스, 프라이빗 스파로 온전히 나만의 시간을 위한 특별한 공간입니다.",
  phone: "010-5613-1419",
  address: "충남 태안군 이원면 원이로 2170-5",
  instagram: "stay_forestsea",
  checkIn: "15:00",
  checkOut: "11:00",
  businesses: [
    { name: "숲속동", owner: "정규정", bizNumber: "874-71-00774", license: "제2025-71호" },
    { name: "바다동", owner: "이병국", bizNumber: "849-60-00660", license: "제2023-53호" },
  ],
  yapenId: "33340",
  naverPlaceId: "12146230",
  naverBookingUrl: "https://map.naver.com/p/entry/place/12146230?placePath=/booking",
};

export const heroImages = [
  {
    src: "/images/gallery/main/1.jpg",
    alt: "펜션 전경",
    title: "숲과 바다가 만나는 곳",
    subtitle: "태안 안면도의 특별한 휴식처"
  },
  {
    src: "/images/gallery/special1/3.jpg",
    alt: "탁트인 바다 전망",
    title: "눈 앞에 펼쳐진 바다",
    subtitle: "전 객실 오션뷰 프라이빗 테라스"
  },
  {
    src: "/images/gallery/special1/7.jpg",
    alt: "서해 일몰",
    title: "황금빛 서해 노을",
    subtitle: "잊지 못할 일몰 명소"
  },
  {
    src: "/images/gallery/room1/1.jpg",
    alt: "아늑한 객실 내부",
    title: "따뜻한 감성 인테리어",
    subtitle: "편안함과 아늑함이 공존하는 공간"
  },
  {
    src: "/images/gallery/special2/3.jpg",
    alt: "프라이빗 스파",
    title: "프라이빗 스파",
    subtitle: "전 객실 개별 스파 완비"
  },
  {
    src: "/images/gallery/special4/1.jpg",
    alt: "바베큐 테라스",
    title: "개별 바베큐 테라스",
    subtitle: "바다를 바라보며 즐기는 바베큐"
  },
  {
    src: "/images/gallery/special5/1.jpg",
    alt: "수영장",
    title: "바다가 보이는 수영장",
    subtitle: "여름의 특별한 추억"
  },
  {
    src: "/images/gallery/special6/1.jpg",
    alt: "소나무 숲",
    title: "소나무 향 가득한 힐링",
    subtitle: "자연 속에서의 온전한 휴식"
  },
];

export const rooms = [
  {
    id: "roomba",
    name: "룸바",
    nameEn: "ROOMBA",
    description: "따뜻하고 포근한 인테리어의 객실과 창문밖에 보이는 소나무 그 너머의 시원한 바다를 보며 여행의 여유로움을 즐겨보세요.",
    features: ["오션뷰", "개별 테라스", "바베큐", "스파"],
    images: Array.from({ length: 12 }, (_, i) => ({
      src: `/images/gallery/room1/${i + 1}.jpg`,
      alt: `룸바 ${i + 1}`,
    })),
    mainImage: "/images/gallery/sub2_room1_img1.jpg",
    capacity: { standard: 2, max: 2 },
    size: "30㎡ / 9평",
    prices: {
      weekday: 90000,    // 주중 (월~목)
      friday: 100000,    // 금요일
      weekend: 130000,   // 주말 (토, 공휴일 전일)
      sunday: 90000,     // 일요일
    },
  },
  {
    id: "landora",
    name: "란도라",
    nameEn: "LANDORA",
    description: "넓은 거실과 아늑한 침실이 조화를 이루는 공간에서 가족과 함께 특별한 시간을 보내세요.",
    features: ["오션뷰", "개별 테라스", "바베큐", "스파"],
    images: Array.from({ length: 10 }, (_, i) => ({
      src: `/images/gallery/room3/${i + 1}.jpg`,
      alt: `란도라 ${i + 1}`,
    })),
    mainImage: "/images/gallery/room3/1.jpg",
    capacity: { standard: 2, max: 2 },
    size: "30㎡ / 9평",
    prices: {
      weekday: 90000,
      friday: 100000,
      weekend: 130000,
      sunday: 90000,
    },
  },
  {
    id: "bluemoon",
    name: "블루문",
    nameEn: "BLUEMOON",
    description: "푸른 달빛 아래 바다를 바라보며 로맨틱한 시간을 보낼 수 있는 커플 맞춤 객실입니다.",
    features: ["오션뷰", "개별 테라스", "바베큐", "스파"],
    images: Array.from({ length: 10 }, (_, i) => ({
      src: `/images/gallery/room4/${i + 1}.jpg`,
      alt: `블루문 ${i + 1}`,
    })),
    mainImage: "/images/gallery/room4/1.jpg",
    capacity: { standard: 2, max: 2 },
    size: "30㎡ / 9평",
    prices: {
      weekday: 90000,
      friday: 100000,
      weekend: 130000,
      sunday: 90000,
    },
  },
  {
    id: "lora",
    name: "로라",
    nameEn: "LORA",
    description: "모던하면서도 편안한 분위기의 객실에서 일상의 피로를 풀어보세요.",
    features: ["오션뷰", "개별 테라스", "바베큐", "스파"],
    images: Array.from({ length: 10 }, (_, i) => ({
      src: `/images/gallery/room5/${i + 1}.jpg`,
      alt: `로라 ${i + 1}`,
    })),
    mainImage: "/images/gallery/room5/1.jpg",
    capacity: { standard: 2, max: 3 },
    size: "40㎡ / 12평",
    prices: {
      weekday: 110000,
      friday: 120000,
      weekend: 160000,
      sunday: 110000,
    },
  },
  {
    id: "elle",
    name: "엘르",
    nameEn: "ELLE",
    description: "우아하고 세련된 인테리어가 돋보이는 감각적인 공간입니다.",
    features: ["오션뷰", "개별 테라스", "바베큐", "스파"],
    images: Array.from({ length: 10 }, (_, i) => ({
      src: `/images/gallery/room6/${i + 1}.jpg`,
      alt: `엘르 ${i + 1}`,
    })),
    mainImage: "/images/gallery/room6/1.jpg",
    capacity: { standard: 2, max: 3 },
    size: "40㎡ / 12평",
    prices: {
      weekday: 110000,
      friday: 120000,
      weekend: 160000,
      sunday: 110000,
    },
  },
  {
    id: "angela",
    name: "안젤라",
    nameEn: "ANGELA",
    description: "천사처럼 포근하고 아늑한 분위기에서 편안한 휴식을 취해보세요.",
    features: ["오션뷰", "개별 테라스", "바베큐", "스파"],
    images: Array.from({ length: 10 }, (_, i) => ({
      src: `/images/gallery/room7/${i + 1}.jpg`,
      alt: `안젤라 ${i + 1}`,
    })),
    mainImage: "/images/gallery/room7/1.jpg",
    capacity: { standard: 2, max: 2 },
    size: "30㎡ / 9평",
    prices: {
      weekday: 90000,
      friday: 100000,
      weekend: 130000,
      sunday: 90000,
    },
  },
  {
    id: "sahara",
    name: "사하라",
    nameEn: "SAHARA",
    description: "이국적인 분위기와 함께 특별한 여행의 기분을 느껴보세요.",
    features: ["오션뷰", "개별 테라스", "바베큐", "스파"],
    images: Array.from({ length: 10 }, (_, i) => ({
      src: `/images/gallery/room8/${i + 1}.jpg`,
      alt: `사하라 ${i + 1}`,
    })),
    mainImage: "/images/gallery/room8/1.jpg",
    capacity: { standard: 2, max: 2 },
    size: "30㎡ / 9평",
    prices: {
      weekday: 90000,
      friday: 100000,
      weekend: 130000,
      sunday: 90000,
    },
  },
  {
    id: "margaret",
    name: "마가렛",
    nameEn: "MARGARET",
    description: "꽃처럼 화사하고 밝은 분위기의 객실에서 힐링 타임을 즐기세요.",
    features: ["오션뷰", "개별 테라스", "바베큐", "스파"],
    images: Array.from({ length: 10 }, (_, i) => ({
      src: `/images/gallery/room9/${i + 1}.jpg`,
      alt: `마가렛 ${i + 1}`,
    })),
    mainImage: "/images/gallery/room9/1.jpg",
    capacity: { standard: 2, max: 2 },
    size: "30㎡ / 9평",
    prices: {
      weekday: 90000,
      friday: 100000,
      weekend: 130000,
      sunday: 90000,
    },
  },
  {
    id: "rococo",
    name: "로코코",
    nameEn: "ROCOCO",
    description: "클래식하면서도 화려한 로코코 스타일의 특별한 공간입니다.",
    features: ["오션뷰", "개별 테라스", "바베큐", "스파"],
    images: Array.from({ length: 10 }, (_, i) => ({
      src: `/images/gallery/room10/${i + 1}.jpg`,
      alt: `로코코 ${i + 1}`,
    })),
    mainImage: "/images/gallery/room10/1.jpg",
    capacity: { standard: 2, max: 2 },
    size: "30㎡ / 9평",
    prices: {
      weekday: 90000,
      friday: 100000,
      weekend: 130000,
      sunday: 90000,
    },
  },
  {
    id: "rosanna",
    name: "로잔나VIP",
    nameEn: "ROSANNA VIP",
    description: "장미처럼 아름답고 로맨틱한 분위기의 VIP 객실입니다.",
    features: ["오션뷰", "개별 테라스", "바베큐", "스파"],
    images: Array.from({ length: 10 }, (_, i) => ({
      src: `/images/gallery/room11/${i + 1}.jpg`,
      alt: `로잔나VIP ${i + 1}`,
    })),
    mainImage: "/images/gallery/room11/1.jpg",
    capacity: { standard: 2, max: 4 },
    size: "66㎡ / 20평",
    prices: {
      weekday: 150000,
      friday: 160000,
      weekend: 190000,
      sunday: 150000,
    },
  },
  {
    id: "momoka",
    name: "모모카VIP",
    nameEn: "MOMOKA VIP",
    description: "복숭아꽃처럼 사랑스럽고 따뜻한 분위기의 VIP 공간입니다.",
    features: ["오션뷰", "개별 테라스", "바베큐", "스파"],
    images: Array.from({ length: 10 }, (_, i) => ({
      src: `/images/gallery/room12/${i + 1}.jpg`,
      alt: `모모카VIP ${i + 1}`,
    })),
    mainImage: "/images/gallery/room12/1.jpg",
    capacity: { standard: 2, max: 4 },
    size: "66㎡ / 20평",
    prices: {
      weekday: 150000,
      friday: 160000,
      weekend: 190000,
      sunday: 150000,
    },
  },
  {
    id: "charleston",
    name: "찰스톤",
    nameEn: "CHARLESTON",
    description: "빈티지한 매력과 현대적 편안함이 조화를 이루는 대형 객실입니다.",
    features: ["오션뷰", "개별 테라스", "바베큐", "스파"],
    images: Array.from({ length: 10 }, (_, i) => ({
      src: `/images/gallery/room13/${i + 1}.jpg`,
      alt: `찰스톤 ${i + 1}`,
    })),
    mainImage: "/images/gallery/room13/1.jpg",
    capacity: { standard: 6, max: 8 },
    size: "129㎡ / 39평",
    prices: {
      weekday: 250000,
      friday: 280000,
      weekend: 330000,
      sunday: 250000,
    },
  },
];

export const specials = [
  {
    id: "ocean-view",
    name: "바다전망",
    nameEn: "OCEAN VIEW",
    number: "01",
    description: "숲속의바다 펜션의 가장 큰 장점은 모든 객실에서 바다가 보인다는 것입니다. 각 객실마다 독립적인 개별 테라스에서 바다와 함께 차 한잔의 여유를 즐겨보세요.",
    images: Array.from({ length: 10 }, (_, i) => ({
      src: `/images/gallery/special1/${i + 1}.jpg`,
      alt: `바다전망 ${i + 1}`,
    })),
    icon: "Waves",
  },
  {
    id: "spa",
    name: "SPA",
    nameEn: "PRIVATE SPA",
    number: "02",
    description: "전 객실에 프라이빗 스파가 구비되어 있어 언제든 따뜻한 물에 몸을 담그고 여행의 피로를 풀 수 있습니다.",
    images: Array.from({ length: 8 }, (_, i) => ({
      src: `/images/gallery/special2/${i + 1}.jpg`,
      alt: `스파 ${i + 1}`,
    })),
    icon: "Sparkles",
  },
  {
    id: "tidal-flat",
    name: "갯벌체험",
    nameEn: "TIDAL FLAT",
    number: "03",
    description: "펜션 바로 앞 갯벌에서 조개캐기, 게잡기 등 다양한 갯벌 체험을 즐길 수 있습니다. 아이들에게 잊지 못할 추억을 선물하세요.",
    images: Array.from({ length: 8 }, (_, i) => ({
      src: `/images/gallery/special3/${i + 1}.jpg`,
      alt: `갯벌체험 ${i + 1}`,
    })),
    icon: "Shell",
  },
  {
    id: "bbq",
    name: "바베큐 개별테라스",
    nameEn: "PRIVATE BBQ",
    number: "04",
    description: "각 객실 앞에 독립된 바베큐 테라스가 있어 프라이빗하게 바베큐를 즐길 수 있습니다. 바다를 바라보며 맛있는 고기를 구워보세요.",
    images: Array.from({ length: 8 }, (_, i) => ({
      src: `/images/gallery/special4/${i + 1}.jpg`,
      alt: `바베큐 ${i + 1}`,
    })),
    icon: "Flame",
  },
  {
    id: "pool",
    name: "수영장과 모래해변",
    nameEn: "POOL & BEACH",
    number: "05",
    description: "바다가 보이는 수영장과 펜션 전용 모래해변에서 여름의 즐거움을 만끽하세요.",
    images: Array.from({ length: 8 }, (_, i) => ({
      src: `/images/gallery/special5/${i + 1}.jpg`,
      alt: `수영장 ${i + 1}`,
    })),
    icon: "Droplets",
  },
  {
    id: "cafe",
    name: "야외카페 & 산책로",
    nameEn: "OUTDOOR CAFE",
    number: "06",
    description: "소나무 숲 사이로 이어진 산책로와 야외 카페에서 자연과 함께하는 여유로운 시간을 보내세요.",
    images: Array.from({ length: 8 }, (_, i) => ({
      src: `/images/gallery/special6/${i + 1}.jpg`,
      alt: `야외카페 ${i + 1}`,
    })),
    icon: "Coffee",
  },
  {
    id: "garden",
    name: "바다꽃정원",
    nameEn: "SEA FLOWER GARDEN",
    number: "07",
    description: "4계절 내내 아름다운 꽃들이 피어나는 정원에서 인생샷을 남겨보세요.",
    images: Array.from({ length: 8 }, (_, i) => ({
      src: `/images/gallery/special7/${i + 1}.jpg`,
      alt: `꽃정원 ${i + 1}`,
    })),
    icon: "Flower2",
  },
];

export const tours = [
  {
    id: "ggujinamu",
    name: "꾸지나무골해수욕장",
    distance: "차량 6분",
    description: "작고 아담한 해변이 특징이고, '아늑하고 정겹다'는 표현이 어울릴 듯한 그런 곳입니다.",
    images: [
      "/images/gallery/tour1/1.jpg",
      "/images/gallery/tour1/2.jpg",
      "/images/gallery/tour1/3.jpg",
    ],
  },
  {
    id: "mandae",
    name: "만대포구",
    distance: "차량 10분",
    description: "이원반도 끝자락의 아늑한 포구. 신선한 회와 매운탕을 맛볼 수 있으며, 삼형제바위까지 걸어갈 수 있습니다.",
    images: [
      "/images/gallery/tour2/1.jpg",
      "/images/gallery/tour2/2.jpg",
      "/images/gallery/tour2/3.jpg",
    ],
  },
  {
    id: "sinduri",
    name: "태안 신두리 해안사구",
    distance: "차량 30분",
    description: "우리나라 최대의 해안사구 지대. 사막에서만 볼 수 있는 독특한 모래언덕이 아름다운 경관을 연출합니다.",
    images: [
      "/images/gallery/tour3/1.jpg",
      "/images/gallery/tour3/2.jpg",
      "/images/gallery/tour3/3.jpg",
    ],
  },
  {
    id: "cheollipo",
    name: "천리포수목원",
    distance: "차량 50분",
    description: "약 60ha 규모의 수목원으로 다양한 식물 종류들을 감상할 수 있는 힐링 명소입니다.",
    images: [
      "/images/gallery/tour4/1.jpg",
      "/images/gallery/tour4/2.jpg",
      "/images/gallery/tour4/3.jpg",
    ],
  },
  {
    id: "anmyeondo",
    name: "안면도 자연휴양림",
    distance: "차량 1시간",
    description: "울창한 소나무 숲과 함께 전망대에서 망망대해 서해를 조망할 수 있는 자연 휴식처입니다.",
    images: [
      "/images/gallery/tour5/1.jpg",
      "/images/gallery/tour5/2.jpg",
      "/images/gallery/tour5/3.jpg",
    ],
  },
  {
    id: "jurassic",
    name: "안면도 쥬라기박물관",
    distance: "차량 50분",
    description: "고생태 공룡들의 진화과정을 표본 화석으로 전시한 공룡전문 자연사 박물관입니다.",
    images: [
      "/images/gallery/tour6/1.jpg",
      "/images/gallery/tour6/2.jpg",
      "/images/gallery/tour6/3.jpg",
    ],
  },
];

export const priceInfo = {
  extraPerson: 20000,
  freeAge: "유치원 미만",
  bbqPrices: [
    { persons: "2~4인", price: 20000 },
    { persons: "5~8인", price: 30000 },
    { persons: "9인 이상", price: 40000 },
  ],
  notices: [
    "미성년자는 보호자 동반 없이 이용하실 수 없습니다.",
    "반려동물은 타 객실 및 손님을 위해 입실이 불가합니다. (동반 입실 시 당일 예약 취소)",
    "객실 내에서는 절대 금연입니다.",
    "주중: 일~금 / 금요일: 금요일 요금 / 주말: 토요일, 법정공휴일 전날",
  ],
};

export const navItems = [
  { name: "소개", href: "#about" },
  { name: "객실", href: "#rooms" },
  { name: "시설", href: "#special" },
  { name: "여행지", href: "#tour" },
  { name: "오시는길", href: "#location" },
  { name: "이용안내", href: "#guide" },
  { name: "예약안내", href: "#reservation" },
  { name: "공지사항", href: "#notice" },
];
