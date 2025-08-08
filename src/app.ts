import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import productRoutes from './routes/productRoutes';
import { HttpError } from './utils/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger Documentation
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/products', productRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});