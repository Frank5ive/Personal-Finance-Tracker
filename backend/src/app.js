const express = require('express');
const db = require('./config/db'); // Database connection
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Test Database Connection
(async () => {
  try {
    const connection = await db.getConnection(); // Get a connection from the pool
    console.log('Database connected successfully');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1); // Exit if the database connection fails
  }
})();

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);

// Catch-All for Unknown Routes
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack || err.message || err);
  res.status(500).json({
    message: 'An internal server error occurred',
    error: err.message || 'Unexpected error',
  });
});

// Start the Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
