import { IMeta } from '@libs/types/session.type';
import { Request } from 'express';

export const getMeta = (req: Request): IMeta => {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0] : req.ip;

  return {
    ip: ip || req.socket.remoteAddress || 'Unknown IP',
    userAgent: req.headers['user-agent'] || 'Unknown User Agent',
  };
};
