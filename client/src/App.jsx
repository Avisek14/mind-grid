
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider, useGame } from './context/GameContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

// Protected Route — Login nahi hai toh Login page pe bhejo
const ProtectedRoute = ({ children }) => {
  const { user } = useGame();
  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/game" element={
          <ProtectedRoute><Game /></ProtectedRoute>
        } />
        <Route path="/result" element={
          <ProtectedRoute><Result /></ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;