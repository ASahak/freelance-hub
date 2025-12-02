import axios from 'axios';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { ROUTES } from '@/common/constants/routes';
import { API_BASE_URL } from '@/common/constants/global';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isTokenExpiredError = error.response.data.error === 'TokenExpired';

    if (
      error.response.status === 401 &&
      isTokenExpiredError &&
      originalRequest.url !== '/auth/refresh' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to get a new access token from the /auth/refresh endpoint
        await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        // If successful, retry the original request with the new cookie
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log the user out
        // (You would redirect to /login here)
        console.error('Refresh token failed, logging out');

        if (
          typeof window !== 'undefined' &&
          window.location.pathname !== ROUTES.SIGN_IN
        ) {
          window.location.href = `${ROUTES.SIGN_IN}?reason=session_expired`;
        }

        const errorMessage = getErrorMessage(refreshError);
        return Promise.reject(new Error(errorMessage));
      }
    }

    return Promise.reject(new Error(getErrorMessage(error)));
  },
);

export default api;
