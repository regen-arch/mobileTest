export default class BookingService {
  async fetchBookings() {
    // 模拟异步请求（如 500ms 延迟）
    return new Promise((resolve) => {
      setTimeout(async () => {
        const data = await import("../assets/booking.json");
        resolve(data.default);
      }, 500);
    });
  }
}
