// src/app.js
import express from 'express';
import cors from 'cors';
import { appConfig } from '../config/app.config.js'; // Mengambil konfigurasi
import { OAuthService } from './services/oauth.service.mjs';
import routes from './routes/index.routes.js'; // Mengimpor index routes
import { createServer as createViteServer } from 'vite';


const app = express();

// Middleware global
app.use(cors(appConfig.corsOptions)); // Gunakan opsi CORS dari appConfig

// Development-only middleware
if (appConfig.isDevelopment) {
  const vite = await createViteServer({
    server: { middlewareMode: 'html' },
  });
  app.use(vite.middlewares);
}

app.use(express.json()); // Mengizinkan pengiriman data JSON
app.use(express.urlencoded({ extended: true }));
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
