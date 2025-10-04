# Clothing E-Commerce Web App - Backend (Node.js / Express / MongoDB)

## Overview

This is the backend for the Clothing E-Commerce Web App. It provides APIs for user authentication, product management, shopping cart operations, and order processing.

## Technologies Used

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT for authentication
* Bcrypt for password hashing
* Nodemailer for sending order confirmation emails

## Project Structure

```
backend/
├── controllers/
│   ├── authController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── productController.js
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   └── productRoutes.js
├── middleware/
│   └── protect.js
├── server.js
├── package.json
└── .env
```

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the `backend` directory with the following:

```
MONGO_URI=<Your MongoDB Connection URI>
PORT=5000
JWT_SECRET=<Your JWT Secret>
EMAIL_USER=<Your Gmail address>
EMAIL_PASS=<App Password generated for Nodemailer>
```

> **Note:** If using Gmail, enable 2-Step Verification and generate an App Password for `EMAIL_PASS`.

### 3. Start the development server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Scripts

| Command       | Description                                          |
| ------------- | ---------------------------------------------------- |
| `npm install` | Install dependencies                                 |
| `npm run dev` | Start server with nodemon (auto-restarts on changes) |
| `npm start`   | Start server normally                                |

## API Endpoints

### Auth

* POST `/api/auth/register` - Register a new user
* POST `/api/auth/login` - Login a user

### Products

* GET `/api/products` - List products (supports search, filter, pagination)
* GET `/api/products/:id` - Get product details

### Cart

* GET `/api/cart` - Get current user's cart
* POST `/api/cart/add` - Add item to cart
* PUT `/api/cart/update` - Update cart item quantity
* DELETE `/api/cart/remove` - Remove item from cart

### Orders

* POST `/api/orders/checkout` - Place an order

## Trade-offs / Notes

* Email sending uses Gmail SMTP; production-ready systems may require a dedicated service like SendGrid.
* Cart for guest users is stored in `localStorage` on the frontend; logged-in users have server-side carts.
* No real payment integration; payment method is mocked as COD.
* Backend focuses on functionality over advanced validation or optimization.
* MongoDB schema uses references; for large-scale, denormalization might be considered.

## Important Notes

* Ensure JWT_SECRET is strong and kept secure.
* For security, never commit `.env` to version control.
* Nodemailer requires an App Password if Gmail has 2FA enabled.
* Seed products before testing the frontend.
