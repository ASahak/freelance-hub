export enum UserRole {
  client = 'client',
  geek = 'geek',
}

export enum AuthProvider {
  native = 'native',
  google = 'google',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  provider: AuthProvider;
  avatarUrl: string | null;
}