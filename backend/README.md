# Expense Tracker Backend

## Backend

### Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary
- Multer
- dotenv
- cookie-parser
- CORS

---

# Project Structure

```bash
BackEnd
│
├── APIs
│   ├── AdminAPI.js
│   ├── AuthorAPI.js
│   ├── CommonAPI.js
│   └── UserAPI.js
│
├── config
│   ├── cloudinary.js
│   ├── cloudinaryUpload.js
│   └── multer.js
│
├── middlewares
│   └── verifyToken.js
│
├── models
│   ├── ArticleModel.js
│   └── UserModel.js
│
├── .env
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

# Installation Steps

## Step 1: Install Dependencies

```bash
npm install express mongoose mongodb cloudinary multer dotenv cookie-parser jsonwebtoken cors
```

---

## Step 2: Create `.env` File

```env
PORT=port_number

DBURL=your_mongodb_connection

SECRET_KEY=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## Step 3: Setup Cloudinary

```bash
https://cloudinary.com/
```

- Login or create an account in Cloudinary
- Create a new project
- Copy:
  - Cloud Name
  - API Key
  - API Secret
- Paste them into your `.env` file

---

## Step 4: Start the Server

```bash
node server.js
```

---

# Deployment

## Use Render for Backend Deployment

### Steps To Deploy

#### Step 1: Push Project to GitHub

```bash
git add .
git commit -m "Initial Commit"
git push origin main
```

---

#### Step 2: Connect GitHub to Render

- Login to Render
- Click on **New Web Service**
- Connect GitHub
- Select your project repository

---

#### Step 3: Add Environment Variables

```env
PORT=port_number

DBURL=your_mongodb_connection

SECRET_KEY=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

#### Step 4: Configure Render

- Root Directory: `backend`
- Instance Type: `Free`

Build Command:

```bash
npm install
```

Start Command:

```bash
npm start
```

---

#### Step 5: Deploy

Click on **Deploy Web Service**

Your backend will be live after successful deployment.
