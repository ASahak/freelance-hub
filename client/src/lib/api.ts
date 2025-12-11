import axios from 'axios';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { ROUTES } from '@/common/constants/routes';
import { API_BASE_URL } from '@/common/constants/global';
import { protectedRoutes } from '@/middleware';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const forceLogout = () => {
  if (typeof window !== 'undefined') {
    const isAccessingProtectedRoutes = protectedRoutes.some((path) =>
      window.location.pathname.startsWith(path),
    );
    if (isAccessingProtectedRoutes) {
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
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(new Error(error));

    const isAuthRequest =
      originalRequest.url.includes('/auth/refresh') ||
      originalRequest.url.includes('/auth/login') ||
      originalRequest.url.includes('/auth/logout');

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed, logging out');
        forceLogout();

        const errorMessage = getErrorMessage(refreshError);
        return Promise.reject(new Error(errorMessage));
      }
    }

    return Promise.reject(new Error(getErrorMessage(error)));
  },
);

export default api;
