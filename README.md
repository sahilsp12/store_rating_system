# Store Rating System

This is a full-stack web application designed for a Store Rating System. Users can browse and submit ratings for stores, store owners can view dashboard metrics for their own store, and admins can manage both users and stores.

## Features

### 1. Admin
- Dashboard overview (Total Users, Total Stores, Total Ratings)
- View list of all Users with search, filter, and pagination
- Create new Users with role selection (ADMIN, USER, STORE_OWNER)
- View individual User details
- View list of all Stores with sorting, searching, and pagination
- Create new Stores and assign them to a Store Owner

### 2. User
- Register & Login
- Browse stores list with search, sorting, and pagination
- View store details and overall average rating
- Rate a store (1 to 5 stars) or update your existing rating

### 3. Store Owner
- Dashboard showing store details
- Overall average rating and total ratings count
- List of users who rated their store and what score they gave

## Tech Stack
- **Frontend**: React 19, Vite, React Router DOM, Axios, Bootstrap 5, Context API
- **Backend**: Node.js, Express, Prisma ORM, JWT Authentication

## How to Run

### Prerequisites
Ensure you have Node.js and MySQL installed.

### 1. Backend Setup

#### 1. Navigate to the backend folder
```bash
cd backend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Create a `.env` file in the `backend` directory and add the following:
```env
PORT=5000
DATABASE_URL="mysql://root:YOUR_MYSQL_PASSWORD@localhost:3306/store_rating_system"
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
```
> Replace `YOUR_MYSQL_PASSWORD` with your local MySQL password.

#### 4. Create the database
```sql
CREATE DATABASE store_rating_system;
```

#### 5. Generate Prisma Client
```bash
npx prisma generate
```

#### 6. Apply database migrations
```bash
npx prisma migrate dev
```

#### 7. Seed the default admin and initial data (if applicable)
```bash
npx prisma db seed
```

#### 8. Start the backend server
```bash
npm run dev
```

### 2. Frontend Setup

#### 1. Navigate to the frontend folder
```bash
cd frontend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Start the Vite development server
```bash
npm run dev
```
(Runs on `http://localhost:5173`)
