import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.js';

export function signToken(user) {
  return jwt.sign({ sub: String(user._id), role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
}

function extractToken(req) {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) return header.slice(7).trim();
  // Download links (PDF/PNG) open in a new tab and cannot set headers.
  if (typeof req.query?.token === 'string' && req.query.token) return req.query.token;
  return null;
}

/** Verifies the JWT and attaches the admin user to the request. */
export async function requireAuth(req, _res, next) {
  try {
    const token = extractToken(req);
    if (!token) throw ApiError.unauthorized();

    let payload;
    try {
      payload = jwt.verify(token, env.jwtSecret);
    } catch {
      throw ApiError.unauthorized('Session expired, please sign in again');
    }

    const user = await User.findById(payload.sub);
    if (!user) throw ApiError.unauthorized('Account no longer exists');

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
