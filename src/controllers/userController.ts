import { Request, Response } from 'express';
import db from '../db/databases';

// Mengambil semua pengguna
export const getUsers = async (req: Request, res: Response) => {
    try {
      const users = await db.any('SELECT * FROM users'); // Mengambil semua data dari tabel users
      res.json(users); // Mengirimkan data sebagai response JSON
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error'); // Menangani kesalahan server
    }
  };