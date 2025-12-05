import { IMeta } from '@libs/types/session.type';
import { Request } from 'express';

export const getMeta = (req: Request): IMeta => ({
  ip: req.ip || req.socket.remoteAddress,
  userAgent: req.headers['user-agent'],
});