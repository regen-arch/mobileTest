import BookingService from "../services/bookingServices";
import { cache, isCacheExpired } from "./cache";

export default class DataManager {
  service: BookingService;
  constructor() {
    this.service = new BookingService();
  }

  async getData() {
    const cached = cache.load();

    // 缓存有效且未过期
    if (cached && !isCacheExpired(cached)) {
      console.log("Cache not expired, using cache data");
      return cached.data;
    }

    // 缓存过期或无缓存，触发刷新
    console.log("Cache has expired, refresh data");
    return this.refreshData();
  }

  async refreshData() {
    try {
      console.log("Data refresh init");
      const freshData = await this.service.fetchBookings();
      cache.save(freshData);
      return freshData;
    } catch (error) {
      // 错误处理：降级返回旧缓存
      console.error("Data refresh failed:", error);
      return cache?.load() || null;
    }
  }
}
