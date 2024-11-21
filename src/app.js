// src/app.js
import express from 'express';
import cors from 'cors';
import { appConfig } from '../config/app.config.js'; // Mengambil konfigurasi
import http from 'http';
import Cookies from 'cookies';
import Keygrip from 'keygrip';
import { OAuthService } from './services/oauth.service.js';
import routes from './routes/index.routes.js'; // Mengimpor index routes

const app = express();

const keys = new Keygrip([
  process.env.COOKIE_KEY1 || 'fallback-key-1', 
  process.env.COOKIE_KEY2 || 'fallback-key-2'
]);
// Middleware global
app.use(cors(appConfig.corsOptions)); // Gunakan opsi CORS dari appConfig
app.use((req, res, next) => {
  // Create cookies instance
  req.cookies = new Cookies(req, res, { keys: keys });
  next();
});
app.use(express.json({limit: '50mb'})); // Mengizinkan pengiriman data JSON
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(routes); // Menggunakan index routes
app.use(OAuthService.initialize());

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: appConfig.isDevelopment ? err.message : 'Internal Server Error',
    ...(appConfig.isDevelopment && { stack: err.stack })
  });
});

export default app; // Export aplikasi untuk digunakan di server.ts
