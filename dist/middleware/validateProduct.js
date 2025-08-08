"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = void 0;
const express_validator_1 = require("express-validator");
const errorHandler_1 = require("../utils/errorHandler");
exports.validateProduct = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Product name is required'),
    (0, express_validator_1.body)('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    (0, express_validator_1.body)('category').notEmpty().withMessage('Category is required'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new errorHandler_1.HttpError(400, errors.array()[0].msg);
        }
        next();
    }
];
