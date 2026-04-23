
import { motion, AnimatePresence } from 'framer-motion'

const Popup = ({ isOpen, onSelect }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              width: '100%', height: '100%',
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 100,
            }}
          />

          {/* Outer wrapper — full screen centering */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: 'spring', damping: 15 }}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 101,
              padding: '20px',
              boxSizing: 'border-box',
            }}
          >
            {/* Inner card */}
            <div style={{
              background: 'var(--bg-card)',
              border: '2px solid rgba(124, 58, 237, 0.6)',
              borderRadius: '20px',
              padding: 'clamp(20px, 5vw, 40px)',
              textAlign: 'center',
              boxShadow: '0 0 60px rgba(124, 58, 237, 0.4)',
              width: '100%',
              maxWidth: '380px',
              boxSizing: 'border-box',
            }}>

              {/* Title */}
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontFamily: 'var(--font-game)',
                  fontSize: 'clamp(8px, 2.5vw, 11px)',
                  color: 'var(--cyan-accent)',
                  letterSpacing: '3px',
                  marginBottom: '10px',
                }}
              >
                CHOOSE YOUR ORDER
              </motion.div>

              <p style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(11px, 3vw, 13px)',
                color: 'var(--text-secondary)',
                marginBottom: '24px',
                lineHeight: 1.6,
              }}>
                Select the order you want to<br />
                click the numbers in!
              </p>

              {/* Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>

                {/* Ascending */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelect('ascending')}
                  style={{
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: 'clamp(14px, 3vw, 20px) clamp(16px, 4vw, 28px)',
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)',
                    flex: '1',
                    minWidth: '120px',
                    maxWidth: '160px',
                  }}
                >
                  <div style={{
                    fontSize: 'clamp(20px, 5vw, 28px)',
                    marginBottom: '8px',
                  }}>
                    ⬆️
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-game)',
                    fontSize: 'clamp(7px, 2vw, 9px)',
                    color: 'white',
                    letterSpacing: '1px',
                    marginBottom: '6px',
                  }}>
                    ASCENDING
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(10px, 2.5vw, 12px)',
                    color: 'rgba(255,255,255,0.8)',
                  }}>
                    1 → 2 → 3...
                  </div>
                </motion.button>

                {/* Descending */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelect('descending')}
                  style={{
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: 'clamp(14px, 3vw, 20px) clamp(16px, 4vw, 28px)',
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)',
                    flex: '1',
                    minWidth: '120px',
                    maxWidth: '160px',
                  }}
                >
                  <div style={{
                    fontSize: 'clamp(20px, 5vw, 28px)',
                    marginBottom: '8px',
                  }}>
                    ⬇️
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-game)',
                    fontSize: 'clamp(7px, 2vw, 9px)',
                    color: 'white',
                    letterSpacing: '1px',
                    marginBottom: '6px',
                  }}>
                    DESCENDING
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(10px, 2.5vw, 12px)',
                    color: 'rgba(255,255,255,0.8)',
                  }}>
                    10 → 9 → 8...
                  </div>
                </motion.button>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Popup