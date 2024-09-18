import { useEffect, useState } from 'react'
import styles from "./style.module.css"

const Stage1 = () => {
  const [gameHasStarted, setGameHasStarted] = useState<boolean>(true)
  
  const [placesMatrixCopy] = useState<number[][]>([
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 1]
  ])
  
  const [clickedPlaces, setClickedPlaces] = useState<number[][]>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])

  const [count, setCount] = useState<number>(clickedPlaces.length-1)
  const [life, setLife] = useState<number>(2)

  useEffect(() => {
    // hide the right places 3 seconds after game start,
    const timer = setTimeout(() => setGameHasStarted(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleColClicked = (rowIdx: number, colIdx: number) => {

    if (rowIdx !== count){
      return
    }

    if (placesMatrixCopy[rowIdx][colIdx] === 1) {
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

  return (
    <div className={styles.container}>
      {
        gameHasStarted && placesMatrixCopy.map((row, rowIdx) => {
          return row.map((col, colIdx) => (
            <div onClick={() => handleColClicked(rowIdx, colIdx)} key={colIdx} className={styles.col}>
              {
                col === 1 ?
                <div className={styles.green_box}></div> :
                null
              }
            </div>
          ))
        })
      }
      {
        !gameHasStarted && clickedPlaces.map((row, rowIdx) => {
          return row.map((col, colIdx) => (
            <div onClick={() => handleColClicked(rowIdx, colIdx)} key={colIdx} className={styles.col}>
              {
                col === 1 ? 
                <div className={styles.green_box}></div> : 
                (col === 2 ? <div className={styles.red_box}></div> : null)
              }
            </div>
          ))
        })
      }
    </div>
  )
}

export default Stage1