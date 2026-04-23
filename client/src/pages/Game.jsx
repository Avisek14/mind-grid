
import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'
import Grid from '../components/Grid'
import Timer from '../components/Timer'
import Popup from '../components/Popup'
import { saveScoreAPI } from '../services/api'

// Difficulty ke hisaab se visibility time
const DIFFICULTY_TIME = { easy: 5, moderate: 3, hard: 1 }

// 16 tiles generate karo — 10 numbers + 6 empty
const generateTiles = () => {
  const positions = Array(16).fill(null).map((_, i) => i)

  // 10 random positions choose karo numbers ke liye
  const shuffled = positions.sort(() => Math.random() - 0.5)
  const numberPositions = shuffled.slice(0, 10)

  const tiles = Array(16).fill(null).map((_, i) => {
    if (numberPositions.includes(i)) {
      return { number: null, isEmpty: false }
    }
    return { number: null, isEmpty: true }
  })

  // 1-10 numbers randomly assign karo
  const numbers = [1,2,3,4,5,6,7,8,9,10].sort(() => Math.random() - 0.5)
  let numIdx = 0
  tiles.forEach(tile => {
    if (!tile.isEmpty) {
      tile.number = numbers[numIdx++]
    }
  })

  return tiles
}

const Game = () => {
  const { difficulty, setGameResult, setTimeTaken, setSelectedOrder } = useGame()
  const navigate = useNavigate()

  const [tiles, setTiles] = useState([])
  const [phase, setPhase] = useState('memorize')
  const [showPopup, setShowPopup] = useState(false)
  const [order, setOrder] = useState(null)
  const [revealedTiles, setRevealedTiles] = useState([])
  const [wrongTile, setWrongTile] = useState(null)
  const [nextExpected, setNextExpected] = useState(null)
  const [warningMsg, setWarningMsg] = useState('')
  const [hasWarned, setHasWarned] = useState(false)
  const [gameTime, setGameTime] = useState(0)
  const [firstClickIndex, setFirstClickIndex] = useState(null)

  const gameTimerRef = useRef(null)
  const visibilityTime = DIFFICULTY_TIME[difficulty]

  // Game initialize karo
  useEffect(() => {
    setTiles(generateTiles())
    setPhase('memorize')
    setRevealedTiles([])
    setWrongTile(null)
    setOrder(null)
    setNextExpected(null)
    setWarningMsg('')
    setHasWarned(false)
    setGameTime(0)
  }, [])

  // Game timer — playing phase mein start hoga
  useEffect(() => {
    if (phase === 'playing') {
      gameTimerRef.current = setInterval(() => {
        setGameTime(t => t + 1)
      }, 1000)
    }
    return () => clearInterval(gameTimerRef.current)
  }, [phase])

  // Visibility timer khatam — numbers hide ho jayenge
  const handleVisibilityEnd = useCallback(() => {
    setPhase('hidden')
  }, [])

  // Pehla click — popup dikhao
  const handleFirstClick = (index) => {
    if (tiles[index].isEmpty) return
    setFirstClickIndex(index)
    setShowPopup(true)
  }

  // Order select kiya
  const handleOrderSelect = (selectedOrder) => {
    setShowPopup(false)
    setOrder(selectedOrder)
    setSelectedOrder(selectedOrder)
    setPhase('playing')

    // Expected first number set karo
    const firstNum = selectedOrder === 'ascending' ? 1 : 10
    setNextExpected(firstNum)

    // Pehle click ka tile bhi check karo
    setTimeout(() => {
      checkTileClick(firstClickIndex, selectedOrder, firstNum, false)
    }, 100)
  }

  // Tile click check karo
  const checkTileClick = (index, currentOrder, expected, warned) => {
    const tile = tiles[index]
    if (!tile || tile.isEmpty) return

    const clickedNum = tile.number

    if (clickedNum === expected) {
      // ✅ Correct!
      setRevealedTiles(prev => {
        const newRevealed = [...prev, index]

        // Sab 10 tiles click ho gaye?
        if (newRevealed.length === 10) {
          clearInterval(gameTimerRef.current)
          setTimeout(() => handleWin(newRevealed, currentOrder), 200) // ✅ Fix 4: 500 → 200
        }
        return newRevealed
      })

      // Next expected number set karo
      const nextNum = currentOrder === 'ascending' ? expected + 1 : expected - 1
      setNextExpected(nextNum)
      setWarningMsg('')

    } else {
      // ❌ Wrong!
      if (!warned) {
        const startNum = currentOrder === 'ascending' ? 1 : 10
        if (clickedNum !== startNum && !warned) {
          setWarningMsg(
            currentOrder === 'ascending'
              ? '⚠️ WRONG START! Ascending must begin from 1'
              : '⚠️ WRONG START! Descending must begin from 10'
          )
          setHasWarned(true)
          return
        }
      }

      // Game over!
      setWrongTile(index)
      clearInterval(gameTimerRef.current)
      setTimeout(() => handleGameOver(index, currentOrder), 400) // ✅ Fix 1: 800 → 400
    }
  }

  // Playing phase mein tile click
  const handlePlayingClick = (index) => {
    const tile = tiles[index]
    if (!tile || tile.isEmpty) return
    if (revealedTiles.includes(index)) return

    const clickedNum = tile.number

    if (clickedNum === nextExpected) {
      // ✅ Correct!
      const newRevealed = [...revealedTiles, index]
      setRevealedTiles(newRevealed)
      setWarningMsg('')

      if (newRevealed.length === 10) {
        clearInterval(gameTimerRef.current)
        setTimeout(() => handleWin(newRevealed, order), 200) // ✅ Fix 4: 500 → 200
        return
      }

      const nextNum = order === 'ascending' ? nextExpected + 1 : nextExpected - 1
      setNextExpected(nextNum)

    } else {
      // ❌ Wrong!
      if (!hasWarned) {
        setWarningMsg(`⚠️ WRONG! Expected ${nextExpected}`)
        setHasWarned(true)
        return
      }
      // Dusri galti — Game Over
      setWrongTile(index)
      clearInterval(gameTimerRef.current)
      setTimeout(() => handleGameOver(index, order), 400) // ✅ Fix 1: 800 → 400
    }
  }

  // Main tile click handler
  const handleTileClick = (index) => {
    if (phase === 'memorize') return
    if (phase === 'gameover' || phase === 'won') return
    if (tiles[index].isEmpty) return

    if (phase === 'hidden') {
      handleFirstClick(index)
      return
    }

    if (phase === 'playing') {
      handlePlayingClick(index)
    }
  }

  // Win handler
  const handleWin = async (revealed, currentOrder) => {
    setPhase('won')
    setGameResult('win')
    setTimeTaken(gameTime)

    try {
      await saveScoreAPI({
        difficulty,
        timeTaken: gameTime,
        result: 'win',
        order: currentOrder,
      })
    } catch (e) {
      console.log('Score save error:', e)
    }

    setTimeout(() => navigate('/result'), 300) // ✅ Fix 3: 1000 → 300
  }

  // Game Over handler
  const handleGameOver = async (wrongIdx, currentOrder) => {
    setPhase('gameover')
    setGameResult('lose')
    setTimeTaken(gameTime)

    try {
      await saveScoreAPI({
        difficulty,
        timeTaken: gameTime,
        result: 'lose',
        order: currentOrder || 'ascending',
      })
    } catch (e) {
      console.log('Score save error:', e)
    }

    setTimeout(() => navigate('/result'), 300) // ✅ Fix 2: 1500 → 300
  }

  // Phase label
  const getPhaseLabel = () => {
    if (phase === 'memorize') return '👁️ MEMORIZE THE GRID!'
    if (phase === 'hidden') return '🎯 CLICK ANY NUMBER TO START'
    if (phase === 'playing') {
      return order === 'ascending'
        ? `⬆️ ASCENDING — NEXT: ${nextExpected}`
        : `⬇️ DESCENDING — NEXT: ${nextExpected}`
    }
    if (phase === 'gameover') return '💀 GAME OVER!'
    if (phase === 'won') return '🏆 YOU WIN!'
  }

  const getPhaseColor = () => {
    if (phase === 'memorize') return 'var(--cyan-accent)'
    if (phase === 'hidden') return 'var(--purple-secondary)'
    if (phase === 'playing') return order === 'ascending' ? '#22c55e' : '#ef4444'
    if (phase === 'gameover') return 'var(--red-wrong)'
    if (phase === 'won') return '#22c55e'
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 20px 40px',
      position: 'relative',
    }}>

      {/* Background grid */}
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

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '560px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '24px' }}
        >
          {/* Difficulty badge */}
          <div style={{
            display: 'inline-block',
            background: 'rgba(124,58,237,0.15)',
            border: '1px solid rgba(124,58,237,0.4)',
            borderRadius: '20px',
            padding: '6px 20px',
            marginBottom: '16px',
          }}>
            <span style={{
              fontFamily: 'var(--font-game)',
              fontSize: '8px',
              color: 'var(--purple-secondary)',
              letterSpacing: '2px',
            }}>
              {difficulty.toUpperCase()} MODE
            </span>
          </div>

          {/* Phase label */}
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: 'var(--font-game)',
              fontSize: 'clamp(9px, 2vw, 12px)',
              color: getPhaseColor(),
              letterSpacing: '2px',
              textShadow: `0 0 15px ${getPhaseColor()}`,
            }}
          >
            {getPhaseLabel()}
          </motion.p>
        </motion.div>

        {/* Visibility Timer */}
        {phase === 'memorize' && (
          <Timer
            duration={visibilityTime}
            onComplete={handleVisibilityEnd}
            label="MEMORIZE NOW!"
          />
        )}

        {/* Game Timer — playing phase */}
        {(phase === 'playing' || phase === 'won' || phase === 'gameover') && (
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span style={{
              fontFamily: 'var(--font-game)',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              letterSpacing: '2px',
            }}>
              ⏱️ {gameTime}s
            </span>
          </div>
        )}

        {/* Warning message */}
        <AnimatePresence>
          {warningMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                background: 'rgba(234,179,8,0.15)',
                border: '1px solid var(--yellow-warning)',
                borderRadius: '10px',
                padding: '12px 20px',
                marginBottom: '16px',
                textAlign: 'center',
                fontFamily: 'var(--font-game)',
                fontSize: '8px',
                color: 'var(--yellow-warning)',
                letterSpacing: '1px',
              }}
            >
              {warningMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        {phase === 'playing' && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '6px',
            }}>
              <span style={{
                fontFamily: 'var(--font-game)',
                fontSize: '7px',
                color: 'var(--text-muted)',
              }}>
                PROGRESS
              </span>
              <span style={{
                fontFamily: 'var(--font-game)',
                fontSize: '7px',
                color: 'var(--purple-secondary)',
              }}>
                {revealedTiles.length}/10
              </span>
            </div>
            <div style={{
              height: '6px',
              background: 'var(--bg-secondary)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <motion.div
                animate={{ width: `${(revealedTiles.length / 10) * 100}%` }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #7c3aed, #22c55e)',
                  borderRadius: '3px',
                  boxShadow: '0 0 8px rgba(124,58,237,0.6)',
                }}
              />
            </div>
          </div>
        )}

        {/* GAME GRID */}
        {tiles.length > 0 && (
          <Grid
            tiles={tiles}
            isVisible={phase === 'memorize'}
            revealedTiles={revealedTiles}
            wrongTile={wrongTile}
            onTileClick={handleTileClick}
            disabled={phase === 'memorize' || phase === 'gameover' || phase === 'won'}
          />
        )}

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center',
            marginTop: '20px',
            fontFamily: 'var(--font-game)',
            fontSize: '7px',
            color: 'var(--text-muted)',
            letterSpacing: '1px',
          }}
        >
          10 NUMBERS HIDDEN IN 16 TILES • FIND THEM ALL!
        </motion.div>
      </div>

      {/* ASC/DESC Popup */}
      <Popup isOpen={showPopup} onSelect={handleOrderSelect} />
    </div>
  )
}

export default Game