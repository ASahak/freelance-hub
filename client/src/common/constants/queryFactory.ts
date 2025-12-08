export const QUERY_FACTORY = {
  me: ['user', 'me'],
  activeSessions: (userId: string) => [userId, 'auth', 'sessions'],
};
