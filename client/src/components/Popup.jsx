
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
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 100,
            }}
          />

          {/* Popup box */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 15 }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 101,
              background: 'var(--bg-card)',
              border: '2px solid rgba(124, 58, 237, 0.6)',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: '0 0 60px rgba(124, 58, 237, 0.4)',
              minWidth: '340px',
            }}
          >
            {/* Title */}
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontFamily: 'var(--font-game)',
                fontSize: '11px',
                color: 'var(--cyan-accent)',
                letterSpacing: '3px',
                marginBottom: '12px',
              }}
            >
              CHOOSE YOUR ORDER
            </motion.div>

            <p style={{
              fontFamily: 'var(--font-main)',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              marginBottom: '32px',
              lineHeight: 1.6,
            }}>
              Select the order you want to<br />click the numbers in!
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              {/* Ascending */}
              <motion.button
                whileHover={{ scale: 1.07, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect('ascending')}
                style={{
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '20px 28px',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)',
                  minWidth: '130px',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>⬆️</div>
                <div style={{
                  fontFamily: 'var(--font-game)',
                  fontSize: '9px',
                  color: 'white',
                  letterSpacing: '2px',
                  marginBottom: '6px',
                }}>
                  ASCENDING
                </div>
                <div style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.7)',
                }}>
                  1 → 2 → 3...
                </div>
              </motion.button>

              {/* Descending */}
              <motion.button
                whileHover={{ scale: 1.07, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect('descending')}
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '20px 28px',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)',
                  minWidth: '130px',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>⬇️</div>
                <div style={{
                  fontFamily: 'var(--font-game)',
                  fontSize: '9px',
                  color: 'white',
                  letterSpacing: '2px',
                  marginBottom: '6px',
                }}>
                  DESCENDING
                </div>
                <div style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.7)',
                }}>
                  10 → 9 → 8...
                </div>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Popup