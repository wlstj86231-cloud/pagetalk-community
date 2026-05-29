(() => {
  const boards = [
    { id: "all", label: "전체", accent: "#2457a6" },
    { id: "webtoon", label: "웹툰", accent: "#d94f3d" },
    { id: "novel", label: "웹소설", accent: "#0f766e" },
    { id: "recommend", label: "추천", accent: "#b7791f" },
    { id: "theory", label: "떡밥·토론", accent: "#6d5bd0" },
    { id: "creator", label: "창작방", accent: "#334155" }
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

  window.PageTalkData = { boards, seedPosts, palette };
})();
