export const dbConfig = {
    host: process.env.POSTGRES_HOST || 'postgres',
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DB || 'comvis_db',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    // Tambahan konfigurasi untuk pg-promise
    max: 30, // maksimum koneksi dalam pool
    idleTimeoutMillis: 30000, // timeout untuk idle connection
    connectionTimeoutMillis: 7000, // timeout untuk connection attempt
  };