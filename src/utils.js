(() => {
  function hotScore(post) {
    const ageHours = Math.max(1, (Date.now() - post.createdAt) / 3600000);
    return post.likes * 2 + post.comments.length * 5 + post.bookmarks * 1.5 + post.views * 0.08 - ageHours * 0.18;
  }

  function bestComment(post) {
    return [...post.comments].sort((a, b) => b.likes - a.likes)[0];
  }

  function boardLabel(boards, id) {
    return boards.find((board) => board.id === id)?.label || "전체";
  }

  function activeSortLabel(activeSort) {
    if (activeSort === "new") return "최신";
    if (activeSort === "comments") return "댓글";
    return "인기";
  }

  function timeAgo(time) {
    const diff = Date.now() - time;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "방금";
    if (minutes < 60) return `${minutes}분 전`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}시간 전`;
    return `${Math.floor(hours / 24)}일 전`;
  }

  function hashCode(value) {
    return String(value)
      .split("")
      .reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  window.PageTalkUtils = { hotScore, bestComment, boardLabel, activeSortLabel, timeAgo, hashCode, escapeHtml };
})();
