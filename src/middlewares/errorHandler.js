import { Exception } from "../util/exception.js";
import logger from "../util/logger.js";
import { CastError } from "mongoose";

export const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`404 - Not Found - ${req.originalUrl}`);
  next(error);
};

/**
 * @description Express middleware function that handles errors and sends a JSON response with an error message and stack trace.
 * @todo This function should handle errors differently depending on the type of error.
 * @param {Error} err - The error object to handle.
 * @param {Express<Request>} req - The Express request object.
 * @param {Express<Response>} res - The Express response object.
 * @param {Function} next - The next middleware function in the chain.
 * @returns {void}
 */
export const errorHandler = (err, _req, res, _next) => {
  if (err instanceof Exception) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof CastError) {
    return res.status(400).json({ error: err.message });
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  logger.error(err);
  return res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "PRODUCTION" ? "do not panic" : err.stack,
  });
};
