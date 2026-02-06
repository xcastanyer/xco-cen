# Next.js Google Auth App

A public Single Page Application (SPA) built with Next.js (App Router), React, Supabase (PostgreSQL), and Auth.js (NextAuth).

## Features

- **Authentication**: Google OAuth 2.0 via Auth.js.
- **Database**: Supabase PostgreSQL with Prisma ORM.
- **Protection**: Middleware-protected dashboard route.
- **Styling**: Tailwind CSS.

## Prerequisites

1.  **Node.js**: v18+ installed.
2.  **Supabase Account**: Create a project to get PostgreSQL credentials.
3.  **Google Cloud Console**: valid Client ID and Secret for OAuth.

## Setup

1.  **Clone/Navigate**:
    ```bash
    cd nextjs-google-auth
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root based on `.env.example` (or see below):

    ```env
    # Supabase / PostgreSQL
    DATABASE_URL="postgres://postgres.xxxx:pass@aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true"
    DIRECT_URL="postgres://postgres.xxxx:pass@aws-0-region.supabase.com:5432/postgres"

    # Google OAuth
    GOOGLE_CLIENT_ID="your-google-client-id"
    GOOGLE_CLIENT_SECRET="your-google-client-secret"

    # NextAuth
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="super-secret-random-string" # run `npx auth secret` or `openssl rand -base64 32`
    ```

4.  **Database Migration**:
    Push the schema to your Supabase database:
    ```bash
    npx prisma db push
    ```

5.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: React components (LoginButton, etc.).
- `prisma/`: Database schema.
- `lib/`: Utility functions (Prisma client instance).
