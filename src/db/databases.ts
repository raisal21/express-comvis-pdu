import pgPromise from 'pg-promise';

const pgp = pgPromise();

const db = pgp({
  host: 'localhost', // Ganti dengan host PostgreSQL Anda
  port: 5432, // Default PostgreSQL port
  database: 'drilling_analysis', // Ganti dengan nama database Anda
  user: 'postgres', // Ganti dengan username PostgreSQL Anda
  password: 'mlsw' // Ganti dengan password PostgreSQL Anda
});

// Tes koneksi
db.connect()
  .then(obj => {
    console.log('Connected to PostgreSQL successfully!');
    obj.done(); // Close the connection
  })
  .catch(error => {
    console.error('Error connecting to PostgreSQL:', error);
  });

export default db;