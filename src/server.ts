// src/server.ts
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Mengizinkan CORS
app.use(express.json()); // Mengizinkan pengiriman data JSON

app.use('/', userRoutes); // Menggunakan user routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
