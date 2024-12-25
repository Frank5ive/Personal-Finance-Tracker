# Personal Finance Tracker

## Overview
Personal Finance Tracker is a web application designed to help users manage their income and expenses effectively. The backend is built with Node.js and Express, utilizing a MySQL database for storage. This application allows users to:
- Track transactions (income and expenses)
- Organize transactions by categories
- Generate financial reports
- Manage notifications and settings

This repository contains the backend API and test suite for the Personal Finance Tracker, ensuring a robust and reliable financial tracking system.

## Features
- **Transaction Management**: Add, update, delete, and fetch transactions (income and expenses).
- **Category Management**: Manage categories for transactions.
- **Financial Reports**: Generate monthly and category-based reports.
- **User Settings**: Update user settings such as currency and notifications preferences.
- **Authentication**: JWT-based authentication to secure user data.
- **Notifications**: Receive notifications for important updates or reminders.
  
## Technologies
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest, Supertest

## Project Structure

```
/personal-finance-tracker-backend
├── /src
│   ├── /controllers        # Logic to handle HTTP requests
│   ├── /models             # Sequelize models for database tables
│   ├── /middlewares        # Authentication & error handling
│   ├── /routes             # Define API endpoints
│   ├── /utils              # Utility functions (e.g., for token creation)
│   ├── /config             # Configuration files (e.g., database connection)
│   ├── app.js              # Main app entry point
│   └── server.js           # Server setup
├── /tests                  # API tests for endpoints
│   └── dashboard.test.js   # Test file for the dashboard routes
├── .env                    # Environment variables
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## Installation

### Prerequisites
Ensure that you have the following software installed:
- **Node.js** (v14 or higher)
- **MySQL** (or another supported SQL database)
- **Jest** and **Supertest** for testing

### Steps to Install

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/personal-finance-tracker.git
   cd personal-finance-tracker-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the environment**:
   Create a `.env` file and configure your database and other environment variables.
   
   Example `.env` file:
   ```bash
   NODE_ENV=development
   DATABASE_URL=mysql://user:password@localhost:3306/personal_finance_tracker
   JWT_SECRET=your-secret-key
   ```

4. **Create the database**:
   Ensure your database is set up. You can run the migrations to create tables if necessary.

5. **Start the server**:
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000` (default port).

## Running the Tests

### Test Environment
Before running tests, make sure your `NODE_ENV` is set to `test` in your `.env.test` file. This ensures that tests are run against a separate database.

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the tests**:
   ```bash
   npm test
   ```

This will run the Jest test suite and execute all the defined API tests for the routes.

## API Endpoints

### Authentication
- **POST /auth/login**  
  Logs a user in and returns a JWT token.
  - Request body:
    ```json
    {
      "username": "testUser",
      "password": "testPassword"
    }
    ```
  - Response:
    ```json
    {
      "token": "your-jwt-token"
    }
    ```

### Dashboard
- **GET /dashboard**  
  Fetches a summary of the user's financial overview (e.g., balance, transactions count, etc.).

- **POST /dashboard/add-transaction**  
  Adds a new transaction (income or expense).
  - Request body:
    ```json
    {
      "amount": 100,
      "category": "Food",
      "date": "2024-12-23",
      "type": "expense"
    }
    ```

- **GET /dashboard/transactions**  
  Fetches a list of all transactions for the authenticated user.

- **PUT /dashboard/settings**  
  Updates user settings (currency, notifications preferences).
  - Request body:
    ```json
    {
      "currency": "USD",
      "notifications": true
    }
    ```

## Testing with Supertest

The backend API is tested using **Supertest**. The tests simulate real HTTP requests to the API endpoints and verify the responses, ensuring that everything works as expected.

The test suite includes tests for:
- Authentication
- Transaction creation
- Fetching transactions
- Updating settings
- Generating reports

Example test suite for the `dashboard` endpoints (`/tests/dashboard.test.js`):

```javascript
const request = require("supertest");
const app = require("../src/app");

let authToken;

beforeAll(async () => {
  authToken = await getAuthTokenForTestUser(); // Retrieve token for the test user
});

test("GET /dashboard - should return dashboard overview", async () => {
  const response = await request(app)
    .get("/dashboard")
    .set("Authorization", `Bearer ${authToken}`);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("overview");
});

test("POST /dashboard/add-transaction - should add a new transaction", async () => {
  const transactionData = {
    amount: 100,
    category: "Food",
    date: "2024-12-23",
    type: "expense"
  };

  const response = await request(app)
    .post("/dashboard/add-transaction")
    .set("Authorization", `Bearer ${authToken}`)
    .send(transactionData);

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty("message", "Transaction added successfully");
});
```

## Contribution

Feel free to fork this project and contribute by creating issues or pull requests. Please ensure that your code adheres to the project's coding style and that all tests pass before submitting.

---

### Notes:
1. **Environment Variables**: Ensure that sensitive data like `JWT_SECRET` and database credentials are kept in `.env` files and not shared in public repositories.
2. **Testing**: Always clean up test data after running tests to prevent pollution of the database.

