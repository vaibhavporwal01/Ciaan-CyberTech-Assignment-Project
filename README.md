# 🚀 Mini LinkedIn Clone - Professional Community Platform

A professional networking platform built for **Ciaan Cyber Tech Pvt Ltd** assignment.

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based login/registration system
- 📝 **Real-time Posts** - Create, edit, and delete posts instantly
- 💬 **Interactive Engagement** - Like, comment, and share functionality
- 👤 **User Profiles** - Comprehensive profile management
- ⚙️ **Settings Dashboard** - Privacy controls and preferences
- 📱 **Responsive Design** - Perfect on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **Authentication**: JWT with secure cookies

### Infrastructure
- **Hosting**: Vercel
- **Database**: Neon PostgreSQL
- **Environment**: Serverless
- **CDN**: Vercel Edge Network

## ⚡ Quick Setup

### 1. Clone & Install
\`\`\`bash
git clone https://github.com/vaibhavporwal01/mini-linkedin-clone.git
cd mini-linkedin-clone
npm install
\`\`\`

### 2. Environment Variables
Create `.env.local`:
\`\`\`env
DATABASE_URL="your-postgresql-url"
JWT_SECRET="your-jwt-secret"
NEXTAUTH_SECRET="your-nextauth-secret"
\`\`\`

### 3. Database Setup
\`\`\`bash
npm run dev
# Visit: http://localhost:3000/setup
\`\`\`

### 4. Start Development
\`\`\`bash
npm run dev
# Open: http://localhost:3000
\`\`\`

## 🎯 Demo Access

**Email**: `demo@gmail.com`  
**Password**: `Demo@123`

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
├── components/            # UI Components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation component
│   ├── post-card.tsx     # Post display component
│   └── ...
├── lib/                  # Utilities
│   ├── auth.ts          # Authentication utilities
│   ├── db.ts            # Database connection
│   └── utils.ts         # General utilities
├── actions/             # Server Actions
│   ├── auth.ts         # Authentication actions
│   ├── posts.ts        # Post management actions
│   └── ...
├── scripts/            # Database Scripts
│   ├── setup-database.sql
│   └── ...
└── public/            # Static Assets
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

## 🚀 Deployment

1. Push to GitHub
2. Deploy on Vercel
3. Add environment variables
4. Done! ✅

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
- 🐛 **Issues**: [GitHub Issues](https://github.com/vaibhavporwal01/mini-linkedin-clone/issues)
- 📖 **Documentation**: [Full Documentation](https://docs.yourapp.com)

## 🎉 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for seamless deployment
- **shadcn/ui** for beautiful components
- **Neon** for reliable PostgreSQL hosting
- **Tailwind CSS** for utility-first styling

---

**Assignment Project for Ciaan Cyber Tech Pvt Ltd**  
**Developer**: [Vaibhav Porwal](https://github.com/vaibhavporwal01)
