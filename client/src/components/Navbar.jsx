
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { motion } from 'framer-motion'

const Navbar = () => {
  const { user, logoutUser } = useGame()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(124, 58, 237, 0.3)',
        padding: '16px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* LOGO */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            fontFamily: 'var(--font-game)',
            fontSize: '16px',
            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))',
          }}
        >
          🧠 MINDGRID
        </motion.div>
      </Link>

      {/* NAV LINKS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {/* Leaderboard — always visible */}
        <NavLink to="/leaderboard" current={location.pathname}>
          🏆 LEADERBOARD
        </NavLink>

        {user ? (
          <>
            {/* Welcome */}
            <span style={{
              fontFamily: 'var(--font-main)',
              fontSize: '12px',
              color: 'var(--cyan-accent)',
              letterSpacing: '1px',
            }}>
              👾 {user.name.toUpperCase()}
            </span>

            {/* Logout */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '1px solid var(--red-wrong)',
                color: 'var(--red-wrong)',
                padding: '8px 18px',
                fontFamily: 'var(--font-game)',
                fontSize: '8px',
                cursor: 'pointer',
                borderRadius: '6px',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(239, 68, 68, 0.15)'
                e.target.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.4)'
              }}
              onMouseLeave={e => {
                e.target.style.background = 'transparent'
                e.target.style.boxShadow = 'none'
              }}
            >
              LOGOUT
            </motion.button>
          </>
        ) : (
          <>
            <NavLink to="/login" current={location.pathname}>LOGIN</NavLink>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                style={{ fontSize: '8px', padding: '10px 20px' }}
              >
                SIGN UP
              </motion.button>
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  )
}

// Helper component
const NavLink = ({ to, current, children }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <motion.span
      whileHover={{ scale: 1.1 }}
      style={{
        fontFamily: 'var(--font-game)',
        fontSize: '9px',
        color: current === to ? 'var(--purple-secondary)' : 'var(--text-secondary)',
        letterSpacing: '1px',
        cursor: 'pointer',
        transition: 'color 0.3s ease',
        textShadow: current === to ? '0 0 10px var(--purple-secondary)' : 'none',
      }}
    >
      {children}
    </motion.span>
  </Link>
)

export default Navbar