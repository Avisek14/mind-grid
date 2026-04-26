import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import Footer from '../components/Footer'

const difficulties = [
  {
    id: 'easy',
    label: 'EASY',
    emoji: '🟢',
    time: '5 SEC',
    desc: 'Numbers visible for 5 seconds',
    color: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.3)',
    border: 'rgba(34, 197, 94, 0.5)',
  },
  {
    id: 'moderate',
    label: 'MODERATE',
    emoji: '🟡',
    time: '3 SEC',
    desc: 'Numbers visible for 3 seconds',
    color: '#eab308',
    glow: 'rgba(234, 179, 8, 0.3)',
    border: 'rgba(234, 179, 8, 0.5)',
  },
  {
    id: 'hard',
    label: 'HARD',
    emoji: '🔴',
    time: '1 SEC',
    desc: 'Numbers visible for 1 second',
    color: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.3)',
    border: 'rgba(239, 68, 68, 0.5)',
  },
]

const Home = () => {
  const { user, difficulty, setDifficulty, resetGame, isGuest, loginAsGuest } = useGame()
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  const handleStartGame = () => {
    if (!user && !isGuest) {
      navigate('/login')
      return
    }
    resetGame()
    navigate('/game')
  }

  const handlePlayAsGuest = () => {
    loginAsGuest()
    resetGame()
    navigate('/game')
  }

  return (
    // ✅ FIX — Outer wrapper, Footer bahar hai
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>

      <BackgroundGrid />
      <FloatingParticles />

      {/* ===== MAIN CONTENT ===== */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 20px 40px',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* ===== HERO TITLE ===== */}
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: '16px', position: 'relative', zIndex: 1 }}
        >
          <motion.h1
            animate={{
              textShadow: [
                '0 0 20px rgba(168,85,247,0.8), 0 0 40px rgba(168,85,247,0.4)',
                '0 0 30px rgba(168,85,247,1), 0 0 60px rgba(168,85,247,0.6)',
                '0 0 20px rgba(168,85,247,0.8), 0 0 40px rgba(168,85,247,0.4)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontFamily: 'var(--font-game)',
              fontSize: 'clamp(28px, 6vw, 56px)',
              background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '4px',
              lineHeight: 1.3,
              marginBottom: '16px',
            }}
          >
            🧠 MINDGRID
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              fontFamily: 'var(--font-game)',
              fontSize: 'clamp(8px, 1.5vw, 11px)',
              color: 'var(--cyan-accent)',
              letterSpacing: '4px',
              marginBottom: '8px',
            }}
          >
            MEMORY & LOGIC CHALLENGE
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #a855f7, #3b82f6, transparent)',
              margin: '0 auto',
              width: '300px',
            }}
          />
        </motion.div>

        {/* ===== HOW TO PLAY ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'flex',
            gap: '24px',
            marginBottom: '48px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {[
            { icon: '👁️', text: 'MEMORIZE THE GRID' },
            { icon: '🙈', text: 'NUMBERS DISAPPEAR' },
            { icon: '🔢', text: 'RECALL IN ORDER' },
            { icon: '🏆', text: 'BEAT YOUR TIME' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(124, 58, 237, 0.1)',
                border: '1px solid rgba(124, 58, 237, 0.25)',
                borderRadius: '20px',
                padding: '8px 16px',
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <span style={{
                fontFamily: 'var(--font-game)',
                fontSize: '7px',
                color: 'var(--text-secondary)',
                letterSpacing: '1px',
              }}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== DIFFICULTY SELECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ width: '100%', maxWidth: '700px', position: 'relative', zIndex: 1 }}
        >
          <p style={{
            fontFamily: 'var(--font-game)',
            fontSize: '9px',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            letterSpacing: '3px',
            marginBottom: '20px',
          }}>
            — SELECT DIFFICULTY —
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '40px',
          }}>
            {difficulties.map((diff, i) => (
              <motion.div
                key={diff.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setDifficulty(diff.id)}
                onMouseEnter={() => setHovered(diff.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: difficulty === diff.id
                    ? `rgba(${diff.id === 'easy' ? '34,197,94' : diff.id === 'moderate' ? '234,179,8' : '239,68,68'}, 0.15)`
                    : 'var(--bg-card)',
                  border: `2px solid ${difficulty === diff.id ? diff.color : 'var(--border-color)'}`,
                  borderRadius: '16px',
                  padding: '24px 16px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: difficulty === diff.id ? `0 0 25px ${diff.glow}` : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {difficulty === diff.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      position: 'absolute',
                      top: '10px', right: '10px',
                      width: '10px', height: '10px',
                      borderRadius: '50%',
                      background: diff.color,
                      boxShadow: `0 0 8px ${diff.color}`,
                    }}
                  />
                )}

                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{diff.emoji}</div>

                <div style={{
                  fontFamily: 'var(--font-game)',
                  fontSize: '11px',
                  color: difficulty === diff.id ? diff.color : 'var(--text-primary)',
                  letterSpacing: '2px',
                  marginBottom: '8px',
                }}>
                  {diff.label}
                </div>

                <div style={{
                  fontFamily: 'var(--font-game)',
                  fontSize: '14px',
                  color: diff.color,
                  marginBottom: '8px',
                  textShadow: `0 0 10px ${diff.color}`,
                }}>
                  {diff.time}
                </div>

                <div style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.4,
                }}>
                  {diff.desc}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ===== START BUTTON ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            style={{ textAlign: 'center' }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 50px rgba(124, 58, 237, 0.8)',
              }}
              whileTap={{ scale: 0.97 }}
              onClick={handleStartGame}
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                color: 'white',
                border: 'none',
                padding: '20px 60px',
                fontFamily: 'var(--font-game)',
                fontSize: '14px',
                letterSpacing: '3px',
                cursor: 'pointer',
                borderRadius: '12px',
                boxShadow: '0 0 30px rgba(124, 58, 237, 0.5)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '40%', height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transform: 'skewX(-20deg)',
                }}
              />
              {user || isGuest ? '🎮 START GAME' : '🔐 LOGIN TO PLAY'}
            </motion.button>

            {isGuest && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                style={{
                  fontFamily: 'var(--font-game)',
                  fontSize: '7px',
                  color: 'var(--cyan-accent)',
                  marginTop: '16px',
                  letterSpacing: '1px',
                }}
              >
                👻 GUEST MODE — SCORES WON'T BE SAVED
              </motion.p>
            )}

            {!user && !isGuest && (
              <>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  style={{
                    fontFamily: 'var(--font-game)',
                    fontSize: '7px',
                    color: 'var(--text-muted)',
                    marginTop: '16px',
                    letterSpacing: '1px',
                  }}
                >
                  LOGIN REQUIRED TO SAVE YOUR SCORES
                </motion.p>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handlePlayAsGuest}
                  style={{
                    marginTop: '16px',
                    background: 'transparent',
                    border: '1px solid rgba(6,182,212,0.5)',
                    borderRadius: '12px',
                    padding: '14px 40px',
                    fontFamily: 'var(--font-game)',
                    fontSize: '11px',
                    color: 'var(--cyan-accent)',
                    cursor: 'pointer',
                    letterSpacing: '2px',
                  }}
                >
                  👻 PLAY AS GUEST
                </motion.button>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  style={{
                    fontFamily: 'var(--font-game)',
                    fontSize: '7px',
                    color: 'var(--text-muted)',
                    marginTop: '8px',
                    letterSpacing: '1px',
                  }}
                >
                  SCORES WON'T BE SAVED IN GUEST MODE
                </motion.p>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* ===== GAME STATS STRIP ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: '60px',
            position: 'relative',
            zIndex: 1,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            { label: 'GRID SIZE', value: '4×4' },
            { label: 'NUMBERS', value: '1–10' },
            { label: 'DECOY TILES', value: '6' },
            { label: 'MODES', value: 'ASC / DESC' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontFamily: 'var(--font-game)',
                fontSize: '20px',
                color: 'var(--purple-secondary)',
                textShadow: '0 0 15px rgba(168, 85, 247, 0.6)',
                marginBottom: '6px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-game)',
                fontSize: '7px',
                color: 'var(--text-muted)',
                letterSpacing: '2px',
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
      {/* ===== END MAIN CONTENT ===== */}

      {/* ✅ FIX — Footer bilkul bahar — sirf ek baar render hoga */}
      <Footer />

    </div>
  )
}

const BackgroundGrid = () => (
  <div style={{
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundImage: `
      linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    pointerEvents: 'none',
    zIndex: 0,
  }} />
)

const FloatingParticles = () => (
  <div style={{
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 0,
  }}>
    {[...Array(25)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [0, -40, 0],
          opacity: [0.05, 0.3, 0.05],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 4 + Math.random() * 5,
          repeat: Infinity,
          delay: Math.random() * 6,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${2 + Math.random() * 5}px`,
          height: `${2 + Math.random() * 5}px`,
          borderRadius: '50%',
          background: i % 3 === 0
            ? 'var(--purple-primary)'
            : i % 3 === 1
            ? 'var(--blue-primary)'
            : 'var(--cyan-accent)',
        }}
      />
    ))}
  </div>
)

export default Home