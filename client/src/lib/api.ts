import axios from 'axios';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { ROUTES } from '@/common/constants/routes';
import { API_BASE_URL } from '@/common/constants/global';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const forceLogout = () => {
  if (typeof window !== 'undefined') {
    const currentUrl = new URL(window.location.href);
    const searchParams = currentUrl.searchParams;

    if (
      !searchParams.has('reason') ||
      searchParams.get('reason') !== 'session_expired'
    ) {
      searchParams.set('reason', 'session_expired');

      if (window.location.pathname === ROUTES.SIGN_IN) {
        // If already on sign-in page, just update URL without reload
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.replaceState(null, '', newUrl);
      } else {
        // Otherwise force redirect to sign-in
        window.location.href = `${ROUTES.SIGN_IN}?${searchParams.toString()}`;
      }
    }
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(new Error(error));

    const isTokenExpiredError = error.response.data.error === 'TokenExpired';

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/refresh' &&
      originalRequest.url !== '/auth/login' &&
      originalRequest.url !== '/auth/logout'
    ) {
      originalRequest._retry = true;

      if (isTokenExpiredError) {
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
          console.error('Refresh token failed, logging out');

          forceLogout();

          const errorMessage = getErrorMessage(refreshError);
          return Promise.reject(new Error(errorMessage));
        }
      } else {
        forceLogout();
      }
    }

    return Promise.reject(new Error(getErrorMessage(error)));
  },
);

export default api;
