"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productService_1 = require("../services/productService");
const errorHandler_1 = require("../utils/errorHandler");
class ProductController {
    constructor() {
        this.getAllProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = this.productService.getAllProducts();
                res.json(products);
            }
            catch (error) {
                throw new errorHandler_1.HttpError(500, 'Error fetching products');
            }
        });
        this.getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    throw new errorHandler_1.HttpError(400, 'Invalid product ID');
                }
                const product = this.productService.getProductById(id);
                if (!product) {
                    throw new errorHandler_1.HttpError(404, 'Product not found');
                }
                res.json(product);
            }
            catch (error) {
                if (error instanceof errorHandler_1.HttpError) {
                    res.status(error.statusCode).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error fetching product' });
                }
            }
        });
        this.getProductsByCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = req.query.category;
                if (!category) {
                    throw new errorHandler_1.HttpError(400, 'Category parameter is required');
                }
                const products = this.productService.getProductsByCategory(category);
                res.json(products);
            }
            catch (error) {
                if (error instanceof errorHandler_1.HttpError) {
                    res.status(error.statusCode).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Error fetching products by category' });
                }
            }
        });
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = this.productService.addProduct(req.body);
                res.status(201).json(product);
            }
            catch (error) {
                res.status(500).json({ error: 'Error creating product' });
            }
        });
        this.productService = new productService_1.ProductService();
    }
}
exports.ProductController = ProductController;
