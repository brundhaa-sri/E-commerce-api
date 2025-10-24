import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Get directory name in ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Core Middleware ---
// 1. JSON and URL-encoded parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Helmet for security headers - configured for Swagger UI
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': ["'self'", "'unsafe-inline'"], // Allow inline scripts for Swagger UI
        'style-src': ["'self'", "'unsafe-inline'"],  // Allow inline styles for Swagger UI
        'img-src': ["'self'", 'data:'], // Allow images and data URIs for Swagger UI
      },
    },
  })
);

// 3. CORS Configuration
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));

// 4. Rate Limiting (Applied only to API routes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', limiter);


// --- Swagger Docs Setup ---
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-Commerce API',
            version: '1.0.0',
            description: 'API documentation for the E-Commerce backend project.',
        },
        servers: [{ url: `http://localhost:${PORT}` }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    // Use path.join to create a robust path to your route files
    apis: [path.join(__dirname, './routes/*.js')],
};

try {
    const swaggerSpec = swaggerJsdoc(swaggerOptions);

    // --- DIAGNOSTIC LOG ---
    // This message will appear in your console if the spec is generated.
    console.log("Swagger specification generated successfully.");

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

} catch (error) {
    console.error("CRITICAL: Error generating Swagger specification. This is why /api-docs is not working.", error);
}

// --- Static File Serving ---
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// --- Health Check ---
app.get('/', (req, res) => {
    res.send('E-Commerce API is running...');
});

// --- Custom Error Handling Middleware ---
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));