import { CompanySettings } from '../models/CompanySettings.js';
import { asyncHandler } from '../utils/ApiError.js';

/** GET /api/settings */
export const getSettings = asyncHandler(async (_req, res) => {
  const settings = await CompanySettings.getSingleton();
  res.json({ success: true, data: { settings: settings.toJSON() } });
});

/** PUT /api/settings */
export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await CompanySettings.getSingleton();
  const { bankDetails, ...rest } = req.body;

  settings.set(rest);
  if (bankDetails) settings.set('bankDetails', { ...settings.bankDetails?.toObject?.(), ...bankDetails });

  await settings.save();
  res.json({ success: true, data: { settings: settings.toJSON() } });
});
