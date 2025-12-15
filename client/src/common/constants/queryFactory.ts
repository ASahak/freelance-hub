export const QUERY_FACTORY = {
  me: ['user', 'me'],
  activeSessions: (userId: string) => [userId, 'auth', 'sessions'],
  getProfile: (userId: string) => ['profile', userId],
};
