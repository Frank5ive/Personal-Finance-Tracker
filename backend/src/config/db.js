const { Sequelize } = require("sequelize");
require("dotenv").config(); 

// Initialize Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || "finance_tracker", 
  process.env.DB_USER || "root", 
  process.env.DB_PASSWORD || "", 
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql", 
    logging: false, 
  }
);

// Test Database Connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the MySQL database successfully!");
  } catch (error) {
    console.error("Failed to connect to the MySQL database:", error);
    process.exit(1); // Exit if connection fails
  }
})();

module.exports = sequelize;
