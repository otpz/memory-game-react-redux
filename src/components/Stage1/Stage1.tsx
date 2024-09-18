import { useEffect, useState } from 'react'
import styles from "./style.module.css"

const Stage1 = () => {
  const [gameHasStarted, setGameHasStarted] = useState<boolean>(true)

  const [placesMatrixCopy] = useState<number[][]>([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  ])

  const [clickedPlaces, setClickedPlaces] = useState<number[][]>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])

  useEffect(() => {
    // hide the right places 3 seconds after game start,
    setTimeout(() => {
      setGameHasStarted(false)
    }, 1000)
  }, [])

  const handleColClicked = (rowIdx: number, colIdx: number) => {
    if (placesMatrixCopy[rowIdx][colIdx] === 1){
      setClickedPlaces(prev => {
        return prev.map((row, rowIdxMap) => {
          if (rowIdxMap === rowIdx){
            return row.map((col, colIdxMap) => {
              if (colIdxMap === colIdx){
                console.log(col, colIdxMap)
                return 1
              }
              return col
            })
          }
          return row
        })
      })
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
                null
              }
            </div>
          ))
        })
      }
    </div>
  )
}

export default Stage1