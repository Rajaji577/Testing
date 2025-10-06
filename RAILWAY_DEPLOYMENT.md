# 🚂 Railway Backend Deployment Guide

## 📋 **Required Environment Variables**

Set these in Railway Dashboard → Variables:

### **Core Application**
```bash
NODE_ENV=production
PORT=5000
```

### **Database**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/anime_india?retryWrites=true&w=majority
```

### **JWT Authentication**
```bash
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRE=1h
JWT_REFRESH_SECRET=your-super-secure-refresh-secret-key-here
JWT_REFRESH_EXPIRE=7d
```

### **Email Configuration (Nodemailer/SMTP)**
```bash
SMTP_USER=your-email@domain.com
SMTP_PASSWORD=your-email-password
FROM_CONTACT_EMAIL=your-email@domain.com
SUPPORT_EMAIL=support@yourdomain.com
```

### **Admin Configuration**
```bash
ADMIN_EMAILS=admin1@domain.com,admin2@domain.com
ADMIN_PHONES=+1234567890,+0987654321
```

### **PhonePe Payment Gateway**
```bash
PHONEPE_CLIENT_ID=your-phonepe-client-id
PHONEPE_CLIENT_SECRET=your-phonepe-client-secret
PHONEPE_CLIENT_VERSION=2
PHONEPE_ENVIRONMENT=SANDBOX
PHONEPE_WEBHOOK_URL=https://your-railway-app.railway.app/api/payment/webhook
PHONEPE_WEBHOOK_USERNAME=webhook-username
PHONEPE_WEBHOOK_PASSWORD=webhook-password
```

### **Google OAuth (Optional)**
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### **URLs (Update with your actual domains)**
```bash
FRONTEND_URL=https://your-hostinger-domain.com
BACKEND_URL=https://your-railway-app.railway.app
```

### **Twilio SMS (Optional)**
```bash
TWILIO_SID=your-twilio-sid
TWILIO_TOKEN=your-twilio-token
TWILIO_FROM_NUMBER=+1234567890
```

## 🚀 **Railway Deployment Steps**

### **Step 1: Connect Repository**
1. Go to [Railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository

### **Step 2: Configure Build Settings**
Railway will auto-detect Node.js. Ensure these files are in your repo root:
- ✅ `package.json` (already exists)
- ✅ `railway.json` (created)
- ✅ `Procfile` (created)
- ✅ `.nvmrc` (created)

### **Step 3: Set Environment Variables**
1. Go to your Railway project dashboard
2. Click "Variables" tab
3. Add ALL the environment variables listed above
4. Replace placeholder values with your actual credentials

### **Step 4: Deploy**
1. Railway will automatically build and deploy
2. Watch the build logs for any errors
3. Your app will be available at `https://your-app-name.railway.app`

### **Step 5: Custom Domain (Optional)**
1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Update DNS records as instructed

## 📁 **Files Deployed to Railway**

Railway will deploy these files from your repository:
```
📁 Root Directory
├── 📄 package.json
├── 📄 railway.json
├── 📄 Procfile
├── 📄 .nvmrc
├── 📁 server/ (entire backend code)
│   ├── 📄 index.ts
│   ├── 📁 routes/
│   ├── 📁 models/
│   ├── 📁 middleware/
│   ├── 📁 config/
│   └── 📁 scripts/
├── 📁 shared/
└── 📁 uploads/ (user uploaded files)
```

## 🔧 **Railway Configuration Files**

### **railway.json**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### **Procfile**
```
web: npm start
```

### **.nvmrc**
```
20
```

## 🚨 **Important Notes**

1. **Database**: Use MongoDB Atlas (free tier available)
2. **File Storage**: Railway has ephemeral storage - files may be lost on restart
3. **Environment Variables**: Keep sensitive data secure
4. **CORS**: Update CORS origin to your Hostinger domain
5. **SSL**: Railway provides automatic HTTPS

## 🔗 **API Endpoints Available**

After deployment, these endpoints will be available:
- `GET /api/health` - Health check
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin)
- `GET /api/products/:id` - Get single product
- `POST /api/upload` - Upload images
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/orders` - Create order
- `POST /api/payment/initiate` - Initiate payment
- `GET /api/admin/stats` - Admin statistics

## 🐛 **Troubleshooting**

### **Common Issues:**
1. **Build Fails**: Check Node.js version compatibility
2. **Environment Variables**: Ensure all required vars are set
3. **Database Connection**: Verify MongoDB URI format
4. **File Uploads**: Consider using external storage (AWS S3)

### **Logs:**
- View real-time logs in Railway dashboard
- Check deployment logs for build errors
- Monitor application logs for runtime errors
