// config/app.config.ts
export const appConfig = {
    port: process.env.PORT || 3001,
    corsOptions: {
      origin: process.env.NODE_ENV === 'production' 
      ? ['http://localhost:5173'] // Sesuaikan dengan domain Remix Anda
      : '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      optionsSuccessStatus: 204,
    }
  };
  