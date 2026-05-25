import { useState, useEffect, useMemo } from "react";

const DB = [
  {
    id: 1, name: "노무현", hanja: "盧武鉉", eng: "Roh Moo-hyun",
    birth: "1946.09.01", birthPlace: "경상남도 김해시 진영읍",
    death: "2009.05.23", deathPlace: "경상남도 김해시 봉하마을",
    age: 62, category: "정치인", job: "제16대 대통령 (재임 2003~2008)",
    religion: "무교", military: "육군 병장 만기전역",
    location: "봉하마을 묘역", address: "경상남도 김해시 진영읍 봉하로 129",
    cemetery: "봉하마을 사저 내 묘역", plot: "단독 묘역",
    gps: "35.2621° N, 128.7543° E", burialType: "매장",
    epitaph: "민주주의 최후의 보루는 깨어있는 시민의 조직된 힘입니다",
    summary: "대한민국 제16대 대통령. 인권변호사 출신으로 참여정부를 이끌었다. 퇴임 후 고향 봉하마을로 귀향하였으나 검찰 수사 압박 속에 2009년 5월 23일 서거하였다.",
    bio: [
      { title: "생애", content: "1946년 경남 김해 출생. 가난한 농가에서 태어나 독학으로 사법시험에 합격했다. 부림사건 변론으로 인권변호사로 이름을 알렸으며 이후 정치에 입문했다." },
      { title: "대통령 재임", content: "2002년 제16대 대통령에 당선. 한미 FTA 체결, 남북정상회담, 행정수도 이전 추진 등의 정책을 펼쳤다. 참여정부 시절 인터넷 민주주의 확대에 기여했다." },
      { title: "서거", content: "퇴임 후 박연차 게이트 관련 검찰 조사를 받던 중 2009년 5월 23일 봉하마을 인근 부엉이바위에서 투신, 서거하였다." },
    ],
    family: { spouse: "권양숙", children: ["노건호", "노정연"], parents: ["노판석", "이순례"] },
    kiil: "05월 23일", flowers: 3241, tributes: 1823,
    tags: ["대통령", "인권변호사", "참여정부", "봉하마을"],
    views: 128420,
  },
  {
    id: 2, name: "최진실", hanja: "崔眞實", eng: "Choi Jin-sil",
    birth: "1968.12.24", birthPlace: "서울특별시",
    death: "2008.10.02", deathPlace: "서울특별시 강남구 자택",
    age: 40, category: "연예인", job: "배우",
    religion: "기독교 (침례교)", military: "해당없음",
    location: "갑산공원 마므레동산", address: "경기도 양평군 양수리",
    cemetery: "갑산공원", plot: "마므레동산 납골묘역",
    gps: "37.4892° N, 127.5631° E", burialType: "화장 후 납골",
    epitaph: "",
    summary: "1990년대 대한민국을 대표하는 국민 배우. '질투', '별은 내 가슴에' 등으로 최고 인기를 누렸다. 2008년 10월 2일 서거.",
    bio: [
      { title: "데뷔 및 전성기", content: "1988년 삼성전자 CF로 데뷔. 드라마 '질투(1992)', '별은 내 가슴에(1997)' 등으로 1990년대 최고 스타 자리에 올랐다." },
      { title: "사생활 및 은퇴", content: "야구선수 조성민과 결혼, 두 자녀를 두었으나 이혼하였다. 인터넷 악성루머와 언론의 집중 조명으로 고통받았다." },
      { title: "서거", content: "2008년 10월 2일 서울 강남구 자택에서 서거하였다. 유족 도난 사건 등으로 납골묘가 리모델링되었다." },
    ],
    family: { spouse: "조성민 (이혼)", children: ["최환희", "최준희"], parents: [] },
    kiil: "10월 02일", flowers: 5621, tributes: 3102,
    tags: ["배우", "1990년대", "국민배우", "질투"],
    views: 241830,
  },
  {
    id: 3, name: "김구", hanja: "金九", eng: "Kim Gu",
    birth: "1876.08.29", birthPlace: "황해도 해주군",
    death: "1949.06.26", deathPlace: "서울 경교장",
    age: 73, category: "독립운동가", job: "대한민국 임시정부 주석",
    religion: "기독교", military: "대한민국 임시정부 군무총장",
    location: "효창공원 묘역", address: "서울특별시 용산구 효창원로 177-18",
    cemetery: "효창공원", plot: "단독 묘역 (삼의사묘역 인근)",
    gps: "37.5384° N, 126.9642° E", burialType: "매장",
    epitaph: "나의 소원은 첫째도 통일, 둘째도 통일, 셋째도 통일이오",
    summary: "호 백범(白凡). 대한민국 임시정부 주석으로 독립운동을 이끈 민족 지도자. 1949년 경교장에서 안두희의 총에 암살당했다.",
    bio: [
      { title: "독립운동", content: "1896년 명성황후 시해에 분개하여 일본 장교를 살해, 투옥되었다. 이후 임시정부에 합류하여 한인애국단을 조직, 이봉창·윤봉길 의거를 지휘했다." },
      { title: "임시정부 주석", content: "대한민국 임시정부 주석으로 독립운동을 총지휘했다. 광복 후 귀국하여 통일 정부 수립을 위해 남북협상을 추진했다." },
      { title: "암살", content: "1949년 6월 26일 서울 경교장에서 육군 포병 소위 안두희에게 암살당했다. 배후는 아직까지 논란 중이다." },
    ],
    family: { spouse: "최준례 (사별)", children: ["김인", "김신"], parents: [] },
    kiil: "06월 26일", flowers: 8923, tributes: 4521,
    tags: ["독립운동가", "임시정부", "백범", "효창공원"],
    views: 389120,
  },
  {
    id: 4, name: "박정희", hanja: "朴正熙", eng: "Park Chung-hee",
    birth: "1917.11.14", birthPlace: "경상북도 구미",
    death: "1979.10.26", deathPlace: "서울 궁정동 안가",
    age: 62, category: "정치인", job: "제5~9대 대통령 (재임 1963~1979)",
    religion: "불교", military: "육군 대장",
    location: "국립서울현충원 대통령 묘역", address: "서울특별시 동작구 동작동 산41-2",
    cemetery: "국립서울현충원", plot: "대통령 묘역 1호",
    gps: "37.5007° N, 126.9803° E", burialType: "매장",
    epitaph: "",
    summary: "대한민국 제5~9대 대통령. 군사정변으로 집권하여 경제개발 5개년 계획을 추진, 한강의 기적을 이끌었다. 1979년 10월 26일 김재규에 의해 서거.",
    bio: [
      { title: "군 생활과 집권", content: "일본 육군사관학교, 만주군관학교 출신. 1961년 5.16 군사정변을 주도하여 집권했다." },
      { title: "경제개발", content: "경제개발 5개년 계획을 추진하여 1960~70년대 한국의 급격한 경제성장을 이끌었다. 새마을운동, 경부고속도로 건설 등이 대표 업적이다." },
      { title: "서거", content: "1979년 10월 26일 궁정동 안가에서 중앙정보부장 김재규의 총에 피격, 서거하였다. 영부인 육영수 여사와 합장되어 있다." },
    ],
    family: { spouse: "육영수 (합장, 1974년 피격 서거)", children: ["박재옥", "박근령", "박근혜"], parents: [] },
    kiil: "10월 26일", flowers: 4102, tributes: 2341,
    tags: ["대통령", "5.16", "경제개발", "현충원"],
    views: 412300,
  },
  {
    id: 5, name: "세종대왕", hanja: "世宗大王", eng: "King Sejong the Great",
    birth: "1397.05.15", birthPlace: "한성 (서울)",
    death: "1450.04.08", deathPlace: "한성 영응대군 사저",
    age: 53, category: "역사인물", job: "조선 제4대 왕 (재위 1418~1450)",
    religion: "유교/불교", military: "최고통수권자",
    location: "영릉 (英陵)", address: "경기도 여주시 능서면 왕대리 산83-1",
    cemetery: "조선왕릉 영릉", plot: "소헌왕후 합장릉",
    gps: "37.2985° N, 127.6384° E", burialType: "매장 (왕릉)",
    epitaph: "백성을 사랑한 성군",
    summary: "훈민정음(한글) 창제, 측우기 발명, 집현전 설치 등 수많은 업적을 남긴 조선 최고의 성군. 영릉은 유네스코 세계문화유산.",
    bio: [
      { title: "즉위", content: "태종의 셋째 아들로 태어나 1418년 22세에 왕위에 올랐다. 집현전을 설치하여 학문 연구를 장려했다." },
      { title: "훈민정음 창제", content: "1443년 훈민정음(한글)을 창제하여 1446년 반포하였다. 백성이 쉽게 글을 읽고 쓸 수 있도록 한 혁명적 업적이다." },
      { title: "과학 발전", content: "측우기, 앙부일구, 자격루 등 다양한 과학 기구를 발명하였다. 농업과 의학 발전에도 크게 기여했다." },
    ],
    family: { spouse: "소헌왕후 (합장)", children: ["문종", "세조(수양대군)", "안평대군 외 다수"], parents: ["태종", "원경왕후"] },
    kiil: "04월 08일", flowers: 12841, tributes: 7234,
    tags: ["왕", "훈민정음", "한글", "유네스코세계유산"],
    views: 891230,
  },
  {
    id: 6, name: "구하라", hanja: "", eng: "Goo Ha-ra",
    birth: "1991.01.13", birthPlace: "광주광역시",
    death: "2019.11.24", deathPlace: "서울특별시 강남구 자택",
    age: 28, category: "연예인", job: "가수 (카라)",
    religion: "미상", military: "해당없음",
    location: "분당 스카이캐슬 추모공원", address: "경기도 광주시 신현동 머루숯길 61-33",
    cemetery: "분당 스카이캐슬 추모공원", plot: "연예인 전용관",
    gps: "37.3891° N, 127.1203° E", burialType: "화장 후 봉안",
    epitaph: "",
    summary: "2008년 카라로 데뷔. '미스터', '루팡' 등으로 한류 열풍을 이끌었다. 2019년 11월 24일 서거.",
    bio: [
      { title: "카라 활동", content: "2008년 카라에 합류하여 '미스터(2009)', '루팡(2010)' 등으로 일본과 아시아에서 폭발적 인기를 얻었다." },
      { title: "솔로 활동", content: "카라 활동과 병행하여 배우로도 활동했다. 일본 솔로 활동도 활발히 진행했다." },
      { title: "서거", content: "2019년 11월 24일 서울 강남구 자택에서 서거하였다. 향년 28세." },
    ],
    family: { spouse: "", children: [], parents: ["구호인"] },
    kiil: "11월 24일", flowers: 7823, tributes: 5102,
    tags: ["카라", "아이돌", "한류", "가수"],
    views: 312840,
  },
  {
    id: 7, name: "이순신", hanja: "李舜臣", eng: "Yi Sun-sin",
    birth: "1545.04.28", birthPlace: "한성부 건천동 (서울 중구)",
    death: "1598.12.16", deathPlace: "노량해전 (경상남도 남해)",
    age: 53, category: "역사인물", job: "조선 수군 장수 / 삼도수군통제사",
    religion: "유교", military: "삼도수군통제사",
    location: "현충사 인근 묘소", address: "충청남도 아산시 염치읍 현충사길 126",
    cemetery: "아산 이순신 묘소", plot: "단독 묘역",
    gps: "36.7892° N, 127.0123° E", burialType: "매장",
    epitaph: "죽고자 하면 살고, 살고자 하면 죽는다",
    summary: "임진왜란을 승리로 이끈 조선의 명장. 거북선을 이용한 해전으로 왜군을 격파했다. 1598년 노량해전에서 전사.",
    bio: [
      { title: "임진왜란", content: "1592년 임진왜란 발발 후 전라좌수사로서 옥포, 한산도 대첩 등에서 연승하여 왜군의 서해 진출을 막았다." },
      { title: "명량대첩", content: "1597년 불과 13척의 배로 133척의 왜군을 격파한 명량대첩은 세계 해전사에 길이 남을 승리다." },
      { title: "전사", content: "1598년 노량해전에서 퇴각하는 왜군을 추격하다 적탄에 맞아 전사하였다. '나의 죽음을 알리지 말라'는 유언을 남겼다." },
    ],
    family: { spouse: "상주 방씨", children: ["이회", "이울", "이면"], parents: ["이정", "초계 변씨"] },
    kiil: "12월 16일", flowers: 15234, tributes: 9821,
    tags: ["장군", "임진왜란", "거북선", "명량대첩"],
    views: 1023400,
  },
];

const CATEGORIES = ["전체", "정치인", "연예인", "독립운동가", "역사인물"];
const CAT_COLOR = { "정치인": "#c0392b", "연예인": "#8e44ad", "독립운동가": "#2980b9", "역사인물": "#d4ac0d" };

export default function MyoFind() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("전체");
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("overview");
  const [animIn, setAnimIn] = useState(false);
  const [flowed, setFlowed] = useState({});
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([
    { name: "방문자123", text: "고이 잠드소서.", date: "2025.04.12" },
  ]);

  useEffect(() => { setTimeout(() => setAnimIn(true), 60); }, []);

  const filtered = useMemo(() => DB.filter(p => {
    const cOk = cat === "전체" || p.category === cat;
    const sOk = !search || p.name.includes(search) || p.job?.includes(search) || p.location?.includes(search) || p.tags?.some(t => t.includes(search));
    return cOk && sOk;
  }), [cat, search]);

  return (
    <div style={{ minHeight: "100vh", background: "#1b1b1b", color: "#e2e2e2", fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif", fontSize: "14px" }}>

      {/* 나무위키 스타일 헤더 */}
      <header style={{ background: "#1f2d3d", borderBottom: "1px solid #2d4a6b", padding: "0 1.5rem", height: "50px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "1.3rem" }}>🪦</span>
            <span style={{ fontSize: "1.1rem", fontWeight: "800", color: "#fff", letterSpacing: "0.05em" }}>MYO<span style={{ color: "#5dade2" }}>FIND</span></span>
          </div>
          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: "12px" }}>대한민국 인물 묘지 데이터베이스</span>
        </div>
        <div style={{ display: "flex", gap: "1.2rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
          {["인물검색", "지역별", "묘지별", "최근등록"].map(m => (
            <span key={m} style={{ cursor: "pointer" }} onMouseEnter={e => e.target.style.color = "#5dade2"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>{m}</span>
          ))}
        </div>
      </header>

      {/* 검색 히어로 */}
      <div style={{ background: "linear-gradient(135deg, #1a2634 0%, #1f3044 100%)", padding: "2.5rem 1.5rem", textAlign: "center", borderBottom: "1px solid #2d4a6b", opacity: animIn ? 1 : 0, transition: "opacity 0.5s" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: "900", color: "#fff", marginBottom: "0.4rem", letterSpacing: "-0.01em" }}>
          🪦 묘파인더 <span style={{ color: "#5dade2", fontSize: "1rem", fontWeight: "400" }}>myofind.com</span>
        </h1>
        <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>
          대한민국 인물들의 안장지 · 생몰년 · 묘비명을 기록합니다
        </p>
        <div style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="인물 이름, 직업, 안장지, 태그 검색..."
            style={{ width: "100%", padding: "0.75rem 3rem 0.75rem 1.2rem", background: "#fff", border: "none", borderRadius: "6px", fontSize: "0.9rem", color: "#333", outline: "none", boxSizing: "border-box" }} />
          <span style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", fontSize: "1rem", color: "#888" }}>🔍</span>
        </div>

        {/* 통계 바 */}
        <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", marginTop: "1.5rem" }}>
          {[["등록 인물", DB.length + "명"], ["총 조회수", "3,398,340"], ["누적 헌화", "57,584송이"]].map(([l, v]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.2rem", fontWeight: "800", color: "#5dade2" }}>{v}</div>
              <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div style={{ background: "#252525", borderBottom: "1px solid #333", padding: "0 1.5rem", display: "flex", gap: "0", overflowX: "auto" }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ padding: "0.65rem 1.2rem", background: "none", border: "none", borderBottom: cat === c ? "2px solid #5dade2" : "2px solid transparent", color: cat === c ? "#5dade2" : "rgba(255,255,255,0.45)", fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "all 0.15s" }}>
            {c} {cat === c && `(${filtered.length})`}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", paddingRight: "0.5rem" }}>
          총 {filtered.length}명
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1px", background: "#333" }}>
          {filtered.map((p, i) => (
            <div key={p.id} onClick={() => { setSelected(p); setTab("overview"); }}
              style={{ background: "#252525", padding: "1.2rem 1.3rem", cursor: "pointer", transition: "background 0.15s", opacity: animIn ? 1 : 0, transitionDelay: `${i * 0.03}s` }}
              onMouseEnter={e => e.currentTarget.style.background = "#2d2d2d"}
              onMouseLeave={e => e.currentTarget.style.background = "#252525"}>

              {/* 상단 메타 */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                  <span style={{ fontSize: "0.65rem", padding: "0.1rem 0.5rem", borderRadius: "2px", background: `${CAT_COLOR[p.category]}22`, color: CAT_COLOR[p.category], border: `1px solid ${CAT_COLOR[p.category]}44`, fontWeight: "600" }}>{p.category}</span>
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.2)" }}>조회 {p.views.toLocaleString()}</span>
                </div>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}>🌸 {p.flowers.toLocaleString()}</span>
              </div>

              {/* 이름 */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.2rem" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#e8e8e8", margin: 0 }}>{p.name}</h3>
                {p.hanja && <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>{p.hanja}</span>}
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)" }}>{p.eng}</span>
              </div>

              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.7rem" }}>{p.job}</div>

              {/* 생몰년 - 나무위키 스타일 인포박스 */}
              <div style={{ background: "#1e1e1e", border: "1px solid #383838", borderRadius: "4px", padding: "0.6rem 0.8rem", marginBottom: "0.7rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                  {[["출생", p.birth], ["사망", p.death], ["안장지", p.location], ["향년", p.age + "세"]].map(([k, v]) => (
                    <div key={k}>
                      <span style={{ fontSize: "0.63rem", color: "rgba(255,255,255,0.3)" }}>{k} </span>
                      <span style={{ fontSize: "0.72rem", color: k === "안장지" ? "#5dade2" : "#e8e8e8", fontWeight: k === "안장지" ? "600" : "400" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 요약 */}
              <p style={{ fontSize: "0.77rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 0.7rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {p.summary}
              </p>

              {/* 태그 */}
              <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                {p.tags?.map(t => (
                  <span key={t} style={{ fontSize: "0.62rem", padding: "0.1rem 0.45rem", background: "rgba(93,173,226,0.08)", color: "rgba(93,173,226,0.7)", border: "1px solid rgba(93,173,226,0.15)", borderRadius: "2px" }}>#{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 상세 모달 - 나무위키 스타일 */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "1rem", overflowY: "auto" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: "780px", background: "#202020", border: "1px solid #383838", borderRadius: "6px", overflow: "hidden", marginTop: "1rem" }}>

            {/* 문서 헤더 */}
            <div style={{ background: "#1a2634", padding: "1.2rem 1.5rem", borderBottom: "1px solid #2d4a6b" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "0.65rem", color: CAT_COLOR[selected.category], letterSpacing: "0.15em", marginBottom: "0.3rem", fontWeight: "700" }}>{selected.category}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
                    <h2 style={{ fontSize: "1.6rem", fontWeight: "900", color: "#fff", margin: 0 }}>{selected.name}</h2>
                    {selected.hanja && <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)" }}>{selected.hanja}</span>}
                    <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.25)" }}>{selected.eng}</span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", marginTop: "0.3rem" }}>{selected.job}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", width: "28px", height: "28px", borderRadius: "4px", cursor: "pointer", fontSize: "0.9rem" }}>✕</button>
              </div>

              {/* 헌화 */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginTop: "0.9rem" }}>
                <button onClick={() => setFlowed(f => ({ ...f, [selected.id]: true }))} style={{ padding: "0.4rem 1rem", background: flowed[selected.id] ? "rgba(93,173,226,0.15)" : "rgba(93,173,226,0.2)", border: "1px solid rgba(93,173,226,0.4)", borderRadius: "4px", color: "#5dade2", fontSize: "0.78rem", cursor: "pointer", fontFamily: "inherit" }}>
                  🌸 {flowed[selected.id] ? "헌화함" : "헌화하기"}
                </button>
                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>🌸 {(selected.flowers + (flowed[selected.id] ? 1 : 0)).toLocaleString()}송이 · 💬 {selected.tributes}개 · 👁 {selected.views.toLocaleString()}회</span>
              </div>
            </div>

            {/* 탭 */}
            <div style={{ display: "flex", background: "#252525", borderBottom: "1px solid #333" }}>
              {[["overview", "개요"], ["burial", "안장정보"], ["bio", "생애"], ["family", "가족관계"], ["tribute", "추모"]].map(([id, label]) => (
                <button key={id} onClick={() => setTab(id)} style={{ padding: "0.6rem 1.1rem", background: "none", border: "none", borderBottom: tab === id ? "2px solid #5dade2" : "2px solid transparent", color: tab === id ? "#5dade2" : "rgba(255,255,255,0.4)", fontSize: "0.78rem", cursor: "pointer", fontFamily: "inherit" }}>
                  {label}
                </button>
              ))}
            </div>

            <div style={{ padding: "1.3rem 1.5rem" }}>

              {/* 개요 탭 */}
              {tab === "overview" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: "1.5rem" }}>
                  <div>
                    <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, marginBottom: "1.2rem", borderLeft: "3px solid #5dade2", paddingLeft: "0.9rem" }}>
                      {selected.summary}
                    </p>
                    {selected.epitaph && (
                      <div style={{ padding: "0.8rem 1rem", background: "#1a1a1a", border: "1px solid #383838", borderRadius: "4px", marginBottom: "1rem" }}>
                        <div style={{ fontSize: "0.63rem", color: "rgba(255,255,255,0.3)", marginBottom: "0.3rem", letterSpacing: "0.1em" }}>묘비명</div>
                        <div style={{ fontSize: "0.83rem", color: "#e8e8e8", fontStyle: "italic", lineHeight: 1.6 }}>"{selected.epitaph}"</div>
                      </div>
                    )}
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      {selected.tags?.map(t => (
                        <span key={t} style={{ fontSize: "0.65rem", padding: "0.2rem 0.5rem", background: "rgba(93,173,226,0.08)", color: "rgba(93,173,226,0.7)", border: "1px solid rgba(93,173,226,0.15)", borderRadius: "2px" }}>#{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* 인포박스 */}
                  <div style={{ background: "#1a1a1a", border: "1px solid #383838", borderRadius: "4px", overflow: "hidden", height: "fit-content" }}>
                    <div style={{ background: `${CAT_COLOR[selected.category]}22`, padding: "0.5rem 0.8rem", borderBottom: "1px solid #383838", fontSize: "0.72rem", color: CAT_COLOR[selected.category], fontWeight: "700", letterSpacing: "0.1em" }}>
                      인물 정보
                    </div>
                    <div style={{ padding: "0.6rem" }}>
                      {[
                        ["출생", selected.birth],
                        ["출생지", selected.birthPlace],
                        ["사망", selected.death],
                        ["사망지", selected.deathPlace],
                        ["향년", selected.age + "세"],
                        ["종교", selected.religion],
                        ["군복무", selected.military],
                        ["기일", selected.kiil],
                      ].map(([k, v]) => v && (
                        <div key={k} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: "0.4rem", padding: "0.3rem 0.2rem", borderBottom: "1px solid #2a2a2a" }}>
                          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>{k}</span>
                          <span style={{ fontSize: "0.72rem", color: "#e8e8e8", lineHeight: 1.4 }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 안장정보 탭 */}
              {tab === "burial" && (
                <div>
                  <div style={{ background: "#1a1a1a", border: "1px solid #383838", borderRadius: "4px", overflow: "hidden", marginBottom: "1rem" }}>
                    <div style={{ background: "#1f2d3d", padding: "0.5rem 0.9rem", borderBottom: "1px solid #383838", fontSize: "0.72rem", color: "#5dade2", fontWeight: "700" }}>안장지 정보</div>
                    <div style={{ padding: "0.5rem 0.8rem" }}>
                      {[
                        ["안장지명", selected.location],
                        ["주소", selected.address],
                        ["묘지/공원", selected.cemetery],
                        ["구역/번호", selected.plot],
                        ["GPS", selected.gps],
                        ["안장방식", selected.burialType],
                      ].map(([k, v]) => v && (
                        <div key={k} style={{ display: "grid", gridTemplateColumns: "70px 1fr", padding: "0.4rem 0.2rem", borderBottom: "1px solid #2a2a2a", gap: "0.5rem" }}>
                          <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)" }}>{k}</span>
                          <span style={{ fontSize: "0.78rem", color: k === "안장지명" ? "#5dade2" : "#e8e8e8", fontWeight: k === "안장지명" ? "600" : "400" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {selected.epitaph && (
                    <div style={{ padding: "0.9rem 1rem", background: "#1a1a1a", border: "1px solid #383838", borderRadius: "4px", marginBottom: "1rem" }}>
                      <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", marginBottom: "0.4rem", letterSpacing: "0.1em" }}>묘비명 / 비문</div>
                      <div style={{ fontSize: "0.85rem", color: "#e8e8e8", fontStyle: "italic", lineHeight: 1.7 }}>"{selected.epitaph}"</div>
                    </div>
                  )}
                  <button style={{ width: "100%", padding: "0.75rem", background: "linear-gradient(135deg, #1a6fa8, #5dade2)", border: "none", borderRadius: "4px", color: "#fff", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit" }}>
                    🗺️ 지도에서 위치 보기
                  </button>
                </div>
              )}

              {/* 생애 탭 */}
              {tab === "bio" && (
                <div>
                  {selected.bio?.map((section, i) => (
                    <div key={i} style={{ marginBottom: "1.3rem" }}>
                      <h4 style={{ fontSize: "0.88rem", fontWeight: "700", color: "#5dade2", marginBottom: "0.5rem", paddingBottom: "0.4rem", borderBottom: "1px solid #2d4a6b" }}>
                        {i + 1}. {section.title}
                      </h4>
                      <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.9, margin: 0 }}>{section.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* 가족관계 탭 */}
              {tab === "family" && (
                <div>
                  <div style={{ background: "#1a1a1a", border: "1px solid #383838", borderRadius: "4px", overflow: "hidden", marginBottom: "1rem" }}>
                    <div style={{ background: "#1f2d3d", padding: "0.5rem 0.9rem", borderBottom: "1px solid #383838", fontSize: "0.72rem", color: "#5dade2", fontWeight: "700" }}>가족 관계</div>
                    <div style={{ padding: "0.5rem 0.8rem" }}>
                      {[
                        ["배우자", selected.family?.spouse],
                        ["자녀", selected.family?.children?.join(", ")],
                        ["부모", selected.family?.parents?.join(", ")],
                      ].filter(([, v]) => v).map(([k, v]) => (
                        <div key={k} style={{ display: "grid", gridTemplateColumns: "60px 1fr", padding: "0.4rem 0.2rem", borderBottom: "1px solid #2a2a2a", gap: "0.5rem" }}>
                          <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)" }}>{k}</span>
                          <span style={{ fontSize: "0.78rem", color: "#e8e8e8" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: "0.9rem", background: "#1a1a1a", border: "1px dashed #383838", borderRadius: "4px", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.7 }}>
                    가족 구성원을 myofind에 등록하면 자동으로 가족 트리가 연결됩니다.
                  </div>
                </div>
              )}

              {/* 추모 탭 */}
              {tab === "tribute" && (
                <div>
                  <div style={{ padding: "0.7rem 0.9rem", background: "#1a2634", border: "1px solid #2d4a6b", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>📅 기일 알림 — 매년 {selected.kiil}</span>
                    <button style={{ padding: "0.3rem 0.7rem", background: "rgba(93,173,226,0.15)", border: "1px solid rgba(93,173,226,0.3)", borderRadius: "3px", color: "#5dade2", fontSize: "0.72rem", cursor: "pointer", fontFamily: "inherit" }}>카카오 알림 신청</button>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    {msgs.map((m, i) => (
                      <div key={i} style={{ padding: "0.7rem 0.9rem", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "4px", marginBottom: "0.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                          <span style={{ fontSize: "0.7rem", color: "#5dade2", fontWeight: "600" }}>{m.name}</span>
                          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.25)" }}>{m.date}</span>
                        </div>
                        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", margin: 0 }}>{m.text}</p>
                      </div>
                    ))}
                  </div>
                  <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="추모 메시지를 남겨주세요..."
                    style={{ width: "100%", padding: "0.65rem 0.9rem", background: "#1a1a1a", border: "1px solid #383838", borderRadius: "4px", color: "#e8e8e8", fontSize: "0.8rem", outline: "none", resize: "none", height: "65px", boxSizing: "border-box", fontFamily: "inherit", marginBottom: "0.5rem" }} />
                  <button onClick={() => { if (msg.trim()) { setMsgs(m => [...m, { name: "방문자", text: msg, date: "2025.05.25" }]); setMsg(""); } }}
                    style={{ width: "100%", padding: "0.7rem", background: "#1f2d3d", border: "1px solid #2d4a6b", borderRadius: "4px", color: "#5dade2", fontWeight: "700", fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit" }}>
                    메시지 남기기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
