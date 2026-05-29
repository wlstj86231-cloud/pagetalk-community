(() => {
  const { boards, platformCatalog, seedPosts, palette } = window.PageTalkData;
  const { keys, loadPosts, savePosts, loadSet, saveSet } = window.PageTalkStorage;
  const { renderApp, visiblePosts } = window.PageTalkRender;

  const state = {
    posts: loadPosts(seedPosts),
    activeBoard: "all",
    activeSort: "hot",
    activePostId: null,
    composerPlatformId: platformCatalog[0]?.id || "",
    composerScheduleId: platformCatalog[0]?.schedules[0]?.id || "",
    composerWorkId: platformCatalog[0]?.schedules[0]?.works[0]?.id || "",
    likedPosts: loadSet(keys.likedPosts),
    likedComments: loadSet(keys.likedComments)
  };
  state.activePostId = state.posts[0]?.id;

  const els = {
    boardNav: document.querySelector("#boardNav"),
    postList: document.querySelector("#postList"),
    trendList: document.querySelector("#trendList"),
    feedStats: document.querySelector("#feedStats"),
    discussionPanel: document.querySelector("#discussionPanel"),
    searchInput: document.querySelector("#searchInput"),
    composer: document.querySelector("#composer"),
    openComposer: document.querySelector("#openComposer"),
    closeComposer: document.querySelector("#closeComposer"),
    publishPost: document.querySelector("#publishPost"),
    postBoard: document.querySelector("#postBoard"),
    postPlatform: document.querySelector("#postPlatform"),
    schedulePicker: document.querySelector("#schedulePicker"),
    postWorkSelect: document.querySelector("#postWorkSelect"),
    workPreview: document.querySelector("#workPreview"),
    postTitle: document.querySelector("#postTitle"),
    postBody: document.querySelector("#postBody"),
    postTag: document.querySelector("#postTag"),
    postAuthor: document.querySelector("#postAuthor"),
    composerHint: document.querySelector("#composerHint")
  };

  const ctx = { boards, palette, els, state, handlers: null };
  const handlers = {
    selectBoard,
    jumpToPost,
    selectPost,
    togglePostLike,
    bookmarkPost,
    markReported,
    addComment,
    toggleCommentLike
  };
  ctx.handlers = handlers;

  init();

  function init() {
    els.postBoard.innerHTML = boards
      .filter((board) => board.id !== "all")
      .map((board) => `<option value="${board.id}">${board.label}</option>`)
      .join("");
    els.postPlatform.innerHTML = platformCatalog.map((platform) => `<option value="${platform.id}">${platform.label}</option>`).join("");

    els.searchInput.addEventListener("input", render);
    els.openComposer.addEventListener("click", openComposer);
    els.closeComposer.addEventListener("click", () => els.composer.classList.remove("is-open"));
    els.publishPost.addEventListener("click", publishPost);
    els.postPlatform.addEventListener("change", () => {
      state.composerPlatformId = els.postPlatform.value;
      state.composerScheduleId = selectedPlatform()?.schedules[0]?.id || "";
      state.composerWorkId = selectedSchedule()?.works[0]?.id || "";
      syncBoardWithSelectedWork();
      renderComposerWorkPicker();
    });
    els.postWorkSelect.addEventListener("change", () => {
      state.composerWorkId = els.postWorkSelect.value;
      syncBoardWithSelectedWork();
      renderComposerWorkPreview();
    });

    document.querySelectorAll("[data-sort]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeSort = button.dataset.sort;
        document.querySelectorAll("[data-sort]").forEach((item) => item.classList.toggle("is-active", item === button));
        render();
      });
    });

    renderComposerWorkPicker();
    render();
  }

  function render() {
    renderApp(ctx);
  }

  function openComposer() {
    els.composer.classList.add("is-open");
    els.composerHint.textContent = "작품 원문·유료 회차 캡처 업로드 없이 감상과 토론만 다룹니다.";
    renderComposerWorkPicker();
    els.postTitle.focus();
  }

  function selectBoard(boardId) {
    state.activeBoard = boardId;
    const first = visiblePosts(ctx)[0];
    if (first) state.activePostId = first.id;
    render();
  }

  function jumpToPost(postId) {
    state.activePostId = postId;
    state.activeBoard = "all";
    render();
  }

  function selectPost(postId) {
    state.activePostId = postId;
    const post = state.posts.find((item) => item.id === postId);
    if (post) post.views += 1;
    persistPosts();
    render();
  }

  function publishPost() {
    const board = els.postBoard.value;
    const platform = selectedPlatform();
    const schedule = selectedSchedule();
    const selectedWork = selectedWorkItem();
    const work = selectedWork?.title || "";
    const title = els.postTitle.value.trim();
    const body = els.postBody.value.trim();
    const author = els.postAuthor.value.trim() || "익명독자";
    const tag = els.postTag.value;

    if (!work || !title || !body) {
      els.composerHint.textContent = "연재처, 작품, 제목, 본문은 꼭 채워야 합니다.";
      return;
    }

    const post = {
      id: `p-${Date.now()}`,
      board,
      tag,
      work,
      platform: platform?.label || "",
      platformId: platform?.id || "",
      schedule: schedule?.label || "",
      scheduleId: schedule?.id || "",
      genre: selectedWork?.genre || "",
      workSummary: selectedWork?.summary || "",
      title,
      body,
      author,
      createdAt: Date.now(),
      likes: 0,
      bookmarks: 0,
      views: 1,
      comments: []
    };

    state.posts.unshift(post);
    state.activeBoard = "all";
    state.activeSort = "new";
    state.activePostId = post.id;
    syncSortTabs();
    els.postTitle.value = "";
    els.postBody.value = "";
    els.composer.classList.remove("is-open");
    persistPosts();
    render();
  }

  function addComment(postId) {
    const post = state.posts.find((item) => item.id === postId);
    const text = document.querySelector("#commentText")?.value.trim();
    const author = document.querySelector("#commentAuthor")?.value.trim() || "익명독자";
    if (!post || !text) return;

    post.comments.push({
      id: `c-${Date.now()}`,
      author,
      text,
      likes: 0,
      createdAt: Date.now()
    });
    persistPosts();
    render();
  }

  function togglePostLike(postId) {
    const post = state.posts.find((item) => item.id === postId);
    if (!post) return;

    if (state.likedPosts.has(postId)) {
      state.likedPosts.delete(postId);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      state.likedPosts.add(postId);
      post.likes += 1;
    }

    saveSet(keys.likedPosts, state.likedPosts);
    persistPosts();
    render();
  }

  function toggleCommentLike(postId, commentId) {
    const post = state.posts.find((item) => item.id === postId);
    const comment = post?.comments.find((item) => item.id === commentId);
    if (!comment) return;

    if (state.likedComments.has(commentId)) {
      state.likedComments.delete(commentId);
      comment.likes = Math.max(0, comment.likes - 1);
    } else {
      state.likedComments.add(commentId);
      comment.likes += 1;
    }

    saveSet(keys.likedComments, state.likedComments);
    persistPosts();
    render();
  }

  function bookmarkPost(postId) {
    const post = state.posts.find((item) => item.id === postId);
    if (!post) return;
    post.bookmarks += 1;
    persistPosts();
    render();
  }

  function markReported(event) {
    event.currentTarget.textContent = "신고됨";
    event.currentTarget.disabled = true;
  }

  function persistPosts() {
    savePosts(state.posts);
  }

  function selectedPlatform() {
    return platformCatalog.find((platform) => platform.id === state.composerPlatformId) || platformCatalog[0];
  }

  function selectedSchedule() {
    const platform = selectedPlatform();
    return platform?.schedules.find((schedule) => schedule.id === state.composerScheduleId) || platform?.schedules[0];
  }

  function selectedWorkItem() {
    const schedule = selectedSchedule();
    return schedule?.works.find((work) => work.id === state.composerWorkId) || schedule?.works[0];
  }

  function renderComposerWorkPicker() {
    const platform = selectedPlatform();
    if (!platform) return;

    els.postPlatform.value = platform.id;
    els.schedulePicker.innerHTML = platform.schedules
      .map(
        (schedule) => `<button type="button" class="${schedule.id === state.composerScheduleId ? "is-active" : ""}" data-schedule="${schedule.id}">
          <strong>${schedule.label}</strong>
          <span>${schedule.works.length}작품</span>
        </button>`
      )
      .join("");

    els.schedulePicker.querySelectorAll("[data-schedule]").forEach((button) => {
      button.addEventListener("click", () => {
        state.composerScheduleId = button.dataset.schedule;
        state.composerWorkId = selectedSchedule()?.works[0]?.id || "";
        syncBoardWithSelectedWork();
        renderComposerWorkPicker();
      });
    });

    const schedule = selectedSchedule();
    els.postWorkSelect.innerHTML = (schedule?.works || [])
      .map((work) => `<option value="${work.id}">${work.title} · ${work.genre}</option>`)
      .join("");
    state.composerWorkId = selectedWorkItem()?.id || "";
    els.postWorkSelect.value = state.composerWorkId;
    renderComposerWorkPreview();
  }

  function renderComposerWorkPreview() {
    const platform = selectedPlatform();
    const schedule = selectedSchedule();
    const work = selectedWorkItem();
    if (!platform || !schedule || !work) {
      els.workPreview.innerHTML = `<p>연재처와 작품을 선택하세요.</p>`;
      return;
    }

    els.workPreview.innerHTML = `
      <div>
        <strong>${work.title}</strong>
        <span>${platform.label} · ${schedule.label} · ${work.genre}</span>
      </div>
      <p>${work.summary}</p>
      <small>${platform.note} / ${schedule.note}</small>
    `;
  }

  function syncBoardWithSelectedWork() {
    const platform = selectedPlatform();
    if (!platform) return;
    if (platform.contentType === "webtoon" || platform.contentType === "novel") {
      els.postBoard.value = platform.contentType;
    }
  }

  function syncSortTabs() {
    document.querySelectorAll("[data-sort]").forEach((item) => item.classList.toggle("is-active", item.dataset.sort === state.activeSort));
  }
})();
