const mysql = require('mysql2/promise'); // Import mysql2 with promise support
require('dotenv').config(); // Load environment variables

// Create a connection pool using environment variables
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',  // Database host, default to localhost
  user: process.env.DB_USER || 'root',      // Database user, default to root
  password: process.env.DB_PASSWORD || '',  // Database password, default to empty
  database: process.env.DB_NAME || 'finance_tracker', // Database name
  waitForConnections: true,                 // Enable connection queue
  connectionLimit: 10,                      // Max connections in the pool
  queueLimit: 0                             // No queue limit
});

// Test the database connection on app startup
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Connected to the MySQL database successfully!");
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("Failed to connect to the MySQL database:", error);
    process.exit(1); // Exit the process if the connection fails
  }
})();

module.exports = db; // Export the db connection pool
