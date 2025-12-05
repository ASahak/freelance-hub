export type IMeta = {
  ip: string | undefined
  userAgent: string | undefined
}

export interface Session {
  id: string;
  userId: string;
  ipAddress: string;
  userAgent: string;
  lastActive: string | Date;
  createdAt: string | Date;
  isCurrent: boolean;
}