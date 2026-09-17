# 🍽️ Bite Dash

A full-stack food delivery web application built with the MERN stack, featuring secure authentication, online payments, and a dedicated admin panel for restaurant management.

## 🔗 Live Demo

| Service | Link |
|---|---|
| 🌐 Customer Website | [Add your frontend Render link here](https://food-del-frontend-oy6v.onrender.com) |

> **Note:** Since the backend is hosted on Render's free tier, the first request after a period of inactivity may take 10-20 seconds to respond while the server spins up.

## 📖 About

Bite Dash lets users browse a food menu, add items to their cart, and place orders with secure online payments. Restaurant admins can manage the menu and track incoming orders through a separate admin dashboard.

## ✨ Features

- 🔐 User authentication (signup/login) secured with JWT
- 🛒 Add to cart, update quantities, and view order summary
- 💳 Secure checkout and payments via Stripe
- 📦 Order placement, tracking, and status updates
- 🛠️ Admin panel to add, list, and remove food items
- 📋 Admin order management dashboard
- 📱 Fully responsive design across devices

## 🛠️ Tech Stack

**Frontend**
- React.js
- React Router
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Stripe for payments

**Deployment**
- Render (Frontend, Admin Panel, and Backend)

## 📁 Project Structure

```
Bite-Dash/
├── frontend/     # Customer-facing React app
├── admin/        # Admin panel React app
└── backend/      # Express REST API + MongoDB models
```

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js installed
- A MongoDB connection string (local or Atlas)
- A Stripe account with test API keys

### 1. Clone the repository
```bash
git clone https://github.com/Jatinonly/Bite-Dash.git
cd Bite-Dash
```

### 2. Set up the backend
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/`:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```
Run the backend:
```bash
npm start
```

### 3. Set up the frontend
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Set up the admin panel
```bash
cd ../admin
npm install
npm run dev
```

By default:
- Backend runs on `http://localhost:4000`
- Frontend runs on `http://localhost:5173`
- Admin panel runs on its own local Vite port (check your terminal output)

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `STRIPE_SECRET_KEY` | Stripe secret API key for processing payments |

## 📡 API Overview

| Endpoint | Method | Description |
|---|---|---|
| `/api/user/register` | POST | Register a new user |
| `/api/user/login` | POST | Log in an existing user |
| `/api/food/add` | POST | Add a new food item (admin) |
| `/api/food/list` | GET | Get all food items |
| `/api/food/remove` | POST | Remove a food item (admin) |
| `/api/cart/add` | POST | Add item to cart |
| `/api/cart/remove` | POST | Remove item from cart |
| `/api/order/place` | POST | Place a new order and initiate payment |
| `/api/order/verify` | POST | Verify payment status |
| `/api/order/userorders` | POST | Get orders for a specific user |
| `/api/order/list` | GET | Get all orders (admin) |
| `/api/order/status` | POST | Update order status (admin) |