import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'http://172.18.10.136:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Session expired or invalid token');
      await AsyncStorage.removeItem('access_token');
    }
    return Promise.reject(error);
  }
);

export const getCurrentUser = () => apiClient.get('/auth/current-user');

export const getUser = (userData) =>
  apiClient.get(`/auth/user/?username_or_email=${encodeURIComponent(userData)}`);

export const getUsers = () => apiClient.get('/auth/users');

export const registerUser = (userData) => apiClient.post('/auth/register', userData);

export const loginUser = (userData) => apiClient.post('/auth/login', userData);

export const logoutUser = () => apiClient.post('/auth/logout');

export const getChats = () => apiClient.get('/chat');

export const getChatById = (id) => apiClient.get(`/chat/messages/${id}`);

export const createOrGetChat = (username) =>
  apiClient.post('/chat/create-or-get', username);

export const getMessageById = (messageId) => apiClient.get(`/chat/message/${messageId}`);

export const sendMessageToChat = (chatId, formData) => {
  return apiClient.post(`/chat/message/${chatId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default apiClient;
