import { Router, Request, Response, NextFunction } from 'express';
import { ProductController } from '../controllers/productController';
import { validateProduct } from '../middleware/validateProduct';

const router = Router();
const productController = new ProductController();

/**
 * Middleware to route GET /products based on the presence of a category query parameter.
 */
const routeByCategory = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.category) {
    return productController.getProductsByCategory(req, res);
  }
  return productController.getAllProducts(req, res);
};

router.get('/', routeByCategory);
router.get('/:id', productController.getProductById);
router.post('/', validateProduct, productController.createProduct);

export default router;