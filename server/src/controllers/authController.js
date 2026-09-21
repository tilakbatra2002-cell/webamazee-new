import { User } from '../models/User.js';
import { ApiError, asyncHandler } from '../utils/ApiError.js';
import { signToken } from '../middleware/auth.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user || !(await user.verifyPassword(password))) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  user.lastLoginAt = new Date();
  await user.save();

  res.json({ success: true, data: { token: signToken(user), user: user.toJSON() } });
});

/** Bootstrap endpoint: only usable while no admin account exists. */
export const register = asyncHandler(async (req, res) => {
  const existing = await User.countDocuments();
  if (existing > 0) {
    throw ApiError.forbidden('An admin account already exists. Please sign in.');
  }

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    passwordHash: await User.hashPassword(password),
    role: 'admin',
  });

  res.status(201).json({ success: true, data: { token: signToken(user), user: user.toJSON() } });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { user: req.user.toJSON() } });
});

/** Tells the login screen whether the first-run setup flow should be shown. */
export const authStatus = asyncHandler(async (_req, res) => {
  const count = await User.countDocuments();
  res.json({ success: true, data: { needsSetup: count === 0 } });
});
