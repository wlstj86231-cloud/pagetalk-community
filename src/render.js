(() => {
  const { hotScore, bestComment, boardLabel, activeSortLabel, timeAgo, hashCode, escapeHtml } = window.PageTalkUtils;

  function renderApp(ctx) {
    renderBoards(ctx);
    renderTrends(ctx);
    renderFeed(ctx);
    renderDiscussion(ctx);
  }

  function visiblePosts(ctx) {
    const { boards, els, state } = ctx;
    const query = els.searchInput.value.trim().toLowerCase();
    let list = state.posts.filter((post) => state.activeBoard === "all" || post.board === state.activeBoard);

    if (query) {
      list = list.filter((post) =>
        [post.work, post.title, post.body, post.author, post.tag, boardLabel(boards, post.board)]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    return [...list].sort((a, b) => {
      if (state.activeSort === "new") return b.createdAt - a.createdAt;
      if (state.activeSort === "comments") return b.comments.length - a.comments.length || b.createdAt - a.createdAt;
      return hotScore(b) - hotScore(a);
    });
  }

  function renderBoards(ctx) {
    const { boards, els, state, handlers } = ctx;
    els.boardNav.innerHTML = boards
      .map((board) => {
        const count = board.id === "all" ? state.posts.length : state.posts.filter((post) => post.board === board.id).length;
        return `<button type="button" class="${state.activeBoard === board.id ? "is-active" : ""}" data-board="${board.id}">
          <span>${board.label}</span><span>${count}</span>
        </button>`;
      })
      .join("");

    els.boardNav.querySelectorAll("[data-board]").forEach((button) => {
      button.addEventListener("click", () => handlers.selectBoard(button.dataset.board));
    });
  }

  function renderTrends(ctx) {
    const { els, state, handlers } = ctx;
    const top = [...state.posts].sort((a, b) => hotScore(b) - hotScore(a)).slice(0, 4);
    els.trendList.innerHTML = top
      .map(
        (post) => `<button type="button" class="trend-chip" data-jump="${post.id}">
          <strong>${escapeHtml(post.work)}</strong>
          <small>${post.likes} 좋아요 · 댓글 ${post.comments.length}</small>
        </button>`
      )
      .join("");

    els.trendList.querySelectorAll("[data-jump]").forEach((button) => {
      button.addEventListener("click", () => handlers.jumpToPost(button.dataset.jump));
    });
  }

  function renderFeed(ctx) {
    const { boards, els, state, handlers } = ctx;
    const list = visiblePosts(ctx);
    if (!list.find((post) => post.id === state.activePostId)) state.activePostId = list[0]?.id;
    const comments = state.posts.reduce((sum, post) => sum + post.comments.length, 0);

    els.feedStats.innerHTML = `
      <span>게시글 ${state.posts.length}</span>
      <span>댓글 ${comments}</span>
      <span>선택 게시판 ${boardLabel(boards, state.activeBoard)}</span>
      <span>${activeSortLabel(state.activeSort)}순</span>
    `;

    els.postList.innerHTML = list.length
      ? list.map((post, index) => renderPostRow(ctx, post, index)).join("")
      : `<div class="empty-state">검색 조건에 맞는 이야기가 아직 없습니다.</div>`;

    els.postList.querySelectorAll("[data-post]").forEach((button) => {
      button.addEventListener("click", () => handlers.selectPost(button.dataset.post));
    });
  }

  function renderPostRow(ctx, post, index) {
    const { boards, palette, state } = ctx;
    const colors = palette[index % palette.length];
    const isSpoiler = post.tag === "스포";
    return `<button type="button" class="post-row ${post.id === state.activePostId ? "is-active" : ""} ${isSpoiler ? "spoiler" : ""}" data-post="${post.id}" style="--cover-a:${colors[0]};--cover-b:${colors[1]}">
      <span class="cover-art"><span>${escapeHtml(post.work)}</span></span>
      <span class="post-body">
        <span class="meta-line">
          <span class="tag ${isSpoiler ? "spoiler" : ""}">${escapeHtml(post.tag)}</span>
          <small>${boardLabel(boards, post.board)}</small>
          <small>${timeAgo(post.createdAt)}</small>
        </span>
        <h2>${escapeHtml(post.title)}</h2>
        <p>${escapeHtml(post.body)}</p>
        <span class="post-metrics">
          <span>좋아요 ${post.likes}</span>
          <span>댓글 ${post.comments.length}</span>
          <span>조회 ${post.views}</span>
          <span>저장 ${post.bookmarks}</span>
        </span>
      </span>
    </button>`;
  }

  function renderDiscussion(ctx) {
    const { els, palette, state, handlers } = ctx;
    const post = state.posts.find((item) => item.id === state.activePostId);
    if (!post) {
      els.discussionPanel.innerHTML = `<div class="discussion-empty"><h2>게시글을 선택하세요</h2><p>왼쪽 목록에서 감상글을 누르면 댓글과 베스트댓글을 볼 수 있습니다.</p></div>`;
      return;
    }

    const colors = palette[Math.abs(hashCode(post.id)) % palette.length];
    const best = bestComment(post);
    const isLiked = state.likedPosts.has(post.id);
    els.discussionPanel.innerHTML = `
      <div class="discussion-cover" style="--cover-a:${colors[0]};--cover-b:${colors[1]}">
        <strong>${escapeHtml(post.work)}</strong>
      </div>
      <div class="discussion-content">
        <div class="meta-line">
          <span class="tag ${post.tag === "스포" ? "spoiler" : ""}">${escapeHtml(post.tag)}</span>
          <small>${escapeHtml(post.author)}</small>
          <small>${timeAgo(post.createdAt)}</small>
        </div>
        <h2>${escapeHtml(post.title)}</h2>
        <p class="discussion-text">${escapeHtml(post.body)}</p>
        <div class="action-row">
          <button type="button" class="${isLiked ? "is-on" : ""}" data-like-post="${post.id}">좋아요 ${post.likes}</button>
          <button type="button" data-bookmark-post="${post.id}">저장 ${post.bookmarks}</button>
          <button type="button" data-report-post="${post.id}">신고</button>
        </div>
        ${best ? renderBestComment(ctx, best) : ""}
        <section class="comments-section">
          <h3 class="section-title">댓글 ${post.comments.length}</h3>
          <div class="comment-list">${post.comments.map((comment) => renderComment(ctx, comment)).join("") || `<div class="empty-state">첫 댓글을 남겨보세요.</div>`}</div>
        </section>
        <section class="comment-form">
          <h3 class="section-title">댓글 쓰기</h3>
          <textarea id="commentText" rows="3" placeholder="작품 이야기에 집중해서 남겨주세요." maxlength="420"></textarea>
          <div class="comment-form-row">
            <input id="commentAuthor" type="text" value="익명독자" maxlength="16" aria-label="댓글 닉네임" />
            <button type="button" data-add-comment="${post.id}">등록</button>
          </div>
        </section>
      </div>
    `;

    els.discussionPanel.querySelector("[data-like-post]")?.addEventListener("click", () => handlers.togglePostLike(post.id));
    els.discussionPanel.querySelector("[data-bookmark-post]")?.addEventListener("click", () => handlers.bookmarkPost(post.id));
    els.discussionPanel.querySelector("[data-report-post]")?.addEventListener("click", handlers.markReported);
    els.discussionPanel.querySelector("[data-add-comment]")?.addEventListener("click", () => handlers.addComment(post.id));
    els.discussionPanel.querySelectorAll("[data-like-comment]").forEach((button) => {
      button.addEventListener("click", () => handlers.toggleCommentLike(post.id, button.dataset.likeComment));
    });
  }

  function renderBestComment(ctx, comment) {
    return `<section class="best-comment">
      <h3 class="section-title">베스트댓글</h3>
      ${renderComment(ctx, comment, true)}
    </section>`;
  }

  function renderComment(ctx, comment, compact = false) {
    const isLiked = ctx.state.likedComments.has(comment.id);
    return `<article class="comment-item">
      <div class="comment-head">
        <strong>${escapeHtml(comment.author)}</strong>
        <small>${timeAgo(comment.createdAt)}</small>
      </div>
      <p>${escapeHtml(comment.text)}</p>
      <div class="comment-actions">
        <button type="button" class="${isLiked ? "is-on" : ""}" ${compact ? "disabled" : `data-like-comment="${comment.id}"`}>좋아요 ${comment.likes}</button>
      </div>
    </article>`;
  }

  window.PageTalkRender = { renderApp, visiblePosts };
})();
