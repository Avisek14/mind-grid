
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { loginAPI } from '../services/api'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginUser } = useGame()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await loginAPI(form)
      loginUser(res.data.user, res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper">
      {/* Floating particles background */}
      <FloatingParticles />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: '420px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <div style={{
            fontFamily: 'var(--font-game)',
            fontSize: '28px',
            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.6))',
            marginBottom: '12px',
          }}>
            🧠 MINDGRID
          </div>
          <p style={{
            fontFamily: 'var(--font-game)',
            fontSize: '10px',
            color: 'var(--text-secondary)',
            letterSpacing: '3px',
          }}>
            PLAYER LOGIN
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="card"
          style={{
            border: '1px solid rgba(124, 58, 237, 0.4)',
            boxShadow: '0 0 40px rgba(124, 58, 237, 0.15)',
            padding: '40px',
          }}
        >
          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid var(--red-wrong)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '24px',
                fontFamily: 'var(--font-game)',
                fontSize: '8px',
                color: 'var(--red-wrong)',
                textAlign: 'center',
                letterSpacing: '1px',
              }}
            >
              ⚠️ {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-game)',
                fontSize: '8px',
                color: 'var(--purple-secondary)',
                marginBottom: '8px',
                letterSpacing: '2px',
              }}>
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="input-field"
                required
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-game)',
                fontSize: '8px',
                color: 'var(--purple-secondary)',
                marginBottom: '8px',
                letterSpacing: '2px',
              }}>
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary"
              disabled={loading}
              style={{
                width: '100%',
                fontSize: '10px',
                padding: '16px',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? '⏳ LOGGING IN...' : '🎮 START PLAYING'}
            </motion.button>
          </form>

          {/* Signup link */}
          <p style={{
            textAlign: 'center',
            marginTop: '24px',
            fontFamily: 'var(--font-game)',
            fontSize: '8px',
            color: 'var(--text-secondary)',
            letterSpacing: '1px',
          }}>
            NEW PLAYER?{' '}
            <Link to="/signup" style={{
              color: 'var(--purple-secondary)',
              textDecoration: 'none',
            }}>
              REGISTER HERE
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Floating particles background effect
const FloatingParticles = () => (
  <div style={{
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 0,
  }}>
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [0, -30, 0],
          opacity: [0.1, 0.4, 0.1],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${2 + Math.random() * 4}px`,
          height: `${2 + Math.random() * 4}px`,
          borderRadius: '50%',
          background: i % 2 === 0 ? 'var(--purple-primary)' : 'var(--blue-primary)',
        }}
      />
    ))}
  </div>
)

export default Login