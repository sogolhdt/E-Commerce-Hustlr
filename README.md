# E-commerce Product API

A RESTful API for managing products in an e-commerce platform, built with Node.js, Express, and TypeScript.

## Tech Stack

- Node.js
- Express.js
- TypeScript (for type safety and maintainability)
- Swagger for API documentation

## Prerequisites

- Node.js (v16 or higher)
- npm

## Installation and Running

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project (compiles TypeScript to JavaScript):
   ```bash
   npm run build
   ```
4. Start the server (runs on default port 3000):
   ```bash
   npm start
   ```
   Or for development with hot reload:
   ```bash
   npm run dev
   ```

## API Documentation

Access the Swagger UI at: `http://localhost:3000/api-docs`

## Sample Requests

1. Get all products:

```bash
curl http://localhost:3000/products
```

2. Get product by ID:

```bash
curl http://localhost:3000/products/1
```

3. Filter products by category (supports partial, case-insensitive matches):

```bash
curl http://localhost:3000/products?category=App
```

4. Create a new product:

```bash
curl -X POST http://localhost:3000/products \
-H "Content-Type: application/json" \
-d '{"name":"New Shirt","price":29.99,"category":"Apparel","description":"Cotton blend shirt"}'
```

## Project Structure

- `src/`: Source code
  - `controllers/`: Request handlers
  - `services/`: Business logic
  - `routes/`: API routes
  - `interfaces/`: TypeScript interfaces
  - `middleware/`: Request validation
  - `utils/`: Helper functions
  - `data/`: Sample data
- `docs/`: API documentation
