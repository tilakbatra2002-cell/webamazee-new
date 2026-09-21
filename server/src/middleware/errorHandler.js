import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export function notFoundHandler(req, _res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars -- Express identifies error middleware by arity.
export function errorHandler(err, _req, res, _next) {
  let status = err.status || err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let details = err.details;

  // Mongoose validation
  if (err.name === 'ValidationError' && err.errors) {
    status = 400;
    message = 'Validation failed';
    details = Object.entries(err.errors).map(([field, e]) => ({ field, message: e.message }));
  }
  // Bad ObjectId
  if (err.name === 'CastError') {
    status = 400;
    message = `Invalid value for "${err.path}"`;
  }
  // Duplicate key
  if (err.code === 11000) {
    status = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message =
      field === 'invoiceNumber'
        ? `Invoice number "${err.keyValue[field]}" already exists`
        : `Duplicate value for ${field}`;
  }

  if (status >= 500) {
    console.error('[error]', err);
  }

  res.status(status).json({
    success: false,
    error: {
      message: status >= 500 && env.isProduction ? 'Internal server error' : message,
      ...(details ? { details } : {}),
    },
  });
}
