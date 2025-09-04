const urlService = {
  createShortUrl: (url, validity = 30, shortcode = null) => {
    if (!/^https?:\/\//i.test(url)) throw new Error("Invalid URL format");

    const code = shortcode || Math.random().toString(36).substring(2, 7);

    if (localStorage.getItem(code)) throw new Error("Shortcode already in use");

    const createdAt = Date.now();
    const expiresAt = createdAt + validity * 60 * 1000;

    const record = { url, createdAt, expiresAt, clicks: [] };

    localStorage.setItem(code, JSON.stringify(record));

    return window.location.origin + "/" + code;
  },

  getUrl: (shortcode) => {
    const data = localStorage.getItem(shortcode);
    return data ? JSON.parse(data) : null;
  },

  logClick: (shortcode) => {
    const data = JSON.parse(localStorage.getItem(shortcode));
    if (!data) return;

    data.clicks.push({
      timestamp: new Date().toISOString(),
      referrer: document.referrer || "direct",
      location: Intl.DateTimeFormat().resolvedOptions().timeZone
    });

    localStorage.setItem(shortcode, JSON.stringify(data));
  },

  getAllUrls: () => {
    const result = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = JSON.parse(localStorage.getItem(key));
      if (value?.url) result.push({ shortcode: key, ...value });
    }
    return result;
  }
};

export default urlService;