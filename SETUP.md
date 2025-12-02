# MongoDB Setup Instructions for HomeSpot

This guide will help you set up MongoDB integration for user signup and login functionality.

## Prerequisites

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - Choose one of the following:
   - **Local MongoDB**: [Download MongoDB Community Edition](https://www.mongodb.com/try/download/community)
   - **MongoDB Atlas** (Cloud - Recommended): [Sign up for free](https://www.mongodb.com/cloud/atlas/register)

## Step 1: Install Dependencies

Run the following command in your project root directory:

```bash
npm install
```

This will install all required dependencies including:
- Express (backend server)
- Mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- cors (cross-origin resource sharing)
- dotenv (environment variables)

## Step 2: Set Up MongoDB Atlas (Cloud - Recommended) ☁️

**MongoDB Atlas is a free cloud database service. Your data will be stored online and accessible from anywhere.**

### Detailed MongoDB Atlas Setup:

#### 1. Create MongoDB Atlas Account
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Click "Try Free" or "Sign Up"
   - Fill in your details and verify your email

#### 2. Create a Free Cluster
   - After logging in, click "Build a Database"
   - Choose **"M0 FREE"** tier (Free forever)
   - Select a cloud provider (AWS, Google Cloud, or Azure)
   - Choose a region closest to you
   - Click "Create" (takes 1-3 minutes)

#### 3. Create Database User
   - In the left sidebar, click **"Database Access"**
   - Click **"Add New Database User"**
   - Choose **"Password"** authentication method
   - Create a username (e.g., `homespot_user`)
   - Create a strong password (save this password!)
   - Under "Database User Privileges", select **"Read and write to any database"**
   - Click **"Add User"**

#### 4. Whitelist Your IP Address
   - In the left sidebar, click **"Network Access"**
   - Click **"Add IP Address"**
   - For development, click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - Click **"Confirm"**
   - ⚠️ **Note**: For production, use specific IP addresses for security

#### 5. Get Your Connection String
   - Go back to **"Database"** (or click "Clusters" in left sidebar)
   - Click **"Connect"** button on your cluster
   - Choose **"Connect your application"**
   - Driver: **Node.js**, Version: **5.5 or later**
   - Copy the connection string (looks like):
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - **Important**: Replace `<username>` and `<password>` with your database user credentials
   - Add database name at the end: Replace `?retryWrites=true&w=majority` with `/homespot?retryWrites=true&w=majority`
   
   **Final connection string format:**
   ```
   mongodb+srv://homespot_user:your-password@cluster0.xxxxx.mongodb.net/homespot?retryWrites=true&w=majority
   ```

### Option B: Local MongoDB (Skip if using Atlas)

1. Download and install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - **macOS**: `brew services start mongodb-community`
   - **Windows**: MongoDB should start automatically as a service
   - **Linux**: `sudo systemctl start mongod`
3. Your connection string will be: `mongodb://localhost:27017/homespot`

## Step 3: Configure Environment Variables

1. Create a `.env` file in the root directory:

**On macOS/Linux:**
```bash
touch .env
```

**On Windows:**
```bash
type nul > .env
```

Or manually create a file named `.env` in the root directory.

2. Open the `.env` file and add your MongoDB Atlas connection string:

```env
# MongoDB Atlas Connection String
# Replace <username> and <password> with your database user credentials
# Replace cluster0.xxxxx with your actual cluster name
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/homespot?retryWrites=true&w=majority

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

**Example (replace with your actual values):**
```env
MONGODB_URI=mongodb+srv://homespot_user:MySecurePass123@cluster0.abc123.mongodb.net/homespot?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

**⚠️ Important Notes:**
- Replace `<username>` with your database username (created in Step 2.3)
- Replace `<password>` with your database password (created in Step 2.3)
- Replace `cluster0.xxxxx` with your actual cluster name from Atlas
- If your password contains special characters like `@`, `#`, `%`, encode them:
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `%` becomes `%25`
  - `/` becomes `%2F`
- Never share your `.env` file or commit it to Git (it's already in `.gitignore`)

## Step 4: Start the Application

You have two options:

### Option A: Run Frontend and Backend Separately

**Terminal 1 - Start Backend Server:**
```bash
npm run server
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

### Option B: Run Both Together (Recommended)

```bash
npm run dev:all
```

This will start both the frontend (port 5173) and backend (port 5000) simultaneously.

## Step 5: Verify Setup

1. **Start the application:**
   ```bash
   npm run dev:all
   ```
   
   You should see:
   - ✅ Frontend running on `http://localhost:5173`
   - ✅ Backend running on `http://localhost:5000`
   - ✅ "Connected to MongoDB" message in the server console

2. **Test the signup:**
   - Open your browser and go to `http://localhost:5173`
   - Navigate to the Login page (`/login`)
   - Click "Sign up here" to create a new account
   - Fill in the form:
     - Username: (3+ characters)
     - Email: (must be from allowed domains)
     - Role: User or Landlord
     - Password: (8+ chars, uppercase, lowercase, number, special char)
     - Confirm Password: (must match)
   - Click "Sign up"

3. **Verify in MongoDB Atlas:**
   - Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
   - Click on your cluster
   - Click "Browse Collections"
   - You should see a database named `homespot`
   - Inside, a collection named `users`
   - Click on `users` to see your newly created user!
   - ✅ Your user data is now stored online in MongoDB Atlas!

## Troubleshooting

### "Cannot connect to MongoDB" Error

- **MongoDB Atlas**: 
  - ✅ Verify your IP is whitelisted (Network Access → should have `0.0.0.0/0` or your IP)
  - ✅ Check your username and password in the connection string (no typos!)
  - ✅ Ensure your cluster is running (should show green status in Atlas)
  - ✅ Verify connection string format: `mongodb+srv://username:password@cluster...`
  - ✅ Check if password has special characters - encode them (see Step 3)
  - ✅ Make sure database name `/homespot` is included in the connection string
  - ✅ Try testing connection in Atlas: Clusters → Connect → Connect using MongoDB Compass
  
- **Local MongoDB**:
  - Verify MongoDB is running: `mongod --version`
  - Check if MongoDB service is started
  - Try: `mongosh` to test local connection

### "Network error" in Frontend

- Ensure the backend server is running on port 5000
- Check that `vite.config.js` has the proxy configuration
- Verify no firewall is blocking the connection

### Port Already in Use

- Change the `PORT` in `.env` file
- Or kill the process using the port:
  - **macOS/Linux**: `lsof -ti:5000 | xargs kill`
  - **Windows**: `netstat -ano | findstr :5000` then `taskkill /PID <pid> /F`

## Project Structure

```
HomeSpot/
├── server/
│   ├── index.js          # Express server entry point
│   ├── models/
│   │   └── User.js       # User schema/model
│   └── routes/
│       └── auth.js       # Authentication routes
├── src/
│   └── pages/
│       └── Login.jsx     # Updated to use MongoDB API
├── .env                  # Environment variables (create this)
├── .env.example          # Environment template
└── package.json          # Dependencies and scripts
```

## API Endpoints

- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login with username and password
- `GET /api/auth/profile/:username` - Get user profile (optional)
- `GET /api/health` - Server health check

## Security Notes

- Passwords are hashed using bcrypt before storing in MongoDB
- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Use environment variables for sensitive data in production

## Next Steps

- Add JWT authentication for secure sessions
- Implement password reset functionality
- Add email verification
- Set up production environment variables

## Support

If you encounter any issues:
1. Check the server console for error messages
2. Verify MongoDB connection string
3. Ensure all dependencies are installed
4. Check that ports 5000 and 5173 are available

