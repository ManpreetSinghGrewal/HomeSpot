# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up MongoDB

**Option A: MongoDB Atlas (Cloud - Easiest)**
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) (free)
2. Create a cluster
3. Create database user
4. Whitelist your IP
5. Copy connection string

**Option B: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use: `mongodb://localhost:27017/homespot`

### 3. Configure & Run

1. Create `.env` file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your MongoDB connection string:
```
MONGODB_URI=your-connection-string-here
PORT=5000
NODE_ENV=development
```

3. Start the application:
```bash
npm run dev:all
```

That's it! 🎉 

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📝 What Changed?

✅ Signup page now stores users in MongoDB  
✅ Login page authenticates against MongoDB  
✅ Passwords are securely hashed  
✅ All user data persisted in database  

See `SETUP.md` for detailed instructions and troubleshooting.

