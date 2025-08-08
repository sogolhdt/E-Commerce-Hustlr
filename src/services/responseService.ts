import { Response } from 'express';
import { HttpError } from '../utils/errorHandler';

interface ResponsePayload<T> {
  data?: T;
  message?: string;
  error?: string;
  errors?: string[];
}

export class ResponseService {
  /**
   * Sends a success response with the specified data and message.
   * @param res Express response object.
   * @param data The data to include in the response.
   * @param message The success message.
   * @param statusCode The HTTP status code (default: 200).
   */
  static sendSuccess<T>(res: Response, data: T, message: string = 'Success', statusCode: number = 200): void {
    const payload: ResponsePayload<T> = { data, message };
    res.status(statusCode).json(payload);
  }

  /**
   * Sends a created response with the specified data and message.
   * @param res Express response object.
   * @param data The created resource data.
   * @param message The success message.
   */
  static sendCreated<T>(res: Response, data: T, message: string = 'Resource created'): void {
    this.sendSuccess(res, data, message, 201);
  }

  /**
   * Sends an error response with an optional additional data payload.
   * @param res Express response object.
   * @param error The error object (HttpError or generic Error).
   * @param defaultMessage The default error message.
   * @param statusCode The HTTP status code (default: derived from error or 500).
   * @param additionalData Additional data to include in the response (e.g., validation errors).
   */
  static sendError(
    res: Response,
    error: HttpError | Error,
    defaultMessage: string = 'Internal server error',
    statusCode?: number,
    additionalData: Record<string, any> = {}
  ): void {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ error: error.message, ...additionalData });
    } else {
      res.status(statusCode || 500).json({ error: defaultMessage, ...additionalData });
    }
  }
}