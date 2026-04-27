import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { GameProvider, useGame } from './context/GameContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Game from './pages/Game'
import Result from './pages/Result'
import Leaderboard from './pages/Leaderboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminPage from './pages/AdminPage'
import './App.css'

const ProtectedRoute = ({ children }) => {
  const { user, isGuest } = useGame()
  return (user || isGuest) ? children : <Navigate to="/login" />
}

// Footer sirf Home page pe dikhega
const FooterWrapper = () => {
  const location = useLocation()
  if (location.pathname !== '/') return null
  return <Footer />
}

function AppRoutes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
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
          {/* ✅ NEW — Admin route add kiya */}
          <Route path="/admin-panel" element={
            <ProtectedRoute><AdminPage /></ProtectedRoute>
          } />
        </Routes>
      </div>
      {/* Footer sirf Home page pe */}
      <FooterWrapper />
    </div>
  )
}

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </GameProvider>
  )
}

export default App