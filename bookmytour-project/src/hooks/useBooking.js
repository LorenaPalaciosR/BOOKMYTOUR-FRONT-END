import { useState, useCallback } from "react";
import { bookingService } from "../services/api/bookingService";

export const useBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookingService.getAllBookings();
      setBookings(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar las reservas");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createBooking = useCallback(async (bookingData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookingService.createBooking(bookingData);
      setBookings((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear la reserva");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
  };
};
