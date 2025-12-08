export interface Session {
  id: string;
  userId: string;
  ipAddress: string;
  userAgent: string;
  deviceType: string;
  lastActive: string | Date;
  createdAt: string | Date;
  isCurrent: boolean;
}

export type IMeta = {
  ip: string | undefined;
  userAgent: string | undefined;
};
