# 🛍️ E-Commerce REST API

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green.svg)
![Auth](https://img.shields.io/badge/Auth-JWT-orange.svg)

A **production-grade RESTful API** for an e-commerce platform.  
This backend service includes features like **product catalog management**, **user authentication with JWT**, **role-based access control**, **file uploads**, and various **security enhancements**.

---

## 🚀 Features

- **Authentication:** Secure user registration and login using JWT (Access & Refresh Tokens).
- **Role-Based Access Control:** Differentiated permissions for `customer`, `seller`, and `admin` roles.
- **Product Management:** Full CRUD operations for products, including filtering, searching, and pagination.
- **Category Management:** CRUD operations for product categories, including nested categories.
- **User Profiles:** Endpoints for users to view and update their profiles and change passwords.
- **File Uploads:** Image upload handling for product images using Multer.
- **Security:** Helmet, CORS, rate limiting, and password hashing with bcrypt.
- **Database Seeding:** Easily populate the database with sample data for development/testing.
- **Error Handling:** Centralized global error handling middleware for consistent API responses.
- **MVC Architecture:** Clean, modular, and scalable code structure.

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT, bcrypt.js |
| **File Uploads** | Multer |
| **Validation** | Joi (or similar) |
| **Security** | Helmet, CORS, express-rate-limit |
| **Development** | Nodemon, dotenv, colors |

---

## ⚙️ Prerequisites

- Node.js (v18 or higher)
- npm
- MongoDB (local instance or MongoDB Atlas)
- Postman (for API testing)

---

## 🏁 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/brundhaa-sri/E-commerce-api.git
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root of the project using `.env.example` as a template:

```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_db

# JWT Configuration
JWT_SECRET=jwt_secret
JWT_REFRESH_SECRET=jwt_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

### 4️⃣ Seed the Database (Optional)

Populate the database with sample users, categories, and products:

```bash
npm run data:import
```

To clear the data:

```bash
npm run data:destroy
```

---

### 5️⃣ Run the Server

Start the development server with Nodemon:

```bash
npm run dev
```

The API will be available at:
👉 **[http://localhost:5000](http://localhost:5000)**

---

## 📜 Available Scripts

| Command                | Description                                   |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Starts the server using Nodemon (development) |
| `npm start`            | Starts the server using Node (production)     |
| `npm run data:import`  | Populates the database with sample data       |
| `npm run data:destroy` | Clears database collections                   |

---

## 📘 API Documentation

### Base URL

```
http://localhost:5000/api
```

---

### 🔐 Authentication Endpoints (`/auth`)

#### **POST /auth/register**

Registers a new user.
**Access:** Public

**Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "customer"
}
```

**Response (201):**

```json
{
  "message": "User registered successfully",
  "userId": "user_..."
}
```

---

#### **POST /auth/login**

Authenticates a user and returns JWT tokens.
**Access:** Public

**Body:**

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "userId": "user_admin001",
  "email": "admin@example.com",
  "role": "admin",
  "accessToken": "ey..."
}
```

---

#### **POST /auth/refresh-token**

Issues a new access token using the refresh token cookie.
**Access:** Public

**Response (200):**

```json
{
  "accessToken": "ey..."
}
```

---

#### **POST /auth/logout**

Logs out the user by clearing the refresh token.
**Access:** Private

**Response (200):**

```json
{
  "message": "Logged out successfully"
}
```

---

### 🛒 Product Endpoints (`/products`)

#### **GET /products**

Get a paginated list of products.
Supports search and filtering.

**Query Parameters:**

* `pageNumber`
* `keyword`

**Response (200):**

```json
{
  "products": [ /* array of product objects */ ],
  "page": 1,
  "pages": 5
}
```

---

#### **GET /products/:productId**

Get a single product.
**Access:** Public

---

#### **POST /products**

Create a new product (multipart/form-data).
**Access:** Seller / Admin

**Fields:**

* name, description, price, stock, sku, categoryId, images[], specifications, tags

---

#### **PUT /products/:productId**

Update an existing product.
**Access:** Owner / Admin

---

#### **DELETE /products/:productId**

Soft delete a product.
**Access:** Owner / Admin

---

### 🧩 Category Endpoints (`/categories`)

#### **GET /categories**

Get all categories.
**Access:** Public

#### **POST /categories**

Create a new category.
**Access:** Admin

**Body:**

```json
{
  "name": "Wearables",
  "description": "Smart watches and fitness trackers",
  "parentCategoryId": "cat_electronics"
}
```

#### **PUT /categories/:categoryId**

Update an existing category.
**Access:** Admin

#### **DELETE /categories/:categoryId**

Soft delete a category.
**Access:** Admin

---

### 👤 User Endpoints (`/users`)

#### **GET /users/profile**

Get the profile of the current user.
**Access:** Private

#### **PUT /users/profile**

Update user profile.
**Access:** Private

**Body:**

```json
{
  "firstName": "Johnathan",
  "lastName": "Doe",
  "phoneNumber": "123-456-7890"
}
```

#### **PUT /users/change-password**

Change user password.
**Access:** Private

**Body:**

```json
{
  "oldPassword": "password123",
  "newPassword": "newSecurePassword456"
}
```

---

## 🧪 Postman Collection

A Postman collection with all API endpoints and tests is included.

1. Import the collection and environment JSON files into Postman.
2. Set `baseURL` = `http://localhost:5000/api`.
3. Run the **POST /auth/login** request — it will automatically save the access token.
4. All subsequent authenticated requests will use this token via Bearer Token authorization.

---

## 🏗️ Project Structure

```
config/
│   └── db.js
controllers/
│   ├── authController.js
│   ├── categoryController.js
│   ├── productController.js
│   └── userController.js
middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── validationMiddleware.js
models/
│   ├── Category.js
│   ├── Product.js
│   └── User.js
routes/
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
uploads/
│   └── (images stored here)
utils/
│   └── generateToken.js
.env
.env.example
.gitignore
index.js
```

---

## 🧑‍💻 Author

**Brundhaa Sri**
📧 [achyuthan23@gmail.com](mailto:achyuthan23@gmail.com)
💼 [GitHub](https://github.com/brundhaa-sri)

---
