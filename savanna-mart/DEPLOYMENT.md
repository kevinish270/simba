# Savanna Mart - Deployment Instructions

## Prerequisites
- Node.js 18+
- PostgreSQL Database
- Stripe Account (for payments)
- Cloudinary Account (for image hosting)

## Local Development
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables in `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/savannamart"
   NEXTAUTH_SECRET="your-secret"
   STRIPE_SECRET_KEY="your-stripe-key"
   CLOUDINARY_URL="your-cloudinary-url"
   ```
4. Run migrations: `npx prisma migrate dev`.
5. Seed database: `npx prisma db seed`.
6. Start dev server: `npm run dev`.

## Production Deployment (Vercel)
1. Push the code to a GitHub repository.
2. Connect the repository to Vercel.
3. Add the environment variables in the Vercel dashboard.
4. Vercel will automatically detect Next.js and deploy.
5. Ensure the database is accessible from Vercel.

## Docker Deployment
1. Build the image: `docker build -t savanna-mart .`.
2. Run the container: `docker run -p 3000:3000 savanna-mart`.
