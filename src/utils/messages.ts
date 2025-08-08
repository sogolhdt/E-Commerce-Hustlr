export const MESSAGES = {
  PRODUCTS_RETRIEVED: 'All products retrieved successfully',
  PRODUCTS_BY_CATEGORY: (category: string) => `Products retrieved for category containing: ${category}`,
  PRODUCT_RETRIEVED: 'Product retrieved successfully',
  PRODUCT_CREATED: 'Product created successfully',
  ERROR_FETCHING_PRODUCTS: 'Error fetching products',
  ERROR_FETCHING_PRODUCT: 'Error fetching product',
  ERROR_CREATING_PRODUCT: 'Error creating product',
  INVALID_PRODUCT_ID: 'Invalid product ID',
  PRODUCT_NOT_FOUND: 'Product not found',
  INVALID_CATEGORY: 'Category parameter must be a non-empty string',
  VALIDATION_FAILED: 'Validation failed'
};