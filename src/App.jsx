import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  MapPin,
  Plane,
  Mountain,
  Ship,
  Landmark,
  ClipboardList,
  Calendar,
  Info,
  MountainSnow,
  Calculator,
  ChevronDown,
  ShoppingBag,
  Car,
  AlertTriangle,
} from "lucide-react";

/* =========================
   데이터 (한국어)
   ========================= */
const DATA = {
  overview: {
    title: "전체 일정",
    description: "9월 5일(금) ~ 9월 9일(화) 다낭 • 호이안 • 바나힐 핵심 일정 요약",
    items: [
      { time: "D1", name: "도착 / 체크인: 센터 포인트 다낭 호텔 & 레지던스 ", icon: "plane" },
      { time: "D2", name: "바나힐 • 골든브릿지", icon: "mountain" },
      { time: "D2 밤", name: "마담 란 • 용다리 불쇼", icon: "ship" },
      { time: "D3", name: "호이안 투어 • 쿠킹클래스", icon: "landmark" },
      { time: "D3 밤", name: "소원배 • 야시장", icon: "ship" },
      { time: "D4", name: "오행산 • 마사지 • 야시장", icon: "mountainSnow" },
      { time: "D5", name: "다낭 대성당 • 롯데마트", icon: "landmark" },
    ],
  },
  sections: [
    /* ------------------- DAY 섹션 ------------------- */
    {
      id: "day1",
      category: "DAY 1",
      icon: "plane",
      title: "9/5(금) – 도착 & 체크인",
      places: [
        {
          name: "센터 포인트 다낭 호텔 & 레지던스",
          address: "(다낭 시내)",
          info: {
            입장료: "체크인만 (무료)",
            팁: [
              "공항 → 호텔 이동은 그랩/택시 추천 (베트남 동(VND) 소액 준비)",
              "늦은 체크인 대비 예약 확인서(바우처) 앱/오프라인 보관",
            ],
            챙길것: ["여권/예약확인서", "현금/카드", "간단한 간식", "가벼운 겉옷"],
          },
        },
      ],
    },
    {
      id: "day2-bana",
      category: "DAY 2",
      icon: "mountain",
      title: "9/6(토) – 바나힐 & 마담 란 • 용다리 불쇼",
      places: [
        {
          name: "바나힐 (Bà Nà Hills)",
          address: "Da Nang (케이블카 탑승 후 상부 공원)",
          info: {
            입장료: [
              "성인 약 950,000 VND (현장가)",
              "아동(100–140cm) 약 750,000 VND / 100cm 미만 무료",
              "케이블카+뷔페 콤보: 성인 약 1,150,000 VND",
            ],
            팁: [
              "고도가 높아 선선함 → 얇은 긴팔/편한 신발 필수",
              "혼잡 피하려면 오전 일찍 또는 16시 이후 골든브릿지",
              "내부 식음료 가격 높은 편 → 간단 스낵 지참 추천",
              "전자티켓/사전예매로 대기 단축",
            ],
            챙길것: ["얇은 겉옷", "스니커즈", "모자/선크림", "간식", "보조배터리"],
          },
        },
        {
          name: "마담 란 (저녁)",
          address: "다낭 시내",
          info: {
            입장료: "식사비만",
            팁: ["미슐랭 등재 인기 레스토랑 → 사전 예약 권장"],
            챙길것: ["예약확인", "소액 현금", "물티슈"],
          },
        },
        {
          name: "한강 유람선 & 용다리 불쇼",
          address: "Han River",
          info: {
            입장료: "유람선 요금 별도 (현지 매표처 변동)",
            팁: ["20시 이후 불쇼, 강바람 → 얇은 겉옷 지참", "라스트 보트 시간 확인"],
            챙길것: ["겉옷", "카메라", "현지 유심/데이터"],
          },
        },
      ],
    },
    {
      id: "day3-hoian",
      category: "DAY 3",
      icon: "landmark",
      title: "9/7(일) – 호이안 투어(쿠킹클래스) • 안방 비치 • 소원배 • 야시장",
      places: [
        {
          name: "호이안 투어 (픽업 포함)",
          address: "Hoi An",
          info: {
            입장료: "패키지 요금에 포함 (쿠킹클래스/점심/발마사지)",
            팁: ["로컬 마켓 쇼핑 시 흥정/소매치기 주의", "날씨 덥고 습함 → 수분/휴식"],
            챙길것: ["현지화폐", "여벌 옷", "모자/선크림", "물"],
          },
        },
        {
          name: "안방(An Bang) 비치",
          address: "Hoi An",
          info: {
            입장료: "해변 무료",
            팁: ["비치 타월/방수 파우치 지참", "수영 후 샤워 시설 확인"],
            챙길것: ["수영복/타월", "샌들", "방수팩", "여벌 옷"],
          },
        },
        {
          name: "더 만달라 하우스 (마사지)",
          address: "Hoi An",
          info: {
            입장료: ["시그니처 90분 ~670,000 VND", "키즈 90분 ~500,000 VND"],
            팁: ["사전예약 권장", "마사지 후 수분보충"],
            챙길것: ["예약확인", "팁 소액", "편한 복장"],
          },
        },
        {
          name: "소원배 (야간 유람)",
          address: "Thu Bon River",
          info: {
            입장료: "1–3인 약 170,000 VND / 20분",
            팁: ["야간 라이트업 사진 스팟", "붐빌 때 대기"],
            챙길것: ["보조배터리", "현금 소액", "작은 삼각대(선택)"],
          },
        },
        {
          name: "호이안 야시장",
          address: "Hoi An Night Market",
          info: {
            입장료: "무료 (구매비 별도)",
            팁: ["18–19시대 상대적 한산", "간단 간식(망빙/반미) 맛보기"],
            챙길것: ["현금 소액", "방수 파우치", "손소독제"],
          },
        },
      ],
    },
    {
      id: "day4-marble",
      category: "DAY 4",
      icon: "mountainSnow",
      title: "9/8(월) – 오행산 • 스파 • 야시장",
      places: [
        {
          name: "오행산 (Marble Mountains)",
          address: "Da Nang",
          info: {
            입장료: ["입장 40,000 VND (10세 미만 무료)", "엘리베이터 15,000 VND(편도)", "암부동(Am Phu) 동굴 20,000 VND"],
            팁: ["운영 07:00~17:30 (2시간 여유 권장)", "대리석 바닥 미끄럼 주의 → 운동화 필수", "엘리베이터로 상행, 계단 하행 추천"],
            챙길것: ["운동화", "물/모자/선크림", "현금 소액", "작은 배낭"],
          },
        },
        {
          name: "허벌 부티크 스파",
          address: "미케/논느억 비치 인근",
          info: { 입장료: "시술 비용 별도", 팁: ["미리 예약, 이동 동선 고려"], 챙길것: ["예약확인", "갈아입을 옷", "팁 소액"] },
        },
        {
          name: "선짜 야시장 / 빈원더스 사우스 호이안",
          address: "Da Nang / Hoi An",
          info: {
            입장료: "야시장 무료 (구매비 별도) / 테마파크 별도요금",
            팁: ["야시장 조도 낮음 → 휴대 LED 유용", "소지품 주의"],
            챙길것: ["현금 소액", "휴대 LED", "가벼운 겉옷"],
          },
        },
      ],
    },
    {
      id: "day5-end",
      category: "DAY 5",
      icon: "landmark",
      title: "9/9(화) – 다낭 대성당 & 롯데마트",
      places: [
        {
          name: "다낭 대성당",
          address: "Da Nang City",
          info: { 입장료: "무료", 팁: ["예배 시간/내부 촬영 매너 준수"], 챙길것: ["카메라", "조용한 복장"] },
        },
        {
          name: "롯데마트 다낭점",
          address: "Da Nang City",
          info: { 입장료: "무료 (구매비 별도)", 팁: ["커피/과자 등 기념품 쇼핑 적합"], 챙길것: ["여분 캐리어 공간", "카드/현금", "쇼핑 리스트"] },
        },
      ],
    },

    /* ------------------- 새 카테고리 ------------------- */
    {
      id: "shopping",
      category: "쇼핑리스트",
      icon: "shopping",
      title: "베트남 쇼핑리스트",
      /* 구매처별 그룹으로 재구성 */
      groups: [
        {
          title: "🛒 롯데마트",
          items: [
            "코코넛크래커",
            "Ahh 치즈과자",
            "an 쌀과자",
            "체리쉬 (망고 푸딩)",
            "탑젤리 (망고 젤리)",
            "케오데오 (까먹는 젤리)",
            "곰과자",
            "옥수수과자",
            "해바라기씨",
            "커피조이",
            "골든팜 과일청",
            "커피맛 초콜릿",
            "새우소금",
            "후추",
            "꿀",
            "연유",
            "간장",
            "칠리소스",
            "깐껍질 캐슈넛",
            "새우라면",
            "신라면 치즈볶음면",
            "베트남 보드카",
            "치약",
            "쿨샐리더",
          ],
        },
        {
          title: "🎁 기념품샵 (엘스토어)",
          items: ["망고커피", "위즐커피", "코코넛커피", "말린과일", "망고 초콜릿", "마카다미아", "코코넛칩", "꽃차"],
        },
        {
          title: "🏮 한시장 & 야시장",
          items: [
            "크록스 (지니폼 신발류)",
            "원피스",
            "하와이안셔츠",
            "나이키/짝퉁 옷",
            "라탄백",
            "뜨개모자",
            "거북이 줄자",
            "캐리어",
            "카피바라 인형",
          ],
        },
        {
          title: "💊 약국",
          items: [
            "스트렙실 (목 캔디)",
            "타이거밤 (근육통 연고)",
            "베로카 발포비타민",
            "소펠 모기퇴치제",
            "아티소 (간 영양제)",
            "비판텐 (화상·손상 크림)",
            "비나가 (위장약)",
            "비아틴 (선번·화상 크림)",
            "피나돌 (진통제)",
            "URGO (방수 밴드)",
            "사론파스 (파스)",
            "카네스텐 (피부 연고)",
          ],
        },
      ],
    },
    {
      id: "grab",
      category: "그랩 팁",
      icon: "grab",
      title: "그랩 이용 팁",
      items: [
        "🚖 그랩 할인 방법",
        "• 그랩 쿠폰 활용 – 여행 기간 동안 누적 사용 시 10만 원 이상 절약 가능",
        "• 쿠폰 사용으로 2~3만 원 절약 가능",
        "• 가족/일행 모두 가입해서 쿠폰 소진 추천",

        "💳 트래블 패스 (강추)",
        "• 여행자 전용 구독형 할인 (베트남 기준 18,000동, 약 900원)",
        "• 택시 & 배달 할인 모두 적용되어 경제적",

        "✅ 슬기롭게 그랩 타기",
        "• 목적지 방향에서 호출해야 요금 절약",
        "• 차량번호 & 기사님 사진 반드시 확인",
        "• 지도 경로와 실제 경로 일치 여부 확인",
        "• 우발 상황 시 안전센터 버튼으로 고객센터/경찰 신고 가능",

        "✈️ 공항 픽업 서비스 예약",
        "• 도착 항공편 입력 시 자동 시간 조정",
        "• 요금 고정, 공항 내 픽업존에서 탑승",
        "• 개인적으로는 그랩존 활성화 여부 확인 필요",

        "🍔 그랩 배달 추천",
        "• 여행 중 최소 1회 시켜먹기 강추",
        "• 리조트에서도 편하게 식사 가능",
        "• 음식 퀄리티 & 양 만족도 높음",

        "❓ 그랩 Q&A",
        "• 콜 취소 시 환불: 30분 내 처리",
        "• 해외 결제 수수료: 약 4%",
        "• 팀 이용: 목적지 도착 후 팀 못 찾으면 그냥 하차 가능",
        "• 'Currently on Hold': 예약 완료지만 아직 배차 확정 아님",
      ],
    },
    {
      id: "warning",
      category: "주의사항",
      icon: "warning",
      title: "베트남 여행 시 주의사항 Top 10",
      items: [
        "🚨 공항 그랩 사칭 주의",
        "• '내가 그랩이야, 더 싸게 해줄게요' → 바가지 요금 사례 많음",
        "• 반드시 앱 호출 + 차량 번호 일치 확인",

        "🚕 택시 바가지 & 미터기 조작",
        "• 미터기 조작, 잔돈 누락, 흥정 사기 빈번",
        "• 그랩 앱 + 카드 결제로 안전하게 이용",

        "💵 화폐 단위 & 잔돈 사기",
        "• 20,000동과 500,000동 색상 유사 → 착각 유발",
        "• 직접 확인하며 소액권 사용하기",

        "🛵 오토바이 렌트 주의",
        "• 국제면허 없으면 불법, 단속 시 벌금 + 계좌이체 요구 사례",
        "• 분실 사고 많으므로 주차 필수 확인",

        "🚲 시클로(자전거 택시) 사기",
        "• 약속한 금액보다 과도한 요금 요구",
        "• 외진 곳으로 끌고 가 협박 사례 → 혼자 탑승 금지",
        "• 반드시 가격 확정 및 기록 필수",

        "🥶 얼음 & 수돗물 조심",
        "• 물갈이로 고생 사례 많음",
        "• 공장제 얼음 피하고, 아이스버킷 요청하기",

        "🎒 소매치기 & 가방 낚아채기",
        "• 오토바이 절도 사례 존재",
        "• 가방은 앞쪽, 휴대폰은 손에 들지 말기",

        "🙅‍♂️ 낯선 호의 = 사기 가능성",
        "• '사진 찍어줄게요' → 폰 도난",
        "• '이거 체험해봐요' → 돈 요구",
        "• 친절은 경계 필요",

        "💁‍♂️ 팁 문화 오해",
        "• 의무 아님, 만족했을 때만 주기",
        "• 마사지/레스토랑은 포함 여부 확인",

        "🛍️ 시장·야시장 바가지",
        "• 터무니없이 비싼 가격 제시 → 흥정 필수",
        "• 사전 검색, 계산기 사용, 잔돈 확인하기",

        "📞 긴급 연락처",
        "• 경찰: 113",
        "• 응급 병원: 115",
        "• 소방: 114",
        "• 주 베트남 한국 대사관(하노이): +84-24-3831-5110",
        "• 주 호치민 총영사관: +84-28-3824-8531",
        "• 영사콜센터(24시간): +82-2-3210-0404",

        "✅ 핵심 팁",
        "• 지갑은 두 개로 분산 보관",
        "• 얼음·수돗물 피하기",
        "• 낯선 친절은 한번 더 의심하기",
      ],
    },
  ],
  checklist: {
    title: "공통 체크리스트",
    items: [
      "여권/비자(무비자 확인)",
      "현금(VND) 소액/국제결제카드",
      "현지 유심/로밍, 보조배터리",
      "얇은 겉옷, 편한 운동화",
      "모자/선크림/물티슈",
      "방수 파우치(비치/유람선)",
      "예약확인서/전자티켓",
    ],
  },
};

/* 아이콘 매핑 */
const ICON = {
  plane: Plane,
  mountain: Mountain,
  ship: Ship,
  landmark: Landmark,
  mountainSnow: MountainSnow,
  shopping: ShoppingBag,
  grab: Car,
  warning: AlertTriangle,
};

/* 카테고리 버튼 */
const CATEGORIES = [
  { id: "all", label: "전체" },
  { id: "day1", label: "Day 1" },
  { id: "day2-bana", label: "Day 2" },
  { id: "day3-hoian", label: "Day 3" },
  { id: "day4-marble", label: "Day 4" },
  { id: "day5-end", label: "Day 5" },
  { id: "shopping", label: "쇼핑리스트" },
  { id: "grab", label: "그랩 팁" },
  { id: "warning", label: "주의사항" },
  { id: "checklist", label: "체크리스트" },
];

/* 유틸 */
function highlight(text, q) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="px-0.5 rounded bg-[#f5c400]/40">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}
const fmt = (n) => (isFinite(n) ? Math.round(n).toLocaleString("ko-KR") : "-");

/* =========================
   컴포넌트
   ========================= */
export default function DanangPlannerApp() {
  const [active, setActive] = useState("all");
  const [q, setQ] = useState("");

  // 환율 계산기 상태
  const [vnd, setVnd] = useState("");
  const [rate, setRate] = useState(0.055); // 1 VND → KRW (대략값)
  const krw = useMemo(() => parseFloat(vnd || "0") * parseFloat(rate || "0"), [vnd, rate]);

  // 전체 일정 요약 토글 (기본: 접힘)
  const [showSummary, setShowSummary] = useState(false);

  const visibleSections = useMemo(() => {
    const all = DATA.sections;
    const filtered = active === "all" ? all : all.filter((s) => s.id === active);

    if (!q) return filtered;

    const lower = q.toLowerCase();
    return filtered
      .map((sec) => {
        // Day/일반 섹션 (places) 필터
        if (sec.places) {
          const places = sec.places.filter((p) => {
            const hay = [
              p.name,
              ...(Array.isArray(p.info?.입장료) ? p.info.입장료 : [p.info?.입장료 || ""]),
              ...(p.info?.팁 || []),
              ...(p.info?.챙길것 || []),
            ]
              .filter(Boolean)
              .join(" \n ")
              .toLowerCase();
            return hay.includes(lower);
          });
          return { ...sec, places };
        }

        // 쇼핑(그룹) 섹션 필터
        if (sec.groups) {
          const groups = sec.groups
            .map((g) => ({
              ...g,
              items: g.items.filter((it) => String(it).toLowerCase().includes(lower)),
            }))
            .filter((g) => g.items.length > 0 || g.title.toLowerCase().includes(lower));
          return { ...sec, groups };
        }

        // 그랩/주의 (items) 섹션 필터
        if (sec.items) {
          const items = sec.items.filter((t) => String(t).toLowerCase().includes(lower));
          return { ...sec, items };
        }
        return sec;
      })
      .filter((sec) =>
        sec.places ? sec.places.length > 0 : sec.groups ? sec.groups.length > 0 : sec.items ? sec.items.length > 0 : true
      );
  }, [active, q]);

  return (
    <div className="min-h-screen bg-[#ececdc] text-slate-800">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 text-white shadow-md bg-gradient-to-r from-[#d44c2c] via-[#f5c400] to-[#6c8c74] bg-[length:200%_100%]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Calendar className="w-5 h-5 opacity-90" />
          <h1 className="text-2xl font-extrabold tracking-tight leading-none">다낭여행총정리</h1>
          <span className="ml-auto inline-flex items-center rounded-full bg-[#f5c400] text-[#083714] text-xs font-semibold px-2 py-1">
            9/5(금) ~ 9/9(화)
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* 환율 계산기 */}
        <Card className="mb-4 rounded-2xl shadow-sm border-[#ddb59a] bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#244c24]" /> 환율 계산기 (VND → KRW)
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <div className="text-xs text-slate-600 mb-1">베트남 동 (VND)</div>
              <Input
                value={vnd}
                onChange={(e) => setVnd(e.target.value.replace(/[^\d.]/g, ""))}
                inputMode="decimal"
                placeholder="예: 150000"
                className="h-12 rounded-xl text-[15px] border-[#ddb59a] focus-visible:ring-[#d44c2c]"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {[10000, 50000, 100000, 200000].map((n) => (
                  <button
                    key={n}
                    onClick={() => setVnd(String(n))}
                    className="rounded-full h-8 px-3 text-xs border transition-colors bg-white border-[#ddb59a] text-slate-700 hover:bg-[#fdf6eb]"
                  >
                    {n.toLocaleString()} VND
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-600 mb-1">환율 (1 VND → KRW)</div>
              <Input
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                inputMode="decimal"
                placeholder="예: 0.055"
                className="h-12 rounded-xl text-[15px] border-[#ddb59a] focus-visible:ring-[#d44c2c]"
              />
              <div className="text-xs text-slate-600 mt-1">* 실제 환율로 바꾸어 사용하세요.</div>
            </div>
            <div>
              <div className="text-xs text-slate-600 mb-1">결과 (KRW)</div>
              <div className="h-12 rounded-xl border border-[#ddb59a] bg-[#fdf6eb] flex items-center px-3 text-[18px] font-semibold">
                ₩ {fmt(krw)}
              </div>
              <div className="text-xs text-slate-600 mt-1">100,000 VND ≈ ₩ {fmt(100000 * (parseFloat(rate || "0")))}</div>
            </div>
          </CardContent>
        </Card>

        {/* 전체 일정 요약 (클릭 시 펼침) */}
        <Card className="mb-4 sm:mb-6 rounded-2xl shadow-sm border-[#ddb59a] bg-white">
          <CardHeader className="pb-2 cursor-pointer select-none" onClick={() => setShowSummary((s) => !s)}>
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Info className="w-5 h-5 text-[#d44c2c]" />
              전체 일정 요약
              <ChevronDown className={`ml-auto w-5 h-5 transition-transform ${showSummary ? "rotate-180" : ""}`} />
            </CardTitle>
          </CardHeader>
          {showSummary && (
            <CardContent className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2">
              {DATA.overview.items.map((it, idx) => {
                const Ico = ICON[it.icon] || MapPin;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-2xl border border-[#ddb59a] p-3 bg-white h-20"
                  >
                    <Ico className="w-5 h-5 shrink-0 text-[#d44c2c]" />
                    <div className="leading-tight">
                      <div className="text-[11px] text-slate-500">{it.time}</div>
                      <div className="text-sm font-medium">{it.name}</div>
                      {it.note && <div className="text-[11px] text-slate-500">{it.note}</div>}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          )}
        </Card>

        {/* 검색 + 카테고리 버튼 */}
        <div className="space-y-3 mb-4">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="장소/팁/입장료/쇼핑 항목 검색"
            className="h-14 rounded-xl text-[15px] border-[#ddb59a] focus-visible:ring-[#d44c2c]"
          /><br></br>

          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`category-btn ${active === c.id ? "active" : ""}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* 섹션 */}
        <AnimatePresence mode="popLayout">
          {active === "checklist" ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid gap-4">
              <Card className="rounded-2xl border-[#ddb59a] bg-white">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-[#244c24]" /> {DATA.checklist.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-[15px]">
                    {DATA.checklist.items.map((t, i) => (
                      <li key={i}>{highlight(t, q)}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            visibleSections.map((section) => {
              const Ico = ICON[section.icon] || MapPin;

              /* ===== 쇼핑리스트(구매처별 아코디언) ===== */
              if (section.groups) {
                return (
                  <motion.section key={section.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Ico className="w-5 h-5 text-[#244c24]" />
                      <h2 className="text-lg sm:text-xl font-semibold tracking-tight">{section.title}</h2>
                      <Badge className="ml-1 bg-[#f5c400]/70 text-[#083714] border border-[#ddb59a]">{section.category}</Badge>
                    </div>

                    <Card className="rounded-2xl shadow-sm border-[#ddb59a] bg-white">
                      <CardContent className="py-2">
                        <Accordion type="multiple" collapsible>
                          {section.groups.map((g, gi) => (
                            <AccordionItem key={gi} value={`group-${gi}`}>
                              <AccordionTrigger className="text-base font-semibold px-4 py-3 data-[state=open]:bg-[#fdf6eb] rounded-xl">
                                {g.title}
                              </AccordionTrigger>
                              <AccordionContent className="pt-2 px-1">
                                <ul className="list-disc pl-6 space-y-1 text-sm">
                                  {g.items.map((it, ii) => (
                                    <li key={ii}>{highlight(it, q)}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </motion.section>
                );
              }

              /* ===== 그랩 팁 / 주의사항 (제목 굵게 + 본문 작게) ===== */
              if (section.items) {
                return (
                  <motion.section key={section.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Ico className="w-5 h-5 text-[#244c24]" />
                      <h2 className="text-lg sm:text-xl font-semibold tracking-tight">{section.title}</h2>
                      <Badge className="ml-1 bg-[#f5c400]/70 text-[#083714] border border-[#ddb59a]">{section.category}</Badge>
                    </div>

                    <Card className="rounded-2xl shadow-sm border-[#ddb59a] bg-white">
                      <CardContent className="py-4 space-y-3">
                        {section.items.map((t, i) => {
                          const isHeading =
                            !t.startsWith("• ") &&
                            (t.startsWith("🚖") ||
                              t.startsWith("🚨") ||
                              t.startsWith("💳") ||
                              t.startsWith("✅") ||
                              t.startsWith("✈️") ||
                              t.startsWith("🍔") ||
                              t.startsWith("❓") ||
                              t.startsWith("🚕") ||
                              t.startsWith("💵") ||
                              t.startsWith("🛵") ||
                              t.startsWith("🚲") ||
                              t.startsWith("🥶") ||
                              t.startsWith("🎒") ||
                              t.startsWith("🙅") ||
                              t.startsWith("💁") ||
                              t.startsWith("🛍") ||
                              t.startsWith("📞"));
                          return isHeading ? (
                            <div key={i} className="text-base sm:text-lg font-bold text-slate-800 pt-1">
                              {highlight(t, q)}
                            </div>
                          ) : (
                            <div key={i} className="text-sm text-slate-700 pl-4 leading-relaxed">
                              {highlight(t.replace(/^•\s*/, "• "), q)}
                            </div>
                          );
                        })}
                      </CardContent>
                    </Card>
                  </motion.section>
                );
              }

              /* ===== places 타입(Day들) ===== */
              return (
                <motion.section key={section.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Ico className="w-5 h-5 text-[#244c24]" />
                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight">{section.title}</h2>
                    <Badge className="ml-1 bg-[#f5c400]/70 text-[#083714] border border-[#ddb59a]">{section.category}</Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {section.places.map((p, idx) => (
                      <Card key={idx} className="rounded-2xl shadow-sm border-[#ddb59a] bg-white">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#d44c2c]" /> {highlight(p.name, q)}
                          </CardTitle>
                          <div className="text-xs text-slate-500">{p.address}</div>
                        </CardHeader>
                        <CardContent>
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="fee">
                              <AccordionTrigger className="appearance-none rounded-xl bg-white border border-[#ddb59a] px-4 py-3 text-[15px] data-[state=open]:bg-[#fdf6eb]">
                                입장료 / 비용
                              </AccordionTrigger>
                              <AccordionContent className="pt-2">
                                {Array.isArray(p.info.입장료) ? (
                                  <ul className="list-disc pl-5 space-y-1 text-[15px]">
                                    {p.info.입장료.map((f, i) => (
                                      <li key={i}>{highlight(f, q)}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-[15px]">{highlight(p.info.입장료 || "해당 없음", q)}</p>
                                )}
                              </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="tips">
                              <AccordionTrigger className="appearance-none mt-2 rounded-xl bg-white border border-[#ddb59a] px-4 py-3 text-[15px] data-[state=open]:bg-[#fdf6eb]">
                                팁
                              </AccordionTrigger>
                              <AccordionContent className="pt-2">
                                <ul className="list-disc pl-5 space-y-1 text-[15px]">
                                  {p.info.팁.map((t, i) => (
                                    <li key={i}>{highlight(t, q)}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="pack">
                              <AccordionTrigger className="appearance-none mt-2 rounded-xl bg-white border border-[#ddb59a] px-4 py-3 text-[15px] data-[state=open]:bg-[#fdf6eb]">
                                챙길 것
                              </AccordionTrigger>
                              <AccordionContent className="pt-2">
                                <ul className="list-disc pl-5 space-y-1 text-[15px]">
                                  {p.info.챙길것.map((t, i) => (
                                    <li key={i}>{highlight(t, q)}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.section>
              );
            })
          )}
        </AnimatePresence>

        {/* 푸터 */}
        <div className="mt-8 sm:mt-10 grid gap-3 sm:flex sm:items-center sm:justify-between">
          <div className="text-sm text-slate-600">
            ※ 금액/운영 정보는 현지 사정에 따라 변동될 수 있어요. 최신 정보는 현지 매표소/공식 채널을 확인하세요.
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <button className="rounded-full bg-white border border-[#ddb59a] text-slate-700 hover:bg-[#fdf6eb] h-10 px-4">
                  공유/내보내기
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[420px]">
                <DialogHeader>
                  <DialogTitle>공유/내보내기</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>• 이 페이지 URL을 복사해 가족과 공유하세요.</p>
                  <p>• 인쇄 시 브라우저 인쇄(CTRL/CMD+P)를 사용하면 깔끔한 PDF가 나옵니다.</p>
                </div>
              </DialogContent>
            </Dialog>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-full bg-[#d44c2c] hover:bg-[#c74325] h-10 px-4 text-white"
            >
              맨 위로
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
