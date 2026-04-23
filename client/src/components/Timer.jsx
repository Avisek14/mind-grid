
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Timer = ({ duration, onComplete, label }) => {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete()
      return
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, onComplete])

  const percentage = (timeLeft / duration) * 100
  const color = timeLeft <= 2
    ? '#ef4444'
    : timeLeft <= Math.ceil(duration / 2)
    ? '#eab308'
    : '#22c55e'

  return (
    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
      <p style={{
        fontFamily: 'var(--font-game)',
        fontSize: '9px',
        color: 'var(--text-secondary)',
        letterSpacing: '2px',
        marginBottom: '10px',
      }}>
        {label}
      </p>

      {/* Timer bar */}
      <div style={{
        width: '300px',
        height: '8px',
        background: 'var(--bg-secondary)',
        borderRadius: '4px',
        margin: '0 auto 10px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
      }}>
        <motion.div
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          style={{
            height: '100%',
            background: color,
            borderRadius: '4px',
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>

      {/* Number countdown */}
      <motion.div
        key={timeLeft}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          fontFamily: 'var(--font-game)',
          fontSize: '32px',
          color: color,
          textShadow: `0 0 20px ${color}`,
        }}
      >
        {timeLeft}
      </motion.div>
    </div>
  )
}

export default Timer