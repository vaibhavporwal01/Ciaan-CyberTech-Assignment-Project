# 🚀 Mini LinkedIn Clone - Professional Community Platform

A modern, full-featured professional networking platform built with cutting-edge technologies. Connect, share, and grow your professional network with real-time interactions, comprehensive user management, and a sleek, responsive design.

![Mini LinkedIn Clone](https://img.shields.io/badge/Status-Live-brightgreen)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black)](https://nextjs.org/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-blue)](https://postgresql.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com/)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based login/registration system
- 📝 **Real-time Posts** - Create, edit, and delete posts instantly
- 💬 **Interactive Engagement** - Like, comment, and share functionality
- 👤 **User Profiles** - Comprehensive profile management
- ⚙️ **Settings Dashboard** - Privacy controls and preferences
- 📱 **Responsive Design** - Perfect on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean, professional interface with smooth animations
- 🔍 **Database Health Monitoring** - Built-in connection status tracking

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Server Components + Client Components

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **ORM**: Raw SQL with connection pooling
- **Authentication**: JWT with secure cookies
- **Validation**: Server-side form validation

### Infrastructure
- **Hosting**: Vercel
- **Database**: Neon PostgreSQL
- **Environment**: Serverless
- **CDN**: Vercel Edge Network

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- A Neon PostgreSQL database (or any PostgreSQL instance)

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/your-username/mini-linkedin-clone.git
cd mini-linkedin-clone
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 3. Environment Setup
Create a `.env.local` file in the root directory:

\`\`\`env
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
NEON_DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-here"
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Additional Database URLs (for fallback)
POSTGRES_URL="postgresql://username:password@host:port/database"
POSTGRES_PRISMA_URL="postgresql://username:password@host:port/database"
\`\`\`

### 4. Database Setup
Run the database setup script to create tables and seed data:

\`\`\`bash
# Visit the setup page in your browser
npm run dev
# Then go to: http://localhost:3000/setup
\`\`\`

Or manually run the SQL scripts:
\`\`\`bash
# Connect to your PostgreSQL database and run:
# 1. scripts/setup-database.sql
# 2. scripts/add-interactions.sql
# 3. scripts/create-demo-user.sql
\`\`\`

### 5. Start Development Server
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Demo Access

### Demo User Credentials
- **Email**: `demo@gmail.com`
- **Password**: `Demo@123`

Use these credentials to explore the platform without creating a new account.

## 📁 Project Structure

\`\`\`
mini-linkedin-clone/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── api/               # API routes
│   ├── profile/           # User profile pages
│   ├── settings/          # Settings page
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation component
│   ├── post-card.tsx     # Post display component
│   └── ...
├── lib/                  # Utility libraries
│   ├── auth.ts          # Authentication utilities
│   ├── db.ts            # Database connection
│   └── utils.ts         # General utilities
├── actions/             # Server actions
│   ├── auth.ts         # Authentication actions
│   ├── posts.ts        # Post management actions
│   └── ...
├── scripts/            # Database scripts
│   ├── setup-database.sql
│   └── ...
└── public/            # Static assets
\`\`\`

## 🔧 Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:setup     # Setup database tables
npm run db:seed      # Seed with demo data
npm run db:reset     # Reset database
\`\`\`

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy on Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Add Environment Variables** in Vercel Dashboard:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)

### Alternative Deployment Options
- **Netlify**: Full-stack deployment with serverless functions
- **Railway**: Easy PostgreSQL + Next.js deployment
- **DigitalOcean App Platform**: Container-based deployment

## 🔒 Security Features

- **JWT Authentication** with secure HTTP-only cookies
- **Password Hashing** using bcrypt
- **SQL Injection Protection** with parameterized queries
- **CSRF Protection** built into Next.js
- **Environment Variable Security** for sensitive data
- **Input Validation** on both client and server
- **Rate Limiting** on authentication endpoints

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- **Desktop** (1200px+): Full feature set with sidebar navigation
- **Tablet** (768px - 1199px): Adapted layout with collapsible elements
- **Mobile** (320px - 767px): Touch-optimized interface with bottom navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**Database Connection Error**:
- Verify your `DATABASE_URL` is correct
- Check if your database is running
- Visit `/test-db` to check connection status

**Authentication Issues**:
- Ensure `JWT_SECRET` is set
- Clear browser cookies and try again
- Check if demo user exists in database

**Build Errors**:
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (18+ required)
- Verify TypeScript configuration

### Getting Help

- 📧 **Email**: support@yourapp.com
- 💬 **Discord**: [Join our community](https://discord.gg/yourserver)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/mini-linkedin-clone/issues)
- 📖 **Documentation**: [Full Documentation](https://docs.yourapp.com)

## 🎉 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for seamless deployment
- **shadcn/ui** for beautiful components
- **Neon** for reliable PostgreSQL hosting
- **Tailwind CSS** for utility-first styling

---

**Built with ❤️ by [Your Name](https://github.com/your-username)**

*Star ⭐ this repository if you found it helpful!*
