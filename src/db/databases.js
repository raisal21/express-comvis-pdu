// G:\GitHub-Desktop\express-comvis-pdu\src\db\databases.js
import pgPromise from 'pg-promise'
import { dbConfig } from '../../config/db.config.js';

const pgp = pgPromise({
  // Event handlers
  error: (error, e) => {
    if (e.cn) {
      console.error("CN:", e.cn);
      console.error("EVENT:", error.message || error);
    }
  },
  query: (e) => {
    console.log("QUERY:", e.query);
  },
});

const db = pgp(dbConfig);

// Test database connection
async function testConnection() {
  try {
    const connection = await db.connect();
    console.log("Database connection successful");
    connection.done(); // release the connection
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

testConnection();

export default db;