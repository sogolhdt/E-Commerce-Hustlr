import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { ResponseService } from '../services/responseService';
import { MESSAGES } from '../utils/messages';

/**
 * Middleware to validate product data for POST /products endpoint.
 * Returns all validation errors if any are found.
 */
export const validateProduct = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').notEmpty().withMessage('Category is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg);
      ResponseService.sendError(
        res,
        new Error('Validation failed'),
        MESSAGES.VALIDATION_FAILED,
        400,
        { errors: errorMessages }
      );
    } else {
      next();
    }
  }
];