(() => {
  const { boards, seedPosts, palette } = window.PageTalkData;
  const { keys, loadPosts, savePosts, loadSet, saveSet } = window.PageTalkStorage;
  const { renderApp, visiblePosts } = window.PageTalkRender;

  const state = {
    posts: loadPosts(seedPosts),
    activeBoard: "all",
    activeSort: "hot",
    activePostId: null,
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
    postWork: document.querySelector("#postWork"),
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

    els.searchInput.addEventListener("input", render);
    els.openComposer.addEventListener("click", openComposer);
    els.closeComposer.addEventListener("click", () => els.composer.classList.remove("is-open"));
    els.publishPost.addEventListener("click", publishPost);

    document.querySelectorAll("[data-sort]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeSort = button.dataset.sort;
        document.querySelectorAll("[data-sort]").forEach((item) => item.classList.toggle("is-active", item === button));
        render();
      });
    });

    render();
  }

  function render() {
    renderApp(ctx);
  }

  function openComposer() {
    els.composer.classList.add("is-open");
    els.composerHint.textContent = "작품 원문·유료 회차 캡처 업로드 없이 감상과 토론만 다룹니다.";
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
    const work = els.postWork.value.trim();
    const title = els.postTitle.value.trim();
    const body = els.postBody.value.trim();
    const author = els.postAuthor.value.trim() || "익명독자";
    const tag = els.postTag.value;

    if (!work || !title || !body) {
      els.composerHint.textContent = "작품명, 제목, 본문은 꼭 채워야 합니다.";
      return;
    }

    const post = {
      id: `p-${Date.now()}`,
      board,
      tag,
      work,
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
    state.activePostId = post.id;
    els.postWork.value = "";
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
})();
