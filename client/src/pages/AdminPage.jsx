import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { getFeedbackAPI, getAdminStatsAPI, deleteFeedbackAPI } from '../services/api'

const ADMIN_EMAIL = 'sahoo143avisek@gmail.com'

const AdminPage = () => {
  const { user } = useGame()
  const navigate = useNavigate()

  const [feedbacks, setFeedbacks] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [activeTab, setActiveTab] = useState('feedbacks')

  // Admin check — sirf tumhara email allowed
  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) {
      navigate('/')
      return
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [feedbackRes, statsRes] = await Promise.all([
        getFeedbackAPI(),
        getAdminStatsAPI(),
      ])
      setFeedbacks(feedbackRes.data.feedbacks)
      setStats(statsRes.data.stats)
    } catch (e) {
      console.log('Admin fetch error:', e)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setDeleteLoading(id)
    try {
      await deleteFeedbackAPI(id)
      setFeedbacks(prev => prev.filter(f => f._id !== id))
    } catch (e) {
      console.log('Delete error:', e)
    } finally {
      setDeleteLoading(null)
    }
  }

  const starDisplay = (rating) => '⭐'.repeat(rating)

  const diffColor = {
    easy: '#22c55e',
    moderate: '#eab308',
    hard: '#ef4444',
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          fontFamily: 'var(--font-game)',
          fontSize: '12px',
          color: 'var(--purple-secondary)',
          letterSpacing: '3px',
        }}
      >
        LOADING...
      </motion.p>
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      padding: '100px 20px 40px',
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

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '900px',
        margin: '0 auto',
      }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h1 style={{
            fontFamily: 'var(--font-game)',
            fontSize: 'clamp(16px, 4vw, 24px)',
            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '4px',
            marginBottom: '8px',
          }}>
            🛡️ ADMIN PANEL
          </h1>
          <p style={{
            fontFamily: 'var(--font-game)',
            fontSize: '8px',
            color: 'var(--cyan-accent)',
            letterSpacing: '2px',
          }}>
            WELCOME, {user?.name?.toUpperCase()} 👑
          </p>
        </motion.div>

        {/* ===== STATS SECTION ===== */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ marginBottom: '32px' }}
          >
            <p style={{
              fontFamily: 'var(--font-game)',
              fontSize: '8px',
              color: 'var(--text-secondary)',
              letterSpacing: '3px',
              marginBottom: '16px',
            }}>
              — GAME STATS —
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px',
              marginBottom: '24px',
            }}>
              {[
                { label: 'TOTAL USERS', value: stats.totalUsers, color: '#a855f7', icon: '👥' },
                { label: 'TOTAL GAMES', value: stats.totalGames, color: '#3b82f6', icon: '🎮' },
                { label: 'TOTAL WINS', value: stats.totalWins, color: '#22c55e', icon: '🏆' },
                { label: 'TOTAL LOSES', value: stats.totalLoses, color: '#ef4444', icon: '💀' },
                { label: 'FEEDBACKS', value: stats.totalFeedbacks, color: '#eab308', icon: '💬' },
                { label: 'AVG RATING', value: `${stats.avgRating}⭐`, color: '#eab308', icon: '✨' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  whileHover={{ y: -4 }}
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${stat.color}40`,
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center',
                    boxShadow: `0 0 15px ${stat.color}15`,
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
                  <div style={{
                    fontFamily: 'var(--font-game)',
                    fontSize: '18px',
                    color: stat.color,
                    textShadow: `0 0 10px ${stat.color}`,
                    marginBottom: '4px',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-game)',
                    fontSize: '6px',
                    color: 'var(--text-muted)',
                    letterSpacing: '1px',
                  }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Difficulty Breakdown */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px',
            }}>
              <p style={{
                fontFamily: 'var(--font-game)',
                fontSize: '8px',
                color: 'var(--text-secondary)',
                letterSpacing: '2px',
                marginBottom: '16px',
              }}>
                DIFFICULTY BREAKDOWN
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'EASY', value: stats.difficultyBreakdown.easy, color: '#22c55e' },
                  { label: 'MODERATE', value: stats.difficultyBreakdown.moderate, color: '#eab308' },
                  { label: 'HARD', value: stats.difficultyBreakdown.hard, color: '#ef4444' },
                ].map((diff, i) => {
                  const total = stats.totalGames || 1
                  const percent = Math.round((diff.value / total) * 100)
                  return (
                    <div key={i}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '6px',
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-game)',
                          fontSize: '7px',
                          color: diff.color,
                          letterSpacing: '1px',
                        }}>
                          {diff.label}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-game)',
                          fontSize: '7px',
                          color: 'var(--text-muted)',
                        }}>
                          {diff.value} games ({percent}%)
                        </span>
                      </div>
                      <div style={{
                        height: '6px',
                        background: 'var(--bg-secondary)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          style={{
                            height: '100%',
                            background: diff.color,
                            borderRadius: '3px',
                            boxShadow: `0 0 8px ${diff.color}`,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== FEEDBACKS SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p style={{
            fontFamily: 'var(--font-game)',
            fontSize: '8px',
            color: 'var(--text-secondary)',
            letterSpacing: '3px',
            marginBottom: '16px',
          }}>
            — PLAYER FEEDBACKS ({feedbacks.length}) —
          </p>

          {feedbacks.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
              <p style={{
                fontFamily: 'var(--font-game)',
                fontSize: '9px',
                color: 'var(--text-muted)',
                letterSpacing: '2px',
              }}>
                NO FEEDBACKS YET!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <AnimatePresence>
                {feedbacks.map((fb, i) => (
                  <motion.div
                    key={fb._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '20px',
                    }}
                  >
                    {/* Top row */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '12px',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}>
                      {/* Player info */}
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-game)',
                          fontSize: '10px',
                          color: 'var(--cyan-accent)',
                          letterSpacing: '1px',
                          marginBottom: '4px',
                        }}>
                          👾 {fb.playerName?.toUpperCase()}
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-game)',
                          fontSize: '7px',
                          color: 'var(--text-muted)',
                          letterSpacing: '1px',
                        }}>
                          {new Date(fb.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit',
                          })}
                        </p>
                      </div>

                      {/* Right side — rating + delete */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}>
                        {/* Stars */}
                        <span style={{ fontSize: '14px' }}>
                          {starDisplay(fb.rating)}
                        </span>

                        {/* Delete button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(fb._id)}
                          disabled={deleteLoading === fb._id}
                          style={{
                            background: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.4)',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontFamily: 'var(--font-game)',
                            fontSize: '7px',
                            color: 'var(--red-wrong)',
                            cursor: deleteLoading === fb._id ? 'not-allowed' : 'pointer',
                            letterSpacing: '1px',
                            opacity: deleteLoading === fb._id ? 0.5 : 1,
                          }}
                        >
                          {deleteLoading === fb._id ? '...' : '🗑️ DELETE'}
                        </motion.button>
                      </div>
                    </div>

                    {/* Tags */}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      marginBottom: '12px',
                      flexWrap: 'wrap',
                    }}>
                      {fb.difficulty && (
                        <span style={{
                          fontFamily: 'var(--font-game)',
                          fontSize: '6px',
                          color: diffColor[fb.difficulty],
                          background: `${diffColor[fb.difficulty]}15`,
                          border: `1px solid ${diffColor[fb.difficulty]}40`,
                          borderRadius: '20px',
                          padding: '3px 10px',
                          letterSpacing: '1px',
                        }}>
                          {fb.difficulty.toUpperCase()}
                        </span>
                      )}
                      {fb.result && (
                        <span style={{
                          fontFamily: 'var(--font-game)',
                          fontSize: '6px',
                          color: fb.result === 'win' ? '#22c55e' : '#ef4444',
                          background: fb.result === 'win' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                          border: `1px solid ${fb.result === 'win' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                          borderRadius: '20px',
                          padding: '3px 10px',
                          letterSpacing: '1px',
                        }}>
                          {fb.result === 'win' ? '✅ WIN' : '❌ LOSE'}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <p style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      background: 'var(--bg-secondary)',
                      borderRadius: '8px',
                      padding: '12px',
                      borderLeft: '3px solid rgba(124,58,237,0.5)',
                    }}>
                      "{fb.message}"
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: '40px' }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '14px 32px',
              fontFamily: 'var(--font-game)',
              fontSize: '9px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              letterSpacing: '2px',
            }}
          >
            🏠 BACK TO HOME
          </motion.button>
        </motion.div>

      </div>
    </div>
  )
}

export default AdminPage