import { useState, useCallback } from "react";
import { tourService } from "../services/api/tourService";
import axios from "axios";

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

  const updateTour = useCallback(async (id, formDataToSend) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`http://34.239.141.92:8080/api/tours/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar el tour");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);




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

  return {
    tours,
    loading,
    error,
    fetchTours,
    createTour,
    updateTour,
    deleteTour,
  };
};
