import apiClient from './config';

export const tourService = {
    getAllTours: async () => {
      return await apiClient.get('/tours');
    },
    
    getTourById: async (id) => {
      return await apiClient.get(`/tours/${id}`);
    },
    
    createTour: async (tourData) => {
      return await apiClient.post("/tours", tourData, {
        headers: {
          "Content-Type": "multipart/form-data",
          
        },
      });
    },
    
    updateTour: async (id, tourData) => {
      return await apiClient.put(`/tours/${id}`, tourData);
    },
    
    deleteTour: async (id) => {
      return await apiClient.delete(`/tours/${id}`);
    }
  };