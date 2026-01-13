import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface NoticeItem {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
  active: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  period: string;
  description: string;
  highlight?: string;
  conditions: string[];
  badge?: string;
  color: string;
  active: boolean;
}

export interface RoomPrice {
  roomId: string;
  weekday: number;
  friday: number;
  weekend: number;
  peak: number;
}

interface AdminState {
  // 인증
  isAuthenticated: boolean;
  adminPassword: string;

  // 공지사항
  notices: NoticeItem[];

  // 이벤트
  events: EventItem[];

  // 객실 가격
  roomPrices: RoomPrice[];

  // 팝업 설정
  popupEnabled: boolean;

  // Actions
  login: (password: string) => boolean;
  logout: () => void;
  setAdminPassword: (password: string) => void;

  // Notice actions
  addNotice: (notice: Omit<NoticeItem, "id">) => void;
  updateNotice: (id: string, notice: Partial<NoticeItem>) => void;
  deleteNotice: (id: string) => void;

  // Event actions
  addEvent: (event: Omit<EventItem, "id">) => void;
  updateEvent: (id: string, event: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  // Popup actions
  setPopupEnabled: (enabled: boolean) => void;

  // Room price actions
  updateRoomPrice: (roomId: string, prices: Partial<RoomPrice>) => void;
}

const defaultNotices: NoticeItem[] = [
  {
    id: "1",
    title: "2024년 성수기 예약 안내",
    date: "2024.06.01",
    content: `안녕하세요. 숲속의바다 펜션입니다.

2024년 여름 성수기 예약 관련하여 안내 드립니다.

■ 성수기 기간: 2024년 7월 15일 ~ 8월 20일
■ 예약 오픈: 2024년 6월 15일 오전 10시

성수기 기간에는 연박 예약을 우선 받고 있으며,
1박 예약은 잔여 객실에 한하여 예약 가능합니다.

많은 관심 부탁드립니다.
감사합니다.`,
    important: true,
    active: true,
  },
  {
    id: "2",
    title: "바베큐장 이용 안내",
    date: "2024.05.15",
    content: `바베큐장 이용 관련 안내 드립니다.

■ 이용 시간: 체크인 ~ 오후 10시까지
■ 이용 요금:
  - 2~4인: 20,000원
  - 5~8인: 30,000원
  - 9인 이상: 40,000원

■ 포함 사항: 숯, 그릴, 집게, 가위

※ 식재료는 별도 준비해 주셔야 합니다.
※ 이용 후 정리정돈 부탁드립니다.`,
    important: false,
    active: true,
  },
  {
    id: "3",
    title: "반려동물 동반 불가 안내",
    date: "2024.04.20",
    content: `숲속의바다 펜션은 반려동물 동반 입실이 불가합니다.

타 객실 손님들의 편안한 휴식을 위해
반려동물 동반은 정중히 사양하고 있습니다.

반려동물 동반 입실 시 당일 예약 취소 처리되오니
이 점 양해 부탁드립니다.

감사합니다.`,
    important: true,
    active: true,
  },
  {
    id: "4",
    title: "수영장 운영 안내",
    date: "2024.04.01",
    content: `수영장은 여름 성수기 기간에만 운영됩니다.

■ 운영 기간: 7월 ~ 8월
■ 운영 시간: 오전 10시 ~ 오후 6시

※ 수영장 이용 시 안전에 유의해 주세요.
※ 수영장 내 음식물 반입 금지
※ 어린이는 보호자 동반 필수`,
    important: false,
    active: true,
  },
];

const defaultEvents: EventItem[] = [
  {
    id: "1",
    title: "비수기 평일 12시 퇴실 이벤트",
    period: "일요일 ~ 목요일",
    description: "비수기 평일에 체크인하시면 다음날 12시까지 여유롭게 퇴실하실 수 있습니다.",
    highlight: "퇴실 12시",
    conditions: ["성수기, 금요일~토요일, 휴일은 제외됩니다."],
    badge: "평일특가",
    color: "#F5B041",
    active: true,
  },
  {
    id: "2",
    title: "동절기 객실 요금 10% 할인",
    period: "11월 ~ 3월",
    description: "겨울 시즌 주중(일~목) 예약 시 객실 요금 10% 할인 혜택을 드립니다.",
    highlight: "10% 할인",
    conditions: ["금요일~토요일, 휴일은 제외됩니다."],
    badge: "동절기",
    color: "#4A90A4",
    active: true,
  },
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      adminPassword: "",
      notices: defaultNotices,
      events: defaultEvents,
      roomPrices: [],
      popupEnabled: true,

      login: (password: string) => {
        const storedPassword = get().adminPassword;
        const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "woodinsea2024";
        const isValid = password === (storedPassword || envPassword);
        if (isValid) {
          set({ isAuthenticated: true });
        }
        return isValid;
      },

      logout: () => {
        set({ isAuthenticated: false });
      },

      setAdminPassword: (password: string) => {
        set({ adminPassword: password });
      },

      addNotice: (notice) => {
        const newNotice: NoticeItem = {
          ...notice,
          id: Date.now().toString(),
        };
        set((state) => ({
          notices: [newNotice, ...state.notices],
        }));
      },

      updateNotice: (id, notice) => {
        set((state) => ({
          notices: state.notices.map((n) =>
            n.id === id ? { ...n, ...notice } : n
          ),
        }));
      },

      deleteNotice: (id) => {
        set((state) => ({
          notices: state.notices.filter((n) => n.id !== id),
        }));
      },

      addEvent: (event) => {
        const newEvent: EventItem = {
          ...event,
          id: Date.now().toString(),
        };
        set((state) => ({
          events: [newEvent, ...state.events],
        }));
      },

      updateEvent: (id, event) => {
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id ? { ...e, ...event } : e
          ),
        }));
      },

      deleteEvent: (id) => {
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        }));
      },

      setPopupEnabled: (enabled) => {
        set({ popupEnabled: enabled });
      },

      updateRoomPrice: (roomId, prices) => {
        set((state) => {
          const existing = state.roomPrices.find((r) => r.roomId === roomId);
          if (existing) {
            return {
              roomPrices: state.roomPrices.map((r) =>
                r.roomId === roomId ? { ...r, ...prices } : r
              ),
            };
          }
          return {
            roomPrices: [
              ...state.roomPrices,
              { roomId, weekday: 0, friday: 0, weekend: 0, peak: 0, ...prices },
            ],
          };
        });
      },
    }),
    {
      name: "woodinsea-admin-storage",
    }
  )
);
