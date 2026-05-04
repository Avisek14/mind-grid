# 🧠 MindGrid — Memory & Logic Challenge

<div align="center">

![MindGrid Banner](https://img.shields.io/badge/MindGrid-Memory%20Game-7c3aed?style=for-the-badge&logo=game&logoColor=white)

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-mind--grid--pearl.vercel.app-06b6d4?style=for-the-badge)](https://mind-grid-pearl.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Avisek14-a855f7?style=for-the-badge&logo=github)](https://github.com/Avisek14/mind-grid)
[![Portfolio](https://img.shields.io/badge/Portfolio-Avisek%20Sahoo-3b82f6?style=for-the-badge)](https://avisek14.github.io/Avisek-portfolio/)

**A full-stack memory game where you memorize a grid of numbers and recall them in order — built with the MERN stack.**

</div>

---

## 🎮 What is MindGrid?

MindGrid is a brain-training memory game. A 4×4 grid appears with 10 hidden numbers. You get a few seconds to memorize them — then they disappear. Your challenge? Click them back in the correct order (ascending or descending) before the timer runs out!

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure Login & Signup system
- 👻 **Guest Mode** — Play without an account (scores not saved)
- 🏆 **Leaderboard** — Real-time global rankings
- 📊 **Game History** — Track your past performances
- 🎯 **3 Difficulty Levels** — Easy (5s), Moderate (3s), Hard (1s)
- ⬆️⬇️ **Ascending & Descending** — Two game modes
- 🛡️ **Admin Dashboard** — Role-based access, feedback & stats management
- 💬 **Feedback System** — Players can submit reviews & suggestions
- 📱 **Fully Responsive** — Works on all devices
- 🌐 **SEO Optimized** — Google indexed with sitemap & meta tags

---

## 🛠️ Tech Stack

### Frontend
| Technology | Usage |
|---|---|
| React.js + Vite | UI Framework |
| Framer Motion | Animations |
| Axios | API calls |
| React Router DOM | Navigation |

### Backend
| Technology | Usage |
|---|---|
| Node.js | Runtime |
| Express.js | Server Framework |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password Hashing |

### Deployment
| Platform | Usage |
|---|---|
| Vercel | Frontend Hosting |
| Render | Backend Hosting |
| MongoDB Atlas | Cloud Database |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Avisek14/mind-grid.git
cd mind-grid
```

**2. Setup Backend**
```bash
cd server
npm install
```

Create `.env` file in `server/`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
ADMIN_EMAIL=your_admin_email
```

Start server:
```bash
node server.js
```

**3. Setup Frontend**
```bash
cd client
npm install
npm run dev
```

---

## 📁 Project Structure

```
mindgrid/
├── client/                 # React Frontend
│   ├── public/
│   │   ├── favicon.svg
│   │   └── sitemap.xml
│   └── src/
│       ├── components/     # Navbar, Grid, Tile, Timer, Popup, Footer
│       ├── context/        # GameContext (Auth + Game State)
│       ├── pages/          # Home, Game, Result, Login, Signup, Leaderboard
│       └── services/       # API calls (Axios)
│
└── server/                 # Node.js Backend
    ├── config/             # MongoDB connection
    ├── controllers/        # Auth, Game, Leaderboard, Feedback
    ├── middleware/          # JWT Auth, Admin Protect
    ├── models/             # User, Score, Feedback
    ├── routes/             # API Routes
    └── server.js           # Entry point
```

---

## 🎯 How to Play

1. **Select Difficulty** — Easy, Moderate, or Hard
2. **Memorize** — Numbers appear on the grid for a few seconds
3. **They Disappear** — Now it's your turn!
4. **Choose Order** — Ascending (1→10) or Descending (10→1)
5. **Click in Order** — Find and click the numbers correctly
6. **Win or Lose** — Score gets saved to the leaderboard!

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile |

### Game
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/game/score` | Save game score |
| GET | `/api/game/history` | Get user history |
| GET | `/api/game/bestscore` | Get best score |

### Leaderboard
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/leaderboard` | Get global leaderboard |

### Feedback (Admin Protected)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/feedback` | Submit feedback |
| GET | `/api/feedback` | Get all feedbacks (Admin) |
| DELETE | `/api/feedback/:id` | Delete feedback (Admin) |
| GET | `/api/feedback/stats` | Get admin stats (Admin) |

---

## 📸 Screenshots

### Home Page
> Select difficulty and start your memory challenge!

### Game Screen
> Memorize the grid before the timer runs out!

### Result Page
> Win or lose — your score gets saved automatically!

### Leaderboard
> Compete with players globally!

---

## 👨‍💻 Developer

<div align="center">

**Avisek Sahoo**
Full Stack Developer

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-06b6d4?style=flat-square)](https://avisek14.github.io/Avisek-portfolio/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-3b82f6?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/avisek-sahoo-907186341/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-a855f7?style=flat-square&logo=github)](https://github.com/Avisek14)
[![Email](https://img.shields.io/badge/Email-Contact-22c55e?style=flat-square&logo=gmail)](mailto:sahoo143avisek@gmail.com)

</div>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by **Avisek Sahoo** © 2026

⭐ **Star this repo if you liked it!** ⭐

</div>