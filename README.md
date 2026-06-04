# Zerodha Stock Trading Platform
https://stockp-frontend.onrender.com

A full-stack stock trading platform with a landing page, user dashboard, and backend API.

## Project Structure

```
Zerodha-main/
├── frontend/          # React landing page (port 3001)
│   ├── src/
│   │   └── landing_page/
│   │       ├── home/       # Home page components
│   │       ├── signup/     # Sign in/Sign up
│   │       ├── about/      # About page
│   │       ├── products/  # Products page
│   │       ├── pricing/   # Pricing page
│   │       └── support/   # Support page
│   ├── public/
│   └── package.json
├── dashboard/         # React dashboard app (port 3000)
│   ├── src/
│   │   └── components/
│   │       ├── Home.js    # Main dashboard component
│   │       ├── Dashboard.js
│   │       └── TopBar.js
│   ├── public/
│   └── package.json
├── backend/           # Express API server (port 3012)
│   ├── api/
│   ├── model/
│   ├── schemas/
│   ├── index.js
│   └── package.json
├── vercel.json        # Vercel configuration
├── render.yaml        # Render configuration
└── DEPLOYMENT.md      # Deployment guide
```

## Features

- **Landing Page**: Modern, responsive landing page with sections for home, about, products, pricing, and support
- **User Authentication**: Sign up and sign in functionality with token-based authentication
- **Dashboard**: Interactive dashboard for logged-in users
- **Backend API**: RESTful API with MongoDB integration
- **Redirection**: Seamless redirection from sign in/sign up to dashboard with token

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RidhimaKulashriz/stockp.git
cd stockp/Zerodha-main
```

2. Install dependencies for each application:

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

**Dashboard:**
```bash
cd ../dashboard
npm install
```

### Environment Variables

Create `.env` files in each directory:

**Backend (.env):**
```
MONGO_URL=mongodb://localhost:27017/zerodha
PORT=3012
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:3012
REACT_APP_DASHBOARD_URL=http://localhost:3000
PORT=3001
```

**Dashboard (.env):**
```
REACT_APP_API_URL=http://localhost:3012
```

### Running the Application

Start all three applications in separate terminals:

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm start
```

**Dashboard:**
```bash
cd dashboard
npm start
```

The applications will be available at:
- Frontend: http://localhost:3001
- Dashboard: http://localhost:3000
- Backend API: http://localhost:3012

## Usage

1. Open http://localhost:3001 to view the landing page
2. Click "Sign Up" to create a new account
3. After signing up, sign in with your credentials
4. You will be automatically redirected to the dashboard with your authentication token

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions using Vercel or Render.

## Technologies Used

- **Frontend**: React, React Router, Bootstrap
- **Dashboard**: React, Material-UI, Chart.js
- **Backend**: Express, MongoDB, Mongoose, Passport
- **Authentication**: JWT tokens, bcryptjs

## License

ISC
