# Setup Instructions

## Installation & Testing Guide

Follow these steps to install dependencies and test the project scaffolding.

---

## Step 1: Install Root Dependencies

```bash
npm install
```

This will install `concurrently` for running both servers simultaneously.

---

## Step 2: Install Server Dependencies

```bash
cd server
npm install
cd ..
```

This installs:
- express
- better-sqlite3 (SQLite database)
- cors, helmet (security)
- morgan (logging)
- bcrypt, jsonwebtoken (authentication)
- dotenv (environment variables)

---

## Step 3: Install Client Dependencies

```bash
cd client
npm install
cd ..
```

This installs:
- react, react-dom
- vite (build tool)
- tailwindcss (styling)
- axios (HTTP client)
- react-router-dom (routing)

---

## Step 4: Create Environment File

```bash
cp .env.example .env
```

Edit `.env` if needed. For now, defaults are fine. You'll add the Anthropic API key later.

---

## Step 5: Initialize Database

This creates the SQLite database, tables, and seeds demo data:

```bash
npm run db:reset
```

Expected output:
```
🔄 Starting database reset...
📁 Creating data directory...
✨ Creating new database...
📋 Creating schema...
✅ Schema created successfully
🌱 Seeding data...
✅ Seed data inserted successfully

📊 Database Statistics:
   Users: 6
   Initiatives: 12
   Stage Transitions: 3

✅ Database reset completed successfully!
📍 Database location: /path/to/server/data/innovation-manager.db

🔑 Demo User Credentials:
   employee@demo.com (EMPLOYEE) - Password: demo123
   reviewer@demo.com (REVIEWER) - Password: demo123
   admin@demo.com (ADMIN) - Password: demo123
   ...
```

---

## Step 6: Start Development Servers

In the root directory:

```bash
npm run dev
```

This starts both servers:
- **Backend API**: http://localhost:3000
- **Frontend React**: http://localhost:5173

Expected output:
```
[server] 🚀 Innovation Lifecycle Manager API
[server] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[server] 📍 Server running on: http://localhost:3000
[server] 🌍 Environment: development
[server] 🔗 Client URL: http://localhost:5173
[server] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[client] VITE v5.0.8  ready in 523 ms
[client] ➜  Local:   http://localhost:5173/
```

---

## Step 7: Test the Setup

### Test Backend API

Open browser or use curl:

```bash
# Health check
curl http://localhost:3000/health

# Should return:
# {"status":"ok","timestamp":"...","environment":"development"}

# API info
curl http://localhost:3000/api

# Should return API endpoints info
```

### Test Frontend

Open browser: http://localhost:5173

You should see:
- ✅ "Innovation Lifecycle Manager" header
- ✅ Green "Connected" status for backend API
- ✅ Setup complete message

---

## Step 8: Verify Database

Check that the database file was created:

```bash
ls -lh server/data/

# Should show:
# innovation-manager.db
```

You can inspect the database with any SQLite browser, or use:

```bash
cd server
npx better-sqlite3 data/innovation-manager.db

# Then run SQL:
# SELECT COUNT(*) FROM users;      -- Should return 6
# SELECT COUNT(*) FROM initiatives; -- Should return 12
# .exit
```

---

## Troubleshooting

### "Database not found" error

Run:
```bash
npm run db:reset
```

### Port already in use (3000 or 5173)

Kill the process using the port:
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill
lsof -ti:5173 | xargs kill
```

Or change ports in `.env` (for backend) and `client/vite.config.js` (for frontend).

### SQLite installation issues

If `better-sqlite3` fails to install, you may need to install build tools:

**macOS:**
```bash
xcode-select --install
```

**Ubuntu/Debian:**
```bash
sudo apt-get install build-essential python3
```

**Windows:**
```bash
npm install --global windows-build-tools
```

---

## What Got Created

```
Innovation-LifeCycle-Manager/
├── package.json           ← Root workspace config
├── .env.example          ← Environment template
├── .env                  ← Your environment (git-ignored)
│
├── server/               ← Backend
│   ├── package.json
│   ├── src/
│   │   ├── server.js    ← Entry point
│   │   ├── app.js       ← Express app
│   │   └── config/
│   │       ├── database.js
│   │       └── env.js
│   ├── database/
│   │   ├── schema.sql   ← Database schema
│   │   ├── seed.sql     ← Demo data
│   │   └── reset.js     ← Reset script
│   └── data/
│       └── innovation-manager.db ← SQLite database
│
└── client/              ← Frontend
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx     ← React entry
        ├── App.jsx      ← Main component
        └── index.css    ← Tailwind CSS
```

---

## Next Steps

Once everything is working:
1. ✅ Verify database has 6 users and 12 initiatives
2. ✅ Confirm backend API responds on port 3000
3. ✅ Confirm frontend shows "Connected" status
4. ✅ Commit to Git
5. 🚀 Start building features!

---

## Demo User Credentials

All passwords: `demo123`

- `employee@demo.com` - EMPLOYEE role
- `reviewer@demo.com` - REVIEWER role
- `admin@demo.com` - ADMIN role

---

*If everything above works, you're ready to develop! 🎉*
