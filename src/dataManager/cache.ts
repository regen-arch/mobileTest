const CACHE_KEY = "booking_cache";

const cache = {
  save(data: any) {
    const payload = {
      data,
      timestamp: Date.now(),
    };
    try {
      console.log("Saving new data to cache");
      localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error("Local storage failed");
    }
  },
  load() {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  clear() {
    localStorage.removeItem(CACHE_KEY);
  },
};

const isCacheExpired = (cachedData: { data: any; timestamp: number }) => {
  return (
    Date.now() - cachedData?.timestamp > Number(cachedData?.data?.duration)
  );
};

export { cache, isCacheExpired };
