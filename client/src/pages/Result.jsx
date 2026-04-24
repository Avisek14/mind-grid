import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { getHistoryAPI } from '../services/api'

const Result = () => {
  // ✅ isGuest add kiya — baaki sab same
  const { gameResult, timeTaken, difficulty, selectedOrder, resetGame, user, isGuest } = useGame()
  const navigate = useNavigate()
  const [lastGame, setLastGame] = useState(null)

  useEffect(() => {
    // Agar result nahi hai toh home bhejo
    if (!gameResult) {
      navigate('/')
      return
    }
    fetchLastGame()
  }, [])

  const fetchLastGame = async () => {
    // ✅ Guest ka history fetch nahi hoga
    if (isGuest) return
    try {
      const res = await getHistoryAPI()
      if (res.data.scores.length > 0) {
        setLastGame(res.data.scores[0])
      }
    } catch (e) {
      console.log('History fetch error:', e)
    }
  }

  const handlePlayAgain = () => {
    resetGame()
    navigate('/game')
  }

  const handleHome = () => {
    resetGame()
    navigate('/')
  }

  const isWin = gameResult === 'win'

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 20px 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundImage: `
          linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Win confetti particles */}
      {isWin && <WinParticles />}

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '500px' }}>

        {/* Result Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, delay: 0.1 }}
          style={{ textAlign: 'center', marginBottom: '24px' }}
        >
          <motion.div
            animate={isWin ? {
              scale: [1, 1.15, 1],
              filter: [
                'drop-shadow(0 0 20px rgba(34,197,94,0.6))',
                'drop-shadow(0 0 40px rgba(34,197,94,0.9))',
                'drop-shadow(0 0 20px rgba(34,197,94,0.6))',
              ]
            } : {
              scale: [1, 1.05, 1],
              filter: [
                'drop-shadow(0 0 20px rgba(239,68,68,0.6))',
                'drop-shadow(0 0 40px rgba(239,68,68,0.9))',
                'drop-shadow(0 0 20px rgba(239,68,68,0.6))',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '80px', lineHeight: 1 }}
          >
            {isWin ? '🏆' : '💀'}
          </motion.div>
        </motion.div>

        {/* Result Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: 'center', marginBottom: '32px' }}
        >
          <h1 style={{
            fontFamily: 'var(--font-game)',
            fontSize: 'clamp(18px, 4vw, 28px)',
            background: isWin
              ? 'linear-gradient(135deg, #22c55e, #06b6d4)'
              : 'linear-gradient(135deg, #ef4444, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: isWin
              ? 'drop-shadow(0 0 15px rgba(34,197,94,0.6))'
              : 'drop-shadow(0 0 15px rgba(239,68,68,0.6))',
            marginBottom: '12px',
            letterSpacing: '3px',
          }}>
            {isWin ? 'CONGRATULATIONS!' : 'GAME OVER!'}
          </h1>

          <p style={{
            fontFamily: 'var(--font-game)',
            fontSize: '9px',
            color: 'var(--text-secondary)',
            letterSpacing: '2px',
            lineHeight: 1.8,
          }}>
            {isWin
              ? `AMAZING! YOU CRUSHED ${difficulty.toUpperCase()} MODE! 🔥`
              : `DON'T GIVE UP! LEGENDS NEVER QUIT! 💪`
            }
          </p>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
          style={{
            border: `1px solid ${isWin ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'}`,
            boxShadow: isWin
              ? '0 0 30px rgba(34,197,94,0.15)'
              : '0 0 30px rgba(239,68,68,0.15)',
            marginBottom: '24px',
            padding: '28px',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
          }}>
            {[
              {
                label: 'RESULT',
                value: isWin ? '✅ WIN' : '❌ LOSE',
                color: isWin ? '#22c55e' : '#ef4444',
              },
              {
                label: 'TIME',
                value: `${timeTaken}s`,
                color: 'var(--cyan-accent)',
              },
              {
                label: 'DIFFICULTY',
                value: difficulty.toUpperCase(),
                color: difficulty === 'easy'
                  ? '#22c55e'
                  : difficulty === 'moderate'
                  ? '#eab308' : '#ef4444',
              },
              {
                label: 'ORDER',
                value: selectedOrder
                  ? selectedOrder === 'ascending' ? '⬆️ ASC' : '⬇️ DESC'
                  : 'N/A',
                color: 'var(--purple-secondary)',
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                style={{
                  textAlign: 'center',
                  padding: '16px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-game)',
                  fontSize: '7px',
                  color: 'var(--text-muted)',
                  letterSpacing: '2px',
                  marginBottom: '8px',
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-game)',
                  fontSize: 'clamp(11px, 2vw, 14px)',
                  color: stat.color,
                  textShadow: `0 0 10px ${stat.color}`,
                }}>
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Win message */}
          {isWin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{
                marginTop: '20px',
                padding: '14px',
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: '10px',
                textAlign: 'center',
                fontFamily: 'var(--font-game)',
                fontSize: '8px',
                color: '#22c55e',
                letterSpacing: '1px',
                lineHeight: 1.8,
              }}
            >
              {/* ✅ Guest ke liye NOT SAVED message */}
              {isGuest ? (
                <>👻 GUEST MODE — SCORE NOT SAVED!<br />CREATE AN ACCOUNT TO SAVE SCORES! 🎯</>
              ) : (
                <>🎯 SCORE SAVED TO LEADERBOARD!<br />CAN YOU DO IT FASTER? 🚀</>
              )}
            </motion.div>
          )}

          {/* Lose message */}
          {!isWin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{
                marginTop: '20px',
                padding: '14px',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '10px',
                textAlign: 'center',
                fontFamily: 'var(--font-game)',
                fontSize: '8px',
                color: '#ef4444',
                letterSpacing: '1px',
                lineHeight: 1.8,
              }}
            >
              {/* ✅ Guest ke liye NOT SAVED message */}
              {isGuest ? (
                <>👻 GUEST MODE — SCORE NOT SAVED!<br />CREATE AN ACCOUNT TO SAVE SCORES! 🎯</>
              ) : (
                <>💡 TIP: FOCUS ON NUMBER POSITIONS<br />BEFORE THE TIMER RUNS OUT! 🧠</>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(124,58,237,0.7)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handlePlayAgain}
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              border: 'none',
              borderRadius: '10px',
              padding: '16px 32px',
              fontFamily: 'var(--font-game)',
              fontSize: '10px',
              color: 'white',
              cursor: 'pointer',
              letterSpacing: '2px',
              boxShadow: '0 0 20px rgba(124,58,237,0.4)',
            }}
          >
            🔄 PLAY AGAIN
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/leaderboard')}
            style={{
              background: 'transparent',
              border: '2px solid rgba(234,179,8,0.6)',
              borderRadius: '10px',
              padding: '16px 32px',
              fontFamily: 'var(--font-game)',
              fontSize: '10px',
              color: '#eab308',
              cursor: 'pointer',
              letterSpacing: '2px',
            }}
          >
            🏆 LEADERBOARD
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleHome}
            style={{
              background: 'transparent',
              border: '2px solid var(--border-color)',
              borderRadius: '10px',
              padding: '16px 32px',
              fontFamily: 'var(--font-game)',
              fontSize: '10px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              letterSpacing: '2px',
            }}
          >
            🏠 HOME
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

// Win confetti particles
const WinParticles = () => (
  <div style={{
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    pointerEvents: 'none',
    zIndex: 0,
    overflow: 'hidden',
  }}>
    {[...Array(40)].map((_, i) => (
      <motion.div
        key={i}
        initial={{
          y: -20,
          x: `${Math.random() * 100}vw`,
          rotate: 0,
          opacity: 1,
        }}
        animate={{
          y: '110vh',
          rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
          opacity: [1, 1, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 3,
          delay: Math.random() * 2,
          ease: 'easeIn',
          repeat: Infinity,
          repeatDelay: Math.random() * 3,
        }}
        style={{
          position: 'absolute',
          width: `${6 + Math.random() * 8}px`,
          height: `${6 + Math.random() * 8}px`,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          background: ['#a855f7', '#3b82f6', '#22c55e', '#eab308', '#06b6d4'][
            Math.floor(Math.random() * 5)
          ],
        }}
      />
    ))}
  </div>
)

export default Result