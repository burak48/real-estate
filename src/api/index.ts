import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_BASE_URL}/v0/${import.meta.env.VITE_APP_BASE_ID}`;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export async function fetchAppointments() {
  const response = await api.get('/Appointments');
  return response.data;
}
