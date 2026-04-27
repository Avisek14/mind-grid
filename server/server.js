
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes')

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// All Routes
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/feedback', feedbackRoutes) 

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🧠 MindGrid Server is Running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});