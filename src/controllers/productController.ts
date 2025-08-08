import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { ResponseService } from '../services/responseService';
import { HttpError } from '../utils/errorHandler';
import { MESSAGES } from '../utils/messages';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  /**
   * Handles GET requests to retrieve all products.
   * @param req Express request object.
   * @param res Express response object.
   * @returns A promise that resolves to void, sending a JSON response with all products.
   */
  getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = this.productService.getAllProducts();
      ResponseService.sendSuccess(res, products, MESSAGES.PRODUCTS_RETRIEVED);
    } catch (error) {
      ResponseService.sendError(res, error as Error, MESSAGES.ERROR_FETCHING_PRODUCTS);
    }
  };

  /**
   * Handles GET requests to retrieve a single product by ID.
   * @param req Express request object with `id` path parameter.
   * @param res Express response object.
   * @returns A promise that resolves to void, sending a JSON response with the product.
   */
  getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new HttpError(400, MESSAGES.INVALID_PRODUCT_ID);
      }
      const product = this.productService.getProductById(id);
      if (!product) {
        throw new HttpError(404, MESSAGES.PRODUCT_NOT_FOUND);
      }
      ResponseService.sendSuccess(res, product, MESSAGES.PRODUCT_RETRIEVED);
    } catch (error) {
      ResponseService.sendError(res, error as Error, MESSAGES.ERROR_FETCHING_PRODUCT);
    }
  };

  /**
   * Handles GET requests to filter products by a partial, case-insensitive category match.
   * @param req Express request object with `category` query parameter.
   * @param res Express response object.
   * @returns A promise that resolves to void, sending a JSON response with matching products.
   */
  getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const category = req.query.category as string;
      if (typeof category !== 'string' || category.trim() === '') {
        throw new HttpError(400, MESSAGES.INVALID_CATEGORY);
      }
      const products = this.productService.getProductsByCategory(category);
      ResponseService.sendSuccess(res, products, MESSAGES.PRODUCTS_BY_CATEGORY(category));
    } catch (error) {
      ResponseService.sendError(res, error as Error, MESSAGES.ERROR_FETCHING_PRODUCTS);
    }
  };

  /**
   * Handles POST requests to create a new product.
   * @param req Express request object with product data in the body.
   * @param res Express response object.
   * @returns A promise that resolves to void, sending a JSON response with the created product.
   */
  createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = this.productService.addProduct(req.body);
      ResponseService.sendCreated(res, product, MESSAGES.PRODUCT_CREATED);
    } catch (error) {
      ResponseService.sendError(res, error as Error, MESSAGES.ERROR_CREATING_PRODUCT);
    }
  };
}