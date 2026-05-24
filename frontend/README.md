# Expense Tracker With AI Insights - Frontend

## Frontend

### Technologies Used
- React JS
- Vite
- Tailwind CSS
- React Router DOM
- Zustand
- Axios

---

# Project Structure

```bash
FrontEnd
│
├── public
│
├── src
│   ├── assets
│   │
│   ├── components
│   │   ├── AddTransactionForm.jsx
│   │   ├── BudgetProgress.jsx
│   │   ├── CategoryTracking.jsx
│   │   ├── DashboardLayout.jsx
│   │   ├── ExpensePieChart.jsx
│   │   ├── Footer.jsx
│   │   ├── GraphAnalytics.jsx
│   │   ├── Header.jsx
│   │   ├── Income_Expenses.jsx
│   │   ├── MonthlyLineChart.jsx
│   │   ├── MonthlyReport.jsx
│   │   ├── PredictionCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ReportExport.jsx
│   │   ├── RootLayout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SummaryCards.jsx
│   │   └── TransactionTable.jsx
│   │
│   ├── pages
│   │   ├── AIInsights.jsx
│   │   ├── Analytics.jsx
│   │   ├── BudgetAlerts.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Predictions.jsx
│   │   ├── Profile.jsx
│   │   ├── ReceiptScanner.jsx
│   │   ├── Register.jsx
│   │   ├── Reports.jsx
│   │   └── Transactions.jsx
│   │
│   ├── services
│   │   └── api.js
│   │
│   ├── stores
│   │   ├── authStore.js
│   │   └── transactionStore.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

# Installation Steps

## Step 1: Install Dependencies

```bash
npm install react-router-dom axios zustand tailwindcss
```

---

## Step 2: Create `.env` File

```env
VITE_API_URL=your_backend_url
```

---

## Step 3: Start Development Server

```bash
npm run dev
```

---

# To Deploy

## Use Vercel for Frontend Deployment

### Steps To Deploy

#### Step 1: Push the project to GitHub

```bash
git add .
git commit -m "Initial Commit"
git push origin main
```

---

#### Step 2: Connect GitHub Repository to Vercel

- Login to Vercel
- Click on **Add New**
- Click on **Project**
- Connect your GitHub account
- Select your project repository

---

#### Step 3: Add Environment Variables

```env
VITE_API_URL=your_backend_url
```

Use the deployed Render backend link.

---

#### Step 4: Configure Vercel Settings

- Root Directory: `frontend`

Build Command:

```bash
npm run build
```

Output Directory:

```bash
dist
```

---

#### Step 5: Deploy

Click on **Deploy**

Your frontend will be live after successful deployment.

---

# Important Note

After frontend deployment:

- Copy the deployed frontend URL
- Add it inside backend `server.js` CORS configuration
- Redeploy backend in Render
- Redeploy frontend in Vercel

This helps frontend and backend connect properly.

---

# Deployment Link

```bash
https://expense-tracker-with-ai-insights-three.vercel.app/
```
