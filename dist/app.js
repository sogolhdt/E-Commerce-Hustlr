"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const errorHandler_1 = require("./utils/errorHandler");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Swagger Documentation
const swaggerDocument = yamljs_1.default.load('./docs/swagger.yaml');
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Routes
app.use('/products', productRoutes_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof errorHandler_1.HttpError) {
        res.status(err.statusCode).json({ error: err.message });
    }
    else {
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
