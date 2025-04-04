import axios from './axiosConfig'; 

const API_URL = '/api/venues'; // Using proxy path

export const getVenues = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw error;
  }
};

export const getVenueById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching venue with ID ${id}:`, error);
    throw error;
  }
};

export const createVenue = async (venueData) => {
  try {
    const response = await axios.post(API_URL, venueData);
    return response.data;
  } catch (error) {
    console.error('Error creating venue:', error);
    throw error;
  }
};

export const updateVenue = async (id, venueData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, venueData);
    return response.data;
  } catch (error) {
    console.error(`Error updating venue with ID ${id}:`, error);
    throw error;
  }
};

export const deleteVenue = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting venue with ID ${id}:`, error);
    throw error;
  }
};