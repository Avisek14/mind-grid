
import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {

  // ---- AUTH STATE ----
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  // ---- GAME STATE ----
  const [difficulty, setDifficulty] = useState('easy');
  const [gameResult, setGameResult] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ---- AUTH FUNCTIONS ----
  const loginUser = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // ---- GAME FUNCTIONS ----
  const resetGame = () => {
    setGameResult(null);
    setTimeTaken(0);
    setSelectedOrder(null);
  };

  return (
    <GameContext.Provider value={{
      // Auth
      user, loginUser, logoutUser,
      // Game
      difficulty, setDifficulty,
      gameResult, setGameResult,
      timeTaken, setTimeTaken,
      selectedOrder, setSelectedOrder,
      resetGame,
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook — har jagah easily use kar sako
export const useGame = () => useContext(GameContext);