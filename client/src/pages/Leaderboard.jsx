
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { getLeaderboardAPI } from '../services/api'

const difficulties = ['all', 'easy', 'moderate', 'hard']

const diffColor = {
  easy: '#22c55e',
  moderate: '#eab308',
  hard: '#ef4444',
  all: '#a855f7',
}

const Leaderboard = () => {
  const [selected, setSelected] = useState('all')
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchLeaderboard()
  }, [selected])

  const fetchLeaderboard = async () => {
    setLoading(true)
    try {
      const res = await getLeaderboardAPI(selected === 'all' ? '' : selected)
      setScores(res.data.leaderboard)
    } catch (e) {
      console.log('Leaderboard error:', e)
    } finally {
      setLoading(false)
    }
  }

  const getRankStyle = (rank) => {
    if (rank === 1) return { color: '#FFD700', icon: '🥇' }
    if (rank === 2) return { color: '#C0C0C0', icon: '🥈' }
    if (rank === 3) return { color: '#CD7F32', icon: '🥉' }
    return { color: 'var(--text-muted)', icon: `#${rank}` }
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '100px 20px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
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

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '640px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <motion.div
            animate={{
              filter: [
                'drop-shadow(0 0 15px rgba(234,179,8,0.5))',
                'drop-shadow(0 0 30px rgba(234,179,8,0.9))',
                'drop-shadow(0 0 15px rgba(234,179,8,0.5))',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '56px', marginBottom: '16px' }}
          >
            🏆
          </motion.div>

          <h1 style={{
            fontFamily: 'var(--font-game)',
            fontSize: 'clamp(16px, 4vw, 24px)',
            background: 'linear-gradient(135deg, #eab308, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '4px',
            marginBottom: '8px',
          }}>
            LEADERBOARD
          </h1>
          <p style={{
            fontFamily: 'var(--font-game)',
            fontSize: '8px',
            color: 'var(--text-muted)',
            letterSpacing: '2px',
          }}>
            TOP 10 FASTEST PLAYERS
          </p>
        </motion.div>

        {/* Difficulty Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
          }}
        >
          {difficulties.map(diff => (
            <motion.button
              key={diff}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(diff)}
              style={{
                background: selected === diff
                  ? `rgba(${diff === 'easy' ? '34,197,94' : diff === 'moderate' ? '234,179,8' : diff === 'hard' ? '239,68,68' : '168,85,247'}, 0.2)`
                  : 'var(--bg-card)',
                border: `2px solid ${selected === diff ? diffColor[diff] : 'var(--border-color)'}`,
                borderRadius: '20px',
                padding: '8px 20px',
                fontFamily: 'var(--font-game)',
                fontSize: '8px',
                color: selected === diff ? diffColor[diff] : 'var(--text-muted)',
                cursor: 'pointer',
                letterSpacing: '1px',
                boxShadow: selected === diff
                  ? `0 0 15px ${diffColor[diff]}40`
                  : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {diff.toUpperCase()}
            </motion.button>
          ))}
        </motion.div>

        {/* Scores List */}
        {loading ? (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-game)',
              fontSize: '10px',
              color: 'var(--text-muted)',
              letterSpacing: '2px',
              padding: '60px 0',
            }}
          >
            LOADING...
          </motion.div>
        ) : scores.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '60px 20px',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎮</div>
            <p style={{
              fontFamily: 'var(--font-game)',
              fontSize: '9px',
              color: 'var(--text-muted)',
              letterSpacing: '2px',
              lineHeight: 2,
            }}>
              NO SCORES YET!<br />BE THE FIRST TO PLAY!
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {scores.map((score, i) => {
                const rank = getRankStyle(score.rank)
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    style={{
                      background: score.rank <= 3
                        ? `rgba(${score.rank === 1 ? '255,215,0' : score.rank === 2 ? '192,192,192' : '205,127,50'}, 0.07)`
                        : 'var(--bg-card)',
                      border: `1px solid ${score.rank <= 3 ? rank.color + '40' : 'var(--border-color)'}`,
                      borderRadius: '14px',
                      padding: '18px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      boxShadow: score.rank <= 3
                        ? `0 0 20px ${rank.color}20`
                        : 'none',
                    }}
                  >
                    {/* Rank */}
                    <div style={{
                      fontFamily: 'var(--font-game)',
                      fontSize: score.rank <= 3 ? '24px' : '12px',
                      color: rank.color,
                      minWidth: '40px',
                      textAlign: 'center',
                      textShadow: score.rank <= 3 ? `0 0 10px ${rank.color}` : 'none',
                    }}>
                      {rank.icon}
                    </div>

                    {/* Player info */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: 'var(--font-game)',
                        fontSize: '11px',
                        color: score.rank <= 3 ? rank.color : 'var(--text-primary)',
                        letterSpacing: '1px',
                        marginBottom: '4px',
                      }}>
                        {score.playerName.toUpperCase()}
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-game)',
                          fontSize: '7px',
                          color: diffColor[score.difficulty],
                          letterSpacing: '1px',
                        }}>
                          {score.difficulty.toUpperCase()}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-game)',
                          fontSize: '7px',
                          color: 'var(--text-muted)',
                        }}>
                          {score.order === 'ascending' ? '⬆️ ASC' : '⬇️ DESC'}
                        </span>
                      </div>
                    </div>

                    {/* Time */}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontFamily: 'var(--font-game)',
                        fontSize: '16px',
                        color: 'var(--cyan-accent)',
                        textShadow: '0 0 10px var(--cyan-accent)',
                        marginBottom: '4px',
                      }}>
                        {score.timeTaken}s
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-game)',
                        fontSize: '7px',
                        color: 'var(--text-muted)',
                      }}>
                        {new Date(score.date).toLocaleDateString()}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Play button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '40px' }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(124,58,237,0.7)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/')}
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              border: 'none',
              borderRadius: '10px',
              padding: '16px 40px',
              fontFamily: 'var(--font-game)',
              fontSize: '10px',
              color: 'white',
              cursor: 'pointer',
              letterSpacing: '2px',
              boxShadow: '0 0 20px rgba(124,58,237,0.4)',
            }}
          >
            🎮 PLAY NOW
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default Leaderboard