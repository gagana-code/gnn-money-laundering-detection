# ◈ AML Shield — Anti-Money Laundering Detection Platform

A full-stack web platform that uses **Graph Neural Networks (GNN)** to detect suspicious financial transactions.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router, Recharts, Cytoscape.js |
| Backend | FastAPI, SQLAlchemy, SQLite/PostgreSQL |
| ML/GNN | NetworkX, NumPy, Pandas (PyTorch Geometric optional) |
| Auth | JWT (python-jose), bcrypt |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
aml-system/
├── backend/
│   ├── main.py                  # FastAPI app entry point
│   ├── requirements.txt
│   ├── render.yaml              # Render deployment config
│   ├── models/
│   │   └── database.py          # SQLAlchemy models
│   ├── routers/
│   │   ├── auth.py              # Signup/Login/JWT
│   │   ├── upload.py            # File upload + GNN pipeline
│   │   ├── transactions.py      # Transaction CRUD
│   │   ├── alerts.py            # Alert management
│   │   ├── graph.py             # Graph data for visualization
│   │   └── dashboard.py        # Stats & summary
│   └── ml/
│       └── gnn_service.py       # GNN/graph analysis engine
├── frontend/
│   ├── package.json
│   ├── vercel.json              # Vercel deployment config
│   ├── .env.example
│   └── src/
│       ├── App.jsx              # Routes
│       ├── index.js
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── utils/
│       │   └── api.js           # Axios instance
│       ├── components/Layout/
│       │   └── Sidebar.jsx
│       └── pages/
│           ├── Login.jsx
│           ├── Signup.jsx
│           ├── Dashboard.jsx
│           ├── Upload.jsx
│           ├── Transactions.jsx
│           ├── Alerts.jsx
│           ├── NetworkGraph.jsx
│           └── Profile.jsx
└── sample_transactions.csv      # Test data
```

---

## 🚀 LOCAL SETUP

### Step 1: Clone / Setup

```bash
# In your terminal
cd aml-system
```

### Step 2: Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Mac/Linux
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Run backend (starts on http://localhost:8000)
python main.py
```

### Step 3: Frontend Setup

```bash
cd frontend

# Copy env file
cp .env.example .env
# .env contains: REACT_APP_API_URL=http://localhost:8000

# Install dependencies
npm install

# Start frontend (opens http://localhost:3000)
npm start
```

### Step 4: Test the App

1. Open http://localhost:3000
2. Sign up with any email/password
3. Go to **Upload Data**
4. Upload `sample_transactions.csv`
5. View results in Dashboard, Transactions, Alerts, and Network Graph

---

## ☁️ DEPLOYMENT GUIDE

---

### PART 1: Push to GitHub

#### Step 1: Create GitHub Repository

1. Go to https://github.com → Click **New**
2. Repository name: `aml-shield`
3. Set to **Public** (required for free Vercel/Render)
4. Do NOT check "Add README" (you already have files)
5. Click **Create repository**

#### Step 2: Push Code

```bash
cd aml-system

# Initialize git
git init
git add .
git commit -m "Initial commit: AML Shield platform"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/aml-shield.git
git branch -M main
git push -u origin main
```

---

### PART 2: Deploy Backend on Render

#### Step 1: Sign up at Render
Go to https://render.com → Sign up (free plan works)

#### Step 2: Create Web Service

1. Click **New** → **Web Service**
2. Connect your GitHub account
3. Select your `aml-shield` repository
4. Configure:
   - **Name**: `aml-shield-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

#### Step 3: Add Environment Variables

In Render dashboard → **Environment**:
```
SECRET_KEY = your-super-secret-key-change-this-123
DATABASE_URL = sqlite:///./aml.db
```

#### Step 4: Deploy

Click **Create Web Service** → Wait 2-3 minutes

✅ Your backend will be at: `https://aml-shield-backend.onrender.com`

**Copy this URL** — you'll need it for the frontend.

---

### PART 3: Deploy Frontend on Vercel

#### Step 1: Sign up at Vercel
Go to https://vercel.com → Sign up with GitHub

#### Step 2: Import Project

1. Click **Add New** → **Project**
2. Select your `aml-shield` GitHub repo
3. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

#### Step 3: Add Environment Variable

In **Environment Variables** section:
```
REACT_APP_API_URL = https://aml-shield-backend.onrender.com
```
(Use your actual Render backend URL)

#### Step 4: Deploy

Click **Deploy** → Wait 1-2 minutes

✅ Your frontend will be at: `https://aml-shield.vercel.app`

---

### PART 4: Add Custom Domain (Optional)

#### On Vercel (Frontend):

1. Go to your project → **Settings** → **Domains**
2. Click **Add Domain**
3. Enter your domain: `aml.yourdomain.com`
4. Vercel will show DNS records to add

#### At Your Domain Registrar (GoDaddy / Namecheap / Google Domains):

Add a **CNAME** record:
```
Type:  CNAME
Name:  aml          (or @ for root domain)
Value: cname.vercel-dns.com
TTL:   Automatic
```

Or if using root domain, add **A records**:
```
Type: A
Name: @
Value: 76.76.21.21
```

5. Back in Vercel → Click **Verify** → Wait 5-30 minutes for DNS propagation
6. SSL certificate is automatically provisioned ✅

#### On Render (Backend):

1. Go to your service → **Settings** → **Custom Domains**
2. Add `api.yourdomain.com`
3. Add CNAME at your registrar:
```
Type:  CNAME
Name:  api
Value: aml-shield-backend.onrender.com
```

Then update your Vercel env variable:
```
REACT_APP_API_URL = https://api.yourdomain.com
```

---

## 🧪 CSV FORMAT FOR TESTING

Your CSV must have these columns:

```csv
transaction_id,sender,receiver,amount,timestamp
TX001,ACCOUNT_A,ACCOUNT_B,5000,2024-01-01 10:00:00
```

Required: `sender`, `receiver`, `amount`
Optional: `transaction_id`, `timestamp`

---

## 🔍 HOW THE GNN DETECTION WORKS

1. **Graph Construction**: Accounts = nodes, Transactions = edges
2. **Feature Extraction**: In/out degree, transaction volume, flow ratio
3. **Pattern Detection**:
   - 🔴 **Circular transactions** — money cycles back (layering)
   - 🟠 **Pass-through accounts** — equal in/out (money mules)
   - 🟡 **High connectivity hubs** — many connections (structuring)
   - 🟡 **Unusually large amounts** — statistical outliers
4. **Risk Scoring**: 0.0 (clean) → 1.0 (critical)
5. **Auto-Alert**: Any transaction with risk ≥ 0.5 generates an alert

---

## 🔒 Production Checklist

- [ ] Change `SECRET_KEY` to a strong random string
- [ ] Switch from SQLite to PostgreSQL (add DATABASE_URL to Render)
- [ ] Set `allow_origins` in CORS to your actual frontend URL
- [ ] Enable HTTPS (automatic on Vercel/Render)
- [ ] Add rate limiting for auth endpoints
