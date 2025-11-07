# Innovation Lifecycle Manager

A web application for tracking innovation initiatives from ideation through deployment.

## 🚀 Quick Start (Automated)

Run this single command to set up and start everything:

```bash
./setup-and-run.sh
```

This script will:
1. ✅ Check Node.js version
2. ✅ Install all dependencies (if not already installed)
3. ✅ Create .env file from template
4. ✅ Initialize SQLite database with demo data
5. ✅ Verify setup
6. ✅ Start both backend and frontend servers

**The servers will start automatically. Open http://localhost:5173 in your browser.**

---

## 🧪 Test the Setup

While servers are running, open a **new terminal** and run:

```bash
./test-setup.sh
```

This will verify:
- ✅ Database file exists with data (6 users, 12 initiatives)
- ✅ Backend API responds on port 3000
- ✅ Frontend loads on port 5173
- ✅ All endpoints are accessible

---

## 📋 Demo User Credentials

All passwords are: **`demo123`**

| Email | Role | Description |
|-------|------|-------------|
| `employee@demo.com` | Employee | Can submit ideas and view initiatives |
| `reviewer@demo.com` | Reviewer | Can approve stage transitions |
| `admin@demo.com` | Admin | Full system access |

---

## 📁 Project Structure

```
Innovation-LifeCycle-Manager/
├── server/              # Backend (Node.js + Express + SQLite)
│   ├── src/            # API source code
│   ├── database/       # Schema and seed scripts
│   └── data/           # SQLite database file
│
├── client/             # Frontend (React + Vite + Tailwind)
│   └── src/           # React components
│
├── docs/              # Documentation
│   ├── ARCHITECTURE.md
│   ├── DEMO_SCOPE.md
│   └── USER_STORIES.md
│
├── setup-and-run.sh   # Automated setup script
└── test-setup.sh      # Verification script
```

---

## 🛠️ Manual Commands

If you prefer to run commands manually:

### Install Dependencies
```bash
npm install                    # Root dependencies
cd server && npm install && cd ..   # Server dependencies
cd client && npm install && cd ..   # Client dependencies
```

### Setup Database
```bash
npm run db:reset              # Create and seed database
```

### Start Development Servers
```bash
npm run dev                   # Starts both servers
```

Or start separately:
```bash
npm run dev:server            # Backend only (port 3000)
npm run dev:client            # Frontend only (port 5173)
```

### Reset Database
```bash
npm run db:reset              # Drops all tables and recreates with seed data
```

---

## 🌐 URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **API Info**: http://localhost:3000/api

---

## 📊 Database

- **Type**: SQLite (using sql.js)
- **Location**: `server/data/innovation-manager.db`
- **Tables**: users, initiatives, stage_transitions, ai_interactions
- **Demo Data**: 6 users, 12 initiatives across 4 stages

### Inspect Database
```bash
# You can use any SQLite browser, or the sqlite3 CLI:
sqlite3 server/data/innovation-manager.db

# SQL commands:
SELECT * FROM users;
SELECT * FROM initiatives;
.exit
```

---

## 🏗️ Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 18 + Vite + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | SQLite (sql.js) |
| **AI** | Anthropic Claude API (future) |

---

## 📝 Development Workflow

### Phase 3: ✅ Project Scaffolding (Current)
- ✅ Database schema and seed data
- ✅ Express API server with basic routes
- ✅ React frontend with Tailwind CSS
- ✅ Development environment setup

### Phase 4: 🚧 Feature Development (Next)
1. Authentication & Login
2. Kanban Board Display
3. Idea Submission Form
4. Stage Transition Workflow
5. AI Duplicate Detection

---

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill processes on ports 3000 or 5173
lsof -ti:3000 | xargs kill
lsof -ti:5173 | xargs kill
```

### Database errors
```bash
# Reset database
npm run db:reset
```

### Clear and reinstall
```bash
# Remove all dependencies
rm -rf node_modules server/node_modules client/node_modules

# Remove database
rm -rf server/data

# Start fresh
./setup-and-run.sh
```

---

## 📖 Documentation

- [Architecture](docs/ARCHITECTURE.md) - Technical design and stack
- [Demo Scope](docs/DEMO_SCOPE.md) - Simplified 12-story demo plan
- [User Stories](docs/USER_STORIES.md) - Complete feature requirements
- [Setup Guide](SETUP.md) - Detailed setup instructions

---

## 🎯 Success Criteria

Setup is successful when:
1. ✅ `./setup-and-run.sh` completes without errors
2. ✅ `./test-setup.sh` shows all tests passing
3. ✅ Browser shows "Connected" status at http://localhost:5173
4. ✅ API responds at http://localhost:3000/health

---

## 🤝 Contributing

This is a demo project. Development follows the architecture defined in `docs/ARCHITECTURE.md`.

---

## 📄 License

MIT

---

**Ready to build? Run `./setup-and-run.sh` and start coding! 🚀**
