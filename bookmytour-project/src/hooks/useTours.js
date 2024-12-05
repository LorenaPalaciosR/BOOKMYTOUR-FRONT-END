import { useState, useCallback } from "react";
import { tourService } from "../services/api/tourService";

export const useTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTours = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await tourService.getAllTours();
      setTours(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar los tours");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTour = useCallback(async (tourData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tourService.createTour(tourData);
      setTours((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear el tour");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTour = useCallback(
    async (id, tourData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await tourService.updateTour(id, tourData);
        console.log("que enbvio", response);
        setTours((prev) =>
          prev.map((tour) => (tour.tourId === id ? response.data : tour))
        );

        setTimeout(() => {
          fetchTours();
        }, 1000);

        return response.data;
      } catch (err) {
        setError(err.response?.data?.message || "Error al actualizar el tour");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchTours]
  );

  const deleteTour = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tourService.deleteTour(id);
      setTours((prev) => prev.filter((tour) => tour.tourId !== id));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al eliminar el tour");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTourById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tourService.getTourById(id);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener el tour");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tours,
    loading,
    error,
    fetchTours,
    createTour,
    updateTour,
    deleteTour,
    getTourById,
  };
};
