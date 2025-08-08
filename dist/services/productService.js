"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const products_json_1 = __importDefault(require("../data/products.json"));
class ProductService {
    constructor() {
        this.products = products_json_1.default;
    }
    getAllProducts() {
        return this.products;
    }
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }
    getProductsByCategory(category) {
        return this.products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }
    addProduct(product) {
        const newProduct = Object.assign({ id: this.products.length + 1 }, product);
        this.products.push(newProduct);
        return newProduct;
    }
}
exports.ProductService = ProductService;
