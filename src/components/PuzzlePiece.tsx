import { useAppDispatch } from '../store/hooks'
import { setDraggedPiece } from '../store/puzzleSlice'
import { PuzzlePiece as PuzzlePieceType } from '../types/puzzle'
import { DragEvent } from 'react'

interface PuzzlePieceProps {
  piece: PuzzlePieceType
  index: number
}

function PuzzlePiece({ piece, index }: PuzzlePieceProps) {
  const dispatch = useAppDispatch()

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    dispatch(setDraggedPiece(index))
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = () => {
    dispatch(setDraggedPiece(null))
  }

  const isCorrect = piece.correctIndex === piece.currentIndex

  return (
    <div
      className={`puzzle-piece ${isCorrect ? 'correct' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <img src={piece.imageData} alt={`Piece ${piece.id}`} draggable={false} />
    </div>
  )
}

export default PuzzlePiece
