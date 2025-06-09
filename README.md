# JS Mastery Library Management System

A modern, feature-rich library management system built with Next.js, Prisma, and TypeScript. This application allows educational institutions to manage their book inventory, student registrations, and book borrowing processes digitally.

![Library Management System](public/images/auth-illustration.png)

## Features

- **User Authentication**
  - Sign up with university ID verification
  - Secure login with NextAuth
  - Rate limiting to prevent abuse

- **Book Management**
  - Browse books with cover art and details
  - Book details with dynamic cover generation
  - Video content integration with ImageKit
  - Book availability tracking

- **User Dashboard**
  - Student ID cards with university branding
  - Borrowed books tracking
  - Return status and due dates

- **Admin Panel**
  - Book inventory management
  - Add/edit books with custom covers
  - User approval and management
  - Analytics dashboard

- **Advanced Features**
  - Automated onboarding workflow emails
  - Rate limiting for security
  - Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (via Prisma)
- **Authentication**: NextAuth.js
- **Media Storage**: ImageKit integration
- **State Management**: React Context + Server Actions
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL database
- ImageKit account for media storage

### Environment Setup

1. Clone the repository
2. Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lms?schema=public"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# ImageKit (for image and video storage)
IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-account

# API Endpoint
NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000
```

### Installation

```bash
# Install dependencies
npm install

# Set up the database
npx prisma migrate dev

# Seed the database with initial data (optional)
npm run seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
app/               # Next.js App Router pages and layouts
├─ (auth)/         # Authentication routes (sign-in, sign-up)
├─ (root)/         # Main application routes
├─ admin/          # Admin panel routes
├─ api/            # API endpoints
components/        # React components
├─ admin/          # Admin-specific components
├─ ui/             # UI components (shadcn/ui)
lib/               # Utility functions and server actions
├─ actions/        # Server actions
├─ admin/          # Admin utilities
databases/         # Database configuration
prisma/            # Prisma schema and migrations
public/            # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://prisma.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [ImageKit](https://imagekit.io/)
- [shadcn/ui](https://ui.shadcn.com/)
