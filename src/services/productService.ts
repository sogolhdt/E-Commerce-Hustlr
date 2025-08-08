import { Product } from '../interfaces/product';
import productsData from '../data/products.json';

export class ProductService {
  private products: Product[] = productsData;

  /**
   * Retrieves all products from the data store.
   * @returns An array of all products.
   */
  getAllProducts(): Product[] {
    return this.products;
  }

  /**
   * Retrieves a single product by its ID.
   * @param id The ID of the product to retrieve.
   * @returns The product if found, or undefined if not found.
   */

  
  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  /**
   * Retrieves products whose category contains the specified string (case-insensitive).
   * @param category The category substring to match.
   * @returns An array of products matching the category.
   */
  getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => 
      product.category.toLowerCase().includes(category.toLowerCase()));
  }

  /**
   * Adds a new product to the data store.
   * @param product The product data (without ID) to add.
   * @returns The newly created product with an assigned ID.
   */
  addProduct(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      id: this.products.length + 1,
      ...product
    };
    this.products.push(newProduct);
    return newProduct;
  }
}