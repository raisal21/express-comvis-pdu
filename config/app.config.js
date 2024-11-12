// config/app.config.ts
export const appConfig = {
  port: process.env.PORT || 3001,
  corsOptions: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL || 'http://your-production-domain.com' // URL production
      : ['http://localhost:5173', 'http://frontend:5173'], // URLs development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204,
  },
  isDevelopment: process.env.NODE_ENV === 'development'
};
  