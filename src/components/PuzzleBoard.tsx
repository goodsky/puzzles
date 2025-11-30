import { useAppDispatch, useAppSelector } from '../store/hooks'
import { completePuzzle, movePiece } from '../store/puzzleSlice'
import { isPuzzleSolved } from '../utils/puzzleUtils'
import PuzzlePiece from './PuzzlePiece'
import { useEffect } from 'react'
import { DragEvent } from 'react'

function PuzzleBoard() {
  const dispatch = useAppDispatch()
  const { pieces, gridSize, draggedPiece, gameStatus, image } = useAppSelector(
    (state) => state.puzzle
  )

  useEffect(() => {
    if (pieces.length > 0 && gameStatus === 'playing') {
      if (isPuzzleSolved(pieces)) {
        dispatch(completePuzzle())
      }
    }
  }, [pieces, gameStatus, dispatch])

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault()
    if (draggedPiece !== null && draggedPiece !== dropIndex) {
      dispatch(movePiece({ fromIndex: draggedPiece, toIndex: dropIndex }))
    }
  }

  if (pieces.length === 0) {
    return null
  }

  return (
    <div className="puzzle-container">
      {gameStatus === 'completed' && (
        <div className="win-message">
          <h2>Congratulations! You solved the puzzle!</h2>
        </div>
      )}
      {gameStatus === 'completed' && image ? (
        <div className="completed-image-container">
          <img src={image} alt="Completed puzzle" className="completed-image" />
        </div>
      ) : (
        <div
          className="puzzle-board"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {pieces.map((piece, index) => (
            <div
              key={index}
              className="puzzle-slot"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <PuzzlePiece piece={piece} index={index} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PuzzleBoard
