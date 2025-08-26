import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Plane, Mountain, Ship, Landmark, ClipboardList, Calendar, Info, MountainSnow } from "lucide-react";

// ------------------------------------------------------------
// 데이터 (한국어)
// ------------------------------------------------------------
const DATA = {
  overview: {
    title: "전체 일정",
    description: "9월 5일(금) ~ 9월 9일(화) 다낭 • 호이안 • 바나힐 핵심 일정 요약",
    items: [
      { time: "D1", name: "도착 / 체크인", icon: "plane", note: "센터 포인트 다낭 호텔 & 레지던스" },
      { time: "D2", name: "바나힐 • 골든브릿지", icon: "mountain" },
      { time: "D2 밤", name: "마담 란 • 용다리 불쇼", icon: "ship" },
      { time: "D3", name: "호이안 투어 • 쿠킹클래스", icon: "landmark" },
      { time: "D3 밤", name: "소원배 • 야시장", icon: "ship" },
      { time: "D4", name: "오행산 • 마사지 • 야시장", icon: "mountainSnow" },
      { time: "D5", name: "다낭 대성당 • 롯데마트", icon: "landmark" },
    ],
  },
  sections: [
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
            팁: [
              "로컬 마켓 쇼핑 시 흥정/소매치기 주의",
              "날씨 덥고 습함 → 수분/휴식",
            ],
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
            입장료: [
              "입장 40,000 VND (10세 미만 무료)",
              "엘리베이터 15,000 VND(편도)",
              "암부동(Am Phu) 동굴 20,000 VND",
            ],
            팁: [
              "운영 07:00~17:30 (2시간 여유 권장)",
              "대리석 바닥 미끄럼 주의 → 운동화 필수",
              "엘리베이터로 상행, 계단 하행 추천",
            ],
            챙길것: ["운동화", "물/모자/선크림", "현금 소액", "작은 배낭"],
          },
        },
        {
          name: "허벌 부티크 스파",
          address: "미케/논느억 비치 인근",
          info: {
            입장료: "시술 비용 별도",
            팁: ["미리 예약, 이동 동선 고려"],
            챙길것: ["예약확인", "갈아입을 옷", "팁 소액"],
          },
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
          info: {
            입장료: "무료",
            팁: ["예배 시간/내부 촬영 매너 준수"],
            챙길것: ["카메라", "조용한 복장"],
          },
        },
        {
          name: "롯데마트 다낭점",
          address: "Da Nang City",
          info: {
            입장료: "무료 (구매비 별도)",
            팁: ["커피/과자 등 기념품 쇼핑 적합"],
            챙길것: ["여분 캐리어 공간", "카드/현금", "쇼핑 리스트"],
          },
        },
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

// 아이콘 매핑
const ICON = {
  plane: Plane,
  mountain: Mountain,
  ship: Ship,
  landmark: Landmark,
  mountainSnow: MountainSnow,
};

// 카테고리 버튼 정의
const CATEGORIES = [
  { id: "all", label: "전체" },
  { id: "day1", label: "Day 1" },
  { id: "day2-bana", label: "Day 2" },
  { id: "day3-hoian", label: "Day 3" },
  { id: "day4-marble", label: "Day 4" },
  { id: "day5-end", label: "Day 5" },
  { id: "checklist", label: "체크리스트" },
];

// 유틸: 텍스트 하이라이트
function highlight(text, q) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="px-0.5 rounded bg-[#FFDD00]/40">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export default function DanangPlannerApp() {
  const [active, setActive] = useState("all");
  const [q, setQ] = useState("");

  const visibleSections = useMemo(() => {
    const all = DATA.sections;
    const filtered = active === "all" ? all : all.filter((s) => s.id === active);
    if (!q) return filtered;
    const lower = q.toLowerCase();
    return filtered
      .map((sec) => ({
        ...sec,
        places: sec.places.filter((p) => {
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
        }),
      }))
      .filter((sec) => sec.places.length > 0);
  }, [active, q]);

  return (
    <div className="min-h-screen bg-[#FFF7ED] text-slate-800">
      {/* 상단 헤더: 베트남 감성 레드→오렌지 그라데이션 */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-[#DA251D] to-[#F46E2B] text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Calendar className="w-5 h-5 opacity-90" />
          <h1 className="text-2xl font-extrabold tracking-tight leading-none">다낭여행총정리</h1>
          <span className="ml-auto inline-flex items-center rounded-full bg-[#FFDD00] text-[#7A1B16] text-xs font-semibold px-2 py-1">
            9/5(금) ~ 9/9(화)
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* 전체 일정 요약 카드 */}
        <Card className="mb-4 sm:mb-6 rounded-2xl shadow-sm border-[#F2D9C4] bg-white/95">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Info className="w-5 h-5 text-[#C83C2B]" /> 전체 일정 요약
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2">
            {DATA.overview.items.map((it, idx) => {
              const Ico = ICON[it.icon] || MapPin;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-2xl border border-[#F2D9C4] p-3 bg-white"
                >
                  <Ico className="w-5 h-5 shrink-0 text-[#C83C2B]" />
                  <div className="leading-tight">
                    <div className="text-[11px] text-slate-500">{it.time}</div>
                    <div className="text-sm font-medium">{it.name}</div>
                    {it.note && <div className="text-[11px] text-slate-500">{it.note}</div>}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* 검색 + 카테고리 pill bar (모바일 가로 스크롤) */}
        <div className="space-y-3 mb-4">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="장소/팁/입장료 검색"
            className="h-11 rounded-xl border-[#EEC8A9] focus-visible:ring-[#DA251D]"
          />

          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((c) => (
              <Button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={
                  "rounded-full h-9 px-4 text-sm border transition-colors " +
                  (active === c.id
                    ? "bg-[#DA251D] border-[#DA251D] text-white shadow"
                    : "bg-white border-[#F2D9C4] text-slate-700")
                }
              >
                {c.label}
              </Button>
            ))}
          </div>
        </div>

        {/* 섹션 렌더 */}
        <AnimatePresence mode="popLayout">
          {active === "checklist" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid gap-4"
            >
              <Card className="rounded-2xl border-[#F2D9C4]">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-[#C83C2B]" /> {DATA.checklist.title}
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
              return (
                <motion.section
                  key={section.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Ico className="w-5 h-5 text-[#C83C2B]" />
                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight">{section.title}</h2>
                    <Badge className="ml-1 bg-[#FFDD00]/60 text-[#7A1B16] border border-[#F2D9C4]">{section.category}</Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {section.places.map((p, idx) => (
                      <Card key={idx} className="rounded-2xl shadow-sm border-[#F2D9C4]">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#C83C2B]" /> {highlight(p.name, q)}
                          </CardTitle>
                          <div className="text-xs text-slate-500">{p.address}</div>
                        </CardHeader>
                        <CardContent>
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="fee">
                              <AccordionTrigger className="rounded-xl bg-white border border-[#F2D9C4] px-4 py-3 text-[15px] data-[state=open]:bg-[#FFF1D6]">입장료 / 비용</AccordionTrigger>
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
                              <AccordionTrigger className="mt-2 rounded-xl bg-white border border-[#F2D9C4] px-4 py-3 text-[15px] data-[state=open]:bg-[#FFF1D6]">팁</AccordionTrigger>
                              <AccordionContent className="pt-2">
                                <ul className="list-disc pl-5 space-y-1 text-[15px]">
                                  {p.info.팁.map((t, i) => (
                                    <li key={i}>{highlight(t, q)}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="pack">
                              <AccordionTrigger className="mt-2 rounded-xl bg-white border border-[#F2D9C4] px-4 py-3 text-[15px] data-[state=open]:bg-[#FFF1D6]">챙길 것</AccordionTrigger>
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

        {/* 푸터 도구 모음 */}
        <div className="mt-8 sm:mt-10 grid gap-3 sm:flex sm:items-center sm:justify-between">
          <div className="text-sm text-slate-500">
            ※ 금액/운영 정보는 현지 사정에 따라 변동될 수 있어요. 최신 정보는 현지 매표소/공식 채널을 확인하세요.
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full bg-white border border-[#F2D9C4] text-slate-700 hover:bg-[#FFF1D6]">
                  공유/내보내기
                </Button>
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
            <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="rounded-full bg-[#DA251D] hover:bg-[#C83C2B]">
              맨 위로
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
