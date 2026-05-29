(() => {
  const keys = {
    posts: "pagetalk:mvp:v2",
    likedPosts: "pagetalk:liked-posts:v2",
    likedComments: "pagetalk:liked-comments:v2"
  };

  function loadPosts(fallbackPosts) {
    try {
      const saved = JSON.parse(localStorage.getItem(keys.posts) || "null");
      return Array.isArray(saved) && saved.length ? saved : fallbackPosts;
    } catch {
      return fallbackPosts;
    }
  }

  function savePosts(posts) {
    localStorage.setItem(keys.posts, JSON.stringify(posts));
  }

  function loadSet(key) {
    try {
      return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
    } catch {
      return new Set();
    }
  }

  function saveSet(key, set) {
    localStorage.setItem(key, JSON.stringify([...set]));
  }

  window.PageTalkStorage = { keys, loadPosts, savePosts, loadSet, saveSet };
})();
