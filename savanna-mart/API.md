# Savanna Mart - API Documentation

## Authentication
Savanna Mart uses Auth.js for session-based authentication.

### POST /api/auth/signin
Authenticate a user with email and password.

### POST /api/auth/signout
Sign out the current user.

## Products
### GET /api/products
Fetch a list of products with optional filters.
- `q`: Search query
- `category`: Category slug
- `minPrice`, `maxPrice`: Price range

### GET /api/products/[slug]
Fetch a single product by slug.

## Cart & Orders
### POST /api/orders
Place a new order. Requires authentication.

### GET /api/orders
Fetch orders for the authenticated user.

## Admin
### GET /api/admin/stats
Fetch dashboard statistics (Admin only).
