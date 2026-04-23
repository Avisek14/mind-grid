
import { motion } from 'framer-motion'
import Tile from './Tile'

const Grid = ({ tiles, isVisible, revealedTiles, wrongTile, onTileClick, disabled }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        padding: '24px',
        background: 'rgba(124,58,237,0.05)',
        border: '1px solid rgba(124,58,237,0.2)',
        borderRadius: '20px',
        boxShadow: '0 0 40px rgba(124,58,237,0.1)',
      }}
    >
      {tiles.map((tile, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.015, duration: 0.2, ease: 'easeOut' }}
        >
          <Tile
            number={tile.number}
            isEmpty={tile.isEmpty}
            isVisible={isVisible}
            isRevealed={revealedTiles.includes(index)}
            isCorrect={revealedTiles.includes(index)}
            isWrong={wrongTile === index}
            onClick={() => onTileClick(index)}
            disabled={disabled}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Grid