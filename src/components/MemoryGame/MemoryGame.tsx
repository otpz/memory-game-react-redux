import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaHeart, FaPlay } from "react-icons/fa";
import { FaArrowRotateRight  } from "react-icons/fa6";
import styles from './style.module.css'

const MemoryGame = ({ stage, placesMatrix, nextStage, prevStage }: { stage: number, placesMatrix: number[][], nextStage: () => void, prevStage: () => void}) => {
  const [gameHasStarted, setGameHasStarted] = useState<boolean>(true)
  const [isStageCompleted, setIsStageCompleted] = useState<boolean>(false)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  const [clickedPlaces, setClickedPlaces] = useState<number[][]>(
    Array.from({ length: placesMatrix.length }, () => Array(placesMatrix[0].length).fill(0))
  )

  const [count, setCount] = useState<number>(placesMatrix.length - 1)
  const [life, setLife] = useState<number>(3)

  const gridSize = 300 // container box (300px)
  const cellSize = gridSize / placesMatrix.length

  const startGame = () => {
    setGameHasStarted(false)
  }

  const resetGame = () => {
    setClickedPlaces(Array.from({ length: placesMatrix.length }, () => Array(placesMatrix[0].length).fill(0)))
    setCount(placesMatrix.length - 1)
    setGameHasStarted(true)
    setIsStageCompleted(false)
    setIsGameOver(false)
    setLife(3)
  }

  useEffect(() => {
    resetGame()
  }, [stage])

  useEffect(() => {
    if (count === -1){
      setIsStageCompleted(true)
      setIsGameOver(false)
    }

    if (life === 0){
      setIsStageCompleted(false)
      setIsGameOver(true)
    }

  }, [count, life])

  const handleColClicked = (rowIdx: number, colIdx: number) => {
    if (rowIdx !== count) return
    if (isGameOver) return
    if (placesMatrix[rowIdx][colIdx] === 1) {
      setClickedPlaces(prev => {
        const updatedPlaces = prev.map(row => [...row])
        updatedPlaces[rowIdx][colIdx] = 1
        return updatedPlaces
      })
      setCount(prev => prev - 1)
    } else {
      setClickedPlaces(prev => {
        const updatedPlaces = prev.map(row => [...row])
        updatedPlaces[rowIdx][colIdx] = 2
        return updatedPlaces
      })
      setLife(prev => prev - 1)
    }
  }

  const renderGrid = (matrix: number[][], handleClick: boolean) => {
    return matrix.map((row, rowIdx) => (
      row.map((col, colIdx) => (
        <div
          onClick={() => handleClick && handleColClicked(rowIdx, colIdx)}
          key={colIdx}
          style={
            {
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            WebkitBoxShadow: count === rowIdx && !gameHasStarted ? "0px 0px 3px 0px #6022f5" : "none",
            MozBoxShadow: count === rowIdx && !gameHasStarted ? "0px 0px 3px 0px #6022f5" : "none",
            boxShadow: count === rowIdx && !gameHasStarted ? "0px 0px 3px 0px #6022f5" : "none",
          }}
          className={styles.col}
        >
          {col === 1 && <div className={styles.green_box}></div>}
          {col === 2 && <div className={styles.red_box}></div>}
        </div>
      ))
    ));
  }

  return (
    <div className={styles.game}>
      <div className={styles.game_header}>
        <h2>React Memory Game !</h2>
        <div className={styles.player}>
          <div>
            <p>{life}</p> <FaHeart className={styles.heart_icon}/> 
          </div>
          <div>
            <p>Score: {placesMatrix.length*5-count*5-5}</p>
          </div>
          <div>
            <p>Level: <span className={stage > 2 ? styles.fire : "null"}>{stage}</span></p>
          </div>
        </div>
        <h3 style={{height: "28px"}}>
          {isGameOver && "Game Over !"}
          {isStageCompleted && "Completed !"}
        </h3>
      </div>
      <div className={styles.container}
        style={{
          width: `${gridSize}px`,
          height: `${gridSize}px`,
          display: 'grid',
          gridTemplateColumns: `repeat(${placesMatrix.length}, 1fr)`,
          gridTemplateRows: `repeat(${placesMatrix.length}, 1fr)`,
        }}
      >
        {gameHasStarted ? renderGrid(placesMatrix, false) : renderGrid(clickedPlaces, true)}
      </div>
      <div className={styles.bottom_buttons}>
        {gameHasStarted &&  <button onClick={() => startGame()}>Start <FaPlay /></button>}
        {!gameHasStarted && <button onClick={() => resetGame()}>Reset <FaArrowRotateRight /></button>}
      </div>
      {
        isStageCompleted && (
        <div className={styles.bottom_buttons}>
          {<button onClick={prevStage} disabled={stage === 1} className={styles.change_level_buttons}><FaArrowLeft /> Previous Level</button>}
          {<button onClick={nextStage} disabled={stage === 5} className={styles.change_level_buttons}>Next Level<FaArrowRight /></button>}
        </div>
        )
      }
    </div>
  )
}

export default MemoryGame;
