import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const { user, logoutUser, isGuest, loginAsGuest, exitGuest } = useGame()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logoutUser()
    navigate('/')
    setMenuOpen(false)
  }

  const handleGuestExit = () => {
    loginAsGuest(false)
    navigate('/login')
    setMenuOpen(false)
  }

  // ✅ NEW — Guest play handler
  const handleGuestPlay = () => {
    loginAsGuest()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          background: 'rgba(10, 10, 15, 0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(124, 58, 237, 0.3)',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* LOGO */}
        <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: 'var(--font-game)',
              fontSize: 'clamp(11px, 3vw, 16px)',
              background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))',
            }}
          >
            🧠 MINDGRID
          </motion.div>
        </Link>

        {/* DESKTOP LINKS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">

          {/* ✅ HOME button — desktop */}
          <NavLink to="/" current={location.pathname}>
            🏠 HOME
          </NavLink>

          <NavLink to="/leaderboard" current={location.pathname}>
            🏆 LEADERBOARD
          </NavLink>

          {user ? (
            <>
              <span style={{
                fontFamily: 'var(--font-main)',
                fontSize: '11px',
                color: 'var(--cyan-accent)',
                letterSpacing: '1px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '120px',
              }}>
                👾 {user.name.toUpperCase()}
              </span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--red-wrong)',
                  color: 'var(--red-wrong)',
                  padding: '8px 16px',
                  fontFamily: 'var(--font-game)',
                  fontSize: '7px',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  letterSpacing: '1px',
                  whiteSpace: 'nowrap',
                }}
              >
                LOGOUT
              </motion.button>
            </>
          ) : isGuest ? (
            <>
              <span style={{
                fontFamily: 'var(--font-game)',
                fontSize: '9px',
                color: 'var(--cyan-accent)',
                letterSpacing: '1px',
                background: 'rgba(6,182,212,0.1)',
                border: '1px solid rgba(6,182,212,0.3)',
                padding: '6px 12px',
                borderRadius: '20px',
                whiteSpace: 'nowrap',
              }}>
                👻 GUEST
              </span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGuestExit}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--purple-secondary)',
                  color: 'var(--purple-secondary)',
                  padding: '8px 16px',
                  fontFamily: 'var(--font-game)',
                  fontSize: '7px',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  letterSpacing: '1px',
                  whiteSpace: 'nowrap',
                }}
              >
                LOGIN
              </motion.button>
            </>
          ) : (
            <>
              <NavLink to="/login" current={location.pathname}>LOGIN</NavLink>

              {/* ✅ NEW — Guest button desktop */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 15px rgba(6,182,212,0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGuestPlay}
                style={{
                  background: 'rgba(6,182,212,0.1)',
                  border: '1px dashed rgba(6,182,212,0.5)',
                  color: 'var(--cyan-accent)',
                  padding: '8px 16px',
                  fontFamily: 'var(--font-game)',
                  fontSize: '7px',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  letterSpacing: '1px',
                  whiteSpace: 'nowrap',
                }}
              >
                👻 GUEST
              </motion.button>

              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                  style={{ fontSize: '7px', padding: '10px 18px' }}
                >
                  SIGN UP
                </motion.button>
              </Link>
            </>
          )}
        </div>

        {/* HAMBURGER — Mobile only */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger-btn"
          style={{
            background: 'transparent',
            border: '1px solid rgba(124,58,237,0.5)',
            borderRadius: '8px',
            padding: '8px 10px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={menuOpen ? {
                rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                y: i === 0 ? 10 : i === 2 ? -10 : 0,
                opacity: i === 1 ? 0 : 1,
              } : { rotate: 0, y: 0, opacity: 1 }}
              style={{
                width: '22px',
                height: '2px',
                background: 'var(--purple-secondary)',
                borderRadius: '2px',
              }}
            />
          ))}
        </motion.button>
      </motion.nav>

      {/* MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '58px',
              left: 0, right: 0,
              zIndex: 999,
              background: 'rgba(10, 10, 15, 0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(124,58,237,0.3)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Guest badge — mobile */}
            {isGuest && (
              <div style={{
                fontFamily: 'var(--font-game)',
                fontSize: '9px',
                color: 'var(--cyan-accent)',
                letterSpacing: '2px',
                padding: '12px 16px',
                background: 'rgba(6,182,212,0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(6,182,212,0.2)',
              }}>
                👻 GUEST MODE
              </div>
            )}

            {user && (
              <div style={{
                fontFamily: 'var(--font-game)',
                fontSize: '9px',
                color: 'var(--cyan-accent)',
                letterSpacing: '2px',
                padding: '12px 16px',
                background: 'rgba(6,182,212,0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(6,182,212,0.2)',
              }}>
                👾 {user.name.toUpperCase()}
              </div>
            )}

            {/* ✅ HOME button — hamburger */}
            <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
              <motion.div
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: 'var(--font-game)',
                  fontSize: '9px',
                  color: location.pathname === '/' ? 'var(--purple-secondary)' : 'var(--text-secondary)',
                  letterSpacing: '2px',
                  padding: '14px 16px',
                  background: 'var(--bg-card)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                }}
              >
                🏠 HOME
              </motion.div>
            </Link>

            <Link to="/leaderboard" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
              <motion.div
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: 'var(--font-game)',
                  fontSize: '9px',
                  color: location.pathname === '/leaderboard' ? 'var(--purple-secondary)' : 'var(--text-secondary)',
                  letterSpacing: '2px',
                  padding: '14px 16px',
                  background: 'var(--bg-card)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                }}
              >
                🏆 LEADERBOARD
              </motion.div>
            </Link>

            {user ? (
              <>
                <motion.button whileTap={{ scale: 0.98 }} onClick={handleLogout} style={{
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)',
                  borderRadius: '8px', padding: '14px 16px', fontFamily: 'var(--font-game)',
                  fontSize: '9px', color: 'var(--red-wrong)', cursor: 'pointer',
                  letterSpacing: '2px', textAlign: 'left', width: '100%',
                }}>
                  🚪 LOGOUT
                </motion.button>
              </>
            ) : isGuest ? (
              <motion.button whileTap={{ scale: 0.98 }} onClick={handleGuestExit} style={{
                background: 'linear-gradient(135deg, #7c3aed, #2563eb)', border: 'none',
                borderRadius: '8px', padding: '14px 16px', fontFamily: 'var(--font-game)',
                fontSize: '9px', color: 'white', cursor: 'pointer',
                letterSpacing: '2px', textAlign: 'center', width: '100%',
              }}>
                🔐 LOGIN / SIGN UP
              </motion.button>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                  <motion.div whileTap={{ scale: 0.98 }} style={{
                    fontFamily: 'var(--font-game)', fontSize: '9px',
                    color: 'var(--text-secondary)', letterSpacing: '2px',
                    padding: '14px 16px', background: 'var(--bg-card)',
                    borderRadius: '8px', border: '1px solid var(--border-color)',
                  }}>
                    🔐 LOGIN
                  </motion.div>
                </Link>

                {/* ✅ NEW — Guest button hamburger menu */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGuestPlay}
                  style={{
                    background: 'rgba(6,182,212,0.1)',
                    border: '1px dashed rgba(6,182,212,0.5)',
                    borderRadius: '8px',
                    padding: '14px 16px',
                    fontFamily: 'var(--font-game)',
                    fontSize: '9px',
                    color: 'var(--cyan-accent)',
                    cursor: 'pointer',
                    letterSpacing: '2px',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  👻 PLAY AS GUEST
                </motion.button>

                <Link to="/signup" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                  <motion.div whileTap={{ scale: 0.98 }} style={{
                    fontFamily: 'var(--font-game)', fontSize: '9px', color: 'white',
                    letterSpacing: '2px', padding: '14px 16px',
                    background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                    borderRadius: '8px', textAlign: 'center',
                    boxShadow: '0 0 15px rgba(124,58,237,0.4)',
                  }}>
                    👾 SIGN UP
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const NavLink = ({ to, current, children }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <motion.span
      whileHover={{ scale: 1.1 }}
      style={{
        fontFamily: 'var(--font-game)',
        fontSize: '8px',
        color: current === to ? 'var(--purple-secondary)' : 'var(--text-secondary)',
        letterSpacing: '1px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        textShadow: current === to ? '0 0 10px var(--purple-secondary)' : 'none',
      }}
    >
      {children}
    </motion.span>
  </Link>
)

export default Navbar