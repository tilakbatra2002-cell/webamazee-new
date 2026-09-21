import { ApiError } from '../utils/ApiError.js';

/**
 * Validates `req[source]` against a zod schema and replaces it with the
 * parsed (coerced + stripped) value. Unknown keys are dropped by the schemas,
 * which is our primary input-sanitisation boundary.
 */
export const validate =
  (schema, source = 'body') =>
  (req, _res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join('.') || '(root)',
        message: issue.message,
      }));
      return next(ApiError.badRequest('Validation failed', details));
    }
    if (source === 'query') {
      // Express 5 exposes req.query as a getter; keep parsed data separately.
      req.validatedQuery = result.data;
    } else {
      req[source] = result.data;
    }
    return next();
  };
