# Bar Books

Bar Books is a full-stack order management dashboard built with React, TypeScript, Vite, and a Node.js/Express backend using SQLite. It provides a simple interface for tracking, summarizing, and analyzing orders, making it ideal for use in bar or beverage service environments.

## Features

- **Order Dashboard**: View a live summary of sales, best-selling products, and order statistics.
- **Order Management**: Add new orders and view a paginated list of all orders.
- **Summary Statistics**: Instantly see total revenue, median order value, top product by quantity sold, and number of unique products.
- **Backend API**: RESTful endpoints for creating and fetching orders and summary data.
- **Data Persistence**: Uses SQLite for fast and easy local storage, with initialization scripts and mock data for development.
- **TypeScript Throughout**: Strong type safety on both client and server.
- **Modern Tooling**: Built with Vite for fast frontend development and hot module reload.

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- Yarn or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bcExpt1123/bar-books.git
   cd bar-books
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Setup the backend**
   ```bash
   cd backend
   yarn install
   # or
   npm install
   # Initialize the database with schema and seed data
   yarn init:db
   ```

4. **Run the backend server**
   ```bash
   yarn dev
   # or
   npm run dev
   ```
   > By default, the backend runs on `http://localhost:3001`

5. **Start the frontend**
   ```bash
   cd ..
   yarn dev
   # or
   npm run dev
   ```
   > The frontend runs on `http://localhost:5173` and proxies API requests to the backend.

## Project Structure

```
bar-books/
  ├── backend/                # Express backend, SQLite DB, API routes and services
  │   ├── src/
  │   ├── tests/
  │   └── ...
  ├── src/                    # React frontend source code
  │   ├── components/
  │   ├── api/
  │   ├── hooks/
  │   └── ...
  ├── public/
  ├── index.html              # Vite entry point
  └── ...
```

## API Overview

- `GET /api/orders` — List orders (with optional filters)
- `POST /api/orders` — Create a new order
- `GET /api/orders/summary` — Get dashboard statistics

## Development

- **Frontend:** React, TypeScript, Vite, Axios, ESLint
- **Backend:** Express, TypeScript, SQLite, dotenv
- **Linting:** Pre-configured with ESLint for TypeScript and React. Extend via `eslint.config.js`.

## License

This project is private and does not currently specify a license.

---

_This project was generated with a Vite + React + TypeScript template and customized for order management and analytics in bar environments._
