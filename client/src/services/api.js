
import axios from 'axios';

// Base URL — Development mein local, Production mein live URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Har request mein automatically token attach hoga
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- AUTH APIs ----
export const signupAPI = (data) => API.post('/auth/signup', data);
export const loginAPI = (data) => API.post('/auth/login', data);
export const getProfileAPI = () => API.get('/auth/profile');

// ---- GAME APIs ----
export const saveScoreAPI = (data) => API.post('/game/score', data);
export const getHistoryAPI = () => API.get('/game/history');
export const getBestScoreAPI = () => API.get('/game/bestscore');

// ---- LEADERBOARD APIs ----
export const getLeaderboardAPI = (difficulty) =>
  API.get(`/leaderboard${difficulty ? `?difficulty=${difficulty}` : ''}`);