// src/app.js
import express from 'express';
import cors from 'cors';
import { appConfig } from '../config/app.config.js'; // Mengambil konfigurasi
import routes from './routes/index.routes.js'; // Mengimpor index routes
// import userRoutes from './routes/user.routes';

const app = express();

// Middleware global
app.use(cors(appConfig.corsOptions)); // Gunakan opsi CORS dari appConfig
app.use(express.json()); // Mengizinkan pengiriman data JSON
app.use(express.urlencoded({ extended: true }));
app.use(routes); // Menggunakan index routes

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      status: 'error',
      message: process.env.NODE_ENV === 'production' 
        ? 'Internal Server Error' 
        : err.message
    });
  });

// Routing
// app.use('/users', userRoutes); // Menggunakan user routes

export default app; // Export aplikasi untuk digunakan di server.ts
