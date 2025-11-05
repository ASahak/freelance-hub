import axios from 'axios';
import { getErrorMessage } from '@/utils/getErrorMessage';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest.headers['X-No-Refresh'] &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to get a new access token from the /auth/refresh endpoint
        await axios.post('/auth/refresh', {}, { withCredentials: true });

        // If successful, retry the original request with the new cookie
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log the user out
        // (You would redirect to /login here)
        console.error('Refresh token failed, logging out');
        const errorMessage = getErrorMessage(refreshError);
        return Promise.reject(new Error(errorMessage));
      }
    }

    return Promise.reject(new Error(getErrorMessage(error)));
  },
);

export default api;
