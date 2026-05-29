(() => {
  const boards = [
    { id: "all", label: "전체", accent: "#2457a6" },
    { id: "webtoon", label: "웹툰", accent: "#d94f3d" },
    { id: "novel", label: "웹소설", accent: "#0f766e" },
    { id: "recommend", label: "추천", accent: "#b7791f" },
    { id: "theory", label: "떡밥·토론", accent: "#6d5bd0" },
    { id: "creator", label: "창작방", accent: "#334155" }
  ];

  const platformCatalog = [
    {
      id: "naver-webtoon",
      label: "네이버웹툰",
      contentType: "webtoon",
      note: "요일별 신작과 인기작 흐름을 빠르게 훑기 좋은 연재처",
      schedules: [
        {
          id: "mon",
          label: "월",
          note: "월요일 공개작",
          works: [
            { id: "nw-mon-1", title: "퀘스트형 성장물", genre: "학원 액션", summary: "게임식 미션과 성장 흐름을 이야기하기 좋은 작품군" },
            { id: "nw-mon-2", title: "직장 생존 코미디", genre: "일상 코미디", summary: "회사 생활 공감과 캐릭터 케미가 중심인 작품군" }
          ]
        },
        {
          id: "wed",
          label: "수",
          note: "수요일 공개작",
          works: [
            { id: "nw-wed-1", title: "독자 시점 판타지", genre: "현대 판타지", summary: "원작 지식, 생존, 떡밥 토론에 어울리는 작품군" },
            { id: "nw-wed-2", title: "무협 회귀 서사", genre: "무협", summary: "문파 성장과 장기 복선 이야기가 잘 붙는 작품군" }
          ]
        },
        {
          id: "fri",
          label: "금",
          note: "금요일 공개작",
          works: [
            { id: "nw-fri-1", title: "로맨스 판타지 궁정극", genre: "로맨스 판타지", summary: "관계 변화와 의상, 정치 구도 감상이 잘 맞는 작품군" },
            { id: "nw-fri-2", title: "괴담 수사 파일", genre: "미스터리", summary: "에피소드별 단서와 결말 추측을 나누기 좋은 작품군" }
          ]
        },
        {
          id: "sun",
          label: "일",
          note: "일요일 공개작",
          works: [
            { id: "nw-sun-1", title: "휴일 정주행 개그툰", genre: "개그", summary: "짧게 읽고 댓글로 반응을 나누기 좋은 작품군" },
            { id: "nw-sun-2", title: "가족 드라마 성장툰", genre: "드라마", summary: "인물 감정선과 회차별 여운을 말하기 좋은 작품군" }
          ]
        }
      ]
    },
    {
      id: "kakao-webtoon",
      label: "카카오웹툰",
      contentType: "webtoon",
      note: "장르성이 강한 웹툰과 몰입형 연출을 고르기 좋은 연재처",
      schedules: [
        {
          id: "tue",
          label: "화",
          note: "화요일 공개작",
          works: [
            { id: "kw-tue-1", title: "빙의 악역 생존기", genre: "로맨스 판타지", summary: "악역 빙의와 선택지 토론에 맞는 작품군" },
            { id: "kw-tue-2", title: "도시 퇴마 액션", genre: "오컬트 액션", summary: "괴이 설정과 전투 연출 이야기가 잘 붙는 작품군" }
          ]
        },
        {
          id: "thu",
          label: "목",
          note: "목요일 공개작",
          works: [
            { id: "kw-thu-1", title: "탑 등반 생존물", genre: "판타지 액션", summary: "층별 규칙과 파티 조합을 토론하기 좋은 작품군" },
            { id: "kw-thu-2", title: "계약 결혼 로맨스", genre: "로맨스", summary: "관계 진전과 감정선 분석에 어울리는 작품군" }
          ]
        },
        {
          id: "sat",
          label: "토",
          note: "토요일 공개작",
          works: [
            { id: "kw-sat-1", title: "주말 액션 블록버스터", genre: "액션", summary: "전투 컷과 빌런 구도를 말하기 좋은 작품군" },
            { id: "kw-sat-2", title: "힐링 식당 판타지", genre: "힐링", summary: "음식, 손님 사연, 에피소드 감상에 맞는 작품군" }
          ]
        }
      ]
    },
    {
      id: "kakao-page",
      label: "카카오페이지",
      contentType: "novel",
      note: "웹소설 원작과 기다리면 무료 흐름을 함께 보기 좋은 연재처",
      schedules: [
        {
          id: "daily",
          label: "매일",
          note: "매일 또는 주 5회 이상 공개작",
          works: [
            { id: "kp-daily-1", title: "회귀 재벌 전략물", genre: "현대 판타지", summary: "사업 선택과 투자 판단을 이야기하기 좋은 작품군" },
            { id: "kp-daily-2", title: "헌터 아카데미물", genre: "헌터물", summary: "능력 성장과 파티 구성을 토론하기 좋은 작품군" }
          ]
        },
        {
          id: "weekend",
          label: "주말",
          note: "주말 몰아보기 좋은 공개작",
          works: [
            { id: "kp-weekend-1", title: "빙의 로판 장편", genre: "로맨스 판타지", summary: "원작 전개 변화와 남주 후보 토론에 맞는 작품군" },
            { id: "kp-weekend-2", title: "정통 무협 장편", genre: "무협", summary: "문파 정치와 사부-제자 관계를 말하기 좋은 작품군" }
          ]
        }
      ]
    },
    {
      id: "ridi",
      label: "리디",
      contentType: "novel",
      note: "장르 소설, 단행본, 연재작을 함께 고르기 좋은 연재처",
      schedules: [
        {
          id: "serial",
          label: "연재",
          note: "연재 중인 작품",
          works: [
            { id: "rd-serial-1", title: "서바이벌 미스터리", genre: "스릴러", summary: "단서와 반전 예측을 나누기 좋은 작품군" },
            { id: "rd-serial-2", title: "계약 관계 로맨스", genre: "로맨스", summary: "대사와 감정선 감상에 맞는 작품군" }
          ]
        },
        {
          id: "completed",
          label: "완결",
          note: "완결 후 정주행하기 좋은 작품",
          works: [
            { id: "rd-completed-1", title: "완결 판타지 대서사", genre: "판타지", summary: "결말과 복선 회수를 이야기하기 좋은 작품군" },
            { id: "rd-completed-2", title: "완결 로맨스 단편선", genre: "로맨스", summary: "짧은 호흡으로 추천글 쓰기 좋은 작품군" }
          ]
        }
      ]
    },
    {
      id: "munpia",
      label: "문피아",
      contentType: "novel",
      note: "남성향 판타지, 무협, 현대물이 강한 웹소설 연재처",
      schedules: [
        {
          id: "daily",
          label: "매일",
          note: "매일 연재 중심 작품",
          works: [
            { id: "mp-daily-1", title: "천재 작가 회귀물", genre: "현대 판타지", summary: "창작 성공과 업계물 감상을 나누기 좋은 작품군" },
            { id: "mp-daily-2", title: "무림 귀환 생존기", genre: "무협", summary: "무공 체계와 세력전을 토론하기 좋은 작품군" }
          ]
        },
        {
          id: "weekday",
          label: "평일",
          note: "평일 연재 중심 작품",
          works: [
            { id: "mp-weekday-1", title: "던전 운영 시뮬레이션", genre: "경영 판타지", summary: "시스템 운영과 성장 루트를 이야기하기 좋은 작품군" },
            { id: "mp-weekday-2", title: "검사 성장 서사", genre: "정통 판타지", summary: "수련, 동료, 전투 밸런스 토론에 맞는 작품군" }
          ]
        }
      ]
    }
  ];

  const seedPosts = [
    {
      id: "p-1001",
      board: "webtoon",
      tag: "감상",
      work: "작화 좋은 성장물",
      title: "주인공이 약한데도 계속 보게 되는 작품의 힘",
      body:
        "처음부터 먼치킨인 작품보다, 실수하고 깨지면서 자기 방식으로 올라가는 흐름이 더 오래 남는 것 같아요. 작화가 좋으면 초반 몰입은 쉬운데 결국 다시 보게 만드는 건 캐릭터가 변하는 속도네요.",
      author: "컷덕후",
      createdAt: Date.now() - 1000 * 60 * 34,
      likes: 42,
      bookmarks: 11,
      views: 238,
      comments: [
        {
          id: "c-1",
          author: "연재알림",
          text: "맞아요. 성장물이 한번 터지면 다음 화 기다리는 맛이 확실히 생겨요.",
          likes: 18,
          createdAt: Date.now() - 1000 * 60 * 22
        },
        {
          id: "c-2",
          author: "밤독자",
          text: "작화보다 연출 컷 배치가 더 큰 것 같음. 스크롤 리듬 잘 만들면 계속 내려가게 돼요.",
          likes: 9,
          createdAt: Date.now() - 1000 * 60 * 14
        }
      ]
    },
    {
      id: "p-1002",
      board: "novel",
      tag: "추천",
      work: "회귀물",
      title: "요즘 회귀물 고를 때 내가 보는 기준",
      body:
        "회귀 자체보다 회귀 후 선택이 달라지는 이유가 튼튼해야 끝까지 보게 돼요. 전생 지식으로 다 해결하는 것보다 이전 생의 후회 때문에 관계를 다르게 대하는 작품이 오래 갑니다.",
      author: "문장수집가",
      createdAt: Date.now() - 1000 * 60 * 95,
      likes: 36,
      bookmarks: 19,
      views: 310,
      comments: [
        {
          id: "c-3",
          author: "서사충",
          text: "회귀물은 정보 우위보다 감정 부채가 있어야 맛있죠.",
          likes: 25,
          createdAt: Date.now() - 1000 * 60 * 66
        }
      ]
    },
    {
      id: "p-1003",
      board: "theory",
      tag: "스포",
      work: "이번 주 최신화",
      title: "이번 화 마지막 컷, 이거 배신 복선 맞죠?",
      body:
        "위치와 배경에 있던 깨진 컵이 너무 의도적이었어요. 작가가 아무 의미 없이 큰 컷을 오래 보여줄 리가 없는데 다음 화에서 시점 전환 나오면 거의 확정이라고 봅니다.",
      author: "복선찾기",
      createdAt: Date.now() - 1000 * 60 * 128,
      likes: 51,
      bookmarks: 7,
      views: 421,
      comments: [
        {
          id: "c-4",
          author: "스포함",
          text: "흐리게 표시되는 거 좋다. 그런데 나도 그 컷 보고 같은 생각함.",
          likes: 13,
          createdAt: Date.now() - 1000 * 60 * 97
        },
        {
          id: "c-5",
          author: "다음화제발",
          text: "컷보다 전에 있던 조연 시선 처리가 더 수상했어요.",
          likes: 21,
          createdAt: Date.now() - 1000 * 60 * 84
        }
      ]
    },
    {
      id: "p-1004",
      board: "recommend",
      tag: "추천",
      work: "완결 정주행작",
      title: "연휴 기간에 몰아보기 좋은 짧은 완결작 모음 필요함",
      body:
        "장편 따라가기가 지친 사람도 50화 안쪽으로 딱 끝나는 작품은 좋더라고요. 댓글로 짧고 사운 있는 완결작 남겨주면 제가 목록으로 정리해볼게요.",
      author: "정주행러",
      createdAt: Date.now() - 1000 * 60 * 210,
      likes: 27,
      bookmarks: 33,
      views: 196,
      comments: [
        {
          id: "c-6",
          author: "완결파",
          text: "짧은 완결작 게시판 따로 있어도 좋을 듯. 검색하기 은근 어렵거든요.",
          likes: 17,
          createdAt: Date.now() - 1000 * 60 * 172
        }
      ]
    },
    {
      id: "p-1005",
      board: "creator",
      tag: "창작",
      work: "단편 콘티",
      title: "3컷 안에 반전을 넣으려면 대사를 줄이는 게 맞을까?",
      body:
        "처음에는 설명을 많이 넣었는데 반전이 약해졌어요. 컷마다 정보 하나씩만 주고 마지막에 서로 다시 읽히게 만드는 쪽이 나은지 고민 중입니다.",
      author: "콘티연습",
      createdAt: Date.now() - 1000 * 60 * 310,
      likes: 18,
      bookmarks: 8,
      views: 144,
      comments: [
        {
          id: "c-7",
          author: "말풍선줄이기",
          text: "3컷이면 첫 컷은 상황, 둘째는 오해, 셋째는 다시 보기 정도가 깔끔해요.",
          likes: 14,
          createdAt: Date.now() - 1000 * 60 * 240
        }
      ]
    }
  ];

  const palette = [
    ["#d94f3d", "#2457a6"],
    ["#0f766e", "#b7791f"],
    ["#111827", "#d94f3d"],
    ["#2457a6", "#0f766e"],
    ["#b7791f", "#334155"],
    ["#6d5bd0", "#0f766e"]
  ];

  window.PageTalkData = { boards, platformCatalog, seedPosts, palette };
})();
