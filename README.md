# Mini LinkedIn Clone

**Assignment Project for Ciaan Cyber Tech Pvt Ltd**

A professional networking platform with real-time interactions, user authentication, and modern UI design.

---

## 🚀 Features

- **Secure Authentication** - JWT-based login/registration
- **Real-time Posts** - Create, edit, delete posts instantly  
- **Interactive Engagement** - Like, comment, and share
- **User Profiles** - Complete profile management
- **Settings Dashboard** - Privacy and notification controls
- **Responsive Design** - Works on all devices

---

## 🛠️ Tech Stack

**Frontend:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui  
**Backend:** Node.js, PostgreSQL, JWT Authentication  
**Hosting:** Vercel, Neon Database

---

## 📁 Project Structure

\`\`\`
mini-linkedin-clone/
│
├── 📁 app/                          # Next.js App Router
│   ├── 📁 (auth)/                   # Authentication Routes
│   │   ├── 📄 login/page.tsx        # Login page
│   │   └── 📄 register/page.tsx     # Registration page
│   │
│   ├── 📁 api/                      # API Routes
│   │   ├── 📄 health/route.ts       # Health check endpoint
│   │   └── 📄 keep-alive/route.ts   # Keep-alive endpoint
│   │
│   ├── 📁 profile/                  # Profile Pages
│   │   └── 📄 [id]/page.tsx         # Dynamic user profile
│   │
│   ├── 📄 settings/page.tsx         # Settings page
│   ├── 📄 setup/page.tsx            # Database setup page
│   ├── 📄 test-db/page.tsx          # Database test page
│   ├── 📄 account-deleted/page.tsx  # Account deletion confirmation
│   ├── 📄 layout.tsx                # Root layout
│   ├── 📄 page.tsx                  # Home page
│   └── 📄 globals.css               # Global styles
│
├── 📁 components/                   # Reusable Components
│   ├── 📁 ui/                       # shadcn/ui Components
│   │   ├── 📄 button.tsx            # Button component
│   │   ├── 📄 card.tsx              # Card component
│   │   ├── 📄 dialog.tsx            # Dialog component
│   │   ├── 📄 input.tsx             # Input component
│   │   ├── 📄 textarea.tsx          # Textarea component
│   │   ├── 📄 avatar.tsx            # Avatar component
│   │   ├── 📄 badge.tsx             # Badge component
│   │   ├── 📄 switch.tsx            # Switch component
│   │   ├── 📄 separator.tsx         # Separator component
│   │   └── 📄 ...                   # Other UI components
│   │
│   ├── 📄 navbar.tsx                # Navigation bar
│   ├── 📄 post-card.tsx             # Post display component
│   ├── 📄 post-form.tsx             # Post creation form
│   ├── 📄 posts-feed.tsx            # Posts feed container
│   ├── 📄 posts-manager.tsx         # Posts state management
│   ├── 📄 profile-form.tsx          # Profile editing form
│   ├── 📄 settings-form.tsx         # Settings form
│   ├── 📄 welcome-banner.tsx        # Welcome banner
│   ├── 📄 database-status.tsx       # Database status indicator
│   ├── 📄 delete-account-dialog.tsx # Account deletion dialog
│   ├── 📄 delete-post-dialog.tsx    # Post deletion dialog
│   └── 📄 theme-provider.tsx        # Theme context provider
│
├── 📁 lib/                          # Utility Libraries
│   ├── 📄 auth.ts                   # Authentication utilities
│   ├── 📄 db.ts                     # Database connection
│   ├── 📄 db-health.ts              # Database health checks
│   └── 📄 utils.ts                  # General utilities
│
├── 📁 actions/                      # Server Actions
│   ├── 📄 auth.ts                   # Authentication actions
│   ├── 📄 posts.ts                  # Post management actions
│   ├── 📄 interactions.ts           # Like/comment/share actions
│   └── 📄 profile.ts                # Profile management actions
│
├── 📁 hooks/                        # Custom React Hooks
│   ├── 📄 use-mobile.tsx            # Mobile detection hook
│   └── 📄 use-toast.ts              # Toast notification hook
│
├── 📁 scripts/                      # Database Scripts
│   ├── 📄 setup-database.sql        # Initial database setup
│   ├── 📄 add-interactions.sql      # Add interactions tables
│   ├── 📄 create-demo-user.sql      # Create demo user
│   └── 📄 deployment-guide.md       # Deployment instructions
│
├── 📁 public/                       # Static Assets
│   ├── 📄 placeholder-logo.png      # Logo placeholder
│   ├── 📄 placeholder-logo.svg      # SVG logo placeholder
│   ├── 📄 placeholder-user.jpg      # User avatar placeholder
│   ├── 📄 placeholder.jpg           # General placeholder image
│   └── 📄 placeholder.svg           # General placeholder SVG
│
├── 📄 package.json                  # Dependencies and scripts
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 tailwind.config.ts            # Tailwind CSS configuration
├── 📄 next.config.mjs               # Next.js configuration
├── 📄 postcss.config.mjs            # PostCSS configuration
├── 📄 components.json               # shadcn/ui configuration
└── 📄 README.md                     # Project documentation
\`\`\`

---

## 🎯 Demo Access

**Email:** `demo@gmail.com`  
**Password:** `Demo@123`

Use these credentials to explore the platform without creating a new account.

---

## 🔧 Available Scripts

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint linting
\`\`\`

---

## ⚡ Quick Setup

**1. Clone Repository**
\`\`\`bash
git clone https://github.com/vaibhavporwal01/mini-linkedin-clone.git
cd mini-linkedin-clone
npm install
\`\`\`

**2. Environment Variables**
Create `.env.local` file:
\`\`\`env
DATABASE_URL="your-postgresql-url"
JWT_SECRET="your-jwt-secret"
NEXTAUTH_SECRET="your-nextauth-secret"
\`\`\`

**3. Database Setup**
\`\`\`bash
npm run dev
# Visit: http://localhost:3000/setup
\`\`\`

**4. Start Development**
\`\`\`bash
npm run dev
# Open: http://localhost:3000
\`\`\`

---

## 🚀 Deployment

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy ✅

---

## 🔒 Security Features

- JWT Authentication with secure cookies
- Password hashing with bcrypt
- SQL injection protection
- Input validation
- CSRF protection

---

**Developer:** [Vaibhav Porwal](https://github.com/vaibhavporwal01)
