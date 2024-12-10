import apiClient from "./config";

export const bookingService = {
  getAllBookings: async () => {
    return await apiClient.get("/bookings", {
      headers: {
        Authorization: null,
      },
    });
  },

  createBooking: async (bookingData) => {
    return await apiClient.post("/bookings", bookingData, {
      headers: {
        Authorization: null,
      },
    });
  },

  getBookingById: async (id) => {
    return await apiClient.get(`/bookings/${id}`, {
      headers: {
        Authorization: null,
      },
    });
  },

  updateBooking: async (id, bookingData) => {
    return await apiClient.put(`/bookings/${id}`, bookingData, {
      headers: {
        Authorization: null,
      },
    });
  },

  deleteBooking: async (id) => {
    return await apiClient.delete(`/bookings/${id}`, {
      headers: {
        Authorization: null,
      },
    });
  },
};
