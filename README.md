# Bean There Coffee - Business Dashboard

A full-stack business intelligence dashboard with AI-powered automation workflows for coffee shop operations.

## Demo Notes
n8n is hosted on Render's free tier and spins down after 15 minutes of inactivity. 
To view workflows, visit the n8n instance first to wake it up: 
https://bean-there-n8n.onrender.com

## 🚀 Features

### Dashboard
- **Real-time Analytics** - Daily sales, inventory tracking, customer insights
- **Role-Based Access** - Admin and Viewer permissions
- **Secure Authentication** - Session-based login with bcrypt password hashing
- **Responsive Design** - Works on desktop and mobile

### AI Automation (n8n Workflows)
- **Daily Sales Report** - Automated email with sales data
- **Low Stock Alerts** - Notifications when inventory runs low
- **Weekly Summary** - Exports analytics to Google Sheets
- **Error Handling** - Centralized error notification system

### Security
- API key authentication
- Rate limiting (100 requests/15min)
- CORS protection
- CSRF protection
- Helmet security headers
- SQL injection prevention via Prisma ORM
- Input sanitization

## 🛠️ Tech Stack

**Backend:**
- Node.js + TypeScript
- Express.js
- PostgreSQL (Prisma ORM)
- Passport.js (authentication)
- bcrypt (password hashing)

**Frontend:**
- EJS templates
- Vanilla JavaScript
- CSS3

**Automation:**
- n8n (workflow automation)
- Gmail API
- Google Sheets API

**Deployment:**
- Render.com (dashboard + database + n8n)

## 📁 Architecture
```
src/
├── config/          # Passport authentication setup
├── controllers/     # Request/response handling
├── routes/          # URL endpoint definitions
├── services/        # Business logic & database queries
├── middleware/      # Auth, error handling, rate limiting
├── helpers/         # Utility functions
├── views/           # EJS templates
└── public/          # Static assets (CSS, JS)
```

**Clean separation of concerns:**
- Routes → Controllers → Services → Database
- No business logic in routes
- Centralized error handling
- Reusable service layer

## 🔧 Installation

**Prerequisites:**
- Node.js 20+
- PostgreSQL database
- n8n instance (local or hosted)
- Google OAuth credentials (for Gmail/Sheets)

**Setup:**
```bash
# Clone repository
git clone https://github.com/yourusername/chatbot-project.git
cd chatbot-project

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
npx prisma migrate dev

# Seed database with demo data
npx prisma db seed

# Start development server
npm run dev
```

**n8n Workflows:**

1. Import workflow JSONs from `/workflows` directory
2. Configure Gmail and Google Sheets credentials
3. Update webhook URLs in dashboard `.env`
4. Activate workflows

## 🔐 Environment Variables
```env
# Database
DATABASE_URL=postgresql://...

# Session
SESSION_SECRET=your-secret-key

# API Security
API_KEY=your-api-key
ALLOWED_ORIGINS=http://localhost:5678

# n8n Integration
N8N_API_KEY=your-n8n-api-key
N8N_API_URL=http://localhost:5678/api/v1
N8N_LOW_STOCK_WEBHOOK=http://localhost:5678/webhook/...

# Environment
NODE_ENV=development
PORT=3000
```

## 📊 Database Schema

**Core Tables:**
- `Product` - Inventory with stock levels
- `Order` - Transaction history
- `OrderItem` - Line items per order
- `Customer` - Customer data (PII protected)
- `Employee` - Staff data (sensitive, excluded from API)
- `Admin` - Dashboard users with role-based access
- `StoreHours` - Business hours
- `StoreInfo` - Business information (address, parking, etc.)

## 🚀 Deployment

**Dashboard (Render):**
1. Push to GitHub
2. Create Web Service on Render
3. Set environment variables
4. Deploy

**n8n (Render):**
1. Use provided Dockerfile
2. Configure environment variables
3. Connect to same PostgreSQL database

## 📸 Screenshots

[Add screenshots here]

## 🎯 Use Cases

This architecture can be adapted for:
- Restaurant management
- Retail inventory systems
- Service business dashboards
- Nonprofit operations tracking
- Small business automation

## 🔮 Future Enhancements

- [ ] Real-time dashboard updates (WebSockets)
- [ ] Advanced analytics charts
- [ ] Mobile app
- [ ] Multi-location support
- [ ] Automated restocking workflows

## 👨‍💻 Author

Built by [Your Name] as a portfolio project demonstrating full-stack development, API security, workflow automation, and production deployment.

**Portfolio:** [your-site.com]  
**LinkedIn:** [your-linkedin]  
**GitHub:** [your-github]

## 📄 License

MIT