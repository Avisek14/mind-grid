
import { motion, AnimatePresence } from 'framer-motion'

const Tile = ({ number, isVisible, isRevealed, isCorrect, isWrong, isEmpty, onClick, disabled }) => {

  const getTileStyle = () => {
    if (isWrong) return {
      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
      border: '2px solid #ef4444',
      boxShadow: '0 0 30px rgba(239,68,68,0.8)',
    }
    if (isCorrect) return {
      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
      border: '2px solid #22c55e',
      boxShadow: '0 0 30px rgba(34,197,94,0.8)',
    }
    if (isVisible && !isEmpty) return {
      background: 'linear-gradient(135deg, #1a1a3e, #2d1b69)',
      border: '2px solid rgba(124, 58, 237, 0.8)',
      boxShadow: '0 0 20px rgba(124,58,237,0.5)',
    }
    if (isEmpty) return {
      background: 'var(--bg-card)',
      border: '1px solid rgba(255,255,255,0.05)',
      boxShadow: 'none',
    }
    return {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      boxShadow: 'none',
    }
  }

  return (
    <motion.div
      whileHover={!disabled && !isEmpty ? { scale: 1.06 } : {}}
      whileTap={!disabled ? { scale: 0.94 } : {}}
      onClick={() => !disabled && onClick()}
      style={{
        width: '100%',
        aspectRatio: '1',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled || isEmpty ? 'default' : 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border 0.2s ease, background 0.2s ease',
        willChange: 'transform',
        ...getTileStyle(),
      }}
    >
      {/* Number display */}
      <AnimatePresence mode="wait">
        {(isVisible || isRevealed || isCorrect || isWrong) && !isEmpty && number && (
          <motion.span
            key={`num-${number}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            style={{
              fontFamily: 'var(--font-game)',
              fontSize: 'clamp(16px, 3vw, 24px)',
              color: isCorrect ? 'white' : isWrong ? 'white' : 'var(--purple-secondary)',
              textShadow: isCorrect
                ? '0 0 15px rgba(34,197,94,0.8)'
                : isWrong
                ? '0 0 15px rgba(239,68,68,0.8)'
                : '0 0 15px rgba(168,85,247,0.8)',
              userSelect: 'none',
            }}
          >
            {number}
          </motion.span>
        )}

        {/* Hidden tile dot */}
        {!isVisible && !isRevealed && !isCorrect && !isWrong && !isEmpty && (
          <motion.div
            key="hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'rgba(124,58,237,0.4)',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Tile